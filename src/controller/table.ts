import { Controller } from "./controller"
import { TableModel } from "../models/table/table-model";
import { RowConfig } from "../models/table/row-model-item";
import {TableView} from "../views/interfaces";

export class Table<T> extends Controller {
    view: TableView<T>;
    model: TableModel<T>;

    constructor(model: TableModel<T>, view: TableView<T>) {
        super();
        this.model = model;
        this.view = view;
        document.querySelector(this.view.selector).addEventListener('click', this.clickEventHandler);
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
        if (elem.closest('thead') && elem.dataset["property"]) {
            this.model.setSortingModel(elem.dataset["property"]);
            this.notify('tableChange',this.model.getSorterData());
        }
    };
}