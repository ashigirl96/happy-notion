import { BaseField } from "@/fields/base";

export class StatusField extends BaseField<"status"> {
    constructor(readonly property: string) {
        super()
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
