import { BaseField } from "@/fields/base";

export class RelationField extends BaseField<"relation"> {
    constructor(readonly property: string) {
        super()
    }

    contains(value: string) {
        return { relation: { contains: value, property: this.property } };
    }

    doesNotContain(value: string) {
        return { relation: { does_not_contain: value, property: this.property } };
    }

    isEmpty() {
        return { relation: { is_empty: true, property: this.property } };
    }

    isNotEmpty() {
        return { relation: { is_not_empty: true, property: this.property } };
    }
}
