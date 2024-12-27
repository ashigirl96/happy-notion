export type RelationFieldContains = {
  property: string
  relation: {
    title: {
      contains: string
    }
  }
}
export type RelationFieldDoesNotContain = {
  property: string
  relation: {
    title: {
      does_not_contain: string
    }
  }
}
export type RelationFieldIsEmpty = {
  property: string
  relation: {
    is_empty: true
  }
}
export type RelationFieldIsNotEmpty = {
  property: string
  relation: {
    is_not_empty: true
  }
}
export class RelationField {
  constructor(readonly content: string) {}

  contains(value: string): RelationFieldContains {
    return {
      property: this.content,
      relation: {
        title: {
          contains: value,
        },
      },
    }
  }

  doesNotContain(value: string): RelationFieldDoesNotContain {
    return {
      property: this.content,
      relation: {
        title: {
          does_not_contain: value,
        },
      },
    }
  }

  isEmpty(): RelationFieldIsEmpty {
    return {
      property: this.content,
      relation: {
        is_empty: true,
      },
    }
  }

  isNotEmpty(): RelationFieldIsNotEmpty {
    return {
      property: this.content,
      relation: {
        is_not_empty: true,
      },
    }
  }
}
export type RelationFieldCondition =
  | RelationFieldContains
  | RelationFieldDoesNotContain
  | RelationFieldIsEmpty
  | RelationFieldIsNotEmpty
