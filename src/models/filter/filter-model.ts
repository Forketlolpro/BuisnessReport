export enum FilterModelProperty {
    min = 'min',
    max = 'max',
    selectMin = 'selectMin',
    selectMax = 'selectMax',
}

export class FilterModel {
    private filteredData: [];
    private data: any;
    private filterModel: any;

    constructor() {
    }

    initNewData(data, model) {
        this.filterModel = model;
        this.data = data;
        this.calculateRange();
        this.filter();
    }

    public getFilteredData() {
        return this.filteredData;
    }

    public getFilterModel() {
        return this.filterModel;
    }

    public setFilterModelProperty(property: string, type: FilterModelProperty, value: number) {
        this.filterModel[property][type] = value;
    }

    public getFilterModelValue(property: string, type: FilterModelProperty) {
        type
        return this.filterModel[property][type];
    }

    public resetFilter(property: string) {
        this.filterModel[property].selectMin = this.filterModel[property].min;
        this.filterModel[property].selectMax = this.filterModel[property].max;
    }

    public filter() {
        let self = this;
        this.filteredData = this.data.filter(item => {
            return Object.keys(this.filterModel).every(key => {
                return (item[key] <= self.filterModel[key].selectMax) && (item[key] >= self.filterModel[key].selectMin);
            });
        });
    };

    private calculateRange() {
        this.data.forEach(item => {
            Object.keys(this.filterModel).forEach(key => {
                if (item[key] > this.filterModel[key].max) {
                    this.filterModel[key].max = item[key]
                }

                if (item[key] < this.filterModel[key].min) {
                    this.filterModel[key].min = item[key]
                }
            })
        })
    }
}
