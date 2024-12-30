import { BaseField } from "@/fields/base";

export class CreatedByField extends BaseField<"created_by"> {
    constructor(readonly property: string) {
        super()
    }

    contains(value: string) {
        return { created_by: { contains: value, property: this.property } };
    }

    doesNotContain(value: string) {
        return { created_by: { does_not_contain: value, property: this.property } };
    }

    isEmpty() {
        return { created_by: { is_empty: true, property: this.property } };
    }

    isNotEmpty() {
        return { created_by: { is_not_empty: true, property: this.property } };
    }
}
