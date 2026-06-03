# Quick Start Guide

## 🚀 One-minute Setup

### Option 1: Use Python (Recommended)

```powershell
# Open the project directory
cd "d:\Microsoft VS Code\Project Location\Observation-Cryptocurrency\Observation-Cryptocurrency"

# Start a local server
python -m http.server 8000

# Open your browser
http://localhost:8000
```

### Option 2: Use VS Code Live Server

1. Install the Live Server extension in VS Code.
2. Right-click `index.html`.
3. Select "Open with Live Server".

### Option 3: Use Node.js

```powershell
# Install http-server once
npm install -g http-server

# Start the server
http-server -p 8000

# Open your browser
http://localhost:8000
```

---

## 📁 File Overview

| File/Folder | Description |
|---------|-------------|
| `index.html` | Main HTML page |
| `css/styles.css` | Global stylesheet |
| `js/app.js` | Main JavaScript logic |
| `assets/` | Asset folder for images and resources |
| `package.json` | Project metadata |
| `README.md` | Project documentation |
| `LICENSE` | MIT license |

---

## ✨ Main Features

### 📊 Real-time Data
- Total market cap
- 24h trading volume
- Bitcoin dominance
- Active cryptocurrency count

### 🪙 Cryptocurrency Details
- Live price information
- 24h and 7d price changes
- Market rank and volume
- 24h high/low values

### 🔍 Search & Sort
- Search by name or symbol
- Sort by market cap, price, or 24h change
- Refresh data manually

### 📈 Market Analysis
- Market overview
- Volatility analysis
- Top gainers and top losers

---

## 🔧 Customization

### Refresh Interval

Open `js/app.js` and modify:

```javascript
const API_CONFIG = {
    baseUrl: 'https://api.coingecko.com/api/v3',
    refreshInterval: 300000 // 5 minutes
};
```

### Number of coins displayed

In `js/app.js`, locate the `fetchCryptoData()` call and update the `per_page` value.

### Theme Colors

Open `css/styles.css` and adjust the variables in the `:root` block:

```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #0ea5e9;
    --success-color: #10b981;
    --danger-color: #ef4444;
}
```

---

## 🐛 Troubleshooting

### Loading stuck after "Loading..."
- Open browser dev tools (F12)
- Check console for errors
- Verify network connectivity
- Ensure CoinGecko API is accessible

### Market data fails to load
- Verify your internet connection
- Refresh the page or restart the server
- Try again later if the API is unavailable

---

## 🌐 Browser Compatibility

| Browser | Notes |
|--------|-------|
| Chrome | Fully supported |
| Firefox | Fully supported |
| Safari | Fully supported |
| Edge | Fully supported |
| IE 11 | Not supported |

---

**Enjoy using the Cryptocurrency Observer!**
