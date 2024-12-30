export class FormulaField {
    private readonly property: string;

    string(value: TextPropertyFilter): any {
        return { formula: { string: value, property: this.property } };
    }

    checkbox(value: CheckboxPropertyFilter): any {
        return { formula: { checkbox: value, property: this.property } };
    }

    number(value: NumberPropertyFilter): any {
        return { formula: { number: value, property: this.property } };
    }

    date(value: DatePropertyFilter): any {
        return { formula: { date: value, property: this.property } };
    }
}
