//const calculator = require('./math.js');
import {add, subtract, multiply, divide, mod} from './math.js';

describe('add', function() {
    it('adds positive numbers', function() {
        expect(+(add(4,6))).toBe(10);
    });

    it('adds large positive numbers', function() {
        expect(+(add(26584, 159874))).toEqual(186458);
    });
});

describe('subtract', function() {
    it('subtracts positive numbers', function() {
        expect(+(subtract(10, 4))).toEqual(6);
    });
});

describe('multiply', function() {
    it('multiplies two positive numbers', function() {
        expect(+(multiply(2, 4))).toEqual(8);
    });
});

describe('divide', function() {
    it('divides two non-zero numbers', function() {
        expect(+(divide(10, 2))).toEqual(5);
    });

    it('returns 0 when dividing 0 by a number', function() {
        expect(+(divide(0, 5))).toEqual(0);
    });

    it('returns snarky comment when dividing by 0', function() {
        expect(divide(5, 0)).toEqual("Trying to end the universe, are we?");
    });

    it('returns NaN when both a and b are 0', function() {
        expect(divide(0,0)).toEqual("NaN");
    });
});

describe('mod', function() {
    it('returns the remainder after division', function() {
        expect(+(mod(10, 3))).toEqual(1);
    });

    it('returns 0 when a is 0', function() {
        expect(+(mod(0, 5))).toEqual(0);
    });

    it('returns snarky comment when b is 0', function() {
        expect(mod(5, 0)).toEqual("Trying to end the universe, are we?");
    });

    it('returns NaN when both a and b are 0', function() {
        expect(mod(0,0)).toEqual("NaN");
    });
});

