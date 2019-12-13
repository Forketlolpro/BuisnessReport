import {PaginationViewParam} from "./pagination/pagination-view-param";
import {SortModel} from "../models/table/sort-model";

export interface BaseView {
    selector: string;

    render(...args: any[]): void;
}

export interface TableView<ReportItem> extends BaseView {
    render(columns: any, bodyModel: ReportItem[], sortModel: SortModel): void;
}

export interface FilterView extends BaseView {
    render(filters: any[]): void;
}

// export interface PaginationView extends BaseView {
//     render(paginationParams: PaginationViewParam): void;
// }