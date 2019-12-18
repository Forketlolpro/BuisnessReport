import {TableModel} from "../../../src/models/table/table-model";
import {TestItem} from "../filter/test-item";
import {RowConfig, RowModelItem} from "../../../src/models/table/row-model-item";
import {SortModel} from "../../../src/models/table/sort-model";

describe('Table model - setSortingModel test:', () => {
    let table: TableModel<TestItem>;
    let data: TestItem[] = [];
    let rowModel: RowConfig<TestItem>;

    beforeEach(() => {
        table = new TableModel<TestItem>();
        rowModel = {
            age: new RowModelItem('Age', true),
            iq: new RowModelItem('iq', true)
        };
        data = [];
        for (let i = 0; i < 10; i++) {
            data.push(new TestItem())
        }
    });

    it('Test 1: Simple scenario', () => {
        spyOn<any>(table, 'switchSortDirection').and.callThrough();
        table.initNewData(rowModel, data, data);
        expect(table.getSortModel().direction).toBeNull();
        table.setSortingModel('age');
        expect(table.getSortModel().prop).toEqual('age');
        expect(table.getSortModel().direction).toEqual('desc');
        table.setSortingModel('age');
        expect(table.getSortModel().direction).toEqual('asc');
        table.setSortingModel('iq');
        expect(table.getSortModel().direction).toEqual('desc');
        expect(table['switchSortDirection']).toHaveBeenCalledTimes(1);
    });

    it('Test 2: Set wrong param', () => {
        table.initNewData(rowModel, data, data);
        expect(()=>table.setSortingModel('wrong param')).toThrowError('Incorrect sort key');
    });

    it('Test 3: Set empty string', () => {
        table.initNewData(rowModel, data, data);
        expect(()=>table.setSortingModel('')).toThrowError('Incorrect sort key');
    });
});