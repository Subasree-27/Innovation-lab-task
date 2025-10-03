<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Weather App Simulator</title>
<style>
  body {
    font-family: Arial, sans-serif;
    padding: 20px;
  }
  .log {
    margin-bottom: 8px;
  }
  .success {
    color: green;
  }
  .error {
    color: red;
  }
  h2 {
    margin-top: 40px;
  }
</style>
</head>
<body>

<h1>Weather App Simulator</h1>

<div id="output"></div>

<script>
  const output = document.getElementById('output');

  // Utility to add messages to output
  function log(message, type = 'log') {
    const div = document.createElement('div');
    div.className = `log ${type}`;
    div.textContent = message;
    output.appendChild(div);
  }

  // Simulated fetchWeather function returning a Promise with delay and random failure
  function fetchWeather(city) {
    return new Promise((resolve, reject) => {
      const delay = Math.random() * 2000 + 1000; // 1-3 seconds delay
      setTimeout(() => {
        const success = Math.random() < 0.8; // 80% chance success
        if(success) {
          const temperature = (Math.random() * 25 + 5).toFixed(1); // 5°C to 30°C
          const conditions = ['Sunny', 'Cloudy', 'Rainy', 'Snowy', 'Windy'];
          const condition = conditions[Math.floor(Math.random() * conditions.length)];
          resolve({ city, temperature, condition });
        } else {
          reject(`Failed to fetch weather for ${city}`);
        }
      }, delay);
    });
  }

  // Sequential fetch: one city after another
  async function fetchSequential(cities) {
    log('--- Sequential Weather Fetch ---');
    for(const city of cities) {
      try {
        const data = await fetchWeather(city);
        log(`${data.city}: ${data.temperature}°C, ${data.condition}`, 'success');
      } catch(err) {
        log(err, 'error');
      }
    }
  }

  // Parallel fetch: all at once
  async function fetchParallel(cities) {
    log('--- Parallel Weather Fetch ---');
    const promises = cities.map(city => fetchWeather(city));
    const results = await Promise.allSettled(promises);
    results.forEach((result, idx) => {
      if(result.status === 'fulfilled') {
        const data = result.value;
        log(`${data.city}: ${data.temperature}°C, ${data.condition}`, 'success');
      } else {
        log(result.reason, 'error');
      }
    });
  }

  // Run both sequential and parallel fetches
  async function run() {
    const cities = ['New York', 'London', 'Tokyo', 'Paris', 'Sydney'];
    await fetchSequential(cities);
    await fetchParallel(cities);
  }

  run();
</script>

</body>
</html>
