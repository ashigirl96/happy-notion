export class MultiSelectField {
    private readonly property: string;

    contains(value: string): any {
        return { multi_select: { contains: value, property: this.property } };
    }

    doesNotContain(value: string): any {
        return { multi_select: { does_not_contain: value, property: this.property } };
    }

    isEmpty(): any {
        return { multi_select: { is_empty: true, property: this.property } };
    }

    isNotEmpty(): any {
        return { multi_select: { is_not_empty: true, property: this.property } };
    }
}
