export class CreatedByField {
    private readonly property: string;

    contains(value: string): any {
        return { created_by: { contains: value, property: this.property } };
    }

    doesNotContain(value: string): any {
        return { created_by: { does_not_contain: value, property: this.property } };
    }

    isEmpty(): any {
        return { created_by: { is_empty: true, property: this.property } };
    }

    isNotEmpty(): any {
        return { created_by: { is_not_empty: true, property: this.property } };
    }
}
