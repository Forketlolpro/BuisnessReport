import {FilterConfig} from "./filter-config-item";
import {BaseModel} from "../base-model";

export enum FilterModelProperty {
    min = 'min',
    max = 'max',
    selectMin = 'selectMin',
    selectMax = 'selectMax',
}

export class FilterModel<T> extends BaseModel {
    private filteredData: T[];
    private data: T[];
    private filterConfig: FilterConfig;

    constructor() {
        super()
    }

    initNewData(data: T[], model: FilterConfig): void {
        this.filterConfig = model;
        this.data = data;
        this.calculateRange();
        this.filter();
    }

    public getFilteredData(): T[] {
        return this.filteredData;
    }

    public getFilterModel(): FilterConfig {
        return this.filterConfig;
    }

    public setFilterModelProperty(property: string, type: FilterModelProperty, value: number): void {
        this.filterConfig[property][type] = value;
    }

    public getFilterModelValue(property: string, type: FilterModelProperty): number {
        return this.filterConfig[property][type];
    }

    public resetFilter(property: string): void {
        this.filterConfig[property].selectMin = this.filterConfig[property].min;
        this.filterConfig[property].selectMax = this.filterConfig[property].max;
    }

    public filter(): void {
        let self = this;
        this.filteredData = this.data.filter(item => {
            return Object.keys(this.filterConfig).every(key => {
                return (item[key] <= self.filterConfig[key].selectMax) && (item[key] >= self.filterConfig[key].selectMin);
            });
        });
    };

    private calculateRange(): void {
        this.data.forEach(item => {
            Object.keys(this.filterConfig).forEach(key => {
                if (item[key] > this.filterConfig[key].max) {
                    this.filterConfig[key].max = item[key]
                }

                if (item[key] < this.filterConfig[key].min) {
                    this.filterConfig[key].min = item[key]
                }
            })
        });
        Object.keys(this.filterConfig).forEach(key => {
            this.filterConfig[key].max = Math.ceil(this.filterConfig[key].max);
            this.filterConfig[key].min = Math.floor(this.filterConfig[key].min);
            this.filterConfig[key].selectMax = this.filterConfig[key].max;
            this.filterConfig[key].selectMin = this.filterConfig[key].min;
        })
    }
}
