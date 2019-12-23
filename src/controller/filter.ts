import { FilterModel, FilterModelProperty } from "../models/filter/filter-model";
import { FilterConfig } from "../models/filter/filter-config-item";
import {FilterView} from "../views/interfaces";
import {EventManager} from "../event-manager/event-manager";

export class Filter<T> {
    model: FilterModel<T>;
    view: FilterView;
    private eventManager: EventManager;

    constructor(model: FilterModel<T>, view: FilterView, eventManager: EventManager) {
        this.eventManager = eventManager;
        this.model = model;
        this.view = view;
        this.subscribeToViewEvents();
    }

    public initNewData (data: T[], filterModel: FilterConfig): void {
        this.model.initNewData(data, filterModel);
        this.view.render(this.model.getFilterModel());
    }

    get filterElement(): HTMLElement {
        return document.querySelector(this.view.selector);
    }

    get filterFieldElements(): NodeListOf<HTMLInputElement> {
        return this.filterElement.querySelectorAll(this.view.getInputSelector());
    }

    subscribeToViewEvents(): void {
        this.filterElement.addEventListener('submit', this.submitEventHandler);
        this.filterElement.addEventListener('click', this.clickEventHandler);
        this.filterElement.addEventListener('keydown', this.keypressEventHandler);
        this.filterElement.addEventListener('focusout', this.focusoutEventHandler);
    }

    private submitEventHandler = (e: Event):void => {
        e.preventDefault();
        e.stopPropagation();
        this.filterFieldElements.forEach(input => {
            this.model.setFilterModelProperty(input.getAttribute('property'), input.getAttribute('use') as FilterModelProperty ,+input.value);
        });
        this.model.filter();
        this.eventManager.notify('filterChange', this.model.getFilteredData());
    };

    private clickEventHandler = (e: Event):void => {
        e.stopPropagation();
        let elem = e.target as HTMLElement;
        if (elem.className === 'resetFilter') {
            this.model.resetFilter(elem.getAttribute('property'));
            this.view.render(this.model.getFilterModel());
        }
    };

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
        this.model.setFilterModelProperty(elem.getAttribute('property'), elem.getAttribute('use') as FilterModelProperty, +elem.value);
        elem.value = this.model.getFilterModelValue(elem.getAttribute('property'), elem.getAttribute('use') as FilterModelProperty).toString();
        this.view.render(this.model.getFilterModel());
    };
}
