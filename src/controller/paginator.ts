import {PaginatorModel} from "../models/pagination/pagination-model";
import {PaginationView} from "../views/interfaces";
import {EventManager} from "../event-manager/event-manager";

export class Paginator<T> {
    view: PaginationView;
    model: PaginatorModel<T>;
    private eventManager: EventManager;

    constructor(pm: PaginatorModel<T>, pv: PaginationView, eventManager: EventManager) {
        this.eventManager = eventManager;
        this.view = pv;
        this.model = pm;
        this.subscribeToViewEvents();
    }

    get paginatorElement(): HTMLElement {
        return document.querySelector(this.view.selector);
    }

    subscribeToViewEvents(): void {
        this.paginatorElement.addEventListener('change', this.changeEventHandler);
        this.paginatorElement.addEventListener('click', this.clickEventHandler);
    }

    public getCurrentPageData(): T[] {
        return this.model.getDataOnCurrentPage()
    }

    public setView(view: PaginationView): void {
        this.view = view;
    }

    public setSelectValues(selectValues: number[]) {
        this.model.setSelectValues(selectValues)
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
        this.eventManager.notify('paginationChange', this.model.getDataOnCurrentPage());
    };

    private changeEventHandler = (e: Event) => {
        let elem = e.target as HTMLSelectElement;
        this.model.setItemsOnPage(+elem.value);
        this.view.render(this.model.getViewParam());
        this.eventManager.notify('paginationChange', this.model.getDataOnCurrentPage());
    };
}
