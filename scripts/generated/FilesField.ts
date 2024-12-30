export class FilesField {
    private readonly property: string;

    isEmpty(): any {
        return { files: { is_empty: true, property: this.property } };
    }

    isNotEmpty(): any {
        return { files: { is_not_empty: true, property: this.property } };
    }
}
