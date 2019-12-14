import {Paginator} from "./controller/paginator";
import {PaginatorModel} from "./models/pagination/pagination-model";
import {DefaultPaginationView} from "./views/pagination/pagination-view";
import {get} from "./helpers/fetch";
import {Listener} from "./event-manager/interfaces";
import {ReportItem} from "./data-models/report-item";
import { Filter } from "./controller/filter";
import { FilterModel } from "./models/filter/filter-model";
import { DefaultFilterView } from "./views/filter/filter-view";
import { FilterConfigItem } from './models/filter/filter-config-item';

export class App implements Listener {
    constructor() {
        let paginator = new Paginator<ReportItem>(new PaginatorModel(), new DefaultPaginationView('.pagination'));
        paginator.attach('pagiChange', this);
        paginator.initNewData(get('product'));

        let filterConfig = {
            displays: new FilterConfigItem('Displays'),
            orders: new FilterConfigItem('Purchases'),
            clicks: new FilterConfigItem('Clicks '),
            abandonedUnits: new FilterConfigItem('Abandoned Units'),
            soldUnits: new FilterConfigItem('Sold units'),
            revenue: new FilterConfigItem('Revenue'),
            profit: new FilterConfigItem('Profit')
        };

        let filter = new Filter(new FilterModel(), new DefaultFilterView('.filter'));
        filter.attach('filterChange', this);
        filter.initNewData(get('product'), filterConfig);
    }

    update(event: string, data: any): void {
        console.log(event);
        console.log(data);
    }
}