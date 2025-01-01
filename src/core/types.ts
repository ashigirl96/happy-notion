import type { BaseField } from '@/fields/base'
import type { AbstractDatabase } from './index'

type ExtractBaseFieldReturnType<T> = T extends BaseField<any> ? ReturnType<T['map']> : never

export type DatabaseProperties<T extends AbstractDatabase<any>> = {
  [P in keyof T as T[P] extends BaseField<any> ? P : never]: ExtractBaseFieldReturnType<T[P]>
}
export type DatabaseProperty<T extends AbstractDatabase<any>> = keyof DatabaseProperties<T>
