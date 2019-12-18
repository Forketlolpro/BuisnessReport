import {Paginator} from "../../src/controller/paginator";
import {TestItem} from "../models/filter/test-item";
import {DefaultPaginationView} from "../../src/views/pagination/pagination-view";
import {PaginatorModel} from "../../src/models/pagination/pagination-model";
import {Listener} from "../../src/event-manager/interfaces";

describe('Pagination controller', () => {
    //вот тут так себе конечно(
    class TestListenerClick implements Listener {
        update(event: string, dataFromPagi: TestItem[]): void {
            let lastTenElem = data.slice(990, 1000);
            eventWork = lastTenElem.every((item, i) => {
               return item.age === dataFromPagi[i].age;
            });
        }
    }

    class TestListenerChange implements Listener {
        update(event: string, dataFromPagi: TestItem[]): void {
            let lastTenElem = data.slice(0, 29);
            eventWork = lastTenElem.every((item, i) => {
                return item.age === dataFromPagi[i].age;
            });
        }
    }

    let pagination: Paginator<TestItem>;
    let view: DefaultPaginationView;
    let model: PaginatorModel<TestItem>;
    let data: TestItem[] = [];
    let listener: Listener;
    let listenerChange: Listener;
    let eventWork: boolean = false;

    beforeEach(() => {
        view = new DefaultPaginationView('body');
        model = new PaginatorModel<TestItem>();
        pagination = new Paginator(model, view);
        listener = new TestListenerClick();
        listenerChange = new TestListenerChange();
        data = [];
        for (let i = 0; i < 1000; i++) {
            data.push(new TestItem())
        }
        eventWork = false;
    });

    it('Test 1: Pagination controller - click event test', () => {
        pagination.attach('pagiChange', listener);
        pagination.initNewData(data);
        let elem = document.querySelectorAll('.number a')[3] as HTMLElement;
        elem.click();
        expect(eventWork).toBeTrue();
    });

    it('Test 2: Pagination controller - select event test', () => {
        pagination.initNewData(data);
        pagination.attach('pagiChange', listenerChange);
        let select = document.querySelector('body select') as HTMLSelectElement;
        select.value = '30';
        select.dispatchEvent(new Event('change', {bubbles: true}));
        expect(eventWork).toBeTrue();
    });
});