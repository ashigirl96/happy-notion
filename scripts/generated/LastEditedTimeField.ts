export class LastEditedTimeField {
    private readonly property: string;

    equals(value: string): any {
        return { last_edited_time: { equals: value, property: this.property } };
    }

    before(value: string): any {
        return { last_edited_time: { before: value, property: this.property } };
    }

    after(value: string): any {
        return { last_edited_time: { after: value, property: this.property } };
    }

    on_or_before(value: string): any {
        return { last_edited_time: { on_or_before: value, property: this.property } };
    }

    on_or_after(value: string): any {
        return { last_edited_time: { on_or_after: value, property: this.property } };
    }

    this_week(value: EmptyObject): any {
        return { last_edited_time: { this_week: value, property: this.property } };
    }

    past_week(value: EmptyObject): any {
        return { last_edited_time: { past_week: value, property: this.property } };
    }

    past_month(value: EmptyObject): any {
        return { last_edited_time: { past_month: value, property: this.property } };
    }

    past_year(value: EmptyObject): any {
        return { last_edited_time: { past_year: value, property: this.property } };
    }

    next_week(value: EmptyObject): any {
        return { last_edited_time: { next_week: value, property: this.property } };
    }

    next_month(value: EmptyObject): any {
        return { last_edited_time: { next_month: value, property: this.property } };
    }

    next_year(value: EmptyObject): any {
        return { last_edited_time: { next_year: value, property: this.property } };
    }

    isEmpty(): any {
        return { last_edited_time: { is_empty: true, property: this.property } };
    }

    isNotEmpty(): any {
        return { last_edited_time: { is_not_empty: true, property: this.property } };
    }
}
