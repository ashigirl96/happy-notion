export class NumberField {
    private readonly property: string;

    equals(value: number): any {
        return { number: { equals: value, property: this.property } };
    }

    doesNotEqual(value: number): any {
        return { number: { does_not_equal: value, property: this.property } };
    }

    greater_than(value: number): any {
        return { number: { greater_than: value, property: this.property } };
    }

    less_than(value: number): any {
        return { number: { less_than: value, property: this.property } };
    }

    greater_than_or_equal_to(value: number): any {
        return { number: { greater_than_or_equal_to: value, property: this.property } };
    }

    less_than_or_equal_to(value: number): any {
        return { number: { less_than_or_equal_to: value, property: this.property } };
    }

    isEmpty(): any {
        return { number: { is_empty: true, property: this.property } };
    }

    isNotEmpty(): any {
        return { number: { is_not_empty: true, property: this.property } };
    }
}
