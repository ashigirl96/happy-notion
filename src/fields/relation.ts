export class RelationField {
  constructor(readonly content: string) {}

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

  isEmpty() {
    return {
      is_empty: true,
    }
  }

  isNotEmpty() {
    return {
      is_not_empty: true,
    }
  }
}
