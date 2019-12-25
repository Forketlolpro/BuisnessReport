import { TableModel } from "../models/table/table-model";
import { RowConfig } from "../models/table/row-model-item";
import {TableView} from "../views/interfaces";
import {EventManager} from "../event-manager/event-manager";

export class Table<T> {
    view: TableView<T>;
    model: TableModel<T>;
    private eventManager: EventManager;

    constructor(model: TableModel<T>, view: TableView<T>, eventManager: EventManager) {
        this.eventManager = eventManager;
        this.model = model;
        this.view = view;
        this.subscribeToViewEvents();
    }

    get tableElement(): HTMLElement {
        return document.querySelector(this.view.selector);
    }

    subscribeToViewEvents(): void {
        this.tableElement.addEventListener('click', this.clickEventHandler);
    }

    public setView(view: TableView<T>): void {
        this.view = view;
    }

    public initNewData(rowConfig?: RowConfig<T>, body?: T[], originalData?: T[]): void {
        this.model.initNewData(rowConfig, body, originalData);
        this.view.render(this.model.getHeaderModel(), this.model.getVisibleData(), this.model.getSortModel());
    }

    private clickEventHandler = (e:MouseEvent): void => {
        e.stopPropagation();
        let elem = e.target as HTMLElement;
        if (elem.closest('thead') && elem.getAttribute("property")) {
            this.model.setSortingModel(elem.getAttribute("property"));
            this.eventManager.notify('tableChange', this.model.getSorterData());
        }
    };
}
