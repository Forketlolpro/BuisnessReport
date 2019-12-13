import {ProductTable} from "./components/product-table";
import {MarketingTable} from "./components/marketing-table";

export class App {
    constructor() {
        new ProductTable();
        new MarketingTable();
    }
}