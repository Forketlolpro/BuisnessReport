import { Controller } from "./controller"
import { DefaultTableView } from "../views/table/table-view"
import { TableModel } from "../models/table/table-model";
import { RowConfig } from "../models/table/header-model-item";

export class Table<T> extends Controller {
    view: DefaultTableView<T>;
    model: TableModel<T>;

    constructor(model: TableModel<T>, view: DefaultTableView<T>) {
        super();
        this.model = model;
        this.view = view;
        document.querySelector(this.view.selector).addEventListener('click', this.clickEventHandler);
    }

    public setView(view: DefaultTableView<T>): void {
        this.view = view;
    }

    public initNewData(rowConfig?: RowConfig, body?: T[], originalData?: T[]): void {
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