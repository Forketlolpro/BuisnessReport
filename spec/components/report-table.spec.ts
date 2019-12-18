import {ReportTable} from "../../src/components/report-table";
import {TestItem} from "../models/filter/test-item";
import {productCollumConfig, productFilterConfig, ReportItem} from "../../src/data-models/report-item";
import {DefaultTableView} from "../../src/views/table/table-view";
import {DefaultPaginationView} from "../../src/views/pagination/pagination-view";
import {DefaultFilterView} from "../../src/views/filter/filter-view";

describe('Report table component:', () => {
    let reportTable: ReportTable<TestItem>;
    let data: TestItem[] = [];

    beforeEach(() => {
        document.body.innerHTML = '<div class="test-table"><div class="table"></div><div class="pagination"></div><div class="filter"></div></div>';
        data = [];
        for (let i = 0; i < 10000; i++) {
            data.push(new TestItem())
        }
        reportTable = new ReportTable<TestItem>(
            data,
            new DefaultTableView('.test-table .table'),
            new DefaultPaginationView('.test-table .pagination'),
            new DefaultFilterView('.test-table .filter'),
            productFilterConfig,
            productCollumConfig
        );
    });

    it('Test 1: Report table base test', () => {
        spyOn(reportTable, 'paginationHandler').and.callThrough();
        spyOn(reportTable, 'tableHandler').and.callThrough();
        spyOn(reportTable, 'filterHandler').and.callThrough();
        reportTable.update('tableChange', data);
        reportTable.update('pagiChange', data);
        reportTable.update('filterChange', data);
        expect(reportTable.paginationHandler).toHaveBeenCalled();
        expect(reportTable.tableHandler).toHaveBeenCalled();
        expect(reportTable.filterHandler).toHaveBeenCalled();
    });
});