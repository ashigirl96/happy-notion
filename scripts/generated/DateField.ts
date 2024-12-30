import { BaseField } from "@/fields/base";

export type DateFieldEquals = { property: string; date: { equals: string } };
export type DateFieldBefore = { property: string; date: { before: string } };
export type DateFieldAfter = { property: string; date: { after: string } };
export type DateFieldOnOrBefore = { property: string; date: { on_or_before: string } };
export type DateFieldOnOrAfter = { property: string; date: { on_or_after: string } };

export class DateField extends BaseField<"date"> {
    constructor(readonly property: string) {
        super()
    }

    equals(value: string): DateFieldEquals {
        return { property: this.property, date: { equals: value } };
    }

    before(value: string): DateFieldBefore {
        return { property: this.property, date: { before: value } };
    }

    after(value: string): DateFieldAfter {
        return { property: this.property, date: { after: value } };
    }

    onOrBefore(value: string): DateFieldOnOrBefore {
        return { property: this.property, date: { on_or_before: value } };
    }

    onOrAfter(value: string): DateFieldOnOrAfter {
        return { property: this.property, date: { on_or_after: value } };
    }
}

export type DateFieldCondition = DateFieldEquals | DateFieldBefore | DateFieldAfter | DateFieldOnOrBefore | DateFieldOnOrAfter;
