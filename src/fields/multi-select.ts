export type MultiSelectFieldProperty = {
  multi_select: {
    name: string
  }[]
}

export type MultiSelectFieldContains = {
  property: string
  multi_select: {
    contains: string
  }
}

export type MultiSelectFieldDoesNotContain = {
  property: string
  multi_select: {
    does_not_contain: string
  }
}

export type MultiSelectFieldIsEmpty = {
  property: string
  multi_select: {
    is_empty: true
  }
}

export type MultiSelectFieldIsNotEmpty = {
  property: string
  multi_select: {
    is_not_empty: true
  }
}

export class MultiSelectField {
  constructor(readonly name: string) {}

  property(value: string[]): MultiSelectFieldProperty {
    return {
      multi_select: value.map((v) => ({
        name: v,
      })),
    }
  }

  contains(value: string): MultiSelectFieldContains {
    return {
      property: this.name,
      multi_select: {
        contains: value,
      },
    }
  }

  doesNotContain(value: string): MultiSelectFieldDoesNotContain {
    return {
      property: this.name,
      multi_select: {
        does_not_contain: value,
      },
    }
  }

  isEmpty(): MultiSelectFieldIsEmpty {
    return {
      property: this.name,
      multi_select: {
        is_empty: true,
      },
    }
  }

  isNotEmpty(): MultiSelectFieldIsNotEmpty {
    return {
      property: this.name,
      multi_select: {
        is_not_empty: true,
      },
    }
  }
}

export type MultiSelectFieldCondition =
  | MultiSelectFieldContains
  | MultiSelectFieldDoesNotContain
  | MultiSelectFieldIsEmpty
  | MultiSelectFieldIsNotEmpty
