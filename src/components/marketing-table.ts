import {Paginator} from "../controller/paginator";
import {PaginatorModel} from "../models/pagination/pagination-model";
import {DefaultPaginationView} from "../views/pagination/pagination-view";
import {get} from "../helpers/fetch";
import {Listener} from "../event-manager/interfaces";
import { Filter } from "../controller/filter";
import { FilterModel } from "../models/filter/filter-model";
import { DefaultFilterView } from "../views/filter/filter-view";
import { FilterConfigItem, FilterConfig } from '../models/filter/filter-config-item';
import { Table } from "../controller/table";
import { TableModel } from "../models/table/table-model";
import { DefaultTableView } from "../views/table/table-view";
import { RowModelItem, RowConfig } from "../models/table/row-model-item";
import {MarketingItem} from "../data-models/marketing-item";

export class MarketingTable implements Listener {
    paginator: Paginator<MarketingItem>;
    filter: Filter<MarketingItem>;
    table: Table<MarketingItem>;
    rowConfig: RowConfig<MarketingItem>;

    constructor() {
        this.paginator = new Paginator<MarketingItem>(new PaginatorModel(), new DefaultPaginationView('.marketing-table .pagination'));
        this.paginator.attach('pagiChange', this);
        this.paginator.initNewData(get('marketing'));

        let filterConfig: FilterConfig = {
            displays: new FilterConfigItem('Displays'),
            clicks: new FilterConfigItem('Clicks '),
            orders: new FilterConfigItem('Purchases'),
            addToCarts: new FilterConfigItem('Add to cart'),
            units: new FilterConfigItem('Sold units'),
            revenue: new FilterConfigItem('Revenue'),
            profit: new FilterConfigItem('Profit')
        };

        this.filter = new Filter<MarketingItem>(new FilterModel(), new DefaultFilterView('.marketing-table .filter'));
        this.filter.attach('filterChange', this);
        this.filter.initNewData(get('marketing'), filterConfig);

        this.rowConfig = {
            displayName: new RowModelItem('Display name', false),
            path: new RowModelItem('Path', false),
            displays: new RowModelItem('Displays', true),
            clicks: new RowModelItem('Clicks', true),
            orders: new RowModelItem('Purchase', true),
            addToCarts: new RowModelItem('Add to cart', true),
            units: new RowModelItem('Sold units', true),
            revenue: new RowModelItem('Revenue', true, (value: string) => `${Math.round(+value)}$`),
            profit: new RowModelItem('Profit', true, (value: string) => `${Math.round(+value)}$`)
        };

        this.table = new Table<MarketingItem>(new TableModel(), new DefaultTableView('.marketing-table .table'));
        this.table.attach('tableChange', this);
        this.table.initNewData(this.rowConfig, this.paginator.getCurrentPageData(), get('marketing'))
    }

    update(event: string, data: any): void {
        if (event === 'tableChange')
            this.tableHandler(data);
        if (event === 'pagiChange')
            this.paginationHandler(data);
        if (event === 'filterChange')
            this.filterHandler(data);
    }

    paginationHandler = (currentPageData: MarketingItem[]): void => {
        this.table.initNewData(this.rowConfig, currentPageData)
    };

    tableHandler = (data: MarketingItem[]): void => {
        this.paginator.initNewData(data);
        this.table.initNewData(this.rowConfig, this.paginator.getCurrentPageData());
    };

    filterHandler = (data: MarketingItem[]): void => {
        this.paginator.initNewData(data);
        this.table.initNewData(this.rowConfig,  this.paginator.getCurrentPageData(), data);
    };
}