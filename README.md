# How to run

I use [Mocha](https://mochajs.org/) and [UnitJS](https://unitjs.com/) to test my work, just run:
```bash
npm install
```
And then:
```bash
npm run test
```
You can add more test cases yourself in `run-test.js`.

Or you can just open the file `find-travel-order.js` and have a look at the function `findTravelOrder`.

# Explanation
Here is the explanation of what I did.

## Handled cases and missed cases
This function handles some error cases but misses some.

### What it handles

1. Whether the input is an array and whether an array is an empty array.
2. Whether the input array contains error - A city appears multiple times, multiple starting or final cities:
    Check the cityOccurrences map for that, a correct cityOccurrences should have exactly one city with 1, one city with -1, all other cities are 0
    if we have more or have less than one city with 1 or -1, or have cities with other values than -1, 0, 1, then something is wrong with the input.
3. Whether the input array contains a duplicated city causes error (unable to find start and final city).

### What it misses

In some cases, even with duplicated cities, the start - final city can still be found and the trip forms 1 loop with at least the start or final city outside this loop.

In these cases, determining the original trip becomes more complex although possible with a suitable algorithm but sadly I can't come up with a solution.

## Complexity

Here is space and time complexity of this algorithm.

### Time
The time complexity of this algorithm is O(n) because the function loops exactly three times (one loop over tripArray, then over cityOccurrences and finally over cityMap), results in a total of 3n which simplifies to O(n).

### Space
The space complexity of this algorithm is O(n) because the function accepts an O(n) input array, return a result string with O(n) during calculation it creates two more Map with complexity of O(n) and O(n+1) (cityMap with same size as the input array -> O(n) and cityOccurrences with size of input array + 1 -> O(n+1) results in a total of 4n+1 which simplifies to O(n)
