import {PaginatorModel} from "../../../src/models/pagination/pagination-model";

describe('Pagination initialize test:', () => {
    let pagination: PaginatorModel<number>;
    beforeEach(() => {
        pagination = new PaginatorModel();
    });
    it('Test 1: Simple init', () => {
        pagination.initNewData([1, 2, 3, 4, 5]);
        expect(pagination.getViewParam().itemCount).toEqual(5);
        expect(pagination.getViewParam().itemsOnPage).toEqual(10);
        expect(pagination.getViewParam().pagesTotal).toEqual(1);
    });

    it('Test 2: empty array init', () => {
        pagination.initNewData([]);
        expect(pagination.getViewParam().itemCount).toEqual(0);
        expect(pagination.getViewParam().itemsOnPage).toEqual(10);
        expect(pagination.getViewParam().pagesTotal).toEqual(0);
    });

    it('Test 3: large array init', () => {
        let array: number[] = [];
        for (let i: number = 0; i < 10000; i++) {
            array[i] = i;
        }
        pagination.initNewData(array);
        expect(pagination.getViewParam().itemCount).toEqual(10000);
        expect(pagination.getViewParam().itemsOnPage).toEqual(10);
        expect(pagination.getViewParam().pagesTotal).toEqual(1000);
    });

    it('Test 4: double initialize', () => {
        pagination.initNewData([1, 2, 3, 4, 5]);
        pagination.initNewData([6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]);
        expect(pagination.getViewParam().itemCount).toEqual(13);
        expect(pagination.getViewParam().itemsOnPage).toEqual(10);
        expect(pagination.getViewParam().pagesTotal).toEqual(2);
    })
});