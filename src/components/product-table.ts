import {Paginator} from "../controller/paginator";
import {PaginatorModel} from "../models/pagination/pagination-model";
import {DefaultPaginationView} from "../views/pagination/pagination-view";
import {get} from "../helpers/fetch";
import {Listener} from "../event-manager/interfaces";
import {ReportItem} from "../data-models/report-item";
import { Filter } from "../controller/filter";
import { FilterModel } from "../models/filter/filter-model";
import { DefaultFilterView } from "../views/filter/filter-view";
import { FilterConfigItem, FilterConfig } from '../models/filter/filter-config-item';
import { Table } from "../controller/table";
import { TableModel } from "../models/table/table-model";
import { DefaultTableView } from "../views/table/table-view";
import { RowModelItem, RowConfig } from "../models/table/row-model-item";

export class ProductTable implements Listener {
    paginator: Paginator<ReportItem>;
    filter: Filter<ReportItem>;
    table: Table<ReportItem>;
    rowConfig: RowConfig<ReportItem>;
    IMAGE_PREFIX: string = 'https://s3.eu-central-1.amazonaws.com/showcase-demo-images/fashion/images/';

    constructor() {
        this.paginator = new Paginator<ReportItem>(new PaginatorModel(), new DefaultPaginationView('.product-table .pagination'));
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

        this.filter = new Filter<ReportItem>(new FilterModel(), new DefaultFilterView('.product-table .filter'));
        this.filter.attach('filterChange', this);
        this.filter.initNewData(get('product'), filterConfig);

        this.rowConfig = {
            image: new RowModelItem('', false,  (value: string) => `<img src="${this.IMAGE_PREFIX + value}">`),
            displayName: new RowModelItem('Title', false, (value: string, rowConfig: RowConfig<ReportItem>, data: ReportItem [])=> `${data['displayName'] + ' ' + data['productKey']}`),
            displays: new RowModelItem('Displays', true),
            orders: new RowModelItem('Purchase', true),
            clicks: new RowModelItem('Clicks', true),
            abandonedUnits: new RowModelItem('Abandoned Units', true),
            soldUnits: new RowModelItem('Sold units', true),
            revenue: new RowModelItem('Revenue', true),
            profit: new RowModelItem('Profit', true, (value: string) => value+'$')
        };

        this.table = new Table<ReportItem>(new TableModel(), new DefaultTableView('.product-table .table'));
        this.table.attach('tableChange', this);
        this.table.initNewData(this.rowConfig, this.paginator.getCurrentPageData(), get('product'))
    }

    update(event: string, data: any): void {
        if (event === 'tableChange')
            this.tableHandler(data);
        if (event === 'pagiChange')
            this.paginationHandler(data);
        if (event === 'filterChange')
            this.filterHandler(data);
    }

    paginationHandler = (currentPageData: ReportItem[]): void => {
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