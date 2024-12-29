import type { FindCriteria, SaveCriteria } from '@/fields'
import type { Client } from '@notionhq/client'

export abstract class AbstractDatabase<T> {
  protected id!: string
  protected constructor(protected client: Client) {}

  // TODO: fp-tsのEitherを使ってエラー処理を追加する
  async findBy(criteria: FindCriteria<T>) {
    console.dir(criteria, { depth: null })
    const response = await this.client.databases.query({
      database_id: this.id,
      // @ts-expect-error
      filter: criteria.where,
    })
    return response.results
  }

  async savePage(criteria: SaveCriteria<T>) {
    const { options, where } = criteria
    if (where === undefined || options === undefined) {
      return this.createPage(criteria)
    }
    const exists = await this.findBy(where)
    if (exists.length === 0) {
      return this.createPage(criteria)
    }
    if (exists.length > 1) {
      // TODO: ちゃんとしたエラー処理を追加する
      throw new Error('Multiple pages found')
    }
    return this.updatePage(criteria, exists[0].id)
  }

  private async createPage(criteria: SaveCriteria<T>) {
    const response = await this.client.pages.create({
      parent: {
        database_id: this.id,
      },
      icon: criteria.emoji && {
        type: 'emoji',
        emoji: criteria.emoji,
      },
      children: criteria.children,
      properties: criteria.properties,
    })
    return {
      url: toNotionURL(response.id),
    }
  }

  private async updatePage(criteria: SaveCriteria<T>, pageId: string) {
    const { options } = criteria
    const _response = await this.client.pages.update({
      page_id: pageId,
      icon: criteria.emoji && {
        type: 'emoji',
        emoji: criteria.emoji,
      },
      properties: criteria.properties,
    })
    const isAppendChildren = await options.isAppendChildren(this.client)
    if (isAppendChildren && criteria.children !== undefined) {
      await this.client.blocks.children.append({
        block_id: pageId,
        children: criteria.children,
      })
    }
    return {
      url: toNotionURL(pageId),
    }
  }
}

export function toNotionURL(pageId: string) {
  return `https://www.notion.so/${pageId.replace(/-/g, '')}`
}
