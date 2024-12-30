import { BaseField, type FillValue } from '@/fields/base'

export type PeopleFieldContains = { property: string; people: { contains: string } }
export type PeopleFieldDoesNotContain = { property: string; people: { does_not_contain: string } }

export class PeopleField extends BaseField<'people'> {
  constructor(readonly property: string) {
    super()
  }

  fill(id: string): FillValue<'people'> {
    return {
      people: [
        {
          id,
        },
      ],
    }
  }

  contains(value: string): PeopleFieldContains {
    return { property: this.property, people: { contains: value } }
  }

  doesNotContain(value: string): PeopleFieldDoesNotContain {
    return { property: this.property, people: { does_not_contain: value } }
  }
}

export type PeopleFieldCondition = PeopleFieldContains | PeopleFieldDoesNotContain
