import {PaginatorModel} from "../../../src/models/pagination/pagination-model";

describe('Pagination setSelectPage:', () => {
    let pagination: PaginatorModel<number>;
    let array: number[] = [];

    beforeEach(() => {
        pagination = new PaginatorModel();
        for (let i: number = 0; i < 20; i++) {
            array[i] = i;
        }
    });
    it('Test 1: Set 2', () => {
        pagination.initNewData(array);
        pagination.setSelectPage(2);
        expect(pagination.getDataOnCurrentPage()).toEqual([10,11,12,13,14,15,16,17,18,19])
    });

    it('Test 2: Set 0', () => {
        pagination.initNewData(array);
        pagination.setSelectPage(0);
        expect(pagination.getDataOnCurrentPage()).toEqual([0,1,2,3,4,5,6,7,8,9])
    });

    it('Test 3: Set non-existent page', () => {
        pagination.initNewData(array);
        pagination.setSelectPage(54);
        expect(pagination.getDataOnCurrentPage()).toEqual([10,11,12,13,14,15,16,17,18,19])
    });
});