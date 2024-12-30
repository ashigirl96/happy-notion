export class DateField {
    private readonly property: string;

    equals(value: string): any {
        return { date: { equals: value, property: this.property } };
    }

    before(value: string): any {
        return { date: { before: value, property: this.property } };
    }

    after(value: string): any {
        return { date: { after: value, property: this.property } };
    }

    on_or_before(value: string): any {
        return { date: { on_or_before: value, property: this.property } };
    }

    on_or_after(value: string): any {
        return { date: { on_or_after: value, property: this.property } };
    }

    this_week(value: EmptyObject): any {
        return { date: { this_week: value, property: this.property } };
    }

    past_week(value: EmptyObject): any {
        return { date: { past_week: value, property: this.property } };
    }

    past_month(value: EmptyObject): any {
        return { date: { past_month: value, property: this.property } };
    }

    past_year(value: EmptyObject): any {
        return { date: { past_year: value, property: this.property } };
    }

    next_week(value: EmptyObject): any {
        return { date: { next_week: value, property: this.property } };
    }

    next_month(value: EmptyObject): any {
        return { date: { next_month: value, property: this.property } };
    }

    next_year(value: EmptyObject): any {
        return { date: { next_year: value, property: this.property } };
    }

    isEmpty(): any {
        return { date: { is_empty: true, property: this.property } };
    }

    isNotEmpty(): any {
        return { date: { is_not_empty: true, property: this.property } };
    }
}
