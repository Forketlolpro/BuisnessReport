import { FilterConfig } from "../filter/filter-config-item";
import {BaseModel} from "../base-model";

export enum FilterModelProperty {
    min = 'min',
    max = 'max',
    selectMin = 'selectMin',
    selectMax = 'selectMax',
}

export class FilterModel<T> extends BaseModel{
    private filteredData: T[];
    private data: T[];
    private filterModel: FilterConfig;

    constructor() {
        super()
    }

    initNewData(data: T[], model: FilterConfig):void {
        this.filterModel = model;
        this.data = data;
        this.calculateRange();
        this.filter();
    }

    public getFilteredData(): T[] {
        return this.filteredData;
    }

    public getFilterModel():FilterConfig {
        return this.filterModel;
    }

    public setFilterModelProperty(property: string, type: FilterModelProperty, value: number):void {
        this.filterModel[property][type] = value;
    }

    public getFilterModelValue(property: string, type: FilterModelProperty):number {
        return this.filterModel[property][type];
    }

    public resetFilter(property: string):void {
        this.filterModel[property].selectMin = this.filterModel[property].min;
        this.filterModel[property].selectMax = this.filterModel[property].max;
    }

    public filter():void {
        let self = this;
        this.filteredData = this.data.filter(item => {
            return Object.keys(this.filterModel).every(key => {
                return (item[key] <= self.filterModel[key].selectMax) && (item[key] >= self.filterModel[key].selectMin);
            });
        });
    };

    private calculateRange():void {
        this.data.forEach(item => {
            Object.keys(this.filterModel).forEach(key => {
                if (item[key] > this.filterModel[key].max) {
                    this.filterModel[key].max = item[key]
                }

                if (item[key] < this.filterModel[key].min) {
                    this.filterModel[key].min = item[key]
                }
            })
         });
         Object.keys(this.filterModel).forEach(key => {
            this.filterModel[key].max = Math.ceil(this.filterModel[key].max);
            this.filterModel[key].min = Math.floor(this.filterModel[key].min);
            this.filterModel[key].selectMax= this.filterModel[key].max;
            this.filterModel[key].selectMin = this.filterModel[key].min;
        })
    }
}
