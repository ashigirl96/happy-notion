export class UniqueIdField {
    constructor(readonly property: string) {
    }

    equals(value: number) {
        return { unique_id: { equals: value, property: this.property } };
    }

    doesNotEqual(value: number) {
        return { unique_id: { does_not_equal: value, property: this.property } };
    }

    greaterThan(value: number) {
        return { unique_id: { greater_than: value, property: this.property } };
    }

    lessThan(value: number) {
        return { unique_id: { less_than: value, property: this.property } };
    }

    greaterThanOrEqualTo(value: number) {
        return { unique_id: { greater_than_or_equal_to: value, property: this.property } };
    }

    lessThanOrEqualTo(value: number) {
        return { unique_id: { less_than_or_equal_to: value, property: this.property } };
    }

    isEmpty() {
        return { unique_id: { is_empty: true, property: this.property } };
    }

    isNotEmpty() {
        return { unique_id: { is_not_empty: true, property: this.property } };
    }
}
