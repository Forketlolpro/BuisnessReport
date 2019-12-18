import {TableModel} from "../../../src/models/table/table-model";
import {TestItem} from "../filter/test-item";
import {RowConfig, RowModelItem} from "../../../src/models/table/row-model-item";

describe('Table model - sort test:', () => {
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
        let sortedArray: number[] = [];
        table.initNewData(rowModel, data, data);
        table.setSortingModel('age');
        table.getSorterData().forEach(item => sortedArray.push(item.age));
        expect(sortedArray.slice(1).every((item, i) => sortedArray[i] >= item)).toBeTrue();

        sortedArray = [];
        table.setSortingModel('age');
        table.getSorterData().forEach(item => sortedArray.push(item.age));
        expect(sortedArray.slice(1).every((item, i) => sortedArray[i] <= item)).toBeTrue();

        sortedArray = [];
        table.setSortingModel('age');
        table.getSorterData();
        expect(table.getSorterData()[0].age).toEqual(data[0].age)
    });

    it('Test 2: Sorting without data', () => {
        expect(()=>table.sort()).toThrow();
        table.initNewData(rowModel, data);
        expect(()=>table.sort()).toThrow();
    });
});