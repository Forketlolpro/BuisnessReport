import {FilterConfigItem} from "../../../src/models/filter/filter-config-item";

describe('FilterConfigItem', () => {
    describe('set selectMax:', () => {
        it('Should selectMax setter work correct', () => {
            let item = new FilterConfigItem('Title');
            item.max = 100;
            item.min = 10;
            item.selectMax = 1000;
            expect(item.selectMax).toEqual(100);
            item.selectMax = -1;
            expect(item.selectMax).toEqual(100);
            item.selectMax = 60;
            expect(item.selectMax).toEqual(60);
        });
    });

    describe('set selectMin:', () => {
        it('Should selectMin setter work correct', () => {
            let item = new FilterConfigItem('Title');
            item.max = 100;
            item.min = 10;
            item.selectMin = 1000;
            expect(item.selectMin).toEqual(10);
            item.selectMin = -1;
            expect(item.selectMin).toEqual(10);
            item.selectMin = 60;
            expect(item.selectMin).toEqual(60);
        });
    })
});
