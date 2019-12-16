import { Controller } from "./controller";
import { FilterModel, FilterModelProperty } from "../models/filter/filter-model";
import { FilterConfig } from "../models/filter/filter-config-item";
import {FilterView} from "../views/interfaces";

export class Filter<T> extends Controller {
    model: FilterModel<T>;
    view: FilterView;

    constructor(model: FilterModel<T>, view: FilterView) {
        super();
        this.model = model;
        this.view = view;

        document.querySelector(this.view.selector).addEventListener('submit', this.submitEventHandler);
        document.querySelector(this.view.selector).addEventListener('click', this.clickEventHandler);
        document.querySelector(this.view.selector).addEventListener('keydown', this.keypressEventHandler);
        document.querySelector(this.view.selector).addEventListener('focusout', this.focusoutEventHandler);
    }

    public initNewData (data: T[], filterModel: FilterConfig): void {
        this.model.initNewData(data, filterModel);
        this.view.render(this.model.getFilterModel());
    }

    private submitEventHandler = (e: Event):void => {
        e.preventDefault();
        e.stopPropagation();
        let elem = e.target as HTMLFormElement;
        for (let i = 0; i < elem.length - 1; i++) {
            let input = elem[i] as HTMLInputElement; 
            this.model.setFilterModelProperty(input.dataset['property'], input.dataset['use'] as FilterModelProperty ,+input.value);
        }
        this.model.filter();
        this.notify('filterChange', this.model.getFilteredData());
    }

    private clickEventHandler = (e: Event):void => {
        e.stopPropagation();
        let elem = e.target as HTMLElement;
        if (elem.className === 'resetFilter') {
            this.model.resetFilter(elem.dataset['property']);
            this.view.render(this.model.getFilterModel());
        }
    }

    private keypressEventHandler = (e: KeyboardEvent): void => {
        if (e.code === 'Enter') {
            e.preventDefault();
        }
    };

    private focusoutEventHandler = (e: Event): boolean => {
        let elem = e.target as HTMLInputElement;
        if (elem.tagName === 'BUTTON') {
            return true;
        }
        if (+elem.value <= this.model.getFilterModelValue(elem.dataset['property'], FilterModelProperty.min)) {
            elem.value = this.model.getFilterModelValue(elem.dataset['property'], FilterModelProperty.min).toString();
        }
        if (+elem.value >= this.model.getFilterModelValue(elem.dataset['property'], FilterModelProperty.max)) {
            elem.value = this.model.getFilterModelValue(elem.dataset['property'], FilterModelProperty.max).toString();
        }

        this.model.setFilterModelProperty(elem.dataset['property'], elem.dataset['use'] as FilterModelProperty, +elem.value);
        this.view.render(this.model.getFilterModel());
    };
}