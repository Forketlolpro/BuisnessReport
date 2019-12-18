import {Listener} from "../event-manager/interfaces";
import {Paginator} from "../controller/paginator";
import {Filter} from "../controller/filter";
import {Table} from "../controller/table";
import {RowConfig} from "../models/table/row-model-item";
import {FilterView, PaginationView, TableView} from "../views/interfaces";
import {FilterConfig} from "../models/filter/filter-config-item";
import {PaginatorModel} from "../models/pagination/pagination-model";
import {FilterModel} from "../models/filter/filter-model";
import {TableModel} from "../models/table/table-model";

export class ReportTable<T> implements Listener {
    paginator: Paginator<T>;
    filter: Filter<T>;
    table: Table<T>;

    constructor(data: T[], tableView: TableView<T>, pagiView: PaginationView, filterView: FilterView, filterConfig: FilterConfig, private collumConfig: RowConfig<T>) {
        this.paginator = new Paginator<T>(new PaginatorModel(), pagiView);
        this.paginator.attach('pagiChange', this);
        this.paginator.initNewData(data);

        this.filter = new Filter<T>(new FilterModel(), filterView);
        this.filter.attach('filterChange', this);
        this.filter.initNewData(data, filterConfig);

        this.table = new Table<T>(new TableModel(), tableView);
        this.table.attach('tableChange', this);
        this.table.initNewData(collumConfig, this.paginator.getCurrentPageData(), data);
    }
    update(event: string, data: any): void {
        if (event === 'tableChange')
            this.tableHandler(data);
        if (event === 'pagiChange')
            this.paginationHandler(data);
        if (event === 'filterChange')
            this.filterHandler(data);
    }

    paginationHandler = (currentPageData: T[]): void => {
        this.table.initNewData(this.collumConfig, currentPageData)
    };

    tableHandler = (data: T[]): void => {
        this.paginator.initNewData(data);
        this.table.initNewData(this.collumConfig, this.paginator.getCurrentPageData());
    };

    filterHandler = (data: T[]): void => {
        this.paginator.initNewData(data);
        this.table.initNewData(this.collumConfig,  this.paginator.getCurrentPageData(), data);
    };
}