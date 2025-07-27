import { add } from './calculator';

describe('String Calculator', () => {
    it('returns sum for two comma-separated numbers', () => {
        expect(add('1,5')).toBe(6);
    });
});