import {TestItem} from "../models/filter/test-item";
import {Filter} from "../../src/controller/filter";
import {FilterModel} from "../../src/models/filter/filter-model";
import {FilterView} from "../../src/views/interfaces";
import {DefaultFilterView} from "../../src/views/filter/filter-view";
import {FilterConfig, FilterConfigItem} from "../../src/models/filter/filter-config-item";

describe('Filter controller', () => {
    let submitCallback = (event: string, dataFromFilter: TestItem[]): void => {
        if (data.length === dataFromFilter.length) {
            eventWork = true;
        }
    };

    let filter: Filter<TestItem>;
    let model: FilterModel<TestItem>;
    let view: FilterView;
    let data: TestItem[] = [];
    let eventWork: boolean = false;
    let filterConfig: FilterConfig;

    beforeEach(() => {
        view = new DefaultFilterView('body');
        model = new FilterModel<TestItem>();
        filter = new Filter(model, view);
        data = [];
        for (let i = 0; i < 1000; i++) {
            data.push(new TestItem())
        }
        eventWork = false;
        filterConfig = {
            age: new FilterConfigItem('Age'),
            iq: new FilterConfigItem('Iq')
        }

    });

    it('Test 1: Filter controller - submit event', () => {
        filter.attach('filterChange', submitCallback);
        filter.initNewData(data, filterConfig);
        let sumbitButton = document.querySelector('form button[type=submit]') as HTMLButtonElement;
        sumbitButton.click();
        expect(eventWork).toBeTrue();
    });

    it('Test 2: Filter controller - click event', () => {
        filter.initNewData(data, filterConfig);
        let input = document.querySelector('form input[data-use=selectMin]') as HTMLInputElement;
        input.value = '100';
    });

    it('Test 3: Filter controller - focusout and click event', () => {
        filter.initNewData(data, filterConfig);
        let input: HTMLInputElement = document.querySelector('form input[data-use=selectMin]');
        input.value = '100';
        input.dispatchEvent(new Event('focusout', {bubbles: true}));
        let resetButton: HTMLButtonElement = document.querySelector('button[data-property=age]');
        expect(resetButton).not.toBeNull();
        resetButton.click();
        expect(document.querySelector('button[data-property=age]')).toBeNull();
    });
});