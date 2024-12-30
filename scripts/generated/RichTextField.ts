import { BaseField } from "@/fields/base";

export type RichTextFieldEquals = { property: string; rich_text: { equals: string } };
export type RichTextFieldDoesNotEqual = { property: string; rich_text: { does_not_equal: string } };
export type RichTextFieldContains = { property: string; rich_text: { contains: string } };
export type RichTextFieldDoesNotContain = { property: string; rich_text: { does_not_contain: string } };
export type RichTextFieldStartsWith = { property: string; rich_text: { starts_with: string } };
export type RichTextFieldEndsWith = { property: string; rich_text: { ends_with: string } };

export class RichTextField extends BaseField<"rich_text"> {
    constructor(readonly property: string) {
        super()
    }

    equals(value: string): RichTextFieldEquals {
        return { property: this.property, rich_text: { equals: value } };
    }

    doesNotEqual(value: string): RichTextFieldDoesNotEqual {
        return { property: this.property, rich_text: { does_not_equal: value } };
    }

    contains(value: string): RichTextFieldContains {
        return { property: this.property, rich_text: { contains: value } };
    }

    doesNotContain(value: string): RichTextFieldDoesNotContain {
        return { property: this.property, rich_text: { does_not_contain: value } };
    }

    startsWith(value: string): RichTextFieldStartsWith {
        return { property: this.property, rich_text: { starts_with: value } };
    }

    endsWith(value: string): RichTextFieldEndsWith {
        return { property: this.property, rich_text: { ends_with: value } };
    }
}

export type RichTextFieldCondition = RichTextFieldEquals | RichTextFieldDoesNotEqual | RichTextFieldContains | RichTextFieldDoesNotContain | RichTextFieldStartsWith | RichTextFieldEndsWith;
