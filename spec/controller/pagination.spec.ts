import {Paginator} from "../../src/controller/paginator";
import {TestItem} from "../models/filter/test-item";
import {DefaultPaginationView} from "../../src/views/pagination/pagination-view";
import {PaginatorModel} from "../../src/models/pagination/pagination-model";
import {EventManager} from "../../src/event-manager/event-manager";

describe('Pagination', () => {
    let clickCallback = (dataFromPagi: TestItem[]): void => {
        let lastTenElem = data.slice(990, 1000);
        eventWork = lastTenElem.every((item, i) => {
            return item.age === dataFromPagi[i].age;
        });
    };


    let changeCallback = (dataFromPagi: TestItem[]): void => {
        let lastTenElem = data.slice(0, 29);
        eventWork = lastTenElem.every((item, i) => {
            return item.age === dataFromPagi[i].age;
        });
    };

    let pagination: Paginator<TestItem>;
    let view: DefaultPaginationView;
    let model: PaginatorModel<TestItem>;
    let data: TestItem[] = [];
    let eventWork: boolean = false;
    let eventManager: EventManager;

    beforeEach(() => {
        eventManager = new EventManager();
        view = new DefaultPaginationView('body');
        model = new PaginatorModel<TestItem>([10,20,30]);
        pagination = new Paginator(model, view, eventManager);
        data = [];
        for (let i = 0; i < 1000; i++) {
            data.push(new TestItem())
        }
        eventWork = false;
    });
    describe('clickEventHandler:', () => {
        it('Should click on pagination number worc correctly', () => {
            eventManager.attach('paginationChange', clickCallback);
            pagination.initNewData(data);
            let elem = document.querySelectorAll('.number a')[3] as HTMLElement;
            elem.click();
            expect(eventWork).toBeTrue();
        });
    });

    describe('selectEventHandler:', () => {
        it('Should select input change work correctly', () => {
            pagination.initNewData(data);
            eventManager.attach('paginationChange', changeCallback);
            let select = document.querySelector('body select') as HTMLSelectElement;
            select.value = '30';
            select.dispatchEvent(new Event('change', {bubbles: true}));
            expect(eventWork).toBeTrue();
        });
    });
});
