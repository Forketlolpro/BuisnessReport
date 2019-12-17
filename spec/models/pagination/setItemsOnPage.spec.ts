import {PaginatorModel} from "../../../src/models/pagination/pagination-model";

describe('Pagination setItemsOnPage test:', () => {
    let pagination: PaginatorModel<number>;
    beforeEach(() => {
        pagination = new PaginatorModel();
    });
    it('Test 1: Set 20', () => {
        pagination.initNewData([1, 2, 3, 4, 5]);
        pagination.setItemsOnPage(20);
        expect(pagination.getViewParam().itemsOnPage).toEqual(20)
    });

    it('Test 2: Set 0', () => {
        pagination.initNewData([1, 2, 3, 4, 5]);
        pagination.setItemsOnPage(0);
        expect(pagination.getViewParam().itemsOnPage).toEqual(10)
    });
});