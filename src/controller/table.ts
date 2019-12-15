import { Controller } from "./controller"
import { DefaultTableView } from "../views/table/table-view"
import { TableModel } from "../models/table/table-model";

export class Table extends Controller {
    view: DefaultTableView;
    model: TableModel;

    constructor(model: TableModel, view: DefaultTableView) {
        super();
        this.model = model;
        this.view = view;
        document.querySelector(this.view.selector).addEventListener('click', this.clickEventHandler);
    }

    public setView(view: DefaultTableView): void {
        this.view = view;
    }

    public initNewData(headerModel?, body?, originalData?) {
        this.model.initNewData(headerModel, body, originalData);
        this.view.render(this.model.getHeaderModel(), this.model.getVisibleData(), this.model.getSortModel());
    }

    private clickEventHandler = (e:MouseEvent) => {
        e.stopPropagation();
        let elem = e.target as HTMLElement;
        if (elem.closest('thead') && elem.dataset["property"]) {
            this.model.setSortingModel(elem.dataset["property"]);
            this.notify('tableChange',this.model.getSorterData());
        }
    };
}