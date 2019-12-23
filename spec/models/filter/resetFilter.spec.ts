import {FilterModel, FilterModelProperty} from "../../../src/models/filter/filter-model";
import {TestItem} from "./test-item";
import {FilterConfig, FilterConfigItem} from "../../../src/models/filter/filter-config-item";

describe('Filter model - resetFilter:', () => {
    let filter: FilterModel<TestItem>;
    let data: TestItem[] = [];
    let testModel: FilterConfig;
    let iqs: number [] = [];

    beforeEach(() => {
        filter = new FilterModel();
        data = [new TestItem(), new TestItem(), new TestItem()];
        testModel = {
            age: new FilterConfigItem('Age'),
            iq: new FilterConfigItem('iq')
        };
        data.forEach(i => iqs.push(i.iq));
    });

    it('Test 1: Base test', () => {
        filter.initNewData(data, testModel);
        filter.setFilterModelProperty('iq', FilterModelProperty.selectMax, Math.max(...iqs));
        filter.setFilterModelProperty('iq', FilterModelProperty.selectMin, Math.min(...iqs));
        expect(filter.getFilterModelValue('iq', FilterModelProperty.selectMax)).toEqual(Math.max(...iqs));
        expect(filter.getFilterModelValue('iq', FilterModelProperty.selectMin)).toEqual(Math.min(...iqs));
        filter.resetFilter('iq');
        expect(filter.getFilterModelValue('iq', FilterModelProperty.selectMax)).toEqual(Math.max(...iqs));
        expect(filter.getFilterModelValue('iq', FilterModelProperty.selectMin)).toEqual(Math.min(...iqs));
    });
});
