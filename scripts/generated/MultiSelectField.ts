export class MultiSelectField {
    constructor(readonly property: string) {
    }

    contains(value: string) {
        return { multi_select: { contains: value, property: this.property } };
    }

    doesNotContain(value: string) {
        return { multi_select: { does_not_contain: value, property: this.property } };
    }

    isEmpty() {
        return { multi_select: { is_empty: true, property: this.property } };
    }

    isNotEmpty() {
        return { multi_select: { is_not_empty: true, property: this.property } };
    }
}
