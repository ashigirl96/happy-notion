import { BaseField } from "@/fields/base";

export class EmailField extends BaseField<"email"> {
    constructor(readonly property: string) {
        super()
    }

    equals(value: string) {
        return { email: { equals: value, property: this.property } };
    }

    doesNotEqual(value: string) {
        return { email: { does_not_equal: value, property: this.property } };
    }

    contains(value: string) {
        return { email: { contains: value, property: this.property } };
    }

    doesNotContain(value: string) {
        return { email: { does_not_contain: value, property: this.property } };
    }

    startsWith(value: string) {
        return { email: { starts_with: value, property: this.property } };
    }

    endsWith(value: string) {
        return { email: { ends_with: value, property: this.property } };
    }

    isEmpty() {
        return { email: { is_empty: true, property: this.property } };
    }

    isNotEmpty() {
        return { email: { is_not_empty: true, property: this.property } };
    }
}
