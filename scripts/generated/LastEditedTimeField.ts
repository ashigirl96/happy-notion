export class LastEditedTimeField {
    constructor(readonly property: string) {
    }

    equals(value: string) {
        return { last_edited_time: { equals: value, property: this.property } };
    }

    before(value: string) {
        return { last_edited_time: { before: value, property: this.property } };
    }

    after(value: string) {
        return { last_edited_time: { after: value, property: this.property } };
    }

    onOrBefore(value: string) {
        return { last_edited_time: { on_or_before: value, property: this.property } };
    }

    onOrAfter(value: string) {
        return { last_edited_time: { on_or_after: value, property: this.property } };
    }

    thisWeek(value: EmptyObject) {
        return { last_edited_time: { this_week: value, property: this.property } };
    }

    pastWeek(value: EmptyObject) {
        return { last_edited_time: { past_week: value, property: this.property } };
    }

    pastMonth(value: EmptyObject) {
        return { last_edited_time: { past_month: value, property: this.property } };
    }

    pastYear(value: EmptyObject) {
        return { last_edited_time: { past_year: value, property: this.property } };
    }

    nextWeek(value: EmptyObject) {
        return { last_edited_time: { next_week: value, property: this.property } };
    }

    nextMonth(value: EmptyObject) {
        return { last_edited_time: { next_month: value, property: this.property } };
    }

    nextYear(value: EmptyObject) {
        return { last_edited_time: { next_year: value, property: this.property } };
    }

    isEmpty() {
        return { last_edited_time: { is_empty: true, property: this.property } };
    }

    isNotEmpty() {
        return { last_edited_time: { is_not_empty: true, property: this.property } };
    }
}
