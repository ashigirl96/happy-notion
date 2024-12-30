export class SelectField {
    constructor(readonly property: string) {
    }

    equals(value: string) {
        return { select: { equals: value, property: this.property } };
    }

    doesNotEqual(value: string) {
        return { select: { does_not_equal: value, property: this.property } };
    }

    isEmpty() {
        return { select: { is_empty: true, property: this.property } };
    }

    isNotEmpty() {
        return { select: { is_not_empty: true, property: this.property } };
    }
}
