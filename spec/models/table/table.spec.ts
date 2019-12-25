import {TableModel} from "../../../src/models/table/table-model";
import {TestItem} from "../filter/test-item";
import {RowConfig, RowModelItem} from "../../../src/models/table/row-model-item";
import {SortModel} from "../../../src/models/table/sort-model";

describe('TableModel', () => {
    describe('initNewData:', () => {
        let table: TableModel<TestItem>;
        let initData: any;

        beforeEach(() => {
            initData = initTableModel([{age: 10, iq: 100}, {age: 10, iq: 100}, {age: 10, iq: 100}, {age: 10, iq: 100}, {age: 10, iq: 100},], ['age', 'iq']);
            table = initData.table;
        });

        it( 'Should not change data after initialization', () => {
            table.initNewData(initData.rowModel, initData.data);
            expect(table.getSortModel() instanceof SortModel).toBeTrue();
            expect(table.getVisibleData().length).toEqual(5);
            expect(table.getHeaderModel().age.title).toEqual('age');
            expect(table.getHeaderModel().iq.sortable).toEqual(true);
        });

        it('Should trow error if set sort property on empty data', () => {
            table.initNewData(initData.rowModel, initData.data);
            expect(() => {
                table.setSortingModel('iq')
            }).toThrowError("Cannot read property 'sort' of undefined")
        });

        it('Should reset sort prop after init new data', () => {
            table.initNewData(initData.rowModel, initData.data, initData.data);
            expect(table.getSortModel().prop).toEqual('');
            expect(table.getSorterData().length).toEqual(5);
        });
    });

    describe('setSortingModel:', () => {
        let table: TableModel<TestItem>;
        let initData: any;
        beforeEach(() => {
            initData = initTableModel([{age: 10, iq: 100}, {age: 10, iq: 100}, {age: 10, iq: 100}, {age: 10, iq: 100}, {age: 10, iq: 100},], ['age', 'iq']);
            table = initData.table;
        });

        it('Should call switchSortDirection and set values of sort model correctly ', () => {
            spyOn<any>(table, 'switchSortDirection').and.callThrough();
            table.initNewData(initData.rowModel, initData.data, initData.data);
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

        it('Should call sort method', () => {
            spyOn(table, 'sort').and.callThrough();
            table.initNewData(initData.rowModel, initData.data, initData.data);
            table.setSortingModel('age');
            expect(table.sort).toHaveBeenCalled();
        });

        it('Should throw error if sort property is incorrect', () => {
            table.initNewData(initData.rowModel, initData.data, initData.data);
            expect(()=>table.setSortingModel('wrong param')).toThrowError('Incorrect sort key');
        });

        it('Should throw error if we pass an empty string', () => {
            table.initNewData(initData.rowModel, initData.data, initData.data);
            expect(()=>table.setSortingModel('')).toThrowError('Incorrect sort key');
        });
    });

    describe('sort:', () => {
        let table: TableModel<TestItem>;
        let initData: any;

        it('Should sort correctly in order: DESC ASC ORIGINAL', () => {
            initData = initTableModel([{age: 20, iq: 100}, {age: 10, iq: 100}, {age: 30, iq: 100}, {age: 400, iq: 100}, {age: 500, iq: 100},], ['age', 'iq']);
            table = initData.table;
            table.initNewData(initData.rowModel, initData.data, initData.data);
            table.setSortingModel('age');
            expect(table.getSorterData()[0].age).toEqual(500);

            table.setSortingModel('age');
            expect(table.getSorterData()[0].age).toEqual(10);

            table.setSortingModel('age');
            table.getSorterData();
            expect(table.getSorterData()[0].age).toEqual(initData.data[0].age)
        });

        it('Should throw error if data is empty', () => {
            initData = initTableModel([], ['age', 'iq']);
            table = initData.table;
            expect(()=>table.sort()).toThrow();
            table.initNewData(initData.rowModel, initData.data);
            expect(()=>table.sort()).toThrow();
        });

        it('Should correctly sorting data with one element', () => {
            initData = initTableModel([{age: 0, iq: 0}], ['age', 'iq']);
            table = initData.table;
            table.initNewData(initData.rowModel, initData.data, initData.data);
            table.setSortingModel('age');
            table.getSorterData();
            expect(table.getSorterData()[0].age).toEqual(initData.data[0].age)
        })
    });
});

function initTableModel(data: any[], rows: any[]): {data: TestItem[], table: TableModel<TestItem>, rowModel: RowConfig<TestItem>} {
    let table: TableModel<any> = new TableModel<TestItem>();
    let rowModel: RowConfig<any> = {};
    rows.forEach(row => rowModel[row] = new RowModelItem(row, true));

    return {
        data: data,
        table: table,
        rowModel: rowModel
    }
}
