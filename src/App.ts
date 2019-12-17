import {ProductTable} from "./components/product-table";
import {MarketingTable} from "./components/marketing-table";

export class App {
    productTable: ProductTable;
    marketingTable: MarketingTable;

    constructor() {}

    run() {
        this.productTable = new ProductTable();
        this.marketingTable = new MarketingTable();
    }
}