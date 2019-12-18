import {Controller} from "../../src/controller/controller";
import {Listener} from "../../src/event-manager/interfaces";

let updateWork: boolean = false;

class testListener implements Listener {
    update(event: string, data: boolean): void {
        updateWork = data;
    }
}

describe('Controller - controller:', () => {
    it('Test 1: Controller', () => {
        let constroller = new Controller();
        let listener = new testListener();
        constroller.attach('test', listener);
        constroller['notify']('test', true);
        expect(updateWork).toBeTrue();
    });
});
