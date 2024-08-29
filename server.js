require('dotenv').config();
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const axios = require('axios');
const bodyParser = require('body-parser');

// Initialize Express
const app = express();
const port = process.env.PORT || 5000;

// Use body-parser to parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// Connect to SQLite database and create table if it doesn't exist
const db = new sqlite3.Database('./weather.db', (err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
  } else {
    console.log('Connected to SQLite database.');
    db.run(`CREATE TABLE IF NOT EXISTS WeatherData (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      city_name TEXT NOT NULL,
      temperature REAL,
      humidity INTEGER,
      weather_conditions TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
  }
});

// Function to fetch weather data and store it in the database
const getWeatherData = async (city) => {
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;
  try {
    const response = await axios.get('http://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: city,
        appid: apiKey,
        units: 'metric'
      }
    });

    const weatherData = response.data;
    const { temp } = weatherData.main;
    const humidity = weatherData.main.humidity;
    const weatherConditions = weatherData.weather[0].description;

    // Store the data in the database
    db.run(
      `INSERT INTO WeatherData (city_name, temperature, humidity, weather_conditions) VALUES (?, ?, ?, ?)`,
      [city, temp, humidity, weatherConditions],
      (err) => {
        if (err) {
          console.error('Failed to store weather data:', err.message);
        }
      }
    );

    // Return the formatted weather data
    return {
      city: weatherData.name,
      temperature: temp,
      humidity: humidity,
      conditions: weatherConditions
    };
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    throw new Error('Error fetching weather data');
  }
};

// Root route to serve the form and display weather data
app.get('/', (req, res) => {
  res.send(`
    <html>
      <body>
        <h1>Weather API</h1>
        <form method="POST" action="/">
          <label for="city">Enter City Name:</label>
          <input type="text" id="city" name="city" required>
          <button type="submit">Get Weather</button>
        </form>
        ${req.query.city ? `
          <h2>Weather in ${req.query.city}</h2>
          <p>Temperature: ${req.query.temp}°C</p>
          <p>Humidity: ${req.query.humidity}%</p>
          <p>Conditions: ${req.query.conditions}</p>
        ` : ''}
      </body>
    </html>
  `);
});

// POST route to handle form submission and fetch weather data
app.post('/', async (req, res) => {
  const city = req.body.city;
  try {
    const weatherData = await getWeatherData(city);
    res.redirect(`/?city=${weatherData.city}&temp=${weatherData.temperature}&humidity=${weatherData.humidity}&conditions=${weatherData.conditions}`);
  } catch (error) {
    res.status(500).send('Error fetching weather data');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
