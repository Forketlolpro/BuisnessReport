import { BaseView } from "../base-view";
import { RowConfig } from "../../models/table/row-model-item";
import { SortModel } from "../../models/table/sort-model";
import {TableView} from "../interfaces";

export class DefaultTableView<T> extends BaseView implements TableView<T>{
    constructor(selector: string) {
        super(selector)
    }

    private generateHeader(rowConfig: RowConfig<T>, sortingModel: SortModel) {
        return Object.keys(rowConfig).map(key => {
            let htmlClass = '';
            if (sortingModel.prop === key) {
                htmlClass = sortingModel.direction ? sortingModel.direction : '';
            }
            return (rowConfig[key].sortable) ? `<th class='${htmlClass}' data-property='${key}'> ${rowConfig[key].title} </th>` : `<th> ${rowConfig[key].title} </th>`;
        }).join(' ');
    }


    private generateBody(data: T[], rowConfig: RowConfig<T>) {
        return data.map(row => {
            return `<tr>${Object.keys(rowConfig).map(key => {
                if (!(rowConfig[key].renderFunc === undefined)) {
                    return  `<td>${rowConfig[key].renderFunc(row[key], rowConfig, row)}</td>`;
                }

                return `<td>${row[key]}</td>`
            }).join(' ')}</tr>`
        }).join(' ');
    }

    generateTemplate(rowConfig: RowConfig<T>, bodyData: T[], sortingModel: SortModel) {
        return `<table class="table table-striped table-hover">
                    <thead class="thead-light">${this.generateHeader(rowConfig, sortingModel)}</thead>
                    <tbody>${this.generateBody(bodyData, rowConfig)}</tbody>
                </table>`
    }

    render(rowConfig: RowConfig<T>, bodyData: T[], sortingModel: SortModel) {
        document.querySelector(this.selector).innerHTML = this.generateTemplate(rowConfig, bodyData, sortingModel);
    }
}