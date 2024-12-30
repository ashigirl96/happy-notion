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
