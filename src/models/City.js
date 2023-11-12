class City {
    constructor(name, area, population) {
      this.name = name;
      this.area = area;
      this.population = population;
    }
  
    calculateDensity() {
        this.density = this.population / this.area;
    }
  }
  
  module.exports = City;
  