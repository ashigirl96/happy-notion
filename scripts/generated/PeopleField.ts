import { BaseField, type FillValue } from '@/fields/base'

export type PeopleFieldContains = { property: string; people: { contains: string } }
export type PeopleFieldDoesNotContain = { property: string; people: { does_not_contain: string } }
export type PeopleFieldIsEmpty = { property: string; people: { is_empty: true } }
export type PeopleFieldIsNotEmpty = { property: string; people: { is_not_empty: true } }

export class PeopleField extends BaseField<'people'> {
  constructor(readonly property: string) {
    super()
  }

  fill(value: unknown): FillValue<'people'> {
    return { people: value }
  }

  contains(value: string): PeopleFieldContains {
    return { property: this.property, people: { contains: value } }
  }

  doesNotContain(value: string): PeopleFieldDoesNotContain {
    return { property: this.property, people: { does_not_contain: value } }
  }

  isEmpty(): PeopleFieldIsEmpty {
    return { property: this.property, people: { is_empty: true } }
  }

  isNotEmpty(): PeopleFieldIsNotEmpty {
    return { property: this.property, people: { is_not_empty: true } }
  }
}

export type PeopleFieldCondition =
  | PeopleFieldContains
  | PeopleFieldDoesNotContain
  | PeopleFieldIsEmpty
  | PeopleFieldIsNotEmpty
