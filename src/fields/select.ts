export type SelectFieldProperty = {
  select: {
    name: string
  }
}
export class SelectField {
  constructor(readonly name: string) {}

  property(value: string): SelectFieldProperty {
    return {
      select: {
        name: value,
      },
    }
  }
}
