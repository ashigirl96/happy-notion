export class CheckboxField {
    constructor(readonly property: string) {
    }

    equals(value: boolean) {
        return { checkbox: { equals: value, property: this.property } };
    }

    doesNotEqual(value: boolean) {
        return { checkbox: { does_not_equal: value, property: this.property } };
    }
}
