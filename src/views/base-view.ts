export class BaseView {
    private _selector: string;

    get selector(): string {
        return this._selector;
    }

    set selector(value: string) {
        this._selector = value;
    }

    constructor(selector: string) {
        this._selector = selector;
    }
}