README file for the weather app

Instructions for use...

cd into group13-weather-app

Dependency installations:
- npm install react
- npm install axios
- npm install react-router-dom
- npm install @vis.gl/react-google-maps
- npm install leaflet

To start the weather app just npm start / npm run start in the group13-weather-app folder.

The weather app is best used in mobile format so in the browser have a width of 768px however, it is responsive to standard desktop size.

When launching the weather app, the default location is Cape Town in South Africa. To change location, just search a location in the search box and press search. Any location can be used for the main page and the wind page but there is a restriction on the API for the wave page to only allow coastal locations. If a location is not valid for the wave page, the places where API data would normally appear shows as 'Not a valid location'. To solve this issue, go back to the main page and search for a coastal location.


Everything is included in the file but if only the src folder is used, do the following below
Lines of html to add to index.html in the public folder

<meta name="viewport" content="width=device-width, initial-scale=1">
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="../src/Components/WeatherApp.css">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Weather App</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>


