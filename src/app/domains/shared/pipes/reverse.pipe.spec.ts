import { ReversePipe } from "./reverse.pipe";

describe('ReversePipe', () => {
    it('create an instance', () => {
        const pipe = new ReversePipe();
        expect(pipe).toBeDefined();
    });

    it('Should reverse the word "amor" return "roma"', () => {
        const pipe = new ReversePipe();
        const reverse = pipe.transform('amor');
        expect(reverse).toEqual('roma');
    });

    it('Should reverse the numbers "123" return "321"', () => {
        const pipe = new ReversePipe();
        const reverse = pipe.transform('123');
        expect(reverse).toEqual('321');
    });
});