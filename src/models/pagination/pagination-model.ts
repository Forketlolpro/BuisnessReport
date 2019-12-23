import {PaginationViewParam} from "../../views/pagination/pagination-view-param";
import {BaseModel} from "../base-model";

export class PaginatorModel<T> extends BaseModel {
    private currentPageData: T[] = [];
    private data: T[];
    private readonly viewParam: PaginationViewParam;

    constructor(selectValues: number[]) {
        super();
        this.viewParam = new PaginationViewParam();
        this.viewParam.pagesSelectValues = selectValues;
        this.viewParam.itemsOnPage = selectValues[0];
    };

    public getDataOnCurrentPage(): T[] {
        return this.currentPageData;
    };

    public getViewParam(): PaginationViewParam {
        return this.viewParam;
    };

    public setSelectValues(selectValues: number[]) {
        this.viewParam.pagesSelectValues = selectValues;
        this.viewParam.itemsOnPage = selectValues[0];
    }

    public initNewData(data: T[]): void {
        this.data = data;
        this.viewParam.pagesTotal = Math.ceil(this.data.length / this.viewParam.itemsOnPage);
        this.viewParam.currentPage = 1;
        this.viewParam.itemCount = data.length;
        this.getElementsForCurrentPage();
    };

    public setItemsOnPage(count: number): void {
        count = Math.round(count);
        if (count <= 0) {
            count = this.viewParam.pagesSelectValues[0];
        }
        this.viewParam.itemsOnPage = count;
        this.viewParam.pagesTotal = Math.ceil(this.data.length / this.viewParam.itemsOnPage);
        this.viewParam.currentPage = 1;
        this.getElementsForCurrentPage();
    };

    public setSelectPage(page: number): void {
        page = Math.round(page);
        if (page <= 0) {
            page = 1;
        }

        if (page > this.viewParam.pagesTotal) {
            page = this.viewParam.pagesTotal
        }
        this.viewParam.currentPage = page;
        this.getElementsForCurrentPage();
    };

    private getElementsForCurrentPage(): void {
        this.currentPageData = this.data.slice((this.viewParam.currentPage - 1) * this.viewParam.itemsOnPage, (this.viewParam.currentPage) * this.viewParam.itemsOnPage);
    };
}
