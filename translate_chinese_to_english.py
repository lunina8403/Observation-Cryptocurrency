from pathlib import Path

root = Path(__file__).parent
files = {
    'index.html': None,
    'js/app.js': None,
    'css/styles.css': None,
    'README.md': None,
    'QUICKSTART.md': None,
}
translations = [
    # index.html and js/app.js UI text
    ('lang="zh-CN"', 'lang="en"'),
    ('<!-- 导航栏 -->', '<!-- Navbar -->'),
    ('<!-- 主容器 -->', '<!-- Main Container -->'),
    ('<!-- 英雄区域 -->', '<!-- Hero Section -->'),
    ('<!-- 统计信息区域 -->', '<!-- Stats Section -->'),
    ('<!-- 概览区域 -->', '<!-- Overview Section -->'),
    ('<!-- 分析区域 -->', '<!-- Analysis Section -->'),
    ('<!-- 投资组合区域 -->', '<!-- Portfolio Section -->'),
    ('<!-- 币种对比分析区域 -->', '<!-- Comparison Section -->'),
    ('<!-- 价格图表区域 -->', '<!-- Charts Section -->'),
    ('<!-- AI 市场预测区域 -->', '<!-- AI Prediction Section -->'),
    ('<!-- 实时价格推送区域 -->', '<!-- Realtime Price Section -->'),
    ('<!-- 行业新闻区域 -->', '<!-- News Section -->'),
    ('<!-- 关于区域 -->', '<!-- About Section -->'),
    ('<!-- 币种详情模态框 -->', '<!-- Crypto Detail Modal -->'),
    ('<!-- 页脚 -->', '<!-- Footer -->'),
    ('<!-- 加载 Chart.js 库 -->', '<!-- Load Chart.js Library -->'),
    ('<!-- Three.js CDN -->', '<!-- Three.js CDN -->'),
    ('<!-- 加载自定义脚本 -->', '<!-- Load Custom Script -->'),
    ('加密货币观测', 'Cryptocurrency Observer'),
    ('首页', 'Home'),
    ('概览', 'Overview'),
    ('分析', 'Analysis'),
    ('投资组合', 'Portfolio'),
    ('对比分析', 'Comparison'),
    ('价格图表', 'Price Charts'),
    ('AI预测', 'AI Prediction'),
    ('实时推送', 'Realtime Feed'),
    ('行业新闻', 'News'),
    ('关于', 'About'),
    ('切换主题', 'Toggle Theme'),
    ('全球加密货币实时观测', 'Global Cryptocurrency Live Tracker'),
    ('洞察市场趋势，助力投资决策', 'Gain market insights for smarter investing'),
    ('开始观测', 'Start Tracking'),
    ('市场总值', 'Total Market Cap'),
    ('24小时交易量', '24h Volume'),
    ('比特币占比', 'Bitcoin Dominance'),
    ('上市币种数', 'Active Cryptocurrencies'),
    ('个', 'coins'),
    ('主流加密货币实时行情', 'Leading Cryptocurrency Market Data'),
    ('监测全球市场领先的加密货币', 'Track top global cryptocurrencies'),
    ('搜索加密货币...', 'Search cryptocurrencies...'),
    ('按市值排序', 'Sort by Market Cap'),
    ('按价格排序', 'Sort by Price'),
    ('按涨跌幅排序', 'Sort by 24h Change'),
    ('刷新', 'Refresh'),
    ('导出', 'Export'),
    ('加载中...', 'Loading...'),
    ('市场分析', 'Market Analysis'),
    ('深入了解市场趋势和动向', 'Explore market trends and momentum'),
    ('市场概况', 'Market Overview'),
    ('价格波动分析', 'Volatility Analysis'),
    ('赚钱榜（24h）', 'Top Gainers (24h)'),
    ('亏损榜（24h）', 'Top Losers (24h)'),
    ('加载市场数据中...', 'Loading market data...'),
    ('分析数据加载中...', 'Loading analysis data...'),
    ('我的投资组合', 'My Portfolio'),
    ('管理和追踪您的加密货币投资', 'Manage and track your crypto investments'),
    ('添加持仓', 'Add Position'),
    ('币种名称或代码', 'Crypto name or symbol'),
    ('持仓数量', 'Amount'),
    ('买入价格', 'Buy Price'),
    ('投资组合概览', 'Portfolio Summary'),
    ('总投资额', 'Total Invested'),
    ('当前价值', 'Current Value'),
    ('收益/亏损', 'Gain/Loss'),
    ('收益率', 'Return Rate'),
    ('币种对比分析', 'Crypto Comparison'),
    ('对比多个币种的关键指标', 'Compare key metrics across multiple coins'),
    ('选择币种1', 'Choose coin 1'),
    ('选择币种2', 'Choose coin 2'),
    ('清空对比', 'Clear Comparison'),
    ('价格走势分析', 'Price Trend Analysis'),
    ('查看加密货币历史价格走势', 'View historical cryptocurrency price trends'),
    ('选择币种', 'Choose coin'),
    ('7日走势', '7-day trend'),
    ('30日走势', '30-day trend'),
    ('1年走势', '1-year trend'),
    ('查看图表', 'View Chart'),
    ('AI 市场预测', 'AI Market Prediction'),
    ('基于技术分析和历史数据的价格预测', 'Price forecasts based on technical and historical data'),
    ('选择币种并点击"生成预测"', 'Choose a coin and click "Generate Prediction"'),
    ('实时价格推送', 'Real-time Price Feed'),
    ('WebSocket 实时价格数据流', 'WebSocket live price stream'),
    ('连接实时数据', 'Connect Live Data'),
    ('未连接', 'Disconnected'),
    ('行业动态', 'Market News'),
    ('最新加密货币市场资讯', 'Latest crypto market updates'),
    ('全部', 'All'),
    ('比特币', 'Bitcoin'),
    ('以太坊', 'Ethereum'),
    ('响应式设计', 'Responsive Design'),
    ('完美适配各类设备，随时随地观测加密货币市场动态。', 'Fully responsive across devices for tracking crypto markets anywhere.'),
    ('安全可靠', 'Secure & Reliable'),
    ('采用安全的数据加密技术，保护用户信息隐私。', 'Uses secure data handling to protect user privacy.'),
    ('实时数据', 'Live Data'),
    ('使用 CoinGecko API 获取实时的加密货币数据，确保信息准确无误。', 'Uses the CoinGecko API for live crypto data and reliable information.'),
    ('市场分析', 'Market Insights'),
    ('提供详细的市场分析和趋势预测，帮助投资者做出明智决策。', 'Offers detailed market analysis and trend forecasts to help investors make smarter decisions.'),
    ('项目描述', 'Project Description'),
    ('官方链接', 'Official Links'),
    ('添加收藏', 'Add to Favorites'),
    ('设置预警', 'Set Alert'),
    ('添加到组合', 'Add to Portfolio'),
    ('关闭', 'Close'),
    ('加密货币观测平台', 'Cryptocurrency Observation Platform'),
    ('版权所有。', 'All rights reserved.'),
    ('数据来源:', 'Data Source:'),
    ('交易量:', 'Volume:'),
    ('暂无持仓', 'No holdings available'),
    ('请输入币种名称或代码', 'Please enter a crypto name or symbol'),
    ('未找到该币种，请输入正确的币种名称或代码', 'Coin not found, please enter a valid name or symbol'),
    ('确定要删除该持仓吗？', 'Are you sure you want to delete this position?'),
    ('暂无对比数据，请选择币种对比', 'No comparison data yet. Please select coins to compare.'),
    ('请选择币种', 'Please select a coin'),
    ('未找到该币种', 'Coin not found'),
    ('暂无相关新闻', 'No news available'),
    ('暂无描述', 'No description available'),
    ('刚刚', 'Just now'),
    ('分钟前', ' minutes ago'),
    ('小时前', ' hours ago'),
    ('天前', ' days ago'),
    ('请选择一个币种', 'Please select a coin'),
    ('未找到该加密货币', 'Cryptocurrency not found'),
    ('获取预测数据失败', 'Failed to fetch prediction data'),
    ('已达到预警价格！目标:', 'has reached the alert price! Target:'),
    ('当前:', 'Current:'),
    ('加密货币预警', 'Crypto Alert'),
    ('收藏', 'Favorite'),
    ('获取全球数据失败', 'Failed to fetch global data'),
    ('无法获取市场数据', 'Unable to fetch market data'),
    ('获取加密货币数据失败', 'Failed to fetch cryptocurrency data'),
    ('无法获取加密货币数据', 'Unable to fetch cryptocurrency data'),
    ('获取涨跌数据失败', 'Failed to fetch price change data'),
    ('加载数据失败，请稍后重试', 'Failed to load data. Please try again later.'),
    ('更新全球统计错误:', 'Error updating global stats:'),
    ('收藏成功', 'Added to favorites'),
    ('请输入完整且有效的数据', 'Please enter complete and valid data'),
    ('未找到该币种', 'Coin not found'),
    ('该币种已添加到对比', 'This coin is already added for comparison'),
    ('加载中...', 'Loading...'),
    ('交易量: $', 'Volume: $'),
    ('当前价格', 'Current Price'),
    ('24小时涨跌', '24h Change'),
    ('7天涨跌', '7d Change'),
    ('30天涨跌', '30d Change'),
    ('市场数据', 'Market Data'),
    ('市值排名', 'Market Rank'),
    ('流通市值占比', 'Market Cap Dominance'),
    ('价格范围', 'Price Range'),
    ('24小时最高价', '24h High'),
    ('24小时最低价', '24h Low'),
    ('历史最高价', 'All-Time High'),
    ('历史最低价', 'All-Time Low'),
    ('额外信息', 'Additional Info'),
    ('流通供应量', 'Circulating Supply'),
    ('总供应量', 'Total Supply'),
    ('最大供应量', 'Max Supply'),
    ('加密货币详细信息加载中...', 'Loading cryptocurrency details...'),
    ('暂无描述', 'No description available'),
    ('官网', 'Website'),
    ('浏览器', 'Explorer'),
    ('代码', 'Code'),
    ('白皮书', 'Whitepaper'),
    ('Twitter', 'Twitter'),
    ('GitHub', 'GitHub'),
    ('暂无官方链接', 'No official links available'),
    ('获取详细信息失败', 'Failed to fetch detailed information'),
    ('请输入', 'Please enter'),
    ('请输入有效的数量', 'Please enter a valid quantity'),
    ('已添加', 'Added'),
    ('到投资组合', 'to portfolio'),
    ('到投资组合', 'to portfolio'),
    ('滚动到指定区域', 'Scroll to section'),
]
# README and QUICKSTART will be overwritten with full English versions.
readme_content = """# Cryptocurrency Observation Platform 🚀

## Observation-Cryptocurrency

A professional cryptocurrency market observation platform that provides real-time data, market analysis, and trend forecasting.

---

## 📋 Features

### ✨ Core Features
- **📊 Real-time Market Display**: Track live prices and market data for leading global cryptocurrencies.
- **📈 Trend Analysis**: View 24-hour, 7-day changes and volatility metrics.
- **💹 Market Overview**: See key indicators such as total market cap, trading volume, and Bitcoin dominance.
- **🔍 Advanced Search**: Search and sort cryptocurrencies quickly.
- **📱 Responsive Design**: Optimized for desktop, tablet, and mobile devices.
- **🔄 Auto Refresh**: Market data refreshes automatically every 5 minutes.
- **🎯 Market Insights**: Top gainers and losers rankings.
- **💰 Detailed Data**: Market cap, volume, 24h high/low, and more.

### 🎨 User Experience
- Light/Dark theme toggle with localStorage persistence.
- Modern visual design and smooth animations.
- Clear data visualization and interaction.
- Fast and intuitive navigation.

### 💼 Advanced Features

#### 1️⃣ Portfolio Management
- ➕ Add portfolio positions with amounts and buy prices.
- 💵 Automatically calculate cost and current value.
- 📊 Track profit/loss and return percentages.
- 📥 Export portfolio data to CSV.

#### 2️⃣ Price Alert System
- 🔔 Set target price alerts.
- 🔊 Browser notifications for alerts.
- 📝 Manage multiple alert rules.
- 💾 Store alert settings locally.

#### 3️⃣ Crypto Comparison
- 🔀 Compare multiple coins side by side.
- 📊 View key metric comparisons.
- 💡 Quickly identify investment opportunities.

#### 4️⃣ Technical Indicators
- 📉 RSI (Relative Strength Index)
- 📊 Volatility analysis
- 💪 Market strength scoring
- 🎯 Support and resistance levels

#### 5️⃣ Price Charts
- 📈 7-day, 30-day, and 1-year trends
- 🔍 Data displayed with Chart.js
- 📊 Interactive visualization

#### 6️⃣ Market News Feed
- 📰 Real-time news updates
- 🔍 Filter by category (Bitcoin/Ethereum/DeFi)
- 🔗 Open original articles with one click
- ⏱ Relative timestamp display

#### 7️⃣ Favorites Tracking
- ⭐ Mark favorite coins
- 💾 Store favorites locally
- 🔖 Access tracked coins quickly

#### 8️⃣ AI Market Prediction ✨
- 🤖 Intelligent forecasts based on historical data
- 📊 RSI, momentum, and trend scoring
- 🎯 Bullish, bearish, or neutral signals
- 💯 Confidence scores (0-100%)
- 📍 Support and resistance estimates

#### 9️⃣ Real-time Price Feed ✨
- 🌐 Live price updates (simulated polling)
- 💰 Shows current price and 24h change
- 📊 Displays trading volume
- 🔌 Connection status updates

---

## 🛠️ Technology Stack

### Front-end
- **HTML5**: Semantic structure and forms
- **CSS3**: Responsive design and modern styling
  - CSS variables for theming
  - Flexbox and Grid layouts
  - Gradients, shadows, and transitions
  - Mobile media queries
- **JavaScript (ES6+)**: Dynamic functionality and interaction
  - Async data fetching
  - Live updates and polling
  - DOM manipulation and event handling
  - localStorage persistence

### APIs and Libraries
- **CoinGecko API**: Free cryptocurrency data API
- **Chart.js**: Chart visualization library
- **Font Awesome 6**: Icon library

---

## 📁 Project Structure

```
Observation-Cryptocurrency/
├── index.html              # Main page
├── css/
│   └── styles.css          # Global stylesheet
├── js/
│   └── app.js              # Main JavaScript logic
├── assets/                 # Asset files (images, icons, etc.)
├── README.md               # Project documentation
└── QUICKSTART.md           # Quick start guide
```

### File Overview

#### `index.html`
- Main page structure
- Includes navigation, hero section, stats, and crypto content
- Loads CSS and JavaScript resources

#### `css/styles.css`
- Complete styling for the app
- Theme variables and responsive rules
- Component styles for cards, grids, and buttons

#### `js/app.js`
- API fetching and data handling
- Search, sort, and filter logic
- Portfolio and comparison features
- Market analysis and news display

---

## 🚀 Quick Start

### Requirements
- Modern browser (Chrome, Firefox, Safari, Edge)
- Internet connection for CoinGecko data

### Run Locally

1. Clone the repository:
```bash
git clone https://github.com/lunina8403/Observation-Cryptocurrency.git
cd Observation-Cryptocurrency
```
2. Start a local server:
- Python:
```bash
python -m http.server 8000
```
- Node.js with http-server:
```bash
npm install -g http-server
http-server -p 8000
```
- VS Code Live Server: Open `index.html` with Live Server

3. Open in browser:
```text
http://localhost:8000
```

---

## 💡 Notes

- The app uses public APIs and may depend on external availability.
- Adjust refresh settings in `js/app.js` as needed.
- Use browser developer tools to debug network or console issues.

---

## 📚 Resources

- [CoinGecko API](https://www.coingecko.com/en/api)
- [Chart.js](https://www.chartjs.org/)
- [MDN Web Docs](https://developer.mozilla.org/)

---

## ✅ Improvements

- Add full internationalization support
- Add price alert settings UI
- Improve chart interaction and analytics
- Add user preferences and saved portfolios
- Integrate TradingView or advanced charts

---

**Enjoy exploring cryptocurrency data!**
"""

quickstart_content = """# Quick Start Guide

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
"""

replacements = [
    # CSS comment translations
    ('   全局样式和重置', '   Global Styles and Reset'),
    ('/* 浅色主题 */', '/* Light Theme */'),
    ('   导航栏', '   Navbar'),
    ('   主题切换按钮', '   Theme Toggle Button'),
    ('   英雄区域', '   Hero Section'),
    ('   统计区域', '   Stats Section'),
    ('   主容器', '   Main Container'),
    ('   分类区域', '   Section Layout'),
    ('   过滤控制', '   Filter Controls'),
    ('   加密货币网格', '   Crypto Grid'),
    ('   分析区域', '   Analysis Section'),
    ('   投资组合区域', '   Portfolio Section'),
    ('   币种对比分析区域', '   Comparison Section'),
    ('   价格图表区域', '   Charts Section'),
    ('   AI 市场预测区域', '   AI Prediction Section'),
    ('   实时价格推送区域', '   Realtime Price Section'),
    ('   新闻区域', '   News Section'),
    ('   页脚', '   Footer'),
    ('   币种详情模态框', '   Detail Modal'),
    ('   响应式设计 - 平板设备 (768px 以下)', '   Responsive Design - Tablet Devices (below 768px)'),
    ('    /* 导航栏优化 */', '    /* Navbar Optimization */'),
    ('    /* Hero 区域 */', '    /* Hero Section */'),
    ('    /* 统计卡片 */', '    /* Stats Cards */'),
    ('    /* 主容器 */', '    /* Main Container */'),
    ('    /* 分类区域 */', '    /* Section Layout */'),
    ('    /* 过滤控制 */', '    /* Filter Controls */'),
    ('    /* 加密货币网格 */', '    /* Crypto Grid */'),
    ('    /* 分析网格 */', '    /* Analysis Grid */'),
    ('    /* 投资组合 */', '    /* Portfolio */'),
    ('    /* 对比分析 */', '    /* Comparison */'),
    ('    /* 图表区域 */', '    /* Charts Section */'),
    ('    /* AI 预测区域 */', '    /* AI Prediction Section */'),
    ('    /* 实时推送区域 */', '    /* Realtime Section */'),
    ('    /* 新闻区域 */', '    /* News Section */'),
    ('    /* 模态框 */', '    /* Modal */'),
    ('    /* 关于区域 */', '    /* About Section */'),
    ('    /* 页脚 */', '    /* Footer */'),
    ('   响应式设计 - 手机设备 (480px 以下)', '   Responsive Design - Mobile Devices (below 480px)'),
    # Specific JS replacements to fix English output and locale
    ('toLocaleDateString(\'zh-CN\'', 'toLocaleDateString(\'en-US\''),
    ('const description = data.description?.zh || data.description?.en || \'暂无描述\'' , 'const description = data.description?.en || data.description?.zh || \'No description available\''),
    ('event.target.classList.add(\'active\');', 'if (event && event.target) { event.target.classList.add(\'active\'); }'),
    ('function filterNews(category) {', 'function filterNews(category, event) {'),
    ('onclick="filterNews(\'all\')"', 'onclick="filterNews(\'all\', event)"'),
    ('onclick="filterNews(\'bitcoin\')"', 'onclick="filterNews(\'bitcoin\', event)"'),
    ('onclick="filterNews(\'ethereum\')"', 'onclick="filterNews(\'ethereum\', event)"'),
    ('onclick="filterNews(\'defi\')"', 'onclick="filterNews(\'defi\', event)"'),
    # Safety replacements for filterNews event handling may duplicate if exact string isn't found, but that's okay.
]

# Combine translations and replacements
translations.extend(replacements)

for rel_path, override in files.items():
    path = root / rel_path
    if not path.exists():
        print(f"Missing file: {path}")
        continue
    text = path.read_text(encoding='utf-8')
    if rel_path == 'README.md':
        if '加密货币观测平台' in text or 'Observation-Cryptocurrency' in text:
            path.write_text(readme_content, encoding='utf-8')
            print(f"Rewrote {rel_path}")
        continue
    if rel_path == 'QUICKSTART.md':
        path.write_text(quickstart_content, encoding='utf-8')
        print(f"Rewrote {rel_path}")
        continue
    original = text
    for old, new in translations:
        text = text.replace(old, new)
    if text != original:
        path.write_text(text, encoding='utf-8')
        print(f"Updated {rel_path}")
    else:
        print(f"No changes for {rel_path}")
