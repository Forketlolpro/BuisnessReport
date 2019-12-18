import {Table} from "../../src/controller/table";
import {DefaultTableView} from "../../src/views/table/table-view";
import {TableModel} from "../../src/models/table/table-model";
import {TestItem} from "../models/filter/test-item";
import {RowConfig, RowModelItem} from "../../src/models/table/row-model-item";
import {Listener} from "../../src/event-manager/interfaces";

let clickEventWork: boolean = false;

class TestListener implements Listener {
    update(event: string, data: TestItem[]): void {
        if (data.length === 10) {
            clickEventWork = true;
        }
    }
}


describe('Table controller', () => {
    let tableModel: TableModel<TestItem>;
    let tableView: DefaultTableView<TestItem>;
    let table: Table<TestItem>;
    let data: TestItem[] = [];
    let rowModel: RowConfig<TestItem>;
    let listener: Listener;

    beforeEach(() => {
        tableModel = new TableModel<TestItem>();
        tableView = new DefaultTableView<TestItem>('body');
        table = new Table<TestItem>(tableModel, tableView);
        listener = new TestListener();
        table.attach('tableChange',listener);
        rowModel = {
            age: new RowModelItem('Age', true),
            iq: new RowModelItem('iq', true)
        };
        data = [];
        for (let i = 0; i < 10; i++) {
            data.push(new TestItem())
        }
    });

    it('Test 1: Table controller - base test', () => {
        table.initNewData(rowModel, data, data);
        let elem = document.querySelector('[data-property=age]') as HTMLElement;
        elem.click();
        expect(clickEventWork).toBeTrue();
    });
});