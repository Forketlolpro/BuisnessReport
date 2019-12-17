import {FilterModel, FilterModelProperty} from "../../../src/models/filter/filter-model";
import {TestItem} from "./test-item";
import {FilterConfig, FilterConfigItem} from "../../../src/models/filter/filter-config-item";

describe('Filter model - resetFilter:', () => {
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
    });

    it('Test 1: Base test', () => {
        filter.initNewData(data, testModel);
        filter.setFilterModelProperty('iq', FilterModelProperty.selectMax, 777);
        filter.setFilterModelProperty('iq', FilterModelProperty.selectMin, 666);
        expect(filter.getFilterModelValue('iq', FilterModelProperty.selectMax)).toEqual(777);
        expect(filter.getFilterModelValue('iq', FilterModelProperty.selectMin)).toEqual(666);
        filter.resetFilter('iq');
        expect(filter.getFilterModelValue('iq', FilterModelProperty.selectMax)).toEqual(0);
        expect(filter.getFilterModelValue('iq', FilterModelProperty.selectMin)).toEqual(Number.MAX_SAFE_INTEGER);
    });
});