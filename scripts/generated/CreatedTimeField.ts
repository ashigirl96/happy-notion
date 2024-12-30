export class CreatedTimeField {
    private readonly property: string;

    equals(value: string): any {
        return { created_time: { equals: value, property: this.property } };
    }

    before(value: string): any {
        return { created_time: { before: value, property: this.property } };
    }

    after(value: string): any {
        return { created_time: { after: value, property: this.property } };
    }

    on_or_before(value: string): any {
        return { created_time: { on_or_before: value, property: this.property } };
    }

    on_or_after(value: string): any {
        return { created_time: { on_or_after: value, property: this.property } };
    }

    this_week(value: EmptyObject): any {
        return { created_time: { this_week: value, property: this.property } };
    }

    past_week(value: EmptyObject): any {
        return { created_time: { past_week: value, property: this.property } };
    }

    past_month(value: EmptyObject): any {
        return { created_time: { past_month: value, property: this.property } };
    }

    past_year(value: EmptyObject): any {
        return { created_time: { past_year: value, property: this.property } };
    }

    next_week(value: EmptyObject): any {
        return { created_time: { next_week: value, property: this.property } };
    }

    next_month(value: EmptyObject): any {
        return { created_time: { next_month: value, property: this.property } };
    }

    next_year(value: EmptyObject): any {
        return { created_time: { next_year: value, property: this.property } };
    }

    isEmpty(): any {
        return { created_time: { is_empty: true, property: this.property } };
    }

    isNotEmpty(): any {
        return { created_time: { is_not_empty: true, property: this.property } };
    }
}
