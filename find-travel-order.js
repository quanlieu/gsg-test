'use strict';
function findTravelOrder(tripArray) {
  if (!Array.isArray(tripArray)) {
    return 'Error: Input type error';
  }
  if (tripArray.length === 0) {
    return 'Error: Empty array';
  }
  // A map with key is the city names and city occurences
  let cityOccurrences = new Map();
  // A map to store a pair of source city as the key and destination city as the value
  let cityMap = new Map();

  // Iterate over the tripArray to build cityOccurrences and city map
  tripArray.forEach((trip) => {
    // If the cities in source or destination aren't already in the map, create it with occurrence of 0
    if (!cityOccurrences.has(trip.source)) {
      cityOccurrences.set(trip.source, 0);
    }
    if (!cityOccurrences.has(trip.destination)) {
      cityOccurrences.set(trip.destination, 0);
    }
    // Increase the occurrence count for source city
    // Decrease the occurrence count for destination city
    // In the end, city with value of 1 is the starting city, -1 is the final city, 0 are the rest.
    cityOccurrences.set(trip.source, cityOccurrences.get(trip.source) + 1);
    cityOccurrences.set(
      trip.destination,
      cityOccurrences.get(trip.destination) - 1
    );

    // We can also shorten the entire code block above like this, but I've chosen the above for readability
    // cityOccurrences.set(trip.source, (cityOccurrences.get(trip.source) || 0) + 1);
    // cityOccurrences.set(trip.destination, (cityOccurrences.get(trip.destination) || 0) - 1);

    // Build cityMap
    cityMap.set(trip.source, trip.destination);
  });

  // Iterate over the cityOccurrences map to find the starting and final city
  // Raise error if input array is error
  let startCity = '';
  let finalCity = '';

  for (const [key, value] of cityOccurrences) {
    if (value === 1) {
      if (startCity !== '') {
        return 'Error: Duplicate start or end city';
      }
      startCity = key;
    }
    if (value === -1) {
      if (finalCity !== '') {
        return 'Error: Duplicate start or end city';
      }
      finalCity = key;
    }
  }

  if (startCity === '' || finalCity === '') {
    return 'Error: Cannot determine start and end city';
  }

  // With startCity, finalCity and cityMap, we can build the travel order
  let travelOrder = startCity;
  let currentCity = startCity;

  while (currentCity !== finalCity) {
    const nextCity = cityMap.get(currentCity);
    travelOrder += `, ${nextCity}`;
    currentCity = nextCity;
  }
  return travelOrder;
}

module.exports = {
  findTravelOrder,
};
