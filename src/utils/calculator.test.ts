import { add } from './calculator';

describe('String Calculator', () => {
    it('supports newlines between numbers', () => {
        expect(add('1\n2,3')).toBe(6);
    });
});