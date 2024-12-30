import { BaseField } from "@/fields/base";

export type CreatedByFieldContains = { property: string; created_by: { contains: string } };
export type CreatedByFieldDoesNotContain = { property: string; created_by: { does_not_contain: string } };

export class CreatedByField extends BaseField<"created_by"> {
    constructor(readonly property: string) {
        super()
    }

    contains(value: string): CreatedByFieldContains {
        return { property: this.property, created_by: { contains: value } };
    }

    doesNotContain(value: string): CreatedByFieldDoesNotContain {
        return { property: this.property, created_by: { does_not_contain: value } };
    }
}

export type CreatedByFieldCondition = CreatedByFieldContains | CreatedByFieldDoesNotContain;
