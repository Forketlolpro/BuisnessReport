import {Listener} from "../event-manager/interfaces";

export class Controller {
    private readonly observers: Map<string, Listener>;

    constructor() {
        this.observers =  new Map<string, Listener>();
    }

    attach(event: string, listener: Listener): void {
        this.observers.set(event, listener)
    }

    protected notify(event: string, data: any): void {
        for (let entry of this.observers) {
            if(entry[0] === event) {
                entry[1].update(event,data);
            }
        }
    }
}