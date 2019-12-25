import {PaginatorModel} from "../../../src/models/pagination/pagination-model";

describe('PaginationModel', () => {
    describe('getDataOnCurrentPage:', () => {
        let pagination: PaginatorModel<number>;

        it('Should return correct data', () => {
            pagination = createPaginationModel(5);
            expect(pagination.getDataOnCurrentPage()).toEqual([0,1,2,3,4])
        });

        it('Should return empty data for empty dataset', () => {
            pagination = createPaginationModel(0);
            expect(pagination.getDataOnCurrentPage()).toEqual([])
        });

        it('Should return correct data on second page', () => {
            pagination = createPaginationModel(100);
            pagination.setSelectPage(2);
            expect(pagination.getDataOnCurrentPage()).toEqual([10, 11, 12, 13, 14, 15, 16, 17, 18, 19])
        });

        it('Should return correct data on last page', () => {
            pagination = createPaginationModel(11);
            pagination.setSelectPage(2);
            expect(pagination.getDataOnCurrentPage()).toEqual([10])
        });
    });

    describe('initNewData:', () => {
        let pagination: PaginatorModel<number>;
        it('Should return correct view param after initialize', () => {
            pagination = createPaginationModel(5);
            expect(pagination.getViewParam().itemCount).toEqual(5);
            expect(pagination.getViewParam().itemsOnPage).toEqual(10);
            expect(pagination.getViewParam().pagesTotal).toEqual(1);
        });

        it('Should return correct view param for empty array', () => {
            pagination = createPaginationModel(0);
            expect(pagination.getViewParam().itemCount).toEqual(0);
            expect(pagination.getViewParam().itemsOnPage).toEqual(10);
            expect(pagination.getViewParam().pagesTotal).toEqual(0);
        });

        it('Should return correct view param after initialize with a large array', () => {
            pagination = createPaginationModel(10000);
            expect(pagination.getViewParam().itemCount).toEqual(10000);
            expect(pagination.getViewParam().itemsOnPage).toEqual(10);
            expect(pagination.getViewParam().pagesTotal).toEqual(1000);
        });
    });

    describe('setItemsOnPage:', () => {
        let pagination: PaginatorModel<number>;
        it('Should return correct data after setting 20 elements per page', () => {
            pagination = createPaginationModel(5);
            pagination.setItemsOnPage(20);
            expect(pagination.getViewParam().itemsOnPage).toEqual(20)
        });

        it('Should return correct data after setting 0 elements per page', () => {
            pagination = createPaginationModel(5);
            pagination.setItemsOnPage(0);
            expect(pagination.getViewParam().itemsOnPage).toEqual(10)
        });

        it('Should return correct data after setting -10 elements per page', () => {
            pagination = createPaginationModel(5);
            pagination.setItemsOnPage(-10);
            expect(pagination.getViewParam().itemsOnPage).toEqual(10)
        });
    });

    describe('setSelectPage:', () => {
        let pagination: PaginatorModel<number>;

        it('Should return correct data for second page', () => {
            pagination = createPaginationModel(20);
            pagination.setSelectPage(2);
            expect(pagination.getDataOnCurrentPage()).toEqual([10,11,12,13,14,15,16,17,18,19])
        });

        it('Should return correct data for zero page', () => {
            pagination = createPaginationModel(20);
            pagination.setSelectPage(0);
            expect(pagination.getDataOnCurrentPage()).toEqual([0,1,2,3,4,5,6,7,8,9])
        });

        it('Should return correct data for not-existing page', () => {
            pagination = createPaginationModel(20);
            pagination.setSelectPage(54);
            expect(pagination.getDataOnCurrentPage()).toEqual([10,11,12,13,14,15,16,17,18,19])
        });
    });
});

function createPaginationModel(count: number) {
    let array: number[] = [];
    for (let i: number = 0; i < count; i++) {
        array[i] = i;
    }
    const paginatorModel = new PaginatorModel<number>([10,20,30]);
    paginatorModel.initNewData(array);
    return paginatorModel;
}
