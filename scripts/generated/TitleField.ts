export class TitleField {
    private readonly property: string;

    equals(value: string): any {
        return { title: { equals: value, property: this.property } };
    }

    doesNotEqual(value: string): any {
        return { title: { does_not_equal: value, property: this.property } };
    }

    contains(value: string): any {
        return { title: { contains: value, property: this.property } };
    }

    doesNotContain(value: string): any {
        return { title: { does_not_contain: value, property: this.property } };
    }

    startsWith(value: string): any {
        return { title: { starts_with: value, property: this.property } };
    }

    endsWith(value: string): any {
        return { title: { ends_with: value, property: this.property } };
    }

    isEmpty(): any {
        return { title: { is_empty: true, property: this.property } };
    }

    isNotEmpty(): any {
        return { title: { is_not_empty: true, property: this.property } };
    }
}
