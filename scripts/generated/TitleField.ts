import { BaseField } from "@/fields/base";

export class TitleField extends BaseField<"title"> {
    constructor(readonly property: string) {
        super()
    }

    equals(value: string) {
        return { title: { equals: value, property: this.property } };
    }

    doesNotEqual(value: string) {
        return { title: { does_not_equal: value, property: this.property } };
    }

    contains(value: string) {
        return { title: { contains: value, property: this.property } };
    }

    doesNotContain(value: string) {
        return { title: { does_not_contain: value, property: this.property } };
    }

    startsWith(value: string) {
        return { title: { starts_with: value, property: this.property } };
    }

    endsWith(value: string) {
        return { title: { ends_with: value, property: this.property } };
    }

    isEmpty() {
        return { title: { is_empty: true, property: this.property } };
    }

    isNotEmpty() {
        return { title: { is_not_empty: true, property: this.property } };
    }
}
