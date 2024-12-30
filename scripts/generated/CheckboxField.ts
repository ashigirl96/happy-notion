export class CheckboxField {
    private readonly property: string;

    equals(value: boolean): any {
        return { checkbox: { equals: value, property: this.property } };
    }

    doesNotEqual(value: boolean): any {
        return { checkbox: { does_not_equal: value, property: this.property } };
    }
}
