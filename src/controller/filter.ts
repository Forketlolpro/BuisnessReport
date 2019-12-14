import { Controller } from "./controller";
import { FilterModel, FilterModelProperty } from "../models/filter/filter-model";
import { DefaultFilterView } from "../views/filter/filter-view";

export class Filter extends Controller {
    model: FilterModel;
    view: DefaultFilterView;

    constructor(model: FilterModel, view: DefaultFilterView) {
        super();
        this.model = model;
        this.view = view;

        document.querySelector(this.view.selector).addEventListener('submit', this.submitEventHandler);
        document.querySelector(this.view.selector).addEventListener('click', this.clickEventHandler);
        document.querySelector(this.view.selector).addEventListener('keydown', this.keypressEventHandler);
        document.querySelector(this.view.selector).addEventListener('focusout', this.focusoutEventHandler);
    }

    public initNewData (data: any, filterModel: any) {
        this.model.initNewData(data, filterModel);
        this.view.render(this.model.getFilterModel());
    }

    private submitEventHandler = (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
        let elem = e.target as HTMLFormElement;
        for (let i = 0; i < elem.length - 1; i++) {
            if (e.target[i].dataset['use'] === 'Min') {
                this.model.setFilterModelProperty(e.target[i].dataset['property'], FilterModelProperty.selectMin ,+e.target[i].value);
            }
            if (e.target[i].dataset['use'] === 'Max') {
                this.model.setFilterModelProperty(e.target[i].dataset['property'], FilterModelProperty.selectMax ,+e.target[i].value);
            }
        }
        this.model.filter();
        this.notify('filterChange', this.model.getFilteredData());
    }

    private clickEventHandler = (e: Event) => {
        e.stopPropagation();
        let elem = e.target as HTMLElement;
        if (elem.className === 'resetFilter') {
            this.model.resetFilter(elem.dataset['property']);
            this.view.render(this.model.getFilterModel());
        }
    }

    private keypressEventHandler = (e: KeyboardEvent) => {
        if (e.code === 'Enter') {
            e.preventDefault();
        }
    };

    private focusoutEventHandler = (e) => {
        if (e.target.tagName === 'BUTTON') {
            return true;
        }
        let elem = e.target as HTMLInputElement;
        if (elem.value <= this.model.getFilterModelValue(elem.dataset['property'], FilterModelProperty.min)) {
            e.target.value = this.model.getFilterModelValue(elem.dataset['property'], FilterModelProperty.min);
        }
        if (elem.value >= this.model.getFilterModelValue(elem.dataset['property'], FilterModelProperty.max)) {
            e.target.value = this.model.getFilterModelValue(elem.dataset['property'], FilterModelProperty.max);
        }

        this.model.setFilterModelProperty(elem.dataset['property'], 'select' + elem.dataset['use'] as FilterModelProperty, +elem.value);
        this.view.render(this.model.getFilterModel());
    };
}