import {Paginator} from "../controller/paginator";
import {Filter} from "../controller/filter";
import {Table} from "../controller/table";
import {RowConfig} from "../models/table/row-model-item";
import {FilterView, PaginationView, TableView} from "../views/interfaces";
import {FilterConfig} from "../models/filter/filter-config-item";
import {PaginatorModel} from "../models/pagination/pagination-model";
import {FilterModel} from "../models/filter/filter-model";
import {TableModel} from "../models/table/table-model";
import {EventManager} from "../event-manager/event-manager";

export class ReportTable<T> {
    paginator: Paginator<T>;
    filter: Filter<T>;
    table: Table<T>;
    eventManager: EventManager;

    constructor(data: T[], tableView: TableView<T>, pagiView: PaginationView, filterView: FilterView, filterConfig: FilterConfig, private collumConfig: RowConfig<T>) {
        this.eventManager = new EventManager();
        this.paginator = new Paginator<T>(new PaginatorModel(), pagiView, this.eventManager);
        this.eventManager.attach('pagiChange', this.paginationHandler);
        this.paginator.initNewData(data);

        this.filter = new Filter<T>(new FilterModel(), filterView,  this.eventManager);
        this.eventManager.attach('filterChange', this.filterHandler);
        this.filter.initNewData(data, filterConfig);

        this.table = new Table<T>(new TableModel(), tableView,  this.eventManager);
        this.eventManager.attach('tableChange', this.tableHandler);
        this.table.initNewData(collumConfig, this.paginator.getCurrentPageData(), data);
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
        this.table.initNewData(this.collumConfig, this.paginator.getCurrentPageData(), data);
    };
}
