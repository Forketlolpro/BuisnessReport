import {ReportTable} from "./components/report-table";
import {productCollumConfig, productFilterConfig, ReportItem} from "./data-models/report-item";
import {marketingCollumConfig, marketingFilterConfig, MarketingItem} from "./data-models/marketing-item";
import {DefaultTableView} from "./views/table/table-view";
import {DefaultPaginationView} from "./views/pagination/pagination-view";
import {DefaultFilterView} from "./views/filter/filter-view";
import {get} from "./helpers/fetch";

export class App {
    productTable: ReportTable<ReportItem>;
    marketingTable: ReportTable<MarketingItem>;

    constructor() {}

    run() {
        this.productTable = new ReportTable<ReportItem>(
            get('product'),
            new DefaultTableView('.product-table .table'),
            new DefaultPaginationView('.product-table .pagination'),
            new DefaultFilterView('.product-table .filter'),
            productFilterConfig,
            productCollumConfig
        );
        this.marketingTable = new ReportTable<MarketingItem>(
            get('marketing'),
            new DefaultTableView('.marketing-table .table'),
            new DefaultPaginationView('.marketing-table .pagination'),
            new DefaultFilterView('.marketing-table .filter'),
            marketingFilterConfig,
            marketingCollumConfig
        );
    }
}