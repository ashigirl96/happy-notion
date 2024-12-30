export class StatusField {
    private readonly property: string;

    equals(value: string): any {
        return { status: { equals: value, property: this.property } };
    }

    doesNotEqual(value: string): any {
        return { status: { does_not_equal: value, property: this.property } };
    }

    isEmpty(): any {
        return { status: { is_empty: true, property: this.property } };
    }

    isNotEmpty(): any {
        return { status: { is_not_empty: true, property: this.property } };
    }
}
