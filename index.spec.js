const calculator = require('./math.js');

describe('add', function() {
    it('adds positive numbers', function() {
        expect(calculator.add(4,6)).toEqual(10);
    });

    it('adds large positive numbers', function() {
        expect(calculator.add(26584, 159874)).toEqual(186458);
    });
});

describe('subtract', function() {
    it('subtracts positive numbers', function() {
        expect(calculator.subtract(10, 4)).toEqual(6);
    });
});

describe('multiply', function() {
    it('multiplies two positive numbers', function() {
        expect(calculator.multiply(2, 4)).toEqual(8);
    });
});

describe('divide', function() {
    it('divides two non-zero numbers', function() {
        expect(calculator.divide(10, 2)).toEqual(5);
    });

    it('returns 0 when dividing 0 by a number', function() {
        expect(calculator.divide(0, 5)).toEqual(0);
    });

    it('returns undefined when dividing by 0', function() {
        expect(calculator.divide(5, 0)).toEqual(undefined);
    });

    it('returns NaN when both a and b are 0', function() {
        expect(calculator.divide(0,0)).toEqual("NaN");
    });
});

describe('mod', function() {
    it('returns the remainder after division', function() {
        expect(calculator.mod(10, 3)).toEqual(1);
    });

    it('returns 0 when a is 0', function() {
        expect(calculator.mod(0, 5)).toEqual(0);
    });

    it('returns undefined when b is 0', function() {
        expect(calculator.divide(5, 0)).toEqual(undefined);
    });

    it('returns NaN when both a and b are 0', function() {
        expect(calculator.divide(0,0)).toEqual("NaN");
    });
});

