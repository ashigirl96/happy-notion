import { BaseField } from "@/fields/base";

export class CheckboxField extends BaseField<"checkbox"> {
    constructor(readonly property: string) {
        super()
    }

    equals(value: boolean) {
        return { checkbox: { equals: value, property: this.property } };
    }

    doesNotEqual(value: boolean) {
        return { checkbox: { does_not_equal: value, property: this.property } };
    }
}
