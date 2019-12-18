import {TableModel} from "../../../src/models/table/table-model";
import {TestItem} from "../filter/test-item";
import {RowConfig, RowModelItem} from "../../../src/models/table/row-model-item";
import {SortModel} from "../../../src/models/table/sort-model";

describe('Table model - initialize test:', () => {
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

    it('Test 1: Constructor', () => {
        expect(table.getSortModel() instanceof SortModel).toBeTrue();
    });
    it('Test 2: Init new data', () => {
        table.initNewData(rowModel, data);
        expect(table.getVisibleData().length).toEqual(10);
        expect(table.getHeaderModel().age.title).toEqual('Age');
        expect(table.getHeaderModel().iq.sortable).toEqual(true);
    });

    it('Test 3: Init new data and change sorting prop', () => {
        table.initNewData(rowModel, data);
        expect(() => {
            table.setSortingModel('iq')
        }).toThrowError("Cannot read property 'sort' of undefined")
    });

    it('Test 4: Init new data with original data', () => {
        table.initNewData(rowModel, data, data);
        expect(table.getSortModel().prop).toEqual('');
        expect(table.getSorterData().length).toEqual(10);
    });
});