import { BaseField } from "@/fields/base";

export class RollupField extends BaseField<"rollup"> {
    constructor(readonly property: string) {
        super()
    }
}
