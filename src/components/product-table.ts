// import {TableModel} from "../models/table/table-model";
// import {FilterModel} from "../models/filter/filter-model";
// import {get} from "../helpers/fetch";
// import {DefaultFilterView} from "../views/filter/filter-view";
// import {PaginatorModel} from "../models/pagination/pagination-model";
// import {EventManager, Listener} from "../event-manager/interfaces";
// import {TableEventManager} from "../event-manager/table-event-manager";
// import {DefaultPaginationView} from "../views/pagination/pagination-view";
// import {DefaultTableView} from "../views/table/table-view";
// import {FilterConfigItem} from "../models/filter/filter-config-item";
// import {HeaderModelItem} from "../models/table/header-model-item";
// import {ReportItem} from "../data-models/report-item";
//
// export class ProductTable implements Listener {
//     private paginator: PaginatorModel;
//     private table: TableModel;
//     private filter: FilterModel;
//     private eventManager: EventManager;
//     private data: any[];
//     private filterConfig: any;
//     private rowConfig: any;
//
//     constructor() {
//         this.data = get('product');
//         this.setFilterModel();
//         this.setRowModel();
//
//
//         this.eventManager = new TableEventManager();
//         this.eventManager.attach('tableSortChange', this);
//         this.eventManager.attach('paginationChange', this);
//         this.eventManager.attach('filterChange', this);
//
//
//         this.filter = new FilterModel(new DefaultFilterView('.report-table .filter'), this.eventManager);
//         this.filter.initialize(this.data, this.filterConfig);
//
//
//         this.paginator = new PaginatorModel(new DefaultPaginationView('.report-table .paginator'), this.eventManager);
//         this.paginator.initNewData(this.data);
//
//
//         this.table = new TableModel(new DefaultTableView('.report-table .table'), this.eventManager);
//         this.table.updateOriginalData(this.data);
//         this.table.updateData(this.rowConfig, this.paginator.currentPageData);
//     }
//
//     setFilterModel() {
//         this.filterConfig = {
//             displays: new FilterConfigItem('Displays'),
//             orders: new FilterConfigItem('Purchases'),
//             clicks: new FilterConfigItem('Clicks '),
//             abandonedUnits: new FilterConfigItem('Abandoned Units'),
//             soldUnits: new FilterConfigItem('Sold units'),
//             revenue: new FilterConfigItem('Revenue'),
//             profit: new FilterConfigItem('Profit')
//         };
//     }
//
//     setRowModel() {
//         this.rowConfig = {
//             image: new HeaderModelItem('', false),
//             displayName: new HeaderModelItem('Title', false),
//             displays: new HeaderModelItem('Displays', true),
//             orders: new HeaderModelItem('Purchase', true),
//             clicks: new HeaderModelItem('Clicks', true),
//             abandonedUnits: new HeaderModelItem('Abandoned Units', true),
//             soldUnits: new HeaderModelItem('Sold units', true),
//             revenue: new HeaderModelItem('Revenue', true),
//             profit: new HeaderModelItem('Profit', true)
//         };
//     }
//
//
//     update(event: string, data: any): void {
//         if (event === 'tableSortChange')
//             this.tableHandler(data);
//         if (event === 'paginationChange')
//             this.paginationHandler(data);
//         if (event === 'filterChange')
//             this.filterHandler(data);
//     }
//
//     paginationHandler = (currentPageData: any): void => {
//         this.table.updateData(this.rowConfig, currentPageData)
//     };
//
//     tableHandler = (data: ReportItem): void => {
//         this.paginator.initNewData(data);
//         this.table.updateData(this.rowConfig, this.paginator.currentPageData);
//     };
//
//     filterHandler = (data: ReportItem): void => {
//         this.paginator.initNewData(data);
//         this.table.updateOriginalData(data);
//         this.table.updateData(this.rowConfig, this.paginator.currentPageData);
//     };
// }