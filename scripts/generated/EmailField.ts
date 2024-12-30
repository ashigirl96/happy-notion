export class EmailField {
    private readonly property: string;

    equals(value: string): any {
        return { email: { equals: value, property: this.property } };
    }

    doesNotEqual(value: string): any {
        return { email: { does_not_equal: value, property: this.property } };
    }

    contains(value: string): any {
        return { email: { contains: value, property: this.property } };
    }

    doesNotContain(value: string): any {
        return { email: { does_not_contain: value, property: this.property } };
    }

    startsWith(value: string): any {
        return { email: { starts_with: value, property: this.property } };
    }

    endsWith(value: string): any {
        return { email: { ends_with: value, property: this.property } };
    }

    isEmpty(): any {
        return { email: { is_empty: true, property: this.property } };
    }

    isNotEmpty(): any {
        return { email: { is_not_empty: true, property: this.property } };
    }
}
