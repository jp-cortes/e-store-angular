import { TimeAgoPipe } from "./time-ago.pipe";

describe('TimeAgoPipe', () => {
    it('It should create an instance', () => {
        const pipe = new TimeAgoPipe()
    expect(pipe).toBeDefined();
    });

    it('Should change the format the date', () => {
        const pipe = new TimeAgoPipe();
        const timeago = pipe.transform('2023-07-05T15:15:18.573Z');
        // TODO: make the test dynamic
        expect(timeago).toBe('10 months ago');
    });
});