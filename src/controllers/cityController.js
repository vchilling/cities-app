const City = require('../models/City');
const { readCitiesData, writeCitiesData } = require('../helpers/crud');

function sortCities(citiesData, sortBy, sortOrder) {
  const validSortFields = ['name', 'area', 'population'];
  const validSortOrders = ['asc', 'desc'];

  if (!validSortFields.includes(sortBy) || !validSortOrders.includes(sortOrder)) {
    throw new Error('Invalid sorting parameters');
  }

  citiesData.sort((a, b) => {
    let aValue = sortBy === 'name' ? a[sortBy].toLowerCase() : a[sortBy];
    let bValue = sortBy === 'name' ? b[sortBy].toLowerCase() : b[sortBy];

    if (sortOrder === 'asc') {
      return aValue < bValue ? -1 : 1;
    } else {
      return aValue > bValue ? -1 : 1;
    }
  });
}

function filterCitiesByName(citiesData, nameFilter) {
  return citiesData.filter(city => city.name.toLowerCase().includes(nameFilter.toLowerCase()));
}

module.exports = {
  getCities: async (req, res) => {
    try {
      let citiesData = await readCitiesData();

      if (req.query.nameFilter) {
        let nameFilter = req.query.nameFilter;
        citiesData = filterCitiesByName(citiesData, nameFilter);
      }

      if (req.query.sortBy && req.query.sortOrder) {
        let sortBy = req.query.sortBy;
        let sortOrder = req.query.sortOrder;
        sortCities(citiesData, sortBy, sortOrder);
      }

      let cities = citiesData.map(cityData => new City(cityData.name, cityData.area, cityData.population));
      cities.forEach(city => city.calculateDensity());
      res.json(cities);

    } catch (error) {
      console.error('Error getting cities:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  },

  addCity: async (req, res) => {
    let newCityData = req.body;
    let cities = await readCitiesData();

    try {
      let newCity = new City(newCityData.name, newCityData.area, newCityData.population);

      if (!newCity || !newCity.name || !newCity.area || !newCity.population) {
        return res.status(400).json({ error: 'Invalid input. Please provide name, population, and area for the new city.' });
      }

      if (cities.some(city => city.name.toLowerCase() === newCity.name.toLowerCase())) {
        return res.status(400).json({ error: 'City with the same name already exists.' });
      }

      if (newCity.name.trim() === '') {
        return res.status(400).json({ error: 'City name should not be an empty string.' });
      }

      if (typeof newCity.name !== 'string' || typeof newCity.area !== 'number' || typeof newCity.population !== 'number') {
        return res.status(400).json({ error: 'Invalid data types. Name should be a string, population and area should be numbers.' });
      }

      if (newCity.area <= 0) {
        return res.status(400).json({ error: 'Area must be a positive value.' });
      }

      if (newCity.population <= 0 || !Number.isInteger(newCity.population)) {
        return res.status(400).json({ error: 'Population must be a whole number with a positive value.' });
      }

      cities.push(newCity);
      await writeCitiesData(cities);
      res.json({ message: 'City added successfully', newCity });

    } catch (error) {
      console.error('Error adding city:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  },
};