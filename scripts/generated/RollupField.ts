import { BaseField } from "@/fields/base";

export class RollupField extends BaseField<"rollup"> {
    constructor(readonly property: string) {
        super()
    }

    any(value: RollupSubfilterPropertyFilter) {
        return { rollup: { any: value, property: this.property } };
    }

    none(value: RollupSubfilterPropertyFilter) {
        return { rollup: { none: value, property: this.property } };
    }

    every(value: RollupSubfilterPropertyFilter) {
        return { rollup: { every: value, property: this.property } };
    }

    date(value: DatePropertyFilter) {
        return { rollup: { date: value, property: this.property } };
    }

    number(value: NumberPropertyFilter) {
        return { rollup: { number: value, property: this.property } };
    }
}
