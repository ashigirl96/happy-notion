export class LastEditedByField {
    private readonly property: string;

    contains(value: string): any {
        return { last_edited_by: { contains: value, property: this.property } };
    }

    doesNotContain(value: string): any {
        return { last_edited_by: { does_not_contain: value, property: this.property } };
    }

    isEmpty(): any {
        return { last_edited_by: { is_empty: true, property: this.property } };
    }

    isNotEmpty(): any {
        return { last_edited_by: { is_not_empty: true, property: this.property } };
    }
}
