import {SortModel} from "./sort-model";
import {sortFunc} from "../../helpers/sort-func";


export class TableModel {
    private data: [];
    private visibleData: Array<any>;
    private headerModel: object;
    private sortingModel: SortModel;
    private sortedData: any[];

    constructor() {
        this.sortingModel = new SortModel();
    }

    initNewData(headerModel?, body?, originalData?) {
        if (originalData) {
            this.data = originalData;
            this.sortedData = [...originalData];
            this.sortingModel.prop = '';
        } 
        if (headerModel && body) {
            this.headerModel = headerModel;
            this.visibleData = body;
        }
    }

    public getHeaderModel() {
        return this.headerModel;
    }

    public getSorterData() {
        return this.sortedData;
    }

    public getVisibleData() {
        return this.visibleData;
    }

    public getSortModel() {
        return this.sortingModel;
    }

    public setSortingModel(key: string) {
        if (key !== this.sortingModel.prop) {
            this.sortingModel.prop = key;
            this.sortingModel.direction = 'desc';
        } else {
            this.switchSortDirection()
        }

        this.sort()
    }

    switchSortDirection() {
        if (!this.sortingModel.direction) {
            this.sortingModel.direction = 'desc';
        } else if (this.sortingModel.direction === 'desc') {
            this.sortingModel.direction = 'asc'
        } else {
            this.sortingModel.direction = null;
        }
    }

    sort() {
        if (this.sortingModel.direction) {
            this.sortedData.sort(sortFunc(this.sortingModel.prop, this.sortingModel.direction));
        }
        if (this.sortingModel.direction === null) {
            this.sortedData = [...this.data];
        }
    }
}
