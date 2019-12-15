import {Paginator} from "./controller/paginator";
import {PaginatorModel} from "./models/pagination/pagination-model";
import {DefaultPaginationView} from "./views/pagination/pagination-view";
import {get} from "./helpers/fetch";
import {Listener} from "./event-manager/interfaces";
import {ReportItem} from "./data-models/report-item";
import { Filter } from "./controller/filter";
import { FilterModel } from "./models/filter/filter-model";
import { DefaultFilterView } from "./views/filter/filter-view";
import { FilterConfigItem, FilterConfig } from './models/filter/filter-config-item';
import { Table } from "./controller/table";
import { TableModel } from "./models/table/table-model";
import { DefaultTableView } from "./views/table/table-view";
import { HeaderModelItem } from "./models/table/header-model-item";

export class App implements Listener {
    paginator: Paginator<ReportItem>;
    filter: Filter<ReportItem>;
    table: Table;
    rowConfig: any;

    constructor() {
        this.paginator = new Paginator<ReportItem>(new PaginatorModel(), new DefaultPaginationView('.pagination'));
        this.paginator.attach('pagiChange', this);
        this.paginator.initNewData(get('product'));

        let filterConfig: FilterConfig = {
            displays: new FilterConfigItem('Displays'),
            orders: new FilterConfigItem('Purchases'),
            clicks: new FilterConfigItem('Clicks '),
            abandonedUnits: new FilterConfigItem('Abandoned Units'),
            soldUnits: new FilterConfigItem('Sold units'),
            revenue: new FilterConfigItem('Revenue'),
            profit: new FilterConfigItem('Profit')
        };

        this.filter = new Filter<ReportItem>(new FilterModel(), new DefaultFilterView('.filter'));
        this.filter.attach('filterChange', this);
        this.filter.initNewData(get('product'), filterConfig);

        this.rowConfig = {
            image: new HeaderModelItem('', false),
            displayName: new HeaderModelItem('Title', false),
            displays: new HeaderModelItem('Displays', true),
            orders: new HeaderModelItem('Purchase', true),
            clicks: new HeaderModelItem('Clicks', true),
            abandonedUnits: new HeaderModelItem('Abandoned Units', true),
            soldUnits: new HeaderModelItem('Sold units', true),
            revenue: new HeaderModelItem('Revenue', true),
            profit: new HeaderModelItem('Profit', true)
        };

        this.table = new Table(new TableModel(), new DefaultTableView('.table'));
        this.table.attach('tableChange', this);
        this.table.initNewData(this.rowConfig, this.paginator.getCurrentPageData(), get('product'))
    }

    update(event: string, data: any): void {
        console.log(event);
        console.log(data);
        if (event === 'tableChange')
            this.tableHandler(data);
        if (event === 'pagiChange')
            this.paginationHandler(data);
        if (event === 'filterChange')
            this.filterHandler(data);
    }

    paginationHandler = (currentPageData: any[]): void => {
        this.table.initNewData(this.rowConfig, currentPageData)
    };

    tableHandler = (data: ReportItem[]): void => {
        this.paginator.initNewData(data);
        this.table.initNewData(this.rowConfig, this.paginator.getCurrentPageData());
    };

    filterHandler = (data: ReportItem[]): void => {
        this.paginator.initNewData(data);
        this.table.initNewData(this.rowConfig,  this.paginator.getCurrentPageData(), data);
    };
}