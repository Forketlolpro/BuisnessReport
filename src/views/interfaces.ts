import {PaginationViewParam} from "./pagination/pagination-view-param";
import {SortModel} from "../models/table/sort-model";
import {FilterConfig} from '../models/filter/filter-config-item';
import {RowConfig} from "../models/table/row-model-item";

export interface BaseView {
    selector: string;

    render(...args: any[]): void;
}

export interface TableView<T> extends BaseView {
    render(rowConfig: RowConfig<T>, bodyData: T[], sortingModel: SortModel): void;
}

export interface FilterView extends BaseView {
    render(config: FilterConfig): void;
}

export interface PaginationView extends BaseView {
    render(paginationParams: PaginationViewParam): void;
}