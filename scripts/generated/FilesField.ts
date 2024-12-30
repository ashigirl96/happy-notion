export class FilesField {
    constructor(readonly property: string) {
    }

    isEmpty() {
        return { files: { is_empty: true, property: this.property } };
    }

    isNotEmpty() {
        return { files: { is_not_empty: true, property: this.property } };
    }
}
