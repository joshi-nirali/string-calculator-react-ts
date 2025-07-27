import { add } from './calculator';

describe('String Calculator', () => {
    it('throws error on negative numbers', () => {
        expect(() => add('1,-2,3,-4')).toThrow('Negative numbers not allowed: -2,-4');
    });
});