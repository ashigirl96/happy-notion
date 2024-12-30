import { BaseField } from "@/fields/base";

export class FilesField extends BaseField<"files"> {
    constructor(readonly property: string) {
        super()
    }

    isEmpty() {
        return { files: { is_empty: true, property: this.property } };
    }

    isNotEmpty() {
        return { files: { is_not_empty: true, property: this.property } };
    }
}
