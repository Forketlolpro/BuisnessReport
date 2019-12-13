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
// export class MarketingTable implements Listener {
//     private paginator: PaginatorModel;
//     private table: TableModel;
//     private filter: FilterModel;
//     private eventManager: EventManager;
//     private data: any[];
//     private filterConfig: any;
//     private rowConfig: any;
//
//     constructor() {
//         this.data = get('marketing');
//         this.setFilterModel();
//         this.setRowModel();
//
//
//         this.eventManager = new TableEventManager();
//         this.eventManager.attach('tableStateChange', this);
//         this.eventManager.attach('paginationStateChange', this);
//         this.eventManager.attach('filterStateChange', this);
//
//
//         this.filter = new FilterModel(new DefaultFilterView('.marketing-table .filter'), this.eventManager);
//         this.filter.initialize(this.data, this.filterConfig);
//
//
//         this.paginator = new PaginatorModel(new DefaultPaginationView('.marketing-table .paginator'), this.eventManager);
//         this.paginator.initNewData(this.data);
//
//
//         this.table = new TableModel(new DefaultTableView('.marketing-table .table'), this.eventManager);
//         this.table.updateOriginalData(this.data);
//         this.table.updateData(this.rowConfig, this.paginator.currentPageData);
//     }
//
//     setFilterModel() {
//         this.filterConfig = {
//             displays: new FilterConfigItem('Displays'),
//             clicks: new FilterConfigItem('Clicks '),
//             orders: new FilterConfigItem('Purchases'),
//             addToCarts: new FilterConfigItem('Add to cart'),
//             units: new FilterConfigItem('Sold units'),
//             revenue: new FilterConfigItem('Revenue'),
//             profit: new FilterConfigItem('Profit')
//         };
//     }
//
//     setRowModel() {
//         this.rowConfig = {
//             displayName: new HeaderModelItem('Display name', false),
//             path: new HeaderModelItem('Path', false),
//             displays: new HeaderModelItem('Displays', true),
//             clicks: new HeaderModelItem('Clicks', true),
//             orders: new HeaderModelItem('Purchase', true),
//             addToCarts: new HeaderModelItem('Add to cart', true),
//             units: new HeaderModelItem('Sold units', true),
//             revenue: new HeaderModelItem('Revenue', true),
//             profit: new HeaderModelItem('Profit', true)
//         };
//     }
//
//
//     update(event: string, data: any): void {
//         if (event === 'tableStateChange')
//             this.tableHandler(data);
//         if (event === 'paginationStateChange')
//             this.paginationHandler(data);
//         if (event === 'filterStateChange')
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