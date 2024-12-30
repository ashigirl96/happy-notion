export class LastEditedByField {
    constructor(readonly property: string) {
    }

    contains(value: string) {
        return { last_edited_by: { contains: value, property: this.property } };
    }

    doesNotContain(value: string) {
        return { last_edited_by: { does_not_contain: value, property: this.property } };
    }

    isEmpty() {
        return { last_edited_by: { is_empty: true, property: this.property } };
    }

    isNotEmpty() {
        return { last_edited_by: { is_not_empty: true, property: this.property } };
    }
}
