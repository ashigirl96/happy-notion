export class RichTextField {
    constructor(private readonly property: string) {}

    equals(value: string): any {
        return { rich_text: { equals: value, property: this.property } };
    }

    doesNotEqual(value: string): any {
        return { rich_text: { does_not_equal: value, property: this.property } };
    }

    contains(value: string): any {
        return { rich_text: { contains: value, property: this.property } };
    }

    doesNotContain(value: string): any {
        return { rich_text: { does_not_contain: value, property: this.property } };
    }

    startsWith(value: string): any {
        return { rich_text: { starts_with: value, property: this.property } };
    }

    endsWith(value: string): any {
        return { rich_text: { ends_with: value, property: this.property } };
    }

    isEmpty(): any {
        return { rich_text: { is_empty: true, property: this.property } };
    }

    isNotEmpty(): any {
        return { rich_text: { is_not_empty: true, property: this.property } };
    }
}

