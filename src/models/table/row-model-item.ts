export interface RowConfig<T> {
    [key: string]: RowModelItem<T>;
}

export class RowModelItem<T> {
    title: string;
    sortable: boolean;
    renderFunc: (value: string, rowConfig?: RowConfig<T>, data?: any) => string;

    constructor(title: string, sortable: boolean, renderFunc?: (value: string, rowConfig?: RowConfig<T>, data?: T[]) => string) {
        this.title = title;
        this.sortable = sortable;
        this.renderFunc = renderFunc;
    }
}