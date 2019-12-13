import {Paginator} from "./controller/paginator";
import {PaginatorModel} from "./models/pagination/pagination-model";
import {DefaultPaginationView} from "./views/pagination/pagination-view";
import {get} from "./helpers/fetch";
import {Listener} from "./event-manager/interfaces";
import {ReportItem} from "./data-models/report-item";

export class App implements Listener {
    constructor() {
        let paginator = new Paginator<ReportItem>(new PaginatorModel(), new DefaultPaginationView('.pagination'));
        paginator.attach('pagiChange', this);
        paginator.initNewData(get('product'));
    }

    update(event: string, data: any): void {
        console.log(event);
        console.log(data);
    }
}