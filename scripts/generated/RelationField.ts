export class RelationField {
    constructor(readonly property: string) {
    }

    contains(value: string) {
        return { relation: { contains: value, property: this.property } };
    }

    doesNotContain(value: string) {
        return { relation: { does_not_contain: value, property: this.property } };
    }

    isEmpty() {
        return { relation: { is_empty: true, property: this.property } };
    }

    isNotEmpty() {
        return { relation: { is_not_empty: true, property: this.property } };
    }
}
