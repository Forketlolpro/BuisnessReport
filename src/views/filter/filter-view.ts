import { BaseView } from "../base-view";
import { FilterConfig, FilterConfigItem } from "../../models/filter/filter-config-item";


export class DefaultFilterView extends BaseView {
    constructor(selector: string) {
        super(selector);
    }

    generateResetButton(item: [string, FilterConfigItem]):string {
        if (item[1].selectMin > item[1].min || item[1].selectMax < item[1].max) {
            return `<button data-property="${item[0]}" type="reset" class="resetFilter">&#10005;</button>`
        }

        return ``;
    }

    generateFilterItem(item: [string, FilterConfigItem]):string {
        let inputMinValue = (item[1].selectMin && item[1].selectMin >= item[1].min) ? item[1].selectMin : item[1].min;
        let inputMaxValue = (item[1].selectMax && item[1].selectMax <= item[1].max) ? item[1].selectMax : item[1].max;
        return `<div>
                    <label>${item[1].title}: </label>
                    <input class="form-control" data-use="selectMin" data-property="${item[0]}" value="${inputMinValue}" type="number">
                    <input class="form-control" data-use="selectMax" data-property="${item[0]}" value="${inputMaxValue}" type="number">
                    ${this.generateResetButton(item)}
                </div>`
    }

    generateFilterForm(config: FilterConfig):string {
        return `<form>
                    ${Object.entries(config).map((item) => {
            return this.generateFilterItem(item);
        }).join(' ')}
                    <button class="btn btn-primary"type="submit">Apply</button>
                </form>`
    }

    generateTemplate(config: FilterConfig):string {
        return `<h2>Filters</h2>${this.generateFilterForm(config)}`
    }

    render(config: FilterConfig): void {
        document.querySelector(this.selector).innerHTML = this.generateTemplate(config);
    }
}