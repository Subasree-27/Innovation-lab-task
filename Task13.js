<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Live Crypto Price Ticker</title>
<style>
  body {
    font-family: Arial, sans-serif;
    padding: 20px;
    max-width: 500px;
    margin: auto;
  }
  #prices {
    margin-top: 20px;
  }
  .crypto {
    margin-bottom: 10px;
  }
  #loading {
    color: orange;
    font-weight: bold;
    display: none;
  }
  button {
    margin-right: 10px;
    padding: 10px 20px;
    font-size: 1rem;
  }
</style>
</head>
<body>

<h1>Live Crypto Price Ticker</h1>

<div>
  <button id="start-btn">Start Updates</button>
  <button id="stop-btn" disabled>Stop Updates</button>
</div>

<div id="loading">Loading prices...</div>

<div id="prices"></div>

<script>
  const pricesDiv = document.getElementById('prices');
  const loadingDiv = document.getElementById('loading');
  const startBtn = document.getElementById('start-btn');
  const stopBtn = document.getElementById('stop-btn');

  let intervalId = null;
  let loadingTimeout = null;

  // Crypto IDs we want to track (CoinGecko IDs)
  const cryptos = ['bitcoin', 'ethereum', 'dogecoin'];

  // Function to fetch prices from CoinGecko API
  async function fetchPrices() {
    // Show loading message if fetch takes longer than 5 seconds
    loadingTimeout = setTimeout(() => {
      loadingDiv.style.display = 'block';
    }, 5000);

    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${cryptos.join(',')}&vs_currencies=usd`);

      clearTimeout(loadingTimeout);
      loadingDiv.style.display = 'none';

      if (!response.ok) {
        throw new Error('Failed to fetch prices');
      }

      const data = await response.json();

      // Clear previous prices
      pricesDiv.innerHTML = '';

      cryptos.forEach(crypto => {
        const price = data[crypto]?.usd;

        const priceDiv = document.createElement('div');
        priceDiv.className = 'crypto';

        if (price !== undefined) {
          priceDiv.textContent = `${crypto.charAt(0).toUpperCase() + crypto.slice(1)}: $${price.toLocaleString()}`;
        } else {
          priceDiv.textContent = `${crypto.charAt(0).toUpperCase() + crypto.slice(1)}: Price not available`;
        }

        pricesDiv.appendChild(priceDiv);
      });
    } catch (error) {
      clearTimeout(loadingTimeout);
      loadingDiv.style.display = 'none';
      pricesDiv.innerHTML = `<div style="color:red;">Error: ${error.message}</div>`;
    }
  }

  // Start periodic price updates
  function startUpdates() {
    if (intervalId) return; // Already running
    fetchPrices(); // Initial fetch immediately
    intervalId = setInterval(fetchPrices, 10000); // Refresh every 10 seconds
    startBtn.disabled = true;
    stopBtn.disabled = false;
  }

  // Stop periodic price updates
  function stopUpdates() {
    clearInterval(intervalId);
    intervalId = null;
    startBtn.disabled = false;
    stopBtn.disabled = true;
  }

  // Button event listeners
  startBtn.addEventListener('click', startUpdates);
  stopBtn.addEventListener('click', stopUpdates);

  // Optionally start updates automatically on page load:
  // startUpdates();
</script>

</body>
</html>
