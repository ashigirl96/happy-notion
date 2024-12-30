export class StatusField {
    constructor(readonly property: string) {
    }

    equals(value: string) {
        return { status: { equals: value, property: this.property } };
    }

    doesNotEqual(value: string) {
        return { status: { does_not_equal: value, property: this.property } };
    }

    isEmpty() {
        return { status: { is_empty: true, property: this.property } };
    }

    isNotEmpty() {
        return { status: { is_not_empty: true, property: this.property } };
    }
}
