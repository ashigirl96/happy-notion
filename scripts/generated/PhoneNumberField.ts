export class PhoneNumberField {
    constructor(readonly property: string) {
    }

    equals(value: string) {
        return { phone_number: { equals: value, property: this.property } };
    }

    doesNotEqual(value: string) {
        return { phone_number: { does_not_equal: value, property: this.property } };
    }

    contains(value: string) {
        return { phone_number: { contains: value, property: this.property } };
    }

    doesNotContain(value: string) {
        return { phone_number: { does_not_contain: value, property: this.property } };
    }

    startsWith(value: string) {
        return { phone_number: { starts_with: value, property: this.property } };
    }

    endsWith(value: string) {
        return { phone_number: { ends_with: value, property: this.property } };
    }

    isEmpty() {
        return { phone_number: { is_empty: true, property: this.property } };
    }

    isNotEmpty() {
        return { phone_number: { is_not_empty: true, property: this.property } };
    }
}
