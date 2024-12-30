export class UrlField {
    private readonly property: string;

    equals(value: string): any {
        return { url: { equals: value, property: this.property } };
    }

    doesNotEqual(value: string): any {
        return { url: { does_not_equal: value, property: this.property } };
    }

    contains(value: string): any {
        return { url: { contains: value, property: this.property } };
    }

    doesNotContain(value: string): any {
        return { url: { does_not_contain: value, property: this.property } };
    }

    startsWith(value: string): any {
        return { url: { starts_with: value, property: this.property } };
    }

    endsWith(value: string): any {
        return { url: { ends_with: value, property: this.property } };
    }

    isEmpty(): any {
        return { url: { is_empty: true, property: this.property } };
    }

    isNotEmpty(): any {
        return { url: { is_not_empty: true, property: this.property } };
    }
}
