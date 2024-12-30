export class RollupField {
    private readonly property: string;

    any(value: RollupSubfilterPropertyFilter): any {
        return { rollup: { any: value, property: this.property } };
    }

    none(value: RollupSubfilterPropertyFilter): any {
        return { rollup: { none: value, property: this.property } };
    }

    every(value: RollupSubfilterPropertyFilter): any {
        return { rollup: { every: value, property: this.property } };
    }

    date(value: DatePropertyFilter): any {
        return { rollup: { date: value, property: this.property } };
    }

    number(value: NumberPropertyFilter): any {
        return { rollup: { number: value, property: this.property } };
    }
}
