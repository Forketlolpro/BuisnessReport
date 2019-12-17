import {FilterModel} from "../../../src/models/filter/filter-model";
import {FilterConfigItem} from "../../../src/models/filter/filter-config-item";
import {TestItem} from "./test-item";

describe('Filter model initialize test:', () => {
    let filter: FilterModel<TestItem>;
    let data: TestItem[] = [];
    let testModel = {
        age: new FilterConfigItem('Age'),
        iq: new FilterConfigItem('iq')
    };

    beforeEach(() => {
        filter = new FilterModel();
        data.push(new TestItem(), new TestItem(), new TestItem(), new TestItem())
    });

    it('Test 1: Constructor', () => {
        expect(filter.initNewData).toBeDefined();
        expect(filter.getFilteredData).toBeDefined();
        expect(filter.getFilterModel).toBeDefined();
        expect(filter.setFilterModelProperty).toBeDefined();
        expect(filter.getFilterModelValue).toBeDefined();
        expect(filter.resetFilter).toBeDefined();
        expect(filter.filter).toBeDefined();
    });

    it('Test 2: Simple init', () => {
        filter.initNewData(data, testModel);
        expect(filter.getFilterModel()).not.toBeUndefined();
        expect(filter.getFilterModel().iq).not.toBeUndefined();
        expect(filter.getFilterModel().iq.max).toBeGreaterThan(0);
    });
});