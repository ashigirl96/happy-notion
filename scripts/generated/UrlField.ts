import { BaseField } from "@/fields/base";

export type UrlFieldEquals = { property: string; url: { equals: string } };
export type UrlFieldDoesNotEqual = { property: string; url: { does_not_equal: string } };
export type UrlFieldContains = { property: string; url: { contains: string } };
export type UrlFieldDoesNotContain = { property: string; url: { does_not_contain: string } };
export type UrlFieldStartsWith = { property: string; url: { starts_with: string } };
export type UrlFieldEndsWith = { property: string; url: { ends_with: string } };

export class UrlField extends BaseField<"url"> {
    constructor(readonly property: string) {
        super()
    }

    equals(value: string): UrlFieldEquals {
        return { property: this.property, url: { equals: value } };
    }

    doesNotEqual(value: string): UrlFieldDoesNotEqual {
        return { property: this.property, url: { does_not_equal: value } };
    }

    contains(value: string): UrlFieldContains {
        return { property: this.property, url: { contains: value } };
    }

    doesNotContain(value: string): UrlFieldDoesNotContain {
        return { property: this.property, url: { does_not_contain: value } };
    }

    startsWith(value: string): UrlFieldStartsWith {
        return { property: this.property, url: { starts_with: value } };
    }

    endsWith(value: string): UrlFieldEndsWith {
        return { property: this.property, url: { ends_with: value } };
    }
}

export type UrlFieldCondition = UrlFieldEquals | UrlFieldDoesNotEqual | UrlFieldContains | UrlFieldDoesNotContain | UrlFieldStartsWith | UrlFieldEndsWith;