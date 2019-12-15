import { BaseView } from "../base-view";
import { RowConfig } from "../../models/table/header-model-item";
import { SortModel } from "../../models/table/sort-model";


const IMAGE_PREFIX = 'https://s3.eu-central-1.amazonaws.com/showcase-demo-images/fashion/images/';

export class DefaultTableView<T> extends BaseView {
    constructor(selector: string) {
        super(selector)
    }

    private generateHeader(rowConfig: RowConfig, sortingModel: SortModel) {
        return Object.keys(rowConfig).map(key => {
            let htmlClass = '';
            if (sortingModel.prop === key) {
                htmlClass = sortingModel.direction ? sortingModel.direction : '';
            }
            return (rowConfig[key].sortable) ? `<th class='${htmlClass}' data-property='${key}'> ${rowConfig[key].title} </th>` : `<th> ${rowConfig[key].title} </th>`;
        }).join(' ');
    }

    generateNameCell(row, key: string) {
        return `<td>${row[key] + ' ' + row['productKey']}</td>`;
    }


    private generateBody(data: T[], rowConfig: RowConfig) {
        return data.map(row => {
            return `<tr>${Object.keys(rowConfig).map(key => {
                if (key === 'displayName') {
                    return this.generateNameCell(row, key);
                }

                if (!(rowConfig[key].renderFunc === undefined)) {
                    return  `<td>${rowConfig[key].renderFunc(row[key])}</td>`;
                }

                return `<td>${row[key]}</td>`
            }).join(' ')}</tr>`
        }).join(' ');
    }

    generateTemplate(rowConfig: RowConfig, bodyData: T[], sortingModel: SortModel) {
        return `<table class="table table-striped table-hover">
                    <thead class="thead-light">${this.generateHeader(rowConfig, sortingModel)}</thead>
                    <tbody>${this.generateBody(bodyData, rowConfig)}</tbody>
                </table>`
    }

    render(rowConfig: RowConfig, bodyData: T[], sortingModel: SortModel) {
        document.querySelector(this.selector).innerHTML = this.generateTemplate(rowConfig, bodyData, sortingModel);
    }
}