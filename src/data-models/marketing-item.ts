import {FilterConfig, FilterConfigItem} from "../models/filter/filter-config-item";
import {RowConfig, RowModelItem} from "../models/table/row-model-item";

export class MarketingItem {
    path: string;
    displayName: string;
    displays: number;
    clicks: number;
    addToCarts: number;
    orders: number;
    units: number;
    revenue: number;
    profit: number;
}

export let marketingFilterConfig: FilterConfig = {
    displays: new FilterConfigItem('Displays'),
    clicks: new FilterConfigItem('Clicks '),
    orders: new FilterConfigItem('Purchases'),
    addToCarts: new FilterConfigItem('Add to cart'),
    units: new FilterConfigItem('Sold units'),
    revenue: new FilterConfigItem('Revenue'),
    profit: new FilterConfigItem('Profit')
};

export let marketingColumnConfig: RowConfig<MarketingItem> = {
    displayName: new RowModelItem('Display name', false),
    path: new RowModelItem('Path', false),
    displays: new RowModelItem('Displays', true),
    clicks: new RowModelItem('Clicks', true),
    orders: new RowModelItem('Purchase', true),
    addToCarts: new RowModelItem('Add to cart', true),
    units: new RowModelItem('Sold units', true),
    revenue: new RowModelItem('Revenue', true, (value: string) => `${Math.round(+value)}$`),
    profit: new RowModelItem('Profit', true, (value: string) => `${Math.round(+value)}$`)
};
