import {SortModel} from "./sort-model";
import {sortFunc} from "../../helpers/sort-func";
import { RowConfig } from "./row-model-item";
import {BaseModel} from "../base-model";


export class TableModel<T> extends BaseModel {
    private data: T[];
    private visibleData: T[];
    private rowConfig: RowConfig<T>;
    private sortingModel: SortModel;
    private sortedData: T[];

    constructor() {
        super();
        this.sortingModel = new SortModel();
    }

    initNewData(rowConfig?: RowConfig<T>, body?: T[], originalData?: T[]): void {
        if (originalData) {
            this.data = originalData;
            this.sortedData = [...originalData];
            this.sortingModel.prop = '';
        } 
        if (rowConfig && body) {
            this.rowConfig = rowConfig;
            this.visibleData = body;
        }
    }

    public getHeaderModel(): RowConfig<T> {
        return this.rowConfig;
    }

    public getSorterData(): T[] {
        return this.sortedData;
    }

    public getVisibleData(): T[] {
        return this.visibleData;
    }

    public getSortModel(): SortModel {
        return this.sortingModel;
    }

    public setSortingModel(key: string): void {
        if (key !== this.sortingModel.prop) {
            this.sortingModel.prop = key;
            this.sortingModel.direction = 'desc';
        } else {
            this.switchSortDirection()
        }

        this.sort()
    }

    switchSortDirection(): void {
        if (!this.sortingModel.direction) {
            this.sortingModel.direction = 'desc';
        } else if (this.sortingModel.direction === 'desc') {
            this.sortingModel.direction = 'asc'
        } else {
            this.sortingModel.direction = null;
        }
    }

    sort(): void {
        if (this.sortingModel.direction) {
            this.sortedData.sort(sortFunc(this.sortingModel.prop, this.sortingModel.direction));
        }
        if (this.sortingModel.direction === null) {
            this.sortedData = [...this.data];
        }
    }
}
