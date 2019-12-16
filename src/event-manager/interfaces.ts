export interface Listener {
    update<T>(event: string, data: T): void;
}

