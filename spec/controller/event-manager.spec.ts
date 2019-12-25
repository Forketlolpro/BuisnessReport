import {EventManager} from "../../src/event-manager/event-manager";

let notifyWork: boolean = false;
let callback = (data: boolean): void => {
    notifyWork = data;
};

describe('EventManager', () => {
    it('Should notify correct', () => {
        let eventManager = new EventManager();
        eventManager.attach('test', callback);
        eventManager['notify']('test', true);
        expect(notifyWork).toBeTrue();
    });
});
