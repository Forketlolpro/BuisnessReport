export class EventManager {
    private readonly observers: Map<string, (data: any) => void>;

    constructor() {
        this.observers = new Map<string, () => {}>();
    }

    public attach(event: string, callback: (data: any) => void): void {
        this.observers.set(event, callback)
    }

    public notify(event: string, data: any): void {
        for (let entry of this.observers) {
            if (entry[0] === event) {
                entry[1](data);
            }
        }
    }
}
