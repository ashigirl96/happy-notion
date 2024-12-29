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
    const { update } = criteria
    if (update) {
      const response = await this.client.pages.update({
        page_id: update.pageId,
        icon: criteria.emoji && {
          type: 'emoji',
          emoji: criteria.emoji,
        },
        // @ts-expect-error: TODO: このエラーを解消する
        properties: criteria.properties,
      })
      const isAppendChildren = await update.isAppendChildren(this.client)
      if (isAppendChildren && criteria.children !== undefined) {
        await this.client.blocks.children.append({
          block_id: update.pageId,
          children: criteria.children,
        })
      }
      console.dir(response, { depth: null })
      return {
        url: toNotionURL(update.pageId),
      }
    }
    const response = await this.client.pages.create({
      parent: {
        database_id: this.id,
      },
      icon: criteria.emoji && {
        type: 'emoji',
        emoji: criteria.emoji,
      },
      children: criteria.children,
      // @ts-expect-error: TODO: このエラーを解消する
      properties: criteria.properties,
    })
    console.dir(response, { depth: null })
    return {
      url: toNotionURL(response.id),
    }
  }
}

export function toNotionURL(pageId: string) {
  return `https://www.notion.so/${pageId.replace(/-/g, '')}`
}
