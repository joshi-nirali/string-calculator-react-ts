import { add } from './calculator';

describe('String Calculator', () => {
    it('supports custom delimiter with //;\\n syntax', () => {
        expect(add('//;\n1;2')).toBe(3);
    });
});