import {TableModel} from "../../../src/models/table/table-model";
import {TestItem} from "../filter/test-item";
import {RowConfig, RowModelItem} from "../../../src/models/table/row-model-item";

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

    it('Test 1: Init new data', () => {
        table.initNewData(rowModel, data);
        expect(table.getVisibleData().length).toEqual(10);
        expect(table.getHeaderModel().age.title).toEqual('Age');
        expect(table.getHeaderModel().iq.sortable).toEqual(true);
    });
});