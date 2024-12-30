import { BaseField } from "@/fields/base";

export class FormulaField extends BaseField<"formula"> {
    constructor(readonly property: string) {
        super()
    }
}
