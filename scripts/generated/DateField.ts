export class DateField {
    constructor(readonly property: string) {
    }

    equals(value: string) {
        return { date: { equals: value, property: this.property } };
    }

    before(value: string) {
        return { date: { before: value, property: this.property } };
    }

    after(value: string) {
        return { date: { after: value, property: this.property } };
    }

    onOrBefore(value: string) {
        return { date: { on_or_before: value, property: this.property } };
    }

    onOrAfter(value: string) {
        return { date: { on_or_after: value, property: this.property } };
    }

    thisWeek(value: EmptyObject) {
        return { date: { this_week: value, property: this.property } };
    }

    pastWeek(value: EmptyObject) {
        return { date: { past_week: value, property: this.property } };
    }

    pastMonth(value: EmptyObject) {
        return { date: { past_month: value, property: this.property } };
    }

    pastYear(value: EmptyObject) {
        return { date: { past_year: value, property: this.property } };
    }

    nextWeek(value: EmptyObject) {
        return { date: { next_week: value, property: this.property } };
    }

    nextMonth(value: EmptyObject) {
        return { date: { next_month: value, property: this.property } };
    }

    nextYear(value: EmptyObject) {
        return { date: { next_year: value, property: this.property } };
    }

    isEmpty() {
        return { date: { is_empty: true, property: this.property } };
    }

    isNotEmpty() {
        return { date: { is_not_empty: true, property: this.property } };
    }
}
