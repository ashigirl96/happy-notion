export class CreatedTimeField {
    constructor(readonly property: string) {
    }

    equals(value: string) {
        return { created_time: { equals: value, property: this.property } };
    }

    before(value: string) {
        return { created_time: { before: value, property: this.property } };
    }

    after(value: string) {
        return { created_time: { after: value, property: this.property } };
    }

    onOrBefore(value: string) {
        return { created_time: { on_or_before: value, property: this.property } };
    }

    onOrAfter(value: string) {
        return { created_time: { on_or_after: value, property: this.property } };
    }

    thisWeek(value: EmptyObject) {
        return { created_time: { this_week: value, property: this.property } };
    }

    pastWeek(value: EmptyObject) {
        return { created_time: { past_week: value, property: this.property } };
    }

    pastMonth(value: EmptyObject) {
        return { created_time: { past_month: value, property: this.property } };
    }

    pastYear(value: EmptyObject) {
        return { created_time: { past_year: value, property: this.property } };
    }

    nextWeek(value: EmptyObject) {
        return { created_time: { next_week: value, property: this.property } };
    }

    nextMonth(value: EmptyObject) {
        return { created_time: { next_month: value, property: this.property } };
    }

    nextYear(value: EmptyObject) {
        return { created_time: { next_year: value, property: this.property } };
    }

    isEmpty() {
        return { created_time: { is_empty: true, property: this.property } };
    }

    isNotEmpty() {
        return { created_time: { is_not_empty: true, property: this.property } };
    }
}
