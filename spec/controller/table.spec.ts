import {Table} from "../../src/controller/table";
import {DefaultTableView} from "../../src/views/table/table-view";
import {TableModel} from "../../src/models/table/table-model";
import {TestItem} from "../models/filter/test-item";
import {RowConfig, RowModelItem} from "../../src/models/table/row-model-item";
import {EventManager} from "../../src/event-manager/event-manager";

let clickEventWork: boolean = false;
let callback = (data: TestItem[]): void => {
    if (data.length === 10) {
        clickEventWork = true;
    }
};

describe('Table', () => {
    let tableModel: TableModel<TestItem>;
    let tableView: DefaultTableView<TestItem>;
    let table: Table<TestItem>;
    let data: TestItem[] = [];
    let rowModel: RowConfig<TestItem>;
    let eventManager: EventManager;

    beforeEach(() => {
        eventManager = new EventManager();
        tableModel = new TableModel<TestItem>();
        tableView = new DefaultTableView<TestItem>('body');
        table = new Table<TestItem>(tableModel, tableView, eventManager);
        eventManager.attach('tableChange', callback);
        rowModel = {
            age: new RowModelItem('Age', true),
            iq: new RowModelItem('iq', true)
        };
        data = [];
        for (let i = 0; i < 10; i++) {
            data.push(new TestItem())
        }
    });

    describe('clickEventHandler:', () => {
        it('Should click on sorting button notify outer listener', () => {
            table.initNewData(rowModel, data, data);
            let elem = document.querySelector('[property=age]') as HTMLElement;
            elem.click();
            expect(clickEventWork).toBeTrue();
        });
    });
});
