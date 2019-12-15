export interface RowConfig {
    [key: string]: HeaderModelItem;
}

export class HeaderModelItem {
    title: string;
    sortable: boolean;

    constructor(title: string, sortable: boolean, roundAmount?: number, currency?: string) {
        this.title = title;
        this.sortable = sortable;
    }
}