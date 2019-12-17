import {FilterModel, FilterModelProperty} from "../../../src/models/filter/filter-model";
import {TestItem} from "./test-item";
import {FilterConfig, FilterConfigItem} from "../../../src/models/filter/filter-config-item";

describe('Filter model - filter method:', () => {
    let filter: FilterModel<TestItem>;
    let data: TestItem[] = [];
    let testModel: FilterConfig;

    beforeEach(() => {
        filter = new FilterModel();
        data = [];
        testModel = {
            age: new FilterConfigItem('Age'),
            iq: new FilterConfigItem('iq')
        };
        for (let i = 0; i < 1000; i++) {
            data.push(new TestItem());
        }
        filter.initNewData(data, testModel);
    });

    it('Test 1: simple one side filtering', () => {
        filter.setFilterModelProperty('iq', FilterModelProperty.selectMin, 150);
        filter.filter();
        let filtredData: TestItem[] = filter.getFilteredData();
        expect(filtredData.some(item => item.iq < 150)).toEqual(false);
    });

    it('Test 2: simple two side filtering', () => {
        filter.setFilterModelProperty('iq', FilterModelProperty.selectMin, 150);
        filter.setFilterModelProperty('iq', FilterModelProperty.selectMax, 200);
        filter.filter();
        let filtredData: TestItem[] = filter.getFilteredData();
        expect(filtredData.some(item => item.iq < 150 || item.iq > 200)).toEqual(false);
    });

    it('Test 3: two side filtering with negative value', () => {
        filter.setFilterModelProperty('iq', FilterModelProperty.selectMin, -100);
        filter.setFilterModelProperty('iq', FilterModelProperty.selectMax, 1000);
        filter.filter();
        let filtredData: TestItem[] = filter.getFilteredData();
        expect(filtredData.length).toEqual(1000);
    });
    it('Test 3: if the minimum and maximum values are reversed', () => {
        filter.setFilterModelProperty('iq', FilterModelProperty.selectMin, 200);
        filter.setFilterModelProperty('iq', FilterModelProperty.selectMax, 150);
        filter.filter();
        let filtredData: TestItem[] = filter.getFilteredData();
        expect(filtredData.length).toEqual(0);
    });
});