var test = require('unit.js');
var { findTravelOrder } = require('./find-travel-order');

describe('Find travel order, success cases', function () {
  it('return correct travel order for single destination trip', function () {
    const tripArray = [{ source: 'Paris', destination: 'Berlin' }];
    const expected = 'Paris, Berlin';
    const actual = findTravelOrder(tripArray);
    test.value(actual).isEqualTo(expected);
  });

  it('return correct travel order for multiple destionations trip, ordered array', function () {
    const tripArray = [
      { source: 'Paris', destination: 'Berlin' },
      { source: 'Berlin', destination: 'Amsterdam' },
      { source: 'Amsterdam', destination: 'Vienna' },
      { source: 'Vienna', destination: 'Rome' },
    ];
    const expected = 'Paris, Berlin, Amsterdam, Vienna, Rome';
    const actual = findTravelOrder(tripArray);
    test.value(actual).isEqualTo(expected);
  });

  it('return correct travel order for multiple destionations trip, reverse-ordered array', function () {
    const tripArray = [
      { source: 'Vienna', destination: 'Rome' },
      { source: 'Amsterdam', destination: 'Vienna' },
      { source: 'Paris', destination: 'Berlin' },
      { source: 'Berlin', destination: 'Amsterdam' },
    ];
    const expected = 'Paris, Berlin, Amsterdam, Vienna, Rome';
    const actual = findTravelOrder(tripArray);
    test.value(actual).isEqualTo(expected);
  });

  it('return correct travel order for multiple destionations trip, randomly ordered array', function () {
    const tripArray = [
      { source: 'Berlin', destination: 'Amsterdam' },
      { source: 'Vienna', destination: 'Rome' },
      { source: 'Paris', destination: 'Berlin' },
      { source: 'Amsterdam', destination: 'Vienna' },
    ];
    const expected = 'Paris, Berlin, Amsterdam, Vienna, Rome';
    const actual = findTravelOrder(tripArray);
    test.value(actual).isEqualTo(expected);
  });
});

describe('Find travel order, error cases', function () {
  it('return correct error message when input array is not an array', function () {
    const expected = 'Error: Input type error';
    const actual = findTravelOrder('Not array');
    test.value(actual).isEqualTo(expected);
  });

  it('return correct error message when input array is an empty array', function () {
    const expected = 'Error: Empty array';
    const actual = findTravelOrder([]);
    test.value(actual).isEqualTo(expected);
  });

  it('return correct error message when start and final city cannot be determined #1 (round trip)', function () {
    const tripArray = [
      { source: 'Paris', destination: 'Berlin' },
      { source: 'Berlin', destination: 'Paris' },
    ];
    const expected = 'Error: Cannot determine start and end city';
    const actual = findTravelOrder(tripArray);
    test.value(actual).isEqualTo(expected);
  });

  it('return correct error message when start and final city cannot be determined #2 (multiple start, final city', function () {
    const tripArray = [
      { source: 'Paris', destination: 'Berlin' },
      { source: 'Hamburg', destination: 'Marseille' },
    ];
    const expected = 'Error: Duplicate start or end city';
    const actual = findTravelOrder(tripArray);
    test.value(actual).isEqualTo(expected);
  });

  it('return correct error message when start and final city cannot be determined #3 (duplicated city)', function () {
    const tripArray = [
      { source: 'Paris', destination: 'Berlin' },
      { source: 'Paris', destination: 'Hamburg' },
    ];
    const expected = 'Error: Duplicate start or end city';
    const actual = findTravelOrder(tripArray);
    test.value(actual).isEqualTo(expected);
  });

  it('return correct error message when start and final city cannot be determined #4 (duplicated city)', function () {
    const tripArray = [
      { source: 'Paris', destination: 'Berlin' },
      { source: 'Berlin', destination: 'Hamburg' },
      { source: 'Berlin', destination: 'Frankfurt' },
    ];
    const expected = 'Error: Duplicate start or end city';
    const actual = findTravelOrder(tripArray);
    test.value(actual).isEqualTo(expected);
  });
});
