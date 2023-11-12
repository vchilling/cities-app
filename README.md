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

* Return cities: 

URL: http://localhost:3000/api/cities

Request Parameters: 

<p>_sortBy & sortOrder (optional):_<br>
sortBy - Specifies the field by which the results should be sorted.<br>
Possible values: "name", "population", "area".<br>
Example: sortBy=name<br>
sortOrder- Specifies the order in which the results should be sorted.<br>
Possible values: "asc" (ascending), "desc" (descending).<br>
Example: sortOrder=asc</p>

<p>_nameFilter (optional):_<br>
Filters cities by name based on a partial or complete match.<br>
Example: nameFilter=Los</p>

Examples:

Get all cities:<br>
GET http://localhost:3000/api/cities<br>
Get cities sorted by population in descending order:<br>
GET http://localhost:3000/api/cities?sortBy=population&sortOrder=desc<br>
Get cities filtered by name:<br>
GET http://localhost:3000/api/cities?nameFilter=New<br>
Get cities sorted by population in descending order and filtered by name:<br>
GET http://localhost:3000/api/cities?sortBy=population&sortOrder=desc&nameFilter=New<br>



* Add new city: 

URL: http://localhost:3000/api/cities

Request Parameters:

<p>_name (required):_<br>
The name of the city.<br>
Example: name=New York<p>

<p>_area (required):_<br>
The area of the city in square kilometers.<br>
Example: area=24564<p>

<p>_population (required):_<br>
The population of the city.<br>
Example: population=868548</p>

This endpoint allows the addition of a new city to the backend application.<br>

Example:

POST http://localhost:3000/api/addCity
```
Body:
{
  "name": "New York",
  "area": 24564,
  "population": 868548
}
```