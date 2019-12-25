import {FilterModel, FilterModelProperty} from "../../../src/models/filter/filter-model";
import {FilterConfigItem} from "../../../src/models/filter/filter-config-item";

describe('FilterModel', () => {
    describe('filter:', () => {
        let filter: FilterModel<any[]>;
        let dataSample: any [];
        beforeEach(() => {
            dataSample = [{age: 10}, {age: 100}, {age: 30}, {age: 45}, {age: 90}, {age: 35}];
        });

        it('Should filter report data when min value is set', () => {
            filter = createFilterModel(dataSample, ['age']);
            filter.setFilterModelProperty('age', FilterModelProperty.selectMin, 50);
            filter.filter();
            let filteredData: any[] = filter.getFilteredData();
            expect(filteredData.some(item => item.iq < 50)).toEqual(false);
        });

        it('Should filter report data when max value is set', () => {
            filter = createFilterModel(dataSample, ['age']);
            filter.setFilterModelProperty('age', FilterModelProperty.selectMax, 30);
            filter.filter();
            let filteredData: any[] = filter.getFilteredData();
            expect(filteredData.some(item => item.iq < 30)).toEqual(false);
        });

        it('Should filter report data when min and value are set', () => {
            filter = createFilterModel(dataSample, ['age']);
            filter.setFilterModelProperty('age', FilterModelProperty.selectMin, 30);
            filter.setFilterModelProperty('age', FilterModelProperty.selectMax, 90);
            filter.filter();
            let filteredData: any[] = filter.getFilteredData();
            expect(filteredData.some(item => item.iq < 30 || item.iq > 90)).toEqual(false);
        });

        it('Should filter report data when min value is negative', () => {
            filter = createFilterModel(dataSample, ['age']);
            filter.setFilterModelProperty('age', FilterModelProperty.selectMin, -100);
            filter.setFilterModelProperty('age', FilterModelProperty.selectMax, 1000);
            filter.filter();
            let filteredData: any[] = filter.getFilteredData();
            expect(filteredData.length).toEqual(6);
        });

        it('Should filter and set empty array to filteredData when min is greater than max value', () => {
            filter = createFilterModel(dataSample, ['age']);
            filter.setFilterModelProperty('age', FilterModelProperty.selectMin, 100);
            filter.setFilterModelProperty('age', FilterModelProperty.selectMax, 10);
            filter.filter();
            let filteredData: any[] = filter.getFilteredData();
            expect(filteredData.length).toEqual(0);
        });

        it('Should correctly filter the empty dataset', () => {
            dataSample = [];
            filter = createFilterModel(dataSample, ['age']);
            filter.setFilterModelProperty('age', FilterModelProperty.selectMin, 200);
            filter.setFilterModelProperty('age', FilterModelProperty.selectMax, 150);
            filter.filter();
            let filteredData: any[] = filter.getFilteredData();
            expect(filteredData.length).toEqual(0);
        });

        it('Should filter report data when max and min values are equal', () => {
            filter = createFilterModel(dataSample, ['age']);
            filter.setFilterModelProperty('age', FilterModelProperty.selectMin, 30);
            filter.setFilterModelProperty('age', FilterModelProperty.selectMax, 30);
            filter.filter();
            let filteredData: any[] = filter.getFilteredData();
            expect(filteredData.length).toEqual(1);
        });
    });

    describe('calculateRange:', () => {
        let filter: FilterModel<any[]>;

        it('Should set correct min and max values for data set', () => {
            const dataSample = [{age: 10}, {age: 100}, {age: 30}, {age: 45}];
            filter = createFilterModel(dataSample, ['age']);
            const filterModel = filter.getFilterModel();
            expect(filterModel.age.min).toBe(10);
            expect(filterModel.age.max).toBe(100);
            expect(filterModel.age.selectMin).toBe(10);
            expect(filterModel.age.selectMax).toBe(100);
        });

        it('Should set correct min and max values for data set which contains only one item', () => {
            const dataSample = [{age: 50}];
            filter = createFilterModel(dataSample, ['age']);
            const filterModel = filter.getFilterModel();
            expect(filterModel.age.min).toBe(50);
            expect(filterModel.age.max).toBe(50);
            expect(filterModel.age.selectMin).toBe(50);
            expect(filterModel.age.selectMax).toBe(50);
        });

        it('Should set correct min and max values for an empty data set', () => {
            filter = createFilterModel([], ['age']);
            const filterModel = filter.getFilterModel();
            expect(filterModel.age.min).toBe(Number.MAX_SAFE_INTEGER);
            expect(filterModel.age.max).toBe(0);
            expect(filterModel.age.selectMin).toBe(Number.MAX_SAFE_INTEGER);
            expect(filterModel.age.selectMax).toBe(0);
        });
    });

    describe('initNewData:', () => {
        let filter: FilterModel<any[]>;

        it('Should work correctly after initialize data', () => {
            const filterModel = new FilterModel<any[]>();
            spyOn(filterModel, 'filter');
            spyOn<any>(filterModel, 'calculateRange').and.callThrough();
            const data: any [] = [{age: 10}, {age: 100}, {age: 30}, {age: 45}];
            filterModel.initNewData(data, {age: new FilterConfigItem('age')});
            expect(filterModel).not.toBeUndefined();
            expect(filterModel.getFilterModel().age).not.toBeUndefined();
            expect(filterModel.getFilterModel().age.max).toEqual(100);
            expect(filterModel.filter).toHaveBeenCalled();
            expect(filterModel['calculateRange']).toHaveBeenCalled();
        });
    });

    describe('resetFilter:', () => {
        let filter: FilterModel<any[]>;

        it('Should work correct after reset filters', () => {
            filter = createFilterModel([{age: 10}, {age: 100}, {age: 30}, {age: 45}], ['age']);
            const filterModel = filter.getFilterModel();
            filter.setFilterModelProperty('age', FilterModelProperty.selectMax, 50);
            filter.setFilterModelProperty('age', FilterModelProperty.selectMin, 20);
            expect(filter.getFilterModelValue('age', FilterModelProperty.selectMax)).toEqual(50);
            expect(filter.getFilterModelValue('age', FilterModelProperty.selectMin)).toEqual(20);
            filter.resetFilter('age');
            expect(filter.getFilterModelValue('age', FilterModelProperty.selectMax)).toEqual(100);
            expect(filter.getFilterModelValue('age', FilterModelProperty.selectMin)).toEqual(10);
        });

        it('Should throw an error if property is wrong', () => {
            filter = createFilterModel([{age: 10}, {age: 100}, {age: 30}, {age: 45}], ['age']);
            const filterModel = filter.getFilterModel();
            expect(() => {
                filter.resetFilter('iq')
            }).toThrow();
        });

        it('Should do nothing if filter model is in the default state', () => {
            filter = createFilterModel([{age: 10}, {age: 100}, {age: 30}, {age: 45}], ['age']);
            filter.resetFilter('age');
            expect(filter.getFilterModelValue('age', FilterModelProperty.selectMin)).toEqual(10);
            expect(filter.getFilterModelValue('age', FilterModelProperty.selectMax)).toEqual(100);
        });
    })
});

function createFilterModel(data: any[], filterProps: string[]) {
    const filterModel = new FilterModel<any[]>();
    const model = {};
    filterProps.forEach(prop => model[prop] = new FilterConfigItem(prop));
    filterModel.initNewData(data, model);
    return filterModel;
}
