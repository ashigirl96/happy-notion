import { BaseField } from "@/fields/base";

export class FilesField extends BaseField<"files"> {
    constructor(readonly property: string) {
        super()
    }
}
