import {EventManager} from "../../src/event-manager/event-manager";

let updateWork: boolean = false;
let callback = (data: boolean): void => {
    updateWork = data;
};

describe('Controller - controller:', () => {
    it('Test 1: Controller', () => {
        let constroller = new EventManager();
        constroller.attach('test', callback);
        constroller['notify']('test', true);
        expect(updateWork).toBeTrue();
    });
});
