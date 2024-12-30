import { BaseField } from "@/fields/base";

export type LastEditedTimeFieldEquals = { property: string; last_edited_time: { equals: string } };
export type LastEditedTimeFieldBefore = { property: string; last_edited_time: { before: string } };
export type LastEditedTimeFieldAfter = { property: string; last_edited_time: { after: string } };
export type LastEditedTimeFieldOnOrBefore = { property: string; last_edited_time: { on_or_before: string } };
export type LastEditedTimeFieldOnOrAfter = { property: string; last_edited_time: { on_or_after: string } };

export class LastEditedTimeField extends BaseField<"last_edited_time"> {
    constructor(readonly property: string) {
        super()
    }

    equals(value: string): LastEditedTimeFieldEquals {
        return { property: this.property, last_edited_time: { equals: value } };
    }

    before(value: string): LastEditedTimeFieldBefore {
        return { property: this.property, last_edited_time: { before: value } };
    }

    after(value: string): LastEditedTimeFieldAfter {
        return { property: this.property, last_edited_time: { after: value } };
    }

    onOrBefore(value: string): LastEditedTimeFieldOnOrBefore {
        return { property: this.property, last_edited_time: { on_or_before: value } };
    }

    onOrAfter(value: string): LastEditedTimeFieldOnOrAfter {
        return { property: this.property, last_edited_time: { on_or_after: value } };
    }
}

export type LastEditedTimeFieldCondition = LastEditedTimeFieldEquals | LastEditedTimeFieldBefore | LastEditedTimeFieldAfter | LastEditedTimeFieldOnOrBefore | LastEditedTimeFieldOnOrAfter;
