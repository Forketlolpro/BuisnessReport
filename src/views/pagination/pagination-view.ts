import {PaginationViewParam} from "./pagination-view-param";
import {BaseView} from "../base-view";
import {PaginationView} from "../interfaces";

export class DefaultPaginationView extends BaseView implements PaginationView{
    constructor(selector: string) {
        super(selector);
    }


    public render(paginationParams: PaginationViewParam): void {
        document.querySelector(this.selector).innerHTML = this.generateTemplate(+paginationParams.currentPage, +paginationParams.pagesTotal, paginationParams.itemsOnPage, paginationParams.itemCount);
    }

    generatePagesArrangementRef(currentPage: number, pageCount: number): string {
        const delta = 2;
        let range = [];
        for (let i = Math.max(2, currentPage - delta); i <= Math.min(pageCount - 1, currentPage + delta); i++) {
            range.push(`<a class=${currentPage === i ? 'current' : ''}>${i}</a>`);
        }
        if (currentPage - delta > 2) {
            range.unshift("<span class='dots'>. . .</span>")
        }
        if (currentPage + delta < pageCount - 1) {
            range.push("<span class='dots'>. . .</span>")
        }
        if (pageCount > 1) {
            range.unshift(`<a class=${currentPage === 1 ? 'current' : ''}>1</a>`);
        }
        range.push(`<a class=${currentPage === pageCount ? 'current' : ''}>${pageCount}</a>`);
        return range.join('')
    }

    private generateTemplate(current: number, last: number, itemsOnPage: number, totalElements: number):string {
        return `

                <div class="number">${this.generatePagesArrangementRef(current, last).toString()}</div>
                <form>
                <select>
                    ${[10, 20, 30].map((i) => {
            if (itemsOnPage === i) {
                return `<option selected value="${i}">${i}</option>`
            }
            return `<option value="${i}">${i}</option>`
        })}
                </select>
                <span class="total">Total: ${totalElements}</span>
                </form>`
    }
}