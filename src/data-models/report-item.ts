import {FilterConfig, FilterConfigItem} from "../models/filter/filter-config-item";
import {RowConfig, RowModelItem} from "../models/table/row-model-item";
const IMAGE_PREFIX: string = 'https://s3.eu-central-1.amazonaws.com/showcase-demo-images/fashion/images/';

export class ReportItem {
    abandonedUnits: number;
    clicks: number;
    discount: number;
    displayName: string;
    displays: number;
    image: string;
    orders: number;
    productKey: string;
    profit: number;
    revenue: number;
    soldUnits: number;
}

export let productFilterConfig: FilterConfig = {
    displays: new FilterConfigItem('Displays'),
    orders: new FilterConfigItem('Purchases'),
    clicks: new FilterConfigItem('Clicks '),
    abandonedUnits: new FilterConfigItem('Abandoned Units'),
    soldUnits: new FilterConfigItem('Sold units'),
    revenue: new FilterConfigItem('Revenue'),
    profit: new FilterConfigItem('Profit')
};

export let productColumnConfig: RowConfig<ReportItem> = {
    image: new RowModelItem('', false,  (value: string) => `<img src="${IMAGE_PREFIX + value}">`),
    displayName: new RowModelItem('Title', false, (value: string, rowConfig: RowConfig<ReportItem>, data: ReportItem)=> `${value + ' ' + data.productKey}`),
    displays: new RowModelItem('Displays', true),
    orders: new RowModelItem('Purchase', true),
    clicks: new RowModelItem('Clicks', true),
    abandonedUnits: new RowModelItem('Abandoned Units', true),
    soldUnits: new RowModelItem('Sold units', true),
    revenue: new RowModelItem('Revenue', true),
    profit: new RowModelItem('Profit', true, (value: string) => value+'$')
};
