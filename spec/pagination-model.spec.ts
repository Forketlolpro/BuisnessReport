import {PaginatorModel} from "../src/models/pagination/pagination-model";

describe('Pagination model:', () => {
    let pagination: PaginatorModel<number>;
    beforeEach(()=>{
        pagination = new PaginatorModel();
    });
    it('Test 1: initNewData', () => {
        pagination.initNewData([2,3,4,5,7,8]);
        console.log(pagination.currentPageData);
        expect(pagination.currentPageData).toEqual([2,3,4,5,7,8])
    });
});