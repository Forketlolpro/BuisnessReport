import {SortModel} from "./sort-model";
import {TableView} from "../../views/interfaces";
import {EventManager} from "../../event-manager/interfaces";
import {ReportItem} from "../../data-models/report-item";
import {sortFunc} from "../../helpers/sort-func";


export class TableModel {
    private view: TableView<ReportItem>;
    private data: [];
    private visibleData: Array<any>;
    private headerModel: object;
    private sortingModel: SortModel;
    public sortedData: any[];
    private eventManager: EventManager;

    constructor(view: TableView<ReportItem> , eventManager: EventManager) {
        this.eventManager = eventManager;
        this.view = view;
        this.sortingModel = new SortModel();
        document.querySelector(this.view.selector).addEventListener('click', this.clickEventHandler);
    }

    updateData(headerModel, body) {
        this.headerModel = headerModel;
        this.visibleData = body;
        this.show();
    }

    updateOriginalData(data) {
        this.data = data;
        this.sortedData = [...data];
        this.sortingModel.prop = '';
    }

    clickEventHandler = (e) => {
        e.stopPropagation();
        if (e.target.closest('thead') && e.target.dataset["property"]) {
            let elem = e.target;
            this.setSortingModel(elem.dataset["property"]);
            this.sort();
            this.eventManager.notify('tableSortChange', this.sortedData);
        }
    };

    setSortingModel(key) {
        if (key !== this.sortingModel.prop) {
            this.sortingModel.prop = key;
            this.sortingModel.direction = 'desc';
        } else {
            this.switchSortDirection()
        }
    }

    switchSortDirection() {
        if (!this.sortingModel.direction) {
            this.sortingModel.direction = 'desc';
        } else if (this.sortingModel.direction === 'desc') {
            this.sortingModel.direction = 'asc'
        } else {
            this.sortingModel.direction = null;
        }
    }

    sort() {
        if (this.sortingModel.direction) {
            this.sortedData.sort(sortFunc(this.sortingModel.prop, this.sortingModel.direction));
        }
        if (this.sortingModel.direction === null) {
            this.sortedData = [...this.data];
        }
    }

    show(): void {
        this.view.render(this.headerModel, this.visibleData, this.sortingModel);
    }
}
