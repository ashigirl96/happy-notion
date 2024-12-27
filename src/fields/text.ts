export class TextField {
  constructor(readonly content: string) {}

  equals(value: string) {
    return {
      property: this.content,
      title: {
        equals: value,
      },
    }
  }

  doesNotEqual(value: string) {
    return {
      property: this.content,
      title: {
        does_not_equal: value,
      },
    }
  }

  contains(value: string) {
    return {
      property: this.content,
      title: {
        contains: value,
      },
    }
  }

  doesNotContain(value: string) {
    return {
      property: this.content,
      title: {
        does_not_contain: value,
      },
    }
  }

  startsWith(value: string) {
    return {
      property: this.content,
      title: {
        starts_with: value,
      },
    }
  }

  endsWith(value: string) {
    return {
      property: this.content,
      title: {
        ends_with: value,
      },
    }
  }
}
