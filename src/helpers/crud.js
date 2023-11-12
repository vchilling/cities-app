const fs = require('fs');
const path = require('path');
let dataFilePath = path.join(__dirname, '../../data/cities.json');

async function readCitiesData() {
    try {
      let rawData = await fs.promises.readFile(dataFilePath);
      let cities = JSON.parse(rawData);
      return cities;
    } catch (error) {
      console.error('Error reading data file:', error);
      return error;
    }
  }

  async function writeCitiesData(cities) {
    try {
        await fs.promises.writeFile(dataFilePath, JSON.stringify(cities, null, 2));
    } catch (error) {
        console.error('Error writing data file:', error);
    }
  }

  module.exports = {
    readCitiesData,
    writeCitiesData,
  };