export interface RowConfig {
    [key: string]: HeaderModelItem;
}

export class HeaderModelItem {
    title: string;
    sortable: boolean;
    renderFunc: (value: string) => string;

    constructor(title: string, sortable: boolean, renderFunc?: (value: string) => string) {
        this.title = title;
        this.sortable = sortable;
        this.renderFunc = renderFunc;
    }
}