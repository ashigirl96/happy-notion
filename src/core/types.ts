import type { BaseField } from '@/fields/base'
import type { AbstractDatabase } from './index'

type AllInstanceKeys<T> = keyof T & keyof Required<T>

// インスタンスのプロパティとメソッドの型をユニオンとして取得
type AllInstanceMembers<T> = {
  [K in AllInstanceKeys<T>]: K
}[AllInstanceKeys<T>]

export type AbstractDatabaseProperty<T> =
  | AllInstanceMembers<AbstractDatabase<T>>
  | 'id'
  | 'createPage'
  | 'updatePage'
  | 'existsPage'

type ExtractBaseFieldReturnType<T> = T extends BaseField<any> ? ReturnType<T['map']> : never

export type DatabaseProperties<T extends AbstractDatabase<any>> = {
  [P in keyof T as T[P] extends BaseField<any> ? P : never]: ExtractBaseFieldReturnType<T[P]>
}
