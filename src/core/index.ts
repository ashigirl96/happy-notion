import { toNotionURL } from '@/core/utils'
import type { FindCriteria, SaveCriteria } from '@/fields'
import { kebabToCamel } from '@/generate/kebabToCamel'
import type { Client } from '@notionhq/client'
import type { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'
import { ResultAsync, err, ok } from 'neverthrow'

type Page = QueryDatabaseResponse['results'][0]

export abstract class AbstractDatabase<T> {
  protected id!: string

  protected constructor(protected client: Client) {}

  /**
   * 指定条件に合致する Notion ページを取得する
   */
  findPagesBy(criteria: FindCriteria<T>): ResultAsync<Page[], Error> {
    return ResultAsync.fromPromise(
      (async () => {
        const response = await this.client.databases.query({
          database_id: this.id,
          filter: criteria.where,
        })
        return response.results
      })(),
      (e) => (e instanceof Error ? e : new Error(String(e))),
    )
  }

  _findPagesBy(criteria: FindCriteria<T>): ResultAsync<Page[], Error> {
    return ResultAsync.fromPromise(
      (async () => {
        const response = await this.client.databases.query({
          database_id: this.id,
          filter: criteria.where,
        })
        return response.results.map((result) => {
          if (result.object !== 'page' || !('properties' in result)) {
            return null
          }
          const properties: Record<string, unknown> = {}
          for (const [key, value] of Object.entries(result.properties)) {
            // クラスのプロパティに存在しないプロパティは無視する
            const _key = AbstractDatabase.mapPropertyName(key)
            if (!(_key in this)) {
              continue
            }
            properties[_key] = this[_key].map(value)
          }
          return {
            ...result,
            properties,
          }
        })
      })(),
      (e) => (e instanceof Error ? e : new Error(String(e))),
    )
  }

  /**
   * ページを作成 or 更新して、そのURLを返す
   */
  savePage(criteria: SaveCriteria<T>): ResultAsync<{ url: string }, Error> {
    return this.existsPage(criteria).andThen((existsResult) => {
      switch (existsResult.kind) {
        case 'create':
          return this.createPage(criteria)
        case 'update':
          return this.updatePage(criteria, existsResult.page.id)
        default:
          return ResultAsync.fromSafePromise(Promise.reject(new Error('Unexpected error')))
      }
    })
  }

  /**
   * where が指定されていない場合は新規作成扱い
   * where から検索して 0 件 => create
   * where から検索して 1 件 => update
   * where から検索して 複数件 => err
   */
  private existsPage(
    criteria: SaveCriteria<T>,
  ): ResultAsync<{ kind: 'create' } | { kind: 'update'; page: Page }, Error> {
    // where がない場合
    if (!criteria.where) {
      return ResultAsync.fromSafePromise(Promise.resolve({ kind: 'create' }))
    }

    // where がある場合
    return this.findPagesBy(criteria.where).andThen((pages) => {
      if (pages.length === 0) {
        return ok({ kind: 'create' } as const)
      }
      if (pages.length === 1) {
        return ok({ kind: 'update', page: pages[0] } as const)
      }
      // 2件以上あったらエラー
      return err(new Error('Multiple pages found'))
    })
  }

  /**
   * ページを新規作成
   */
  private createPage(criteria: SaveCriteria<T>): ResultAsync<{ url: string }, Error> {
    return ResultAsync.fromPromise(
      (async () => {
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
      })(),
      (e) => (e instanceof Error ? e : new Error(String(e))),
    )
  }

  /**
   * ページを更新
   */
  private updatePage(
    criteria: SaveCriteria<T>,
    pageId: string,
  ): ResultAsync<{ url: string }, Error> {
    return ResultAsync.fromPromise(
      (async () => {
        const { options } = criteria
        const response = await this.client.pages.update({
          page_id: pageId,
          icon: criteria.emoji && {
            type: 'emoji',
            emoji: criteria.emoji,
          },
          properties: criteria.properties,
        })
        // オプションで children を追加するかどうか
        if (options?.isAppendChildren) {
          const isAppendChildren = await options.isAppendChildren(this.client)
          if (isAppendChildren && criteria.children) {
            await this.client.blocks.children.append({
              block_id: pageId,
              children: criteria.children,
            })
          }
        }
        return {
          url: toNotionURL(response.id),
        }
      })(),
      (e) => (e instanceof Error ? e : new Error(String(e))),
    )
  }

  static mapPropertyName(name: string): string {
    return kebabToCamel(name)
  }
}
