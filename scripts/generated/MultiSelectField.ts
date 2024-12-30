import { BaseField } from "@/fields/base";

export type MultiSelectFieldContains = { property: string; multi_select: { contains: string } };
export type MultiSelectFieldDoesNotContain = { property: string; multi_select: { does_not_contain: string } };

export class MultiSelectField extends BaseField<"multi_select"> {
    constructor(readonly property: string) {
        super()
    }

    contains(value: string): MultiSelectFieldContains {
        return { property: this.property, multi_select: { contains: value } };
    }

    doesNotContain(value: string): MultiSelectFieldDoesNotContain {
        return { property: this.property, multi_select: { does_not_contain: value } };
    }
}

export type MultiSelectFieldCondition = MultiSelectFieldContains | MultiSelectFieldDoesNotContain;
