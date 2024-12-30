export class RelationField {
    private readonly property: string;

    contains(value: string): any {
        return { relation: { contains: value, property: this.property } };
    }

    doesNotContain(value: string): any {
        return { relation: { does_not_contain: value, property: this.property } };
    }

    isEmpty(): any {
        return { relation: { is_empty: true, property: this.property } };
    }

    isNotEmpty(): any {
        return { relation: { is_not_empty: true, property: this.property } };
    }
}
