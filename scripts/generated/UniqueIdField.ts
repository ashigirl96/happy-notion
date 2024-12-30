export class UniqueIdField {
    private readonly property: string;

    equals(value: number): any {
        return { unique_id: { equals: value, property: this.property } };
    }

    doesNotEqual(value: number): any {
        return { unique_id: { does_not_equal: value, property: this.property } };
    }

    greater_than(value: number): any {
        return { unique_id: { greater_than: value, property: this.property } };
    }

    less_than(value: number): any {
        return { unique_id: { less_than: value, property: this.property } };
    }

    greater_than_or_equal_to(value: number): any {
        return { unique_id: { greater_than_or_equal_to: value, property: this.property } };
    }

    less_than_or_equal_to(value: number): any {
        return { unique_id: { less_than_or_equal_to: value, property: this.property } };
    }

    isEmpty(): any {
        return { unique_id: { is_empty: true, property: this.property } };
    }

    isNotEmpty(): any {
        return { unique_id: { is_not_empty: true, property: this.property } };
    }
}
