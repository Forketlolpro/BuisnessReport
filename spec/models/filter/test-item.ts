export class TestItem {
    name: string;
    age: number;
    iq: number;

    constructor() {
        this.age = Math.floor(Math.random() * Math.floor(1000));
        this.iq = Math.floor(Math.random() * Math.floor(300));
        this.name = this.age.toString() + this.iq;
    }
}