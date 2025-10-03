<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Weather App Simulator</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
    }
    .log {
      margin-bottom: 10px;
    }
    .success {
      color: green;
    }
    .error {
      color: red;
    }
  </style>
</head>
<body>

  <h1>Weather App Simulator</h1>
  <div id="output"></div>

  <script>
    // Utility to log messages to the page
    function logMessage(message, type = 'log') {
      const div = document.createElement('div');
      div.className = `log ${type}`;
      div.textContent = message;
      document.getElementById('output').appendChild(div);
    }

    // Simulated weather data fetcher with random delay and failure
    function fetchWeather(city) {
      return new Promise((resolve, reject) => {
        const delay = Math.floor(Math.random() * 2000) + 1000; // 1-3 seconds
        setTimeout(() => {
          const success = Math.random() < 0.8; // 80% chance of success
          if (success) {
            const temperature = (Math.random() * 30 + 10).toFixed(1); // 10°C - 40°C
            const conditions = ['Sunny', 'Cloudy', 'Rainy', 'Windy', 'Snowy'];
            const condition = conditions[Math.floor(Math.random() * conditions.length)];
            resolve({ city, temperature, condition });
          } else {
            reject(`Failed to fetch weather for ${city}`);
          }
        }, delay);
      });
    }

    // Sequential async calls (one after another)
    async function getWeatherSequential(cities) {
      logMessage('--- Sequential Fetch ---');
      for (const city of cities) {
        try {
          const data = await fetchWeather(city);
          logMessage(`${data.city}: ${data.temperature}°C, ${data.condition}`, 'success');
        } catch (error) {
          logMessage(error, 'error');
        }
      }
    }

    // Parallel async calls (all at once)
    async function getWeatherParallel(cities) {
      logMessage('--- Parallel Fetch ---');
      const promises = cities.map(city => fetchWeather(city));

      const results = await Promise.allSettled(promises);
      results.forEach((result, index) => {
        const city = cities[index];
        if (result.status === 'fulfilled') {
          const data = result.value;
          logMessage(`${data.city}: ${data.temperature}°C, ${data.condition}`, 'success');
        } else {
          logMessage(`Error: ${result.reason}`, 'error');
        }
      });
    }

    // Main runner
    async function runApp() {
      const cities = ['New York', 'London', 'Tokyo', 'Paris', 'Sydney'];
      await getWeatherSequential(cities);     // Sequential fetch
      await getWeatherParallel(cities);       // Parallel fetch
    }

    // Start the simulation on page load
    runApp();
  </script>

</body>
</html>
