export type TextFieldProperty = {
  title: {
    text: {
      content: string
    }
  }[]
}
export type TextFieldEquals = {
  property: string
  title: {
    equals: string
  }
}
export type TextFieldDoesNotEqual = {
  property: string
  title: {
    does_not_equal: string
  }
}
export type TextFieldContains = {
  property: string
  title: {
    contains: string
  }
}
export type TextFieldDoesNotContain = {
  property: string
  title: {
    does_not_contain: string
  }
}
export type TextFieldStartsWith = {
  property: string
  title: {
    starts_with: string
  }
}
export type TextFieldEndsWith = {
  property: string
  title: {
    ends_with: string
  }
}

export class TextField {
  constructor(readonly content: string) {}

  property(value: string): TextFieldProperty {
    return {
      title: [
        {
          text: {
            content: value,
          },
        },
      ],
    }
  }

  equals(value: string): TextFieldEquals {
    return {
      property: this.content,
      title: {
        equals: value,
      },
    }
  }

  doesNotEqual(value: string): TextFieldDoesNotEqual {
    return {
      property: this.content,
      title: {
        does_not_equal: value,
      },
    }
  }

  contains(value: string): TextFieldContains {
    return {
      property: this.content,
      title: {
        contains: value,
      },
    }
  }

  doesNotContain(value: string): TextFieldDoesNotContain {
    return {
      property: this.content,
      title: {
        does_not_contain: value,
      },
    }
  }

  startsWith(value: string): TextFieldStartsWith {
    return {
      property: this.content,
      title: {
        starts_with: value,
      },
    }
  }

  endsWith(value: string): TextFieldEndsWith {
    return {
      property: this.content,
      title: {
        ends_with: value,
      },
    }
  }
}
export type TextFieldCondition =
  | TextFieldEquals
  | TextFieldDoesNotEqual
  | TextFieldContains
  | TextFieldDoesNotContain
  | TextFieldStartsWith
  | TextFieldEndsWith
