import {PaginatorModel} from "../models/pagination/pagination-model";
import {PaginationView} from "../views/interfaces";
import {EventManager} from "../event-manager/event-manager";

export class Paginator<T> extends EventManager {
    view: PaginationView;
    model: PaginatorModel<T>;

    constructor(pm: PaginatorModel<T>, pv: PaginationView) {
        super();
        this.view = pv;
        this.model = pm;
        document.querySelector(this.view.selector).addEventListener('change', this.changeEventHandler);
        document.querySelector(this.view.selector).addEventListener('click', this.clickEventHandler);
    }

    public getCurrentPageData(): T[] {
        return this.model.getDataOnCurrentPage()
    }

    public setView(view: PaginationView): void {
        this.view = view;
    }

    public initNewData(data: T[]): void {
        this.model.initNewData(data);
        this.view.render(this.model.getViewParam())
    }

    private clickEventHandler = (e: Event) => {
        e.stopPropagation();
        let elem = e.target as HTMLElement;
        if (!elem.closest('.number') || elem.className) {
            return false;
        }
        this.model.setSelectPage(+elem.innerHTML);
        this.view.render(this.model.getViewParam());
        this.notify('pagiChange', this.model.getDataOnCurrentPage());
    };

    private changeEventHandler = (e: Event) => {
        let elem = e.target as HTMLSelectElement;
        this.model.setItemsOnPage(+elem.value);
        this.view.render(this.model.getViewParam());
        this.notify('pagiChange', this.model.getDataOnCurrentPage());
    };
}