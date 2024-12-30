export class PeopleField {
    private readonly property: string;

    contains(value: string): any {
        return { people: { contains: value, property: this.property } };
    }

    doesNotContain(value: string): any {
        return { people: { does_not_contain: value, property: this.property } };
    }

    isEmpty(): any {
        return { people: { is_empty: true, property: this.property } };
    }

    isNotEmpty(): any {
        return { people: { is_not_empty: true, property: this.property } };
    }
}
