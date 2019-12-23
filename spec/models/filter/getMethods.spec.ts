import {FilterModel, FilterModelProperty} from "../../../src/models/filter/filter-model";
import {FilterConfig, FilterConfigItem} from "../../../src/models/filter/filter-config-item";
import {TestItem} from "./test-item";

describe('Filter model - get methods:', () => {
    let filter: FilterModel<TestItem>;
    let data: TestItem[] = [];
    let testModel: FilterConfig;

    beforeEach(() => {
        testModel = {
            age: new FilterConfigItem('Age'),
            iq: new FilterConfigItem('iq')
        };
        filter = new FilterModel();
        for (let i = 0; i < 3; i++) {
            data.push(new TestItem())
        }
    });

    afterEach(() => {
        data = [];
    });

    it('Test 1: getFilterModel', () => {
        filter.initNewData(data, testModel);
        expect(filter.getFilterModel()).not.toBeUndefined();
        expect(filter.getFilterModel()).not.toBeNull();
        expect(filter.getFilterModel()).toEqual(testModel)
    });

    it('Test 2: getFilteredData after init', () => {
        filter.initNewData(data, testModel);
        expect(filter.getFilteredData().length).toEqual(3)
    });


    it('Test 3: getFilteredData after select maxValue', () => {
        filter.initNewData(data, testModel);
        filter.setFilterModelProperty('iq' , FilterModelProperty.selectMax, 0);
        filter.filter();
        expect(filter.getFilteredData().length).toEqual(3)
    });

    it('Test 4: getFilterModelValue get max value by prop', () => {
        filter.initNewData(data, testModel);
        let iqs: number [] = [];
        data.forEach((item) => {
            iqs.push(item.iq);
        });
        expect(filter.getFilterModelValue('iq',  FilterModelProperty.max)).toEqual(Math.max(...iqs))
    });

    it('Test 5: getFilterModelValue get min value by prop', () => {
        filter.initNewData(data, testModel);
        let age: number [] = [];
        data.forEach((item) => {
            age.push(item.age);
        });
        expect(filter.getFilterModelValue('age',  FilterModelProperty.min)).toEqual(Math.min(...age))
    });
});
