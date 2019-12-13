import {PaginationView} from "../../views/interfaces";
import {PaginationViewParam} from "../../views/pagination/pagination-view-param";
import {EventManager} from "../../event-manager/interfaces";


export class PaginatorModel {
    public currentPageData: any[];
    private data: any[];
    private viewParam: PaginationViewParam;
    private view: PaginationView;
    private eventManager: EventManager;

    constructor(view: PaginationView, eventManager: EventManager) {
        this.eventManager = eventManager;
        this.view = view;
        this.viewParam = new PaginationViewParam();
        this.viewParam.itemsOnPage = 10;
        document.querySelector(this.view.selector).addEventListener('change', this.changeEventHandler);
        document.querySelector(this.view.selector).addEventListener('click', this.clickEventHandler);
    }

    initialize(data): void {
        this.data = data;
        this.viewParam.pagesTotal = Math.ceil(this.data.length / this.viewParam.itemsOnPage);
        this.viewParam.currentPage = 1;
        this.viewParam.itemCount = data.length;
        this.takeCurrentPageElement();
        this.view.render(this.viewParam);
    }

    private changeEventHandler = (e) => {
        this.viewParam.itemsOnPage = e.target.value;
        this.viewParam.pagesTotal = Math.ceil(this.data.length / this.viewParam.itemsOnPage);
        this.viewParam.currentPage = 1;
        this.takeCurrentPageElement();
        this.view.render(this.viewParam);
        this.eventManager.notify('paginationChange', this.currentPageData);
    };

    private clickEventHandler = (e: any) => {
        e.stopPropagation();
        if (!e.target.closest('.number') || e.target.className) {
            return false;
        }
        this.viewParam.currentPage = +e.target.innerHTML;
        this.takeCurrentPageElement();
        this.view.render(this.viewParam);
        this.eventManager.notify('paginationChange', this.currentPageData);
    };

    private takeCurrentPageElement() {
        this.currentPageData = this.data.slice((this.viewParam.currentPage - 1) * this.viewParam.itemsOnPage, (this.viewParam.currentPage) * this.viewParam.itemsOnPage);
    }
}
