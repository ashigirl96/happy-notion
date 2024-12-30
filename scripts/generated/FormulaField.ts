export class FormulaField {
    constructor(readonly property: string) {
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
