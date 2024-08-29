Weather API Application
This is a simple Weather API application built using Node.js and Express, with SQLite as the database. The application fetches weather data for a specified city using the OpenWeatherMap API and stores the results in an SQLite database.

Features
SQLite Database: The application uses SQLite to store weather data, including city name, temperature, humidity, weather conditions, and timestamp.
Weather Data Fetching: Fetches real-time weather data from the OpenWeatherMap API based on user input.
Form Submission: Users can enter a city name in a form, and the application will display the current weather data for that city.
Data Persistence: All fetched weather data is saved in an SQLite database for future reference.
Technologies Used
Node.js: JavaScript runtime environment.
Express.js: Web application framework for Node.js.
SQLite3: Lightweight, serverless SQL database engine.
Axios: Promise-based HTTP client for making API requests.
OpenWeatherMap API: External API for retrieving weather data.
Getting Started
Prerequisites
Node.js installed on your machine
SQLite installed on your machine
An API key from OpenWeatherMap



Install the dependencies:

npm install
Create a .env file in the root directory and add your OpenWeatherMap API key:
OPENWEATHERMAP_API_KEY=your_openweathermap_api_key

Start the server:
node server.js
Open your browser and go to http://localhost:5000. You will see a form where you can enter a city name to fetch and display the current weather.


Deployed Link:https://backweather.onrender.com/