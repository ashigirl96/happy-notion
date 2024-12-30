import { BaseField } from "@/fields/base";

export class FormulaField extends BaseField<"formula"> {
    constructor(readonly property: string) {
        super()
    }

    string(value: TextPropertyFilter) {
        return { formula: { string: value, property: this.property } };
    }

    checkbox(value: CheckboxPropertyFilter) {
        return { formula: { checkbox: value, property: this.property } };
    }

    number(value: NumberPropertyFilter) {
        return { formula: { number: value, property: this.property } };
    }

    date(value: DatePropertyFilter) {
        return { formula: { date: value, property: this.property } };
    }
}
