import type { FindCriteria } from '@/fields'
import type { Client } from '@notionhq/client'

export abstract class AbstractDatabase<T> {
  protected constructor(
    protected client: Client,
    protected id: string,
  ) {}

  // TODO: fp-tsのEitherを使ってエラー処理を追加する
  async findBy(criteria: FindCriteria<T>) {
    const response = await this.client.databases.query({
      database_id: this.id,
      // @ts-expect-error
      filter: criteria.where,
    })
    return response.results
  }
}
