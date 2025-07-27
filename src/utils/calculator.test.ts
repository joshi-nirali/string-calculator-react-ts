import { add } from './calculator';

describe('String Calculator', () => {
    it('returns number itself for single number', () => {
        expect(add('1')).toBe(1);
    });
});