export interface FilterConfig {
    [key: string]: FilterConfigItem;
}


export class FilterConfigItem {
    title: string;
    min: number = Number.MAX_SAFE_INTEGER;
    max: number = 0;
    private _selectMin: number;
    private _selectMax: number;

    constructor(title: string) {
        this.title = title;
    }

    get selectMax(): number {
        return this._selectMax;
    }

    set selectMax(value: number) {
        if(value > this.max || value < this.min) {
            this._selectMax = this.max;
        } else {
            this._selectMax = value;
        }
    }

    get selectMin(): number {
        return this._selectMin;
    }

    set selectMin(value: number) {
        if(value < this.min || value > this.max) {
            this._selectMin = this.min;
        } else {
            this._selectMin = value;
        }
    }
}
