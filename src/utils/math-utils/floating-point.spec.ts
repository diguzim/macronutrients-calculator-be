import {
  approximatelyGreaterThan,
  approximatelyLessThan,
  approximatelyEqual,
} from './floating-point';

describe('Floating Point', () => {
  describe('aproximatelyGreaterThan', () => {
    describe('when a is 0.00002 and b is 0.00001', () => {
      describe('when decimalPlaces is 0', () => {
        it('returns false', () => {
          expect(approximatelyGreaterThan(0.00002, 0.00001, 0)).toBe(false);
        });
      });
      describe('when decimalPlaces is 5', () => {
        it('returns true', () => {
          expect(approximatelyGreaterThan(0.00002, 0.00001, 5)).toBe(true);
        });
      });
      describe('when decimalPlaces is undefined', () => {
        it('returns true', () => {
          expect(approximatelyGreaterThan(0.00002, 0.00001)).toBe(true);
        });
      });
    });

    describe('when a is 0.00001 and b is 0.00002', () => {
      describe('when decimalPlaces is 0', () => {
        it('returns false', () => {
          expect(approximatelyGreaterThan(0.00001, 0.00002, 0)).toBe(false);
        });
      });
      describe('when decimalPlaces is 5', () => {
        it('returns false', () => {
          expect(approximatelyGreaterThan(0.00001, 0.00002, 5)).toBe(false);
        });
      });
      describe('when decimalPlaces is undefined', () => {
        it('returns false', () => {
          expect(approximatelyGreaterThan(0.00001, 0.00002)).toBe(false);
        });
      });
    });

    describe('when a is 0.00001 and b is 0.00001', () => {
      describe('when decimalPlaces is 0', () => {
        it('returns false', () => {
          expect(approximatelyGreaterThan(0.00001, 0.00001, 0)).toBe(false);
        });
      });
      describe('when decimalPlaces is 5', () => {
        it('returns false', () => {
          expect(approximatelyGreaterThan(0.00001, 0.00001, 5)).toBe(false);
        });
      });
      describe('when decimalPlaces is undefined', () => {
        it('returns false', () => {
          expect(approximatelyGreaterThan(0.00001, 0.00001)).toBe(false);
        });
      });
    });
  });

  describe('aproximatelyLessThan', () => {
    describe('when a is 0.00002 and b is 0.00001', () => {
      describe('when decimalPlaces is 0', () => {
        it('returns false', () => {
          expect(approximatelyLessThan(0.00002, 0.00001, 0)).toBe(false);
        });
      });
      describe('when decimalPlaces is 5', () => {
        it('returns false', () => {
          expect(approximatelyLessThan(0.00002, 0.00001, 5)).toBe(false);
        });
      });
      describe('when decimalPlaces is undefined', () => {
        it('returns false', () => {
          expect(approximatelyLessThan(0.00002, 0.00001)).toBe(false);
        });
      });
    });

    describe('when a is 0.00001 and b is 0.00002', () => {
      describe('when decimalPlaces is 0', () => {
        it('returns false', () => {
          expect(approximatelyLessThan(0.00001, 0.00002, 0)).toBe(false);
        });
      });
      describe('when decimalPlaces is 5', () => {
        it('returns true', () => {
          expect(approximatelyLessThan(0.00001, 0.00002, 5)).toBe(true);
        });
      });
      describe('when decimalPlaces is undefined', () => {
        it('returns true', () => {
          expect(approximatelyLessThan(0.00001, 0.00002)).toBe(true);
        });
      });
    });

    describe('when a is 0.00001 and b is 0.00001', () => {
      describe('when decimalPlaces is 0', () => {
        it('returns false', () => {
          expect(approximatelyLessThan(0.00001, 0.00001, 0)).toBe(false);
        });
      });
      describe('when decimalPlaces is 5', () => {
        it('returns false', () => {
          expect(approximatelyLessThan(0.00001, 0.00001, 5)).toBe(false);
        });
      });
      describe('when decimalPlaces is undefined', () => {
        it('returns false', () => {
          expect(approximatelyLessThan(0.00001, 0.00001)).toBe(false);
        });
      });
    });
  });

  describe('approximatelyEqual', () => {
    describe('when a is 0.00002 and b is 0.00001', () => {
      describe('when decimalPlaces is 0', () => {
        it('returns false', () => {
          expect(approximatelyEqual(0.00002, 0.00001, 0)).toBe(true);
        });
      });
      describe('when decimalPlaces is 5', () => {
        it('returns false', () => {
          expect(approximatelyEqual(0.00002, 0.00001, 5)).toBe(false);
        });
      });
      describe('when decimalPlaces is undefined', () => {
        it('returns false', () => {
          expect(approximatelyEqual(0.00002, 0.00001)).toBe(false);
        });
      });
    });

    describe('when a is 0.00001 and b is 0.00002', () => {
      describe('when decimalPlaces is 0', () => {
        it('returns false', () => {
          expect(approximatelyEqual(0.00001, 0.00002, 0)).toBe(true);
        });
      });
      describe('when decimalPlaces is 5', () => {
        it('returns false', () => {
          expect(approximatelyEqual(0.00001, 0.00002, 5)).toBe(false);
        });
      });
      describe('when decimalPlaces is undefined', () => {
        it('returns false', () => {
          expect(approximatelyEqual(0.00001, 0.00002)).toBe(false);
        });
      });
    });

    describe('when a is 0.00001 and b is 0.00001', () => {
      describe('when decimalPlaces is 0', () => {
        it('returns true', () => {
          expect(approximatelyEqual(0.00001, 0.00001, 0)).toBe(true);
        });
      });
      describe('when decimalPlaces is 5', () => {
        it('returns true', () => {
          expect(approximatelyEqual(0.00001, 0.00001, 5)).toBe(true);
        });
      });
      describe('when decimalPlaces is undefined', () => {
        it('returns true', () => {
          expect(approximatelyEqual(0.00001, 0.00001)).toBe(true);
        });
      });
    });
  });
});
