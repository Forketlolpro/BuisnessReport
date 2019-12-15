import {Paginator} from "../controller/paginator";
import {PaginatorModel} from "../models/pagination/pagination-model";
import {DefaultPaginationView} from "../views/pagination/pagination-view";
import {get} from "../helpers/fetch";
import {Listener} from "../event-manager/interfaces";
import {MarketingItem } from "../data-models/report-item";
import { Filter } from "../controller/filter";
import { FilterModel } from "../models/filter/filter-model";
import { DefaultFilterView } from "../views/filter/filter-view";
import { FilterConfigItem, FilterConfig } from '../models/filter/filter-config-item';
import { Table } from "../controller/table";
import { TableModel } from "../models/table/table-model";
import { DefaultTableView } from "../views/table/table-view";
import { HeaderModelItem, RowConfig } from "../models/table/header-model-item";

export class MarketingTable implements Listener {
    paginator: Paginator<MarketingItem>;
    filter: Filter<MarketingItem>;
    table: Table<MarketingItem>;
    rowConfig: RowConfig;

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
            displayName: new HeaderModelItem('Display name', false),
            path: new HeaderModelItem('Path', false),
            displays: new HeaderModelItem('Displays', true),
            clicks: new HeaderModelItem('Clicks', true),
            orders: new HeaderModelItem('Purchase', true),
            addToCarts: new HeaderModelItem('Add to cart', true),
            units: new HeaderModelItem('Sold units', true),
            revenue: new HeaderModelItem('Revenue', true, (value: string) => `${Math.round(+value)}$`),
            profit: new HeaderModelItem('Profit', true, (value: string) => `${Math.round(+value)}$`)
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