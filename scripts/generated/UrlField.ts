export class UrlField {
    constructor(readonly property: string) {
    }

    equals(value: string) {
        return { url: { equals: value, property: this.property } };
    }

    doesNotEqual(value: string) {
        return { url: { does_not_equal: value, property: this.property } };
    }

    contains(value: string) {
        return { url: { contains: value, property: this.property } };
    }

    doesNotContain(value: string) {
        return { url: { does_not_contain: value, property: this.property } };
    }

    startsWith(value: string) {
        return { url: { starts_with: value, property: this.property } };
    }

    endsWith(value: string) {
        return { url: { ends_with: value, property: this.property } };
    }

    isEmpty() {
        return { url: { is_empty: true, property: this.property } };
    }

    isNotEmpty() {
        return { url: { is_not_empty: true, property: this.property } };
    }
}
