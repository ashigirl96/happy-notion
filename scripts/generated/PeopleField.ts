export class PeopleField {
    constructor(readonly property: string) {
    }

    contains(value: string) {
        return { people: { contains: value, property: this.property } };
    }

    doesNotContain(value: string) {
        return { people: { does_not_contain: value, property: this.property } };
    }

    isEmpty() {
        return { people: { is_empty: true, property: this.property } };
    }

    isNotEmpty() {
        return { people: { is_not_empty: true, property: this.property } };
    }
}
