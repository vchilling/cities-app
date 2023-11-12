# cities-app

Web service that offers an endpoint which returns all cities from JSON file.
Has capability to sort by name / area / population in descending or ascending manner and to filter the cities by name.
There is another endpoint to add new cities with name, population and area.


## Project setup
```
npm install
```

### Getting Started
```
cd src 
node app.js
```
#### Endpoints

Return cities: 

URL: http://localhost:3000/api/cities

Request Parameters: 

sortBy & sortOrder (optional):
sortBy - Specifies the field by which the results should be sorted.
Possible values: "name", "population", "area".
Example: sortBy=name
sortOrder- Specifies the order in which the results should be sorted.
Possible values: "asc" (ascending), "desc" (descending).
Example: sortOrder=asc

nameFilter (optional):
Filters cities by name based on a partial or complete match.
Example: nameFilter=Los

Examples:

Get all cities:
GET http://localhost:3000/api/cities
Get cities sorted by population in descending order:
GET http://localhost:3000/api/cities?sortBy=population&sortOrder=desc
Get cities filtered by name:
GET http://localhost:3000/api/cities?nameFilter=New
Get cities sorted by population in descending order and filtered by name:
GET http://localhost:3000/api/cities?sortBy=population&sortOrder=desc&nameFilter=New



Add new city: 

URL: http://localhost:3000/api/cities

Request Parameters:

name (required):
The name of the city.
Example: name=New York

area (required):
The area of the city in square kilometers.
Example: area=24564

population (required):
The population of the city.
Example: population=868548

This endpoint allows the addition of a new city to the backend application.

Example:

POST http://localhost:3000/api/addCity
Body:
{
  "name": "New York",
  "area": 24564,
  "population": 868548
}