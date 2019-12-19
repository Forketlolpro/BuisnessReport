export class EventManager {
    private readonly observers: Map<string, (event: string, data: any) => void>;

    constructor() {
        this.observers = new Map<string, () => {}>();
    }

    attach(event: string, callback: (event: string, data: any) => void): void {
        this.observers.set(event, callback)
    }

    protected notify(event: string, data: any): void {
        for (let entry of this.observers) {
            if (entry[0] === event) {
                entry[1](event, data);
            }
        }
    }
}