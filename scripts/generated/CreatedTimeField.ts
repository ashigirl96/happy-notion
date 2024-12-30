import { BaseField } from "@/fields/base";

export type CreatedTimeFieldEquals = { property: string; created_time: { equals: string } };
export type CreatedTimeFieldBefore = { property: string; created_time: { before: string } };
export type CreatedTimeFieldAfter = { property: string; created_time: { after: string } };
export type CreatedTimeFieldOnOrBefore = { property: string; created_time: { on_or_before: string } };
export type CreatedTimeFieldOnOrAfter = { property: string; created_time: { on_or_after: string } };

export class CreatedTimeField extends BaseField<"created_time"> {
    constructor(readonly property: string) {
        super()
    }

    equals(value: string): CreatedTimeFieldEquals {
        return { property: this.property, created_time: { equals: value } };
    }

    before(value: string): CreatedTimeFieldBefore {
        return { property: this.property, created_time: { before: value } };
    }

    after(value: string): CreatedTimeFieldAfter {
        return { property: this.property, created_time: { after: value } };
    }

    onOrBefore(value: string): CreatedTimeFieldOnOrBefore {
        return { property: this.property, created_time: { on_or_before: value } };
    }

    onOrAfter(value: string): CreatedTimeFieldOnOrAfter {
        return { property: this.property, created_time: { on_or_after: value } };
    }
}

export type CreatedTimeFieldCondition = CreatedTimeFieldEquals | CreatedTimeFieldBefore | CreatedTimeFieldAfter | CreatedTimeFieldOnOrBefore | CreatedTimeFieldOnOrAfter;