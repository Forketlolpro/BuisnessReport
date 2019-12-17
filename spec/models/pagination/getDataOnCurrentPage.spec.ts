import {PaginatorModel} from "../../../src/models/pagination/pagination-model";

describe('Pagination getDataOnCurrentPage test:', () => {
    let pagination: PaginatorModel<number>;
    beforeEach(() => {
        pagination = new PaginatorModel();
    });
    it('Test 1: Simple case', () => {
        pagination.initNewData([1, 2, 3, 4, 5]);
        expect(pagination.getDataOnCurrentPage()).toEqual([1, 2, 3, 4, 5])
    });

    it('Test 2: Empty array', () => {
        pagination.initNewData([]);
        expect(pagination.getDataOnCurrentPage()).toEqual([])
    });

    it('Test 3: After change page', () => {
        let array: number[] = [];
        for (let i: number = 0; i < 100; i++) {
            array[i] = i;
        }
        pagination.initNewData(array);
        pagination.setSelectPage(2);
        expect(pagination.getDataOnCurrentPage()).toEqual([10, 11, 12, 13, 14, 15, 16, 17, 18, 19])
    });

    it('Test 4: Select last page', () => {
        let array: number[] = [];
        for (let i: number = 0; i < 11; i++) {
            array[i] = i;
        }
        pagination.initNewData(array);
        pagination.setSelectPage(2);
        expect(pagination.getDataOnCurrentPage()).toEqual([10])
    });
});