import { BaseField } from "@/fields/base";

export class SelectField extends BaseField<"select"> {
    constructor(readonly property: string) {
        super()
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
