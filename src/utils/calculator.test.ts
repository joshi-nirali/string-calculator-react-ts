import { add } from './calculator';

describe('String Calculator', () => {
    it('returns sum for multiple numbers', () => {
        expect(add('1,2,3,4')).toBe(10);
    });
});