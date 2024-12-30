export class NumberField {
    constructor(readonly property: string) {
    }

    equals(value: number) {
        return { number: { equals: value, property: this.property } };
    }

    doesNotEqual(value: number) {
        return { number: { does_not_equal: value, property: this.property } };
    }

    greaterThan(value: number) {
        return { number: { greater_than: value, property: this.property } };
    }

    lessThan(value: number) {
        return { number: { less_than: value, property: this.property } };
    }

    greaterThanOrEqualTo(value: number) {
        return { number: { greater_than_or_equal_to: value, property: this.property } };
    }

    lessThanOrEqualTo(value: number) {
        return { number: { less_than_or_equal_to: value, property: this.property } };
    }

    isEmpty() {
        return { number: { is_empty: true, property: this.property } };
    }

    isNotEmpty() {
        return { number: { is_not_empty: true, property: this.property } };
    }
}
