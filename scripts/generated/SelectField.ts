export class SelectField {
    private readonly property: string;

    equals(value: string): any {
        return { select: { equals: value, property: this.property } };
    }

    doesNotEqual(value: string): any {
        return { select: { does_not_equal: value, property: this.property } };
    }

    isEmpty(): any {
        return { select: { is_empty: true, property: this.property } };
    }

    isNotEmpty(): any {
        return { select: { is_not_empty: true, property: this.property } };
    }
}
