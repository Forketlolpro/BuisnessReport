export interface EventManager {
    attach(event: string, listener: Listener): void;

    notify(event: string, data: any): void;
}

export interface Listener {
    update<T>(event: string, data: T): void;
}

