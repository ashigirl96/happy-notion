import { BaseField } from "@/fields/base";

export type NumberFieldEquals = { property: string; number: { equals: number } };
export type NumberFieldDoesNotEqual = { property: string; number: { does_not_equal: number } };
export type NumberFieldGreaterThan = { property: string; number: { greater_than: number } };
export type NumberFieldLessThan = { property: string; number: { less_than: number } };
export type NumberFieldGreaterThanOrEqualTo = { property: string; number: { greater_than_or_equal_to: number } };
export type NumberFieldLessThanOrEqualTo = { property: string; number: { less_than_or_equal_to: number } };

export class NumberField extends BaseField<"number"> {
    constructor(readonly property: string) {
        super()
    }

    equals(value: number): NumberFieldEquals {
        return { property: this.property, number: { equals: value } };
    }

    doesNotEqual(value: number): NumberFieldDoesNotEqual {
        return { property: this.property, number: { does_not_equal: value } };
    }

    greaterThan(value: number): NumberFieldGreaterThan {
        return { property: this.property, number: { greater_than: value } };
    }

    lessThan(value: number): NumberFieldLessThan {
        return { property: this.property, number: { less_than: value } };
    }

    greaterThanOrEqualTo(value: number): NumberFieldGreaterThanOrEqualTo {
        return { property: this.property, number: { greater_than_or_equal_to: value } };
    }

    lessThanOrEqualTo(value: number): NumberFieldLessThanOrEqualTo {
        return { property: this.property, number: { less_than_or_equal_to: value } };
    }
}

export type NumberFieldCondition = NumberFieldEquals | NumberFieldDoesNotEqual | NumberFieldGreaterThan | NumberFieldLessThan | NumberFieldGreaterThanOrEqualTo | NumberFieldLessThanOrEqualTo;