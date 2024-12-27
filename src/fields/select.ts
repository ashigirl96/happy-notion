export type SelectFieldProperty = {
  select: {
    name: string
  }
}
export type SelectFieldEquals = {
  property: string
  select: {
    equals: string
  }
}
export type SelectFieldDoesNotEqual = {
  property: string
  select: {
    does_not_equal: string
  }
}
export type SelectFieldIsEmpty = {
  property: string
  select: {
    is_empty: true
  }
}
export type SelectFieldIsNotEmpty = {
  property: string
  select: {
    is_not_empty: true
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

  equals(value: string): SelectFieldEquals {
    return {
      property: this.name,
      select: {
        equals: value,
      },
    }
  }

  doesNotEqual(value: string): SelectFieldDoesNotEqual {
    return {
      property: this.name,
      select: {
        does_not_equal: value,
      },
    }
  }

  isEmpty(): SelectFieldIsEmpty {
    return {
      property: this.name,
      select: {
        is_empty: true,
      },
    }
  }

  isNotEmpty(): SelectFieldIsNotEmpty {
    return {
      property: this.name,
      select: {
        is_not_empty: true,
      },
    }
  }
}

export type SelectFieldCondition =
  | SelectFieldEquals
  | SelectFieldDoesNotEqual
  | SelectFieldIsEmpty
  | SelectFieldIsNotEmpty
