import {FilterModel} from "../../../src/models/filter/filter-model";
import {FilterConfig, FilterConfigItem} from "../../../src/models/filter/filter-config-item";
import {TestItem} from "./test-item";

describe('Filter model calculateRange:', () => {
    let filter: FilterModel<TestItem>;
    let data: TestItem[] = [];
    let age: number[] = [];
    let iq: number[] = [];
    let testModel: FilterConfig;

    beforeEach(() => {
        filter = new FilterModel();
        data.length = 0;
        age.length = 0;
        iq.length = 0;
        testModel = {
            age: new FilterConfigItem('Age'),
            iq: new FilterConfigItem('iq')
        }
    });

    it('Test 1: calculateRange check correct calculate range results', () => {
        for (let i = 0; i < 1000; i++) {
            data.push(new TestItem())
        }
        filter.initNewData(data, testModel);
        data.forEach((item) => {
            age.push(item.age);
        });
        let filterModel = filter.getFilterModel();
        expect(filterModel.age.min).toEqual(Math.min(...age));
        expect(filterModel.age.max).toEqual(Math.max(...age));
        expect(filterModel.age.selectMin).toEqual(Math.min(...age));
        expect(filterModel.age.selectMax).toEqual(Math.max(...age));

    });

    it('Test 2: calculateRange check correct calculate range results with one elem', () => {
        data.push(new TestItem());
        filter.initNewData(data, testModel);
        data.forEach((item) => {
            iq.push(item.iq);
        });

        let filterModel = filter.getFilterModel();
        expect(filterModel.iq.min).toEqual(Math.min(...iq));
        expect(filterModel.iq.max).toEqual(Math.max(...iq));
        expect(filterModel.iq.selectMin).toEqual(Math.min(...iq));
        expect(filterModel.iq.selectMax).toEqual(Math.max(...iq));
    });

    it('Test 3: calculateRange check correct calculate range results with zero', () => {
        filter.initNewData(data, testModel);

        let filterModel = filter.getFilterModel();
        expect(filterModel.iq.min).toEqual(Number.MAX_SAFE_INTEGER);
        expect(filterModel.iq.max).toEqual(0);
    });
});