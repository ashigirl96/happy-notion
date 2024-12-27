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

  async save(criteria: SaveCriteria<T>) {
    const _response = await this.client.pages.create({
      parent: {
        database_id: this.id,
      },
      properties: criteria.properties,
    })
    console.dir(_response, { depth: null })
  }
}
