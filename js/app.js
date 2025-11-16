// ============================================
// 加密货币观测平台 - JavaScript 主文件
// ============================================

// API 配置
const API_CONFIG = {
    baseUrl: 'https://api.coingecko.com/api/v3',
    refreshInterval: 300000 // 5分钟刷新一次
};

// 应用状态
let appState = {
    cryptoData: [],
    filteredData: [],
    sortBy: 'market_cap',
    searchQuery: '',
    autoRefreshInterval: null,
    favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
    alerts: JSON.parse(localStorage.getItem('alerts') || '{}'),
    portfolio: JSON.parse(localStorage.getItem('portfolio') || '[]')
};

// ============================================
// 初始化函数
// ============================================
// 初始化函数
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('应用初始化中...');
    initTheme();
    setupEventListeners();
    loadCryptoData();
    setupAutoRefresh();
    loadNews();
    setTimeout(() => {
        displayPortfolio();
        updatePortfolioStats();
    }, 1000);
});

// ============================================
// 主题切换函数
// ============================================
function initTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');
    
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    }
    
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
        updateThemeIcon(savedTheme);
    }
}

function toggleTheme() {
    const isLight = document.body.classList.toggle('light-theme');
    const theme = isLight ? 'light' : 'dark';
    localStorage.setItem('theme', theme);
    updateThemeIcon(theme);
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }
}

// ============================================
// 事件监听器设置
// ============================================
function setupEventListeners() {
    // 导航栏
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });

    // 汉堡菜单
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // 搜索框
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }

    // 排序选择
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', handleSort);
    }

    // 刷新按钮
    const refreshBtn = document.getElementById('refreshBtn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            refreshBtn.querySelector('i').classList.add('fa-spin');
            loadCryptoData().then(() => {
                refreshBtn.querySelector('i').classList.remove('fa-spin');
            });
        });
    }

    // 导出按钮
    const exportBtn = document.getElementById('exportBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportToCSV);
    }
}

// ============================================
// API 数据获取函数
// ============================================

/**
 * 获取全球市场数据
 */
async function fetchGlobalData() {
    try {
        const response = await fetch(
            `${API_CONFIG.baseUrl}/global?localization=false`
        );
        if (!response.ok) throw new Error('获取全球数据失败');
        const data = await response.json();
        updateGlobalStats(data.data);
    } catch (error) {
        console.error('获取全球数据错误:', error);
        showErrorMessage('无法获取市场数据');
    }
}

/**
 * 获取主流加密货币数据
 */
async function fetchCryptoData() {
    try {
        const response = await fetch(
            `${API_CONFIG.baseUrl}/coins/markets?` +
            `vs_currency=usd` +
            `&order=market_cap_desc` +
            `&per_page=50` +
            `&page=1` +
            `&sparkline=false`
        );
        if (!response.ok) throw new Error('获取加密货币数据失败');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('获取加密货币数据错误:', error);
        showErrorMessage('无法获取加密货币数据');
        return [];
    }
}

/**
 * 获取涨跌幅最大的币种
 */
async function fetchTopMovers() {
    try {
        const response = await fetch(
            `${API_CONFIG.baseUrl}/coins/markets?` +
            `vs_currency=usd` +
            `&order=market_cap_desc` +
            `&per_page=100` +
            `&page=1` +
            `&sparkline=false`
        );
        if (!response.ok) throw new Error('获取涨跌数据失败');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('获取涨跌数据错误:', error);
        return [];
    }
}

// ============================================
// 数据加载主函数
// ============================================
async function loadCryptoData() {
    const cryptoGrid = document.getElementById('cryptoGrid');
    if (!cryptoGrid) return;

    cryptoGrid.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> 加载中...</div>';

    try {
        // 并行加载数据
        const [marketData, cryptoData, topMovers] = await Promise.all([
            fetchGlobalData(),
            fetchCryptoData(),
            fetchTopMovers()
        ]);

        if (Array.isArray(cryptoData)) {
            appState.cryptoData = cryptoData;
            appState.filteredData = [...cryptoData];
            displayCryptoCards();
            analyzeMarket(topMovers);
            checkAlerts();
        }
    } catch (error) {
        console.error('加载数据错误:', error);
        cryptoGrid.innerHTML = '<div class="loading" style="grid-column: 1/-1; color: #ef4444;">加载数据失败，请稍后重试</div>';
    }
}

// ============================================
// 更新全球统计信息
// ============================================
function updateGlobalStats(data) {
    try {
        // 市场总值
        const marketCap = document.getElementById('marketCap');
        if (marketCap && data.total_market_cap?.usd) {
            marketCap.textContent = formatCurrency(data.total_market_cap.usd);
        }

        // 24小时交易量
        const volume24h = document.getElementById('volume24h');
        if (volume24h && data.total_volume?.usd) {
            volume24h.textContent = formatCurrency(data.total_volume.usd);
        }

        // 比特币占比
        const btcDominance = document.getElementById('btcDominance');
        if (btcDominance && data.btc_market_cap_percentage) {
            btcDominance.textContent = data.btc_market_cap_percentage.btc?.toFixed(2) || '--';
        }

        // 上市币种数
        const activeCrypto = document.getElementById('activeCrypto');
        if (activeCrypto && data.active_cryptocurrencies) {
            activeCrypto.textContent = data.active_cryptocurrencies.toLocaleString();
        }
    } catch (error) {
        console.error('更新全球统计错误:', error);
    }
}

// ============================================
// 显示加密货币卡片
// ============================================
function displayCryptoCards() {
    const cryptoGrid = document.getElementById('cryptoGrid');
    if (!cryptoGrid) return;

    if (appState.filteredData.length === 0) {
        cryptoGrid.innerHTML = '<div class="loading" style="grid-column: 1/-1;">未找到匹配的加密货币</div>';
        return;
    }

    cryptoGrid.innerHTML = appState.filteredData.map((crypto, index) => {
        const priceChange = crypto.price_change_percentage_24h || 0;
        const isPositive = priceChange >= 0;
        const changeIcon = isPositive ? '📈' : '📉';
        const isFavorite = appState.favorites.includes(crypto.id);

        return `
            <div class="crypto-card">
                <div class="crypto-header">
                    <div>
                        <div class="crypto-name">${crypto.name}</div>
                        <div class="crypto-symbol">${crypto.symbol?.toUpperCase()}</div>
                    </div>
                    <div class="crypto-rank">#${crypto.market_cap_rank || 'N/A'}</div>
                </div>
                
                <div class="crypto-actions">
                    <button class="favorite-btn ${isFavorite ? 'active' : ''}" onclick="toggleFavorite('${crypto.id}', event)" title="收藏">
                        <i class="fas fa-star"></i>
                    </button>
                    <button class="alert-btn" onclick="showAlertForm('${crypto.id}', '${crypto.name}', event)" title="设置预警">
                        <i class="fas fa-bell"></i>
                    </button>
                </div>
                
                <div class="crypto-price">
                    $${formatNumber(crypto.current_price)}
                </div>
                
                <div class="crypto-change">
                    <div class="change-item">
                        <div class="change-label">24小时涨跌</div>
                        <div class="change-value ${isPositive ? 'change-positive' : 'change-negative'}">
                            ${changeIcon} ${isPositive ? '+' : ''}${priceChange.toFixed(2)}%
                        </div>
                    </div>
                    <div class="change-item">
                        <div class="change-label">7天涨跌</div>
                        <div class="change-value ${(crypto.price_change_percentage_7d || 0) >= 0 ? 'change-positive' : 'change-negative'}">
                            ${(crypto.price_change_percentage_7d || 0) >= 0 ? '📈' : '📉'} ${(crypto.price_change_percentage_7d || 0).toFixed(2)}%
                        </div>
                    </div>
                </div>
                
                <div class="crypto-details">
                    <div class="detail-item">
                        <div class="detail-label">市值</div>
                        <div class="detail-value">
                            ${crypto.market_cap ? formatCurrency(crypto.market_cap) : 'N/A'}
                        </div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">24小时成交量</div>
                        <div class="detail-value">
                            ${crypto.total_volume ? formatCurrency(crypto.total_volume) : 'N/A'}
                        </div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">最高价（24h）</div>
                        <div class="detail-value">
                            $${formatNumber(crypto.high_24h || 0)}
                        </div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">最低价（24h）</div>
                        <div class="detail-value">
                            $${formatNumber(crypto.low_24h || 0)}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// ============================================
// 收藏功能
// ============================================
function toggleFavorite(cryptoId, event) {
    event.stopPropagation();
    const index = appState.favorites.indexOf(cryptoId);
    if (index > -1) {
        appState.favorites.splice(index, 1);
    } else {
        appState.favorites.push(cryptoId);
    }
    localStorage.setItem('favorites', JSON.stringify(appState.favorites));
    displayCryptoCards();
}

// ============================================
// 预警功能
// ============================================
function showAlertForm(cryptoId, cryptoName, event) {
    event.stopPropagation();
    const price = prompt(`为 ${cryptoName} 设置价格预警（美元）:`, '');
    if (price !== null && price !== '') {
        if (!appState.alerts[cryptoId]) {
            appState.alerts[cryptoId] = [];
        }
        appState.alerts[cryptoId].push({
            price: parseFloat(price),
            name: cryptoName,
            createdAt: new Date().toLocaleString()
        });
        localStorage.setItem('alerts', JSON.stringify(appState.alerts));
        alert(`已为 ${cryptoName} 设置 $${price} 的价格预警`);
    }
}

function checkAlerts() {
    appState.cryptoData.forEach(crypto => {
        if (appState.alerts[crypto.id]) {
            appState.alerts[crypto.id].forEach((alert, idx) => {
                if (crypto.current_price >= alert.price) {
                    notifyAlert(alert.name, alert.price, crypto.current_price);
                    appState.alerts[crypto.id].splice(idx, 1);
                }
            });
        }
    });
    localStorage.setItem('alerts', JSON.stringify(appState.alerts));
}

function notifyAlert(name, targetPrice, currentPrice) {
    const message = `${name} 已达到预警价格！目标: $${targetPrice}, 当前: $${currentPrice.toFixed(2)}`;
    console.log(message);
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('加密货币预警', { body: message });
    } else {
        alert(message);
    }
}

// ============================================
// 市场分析
// ============================================
function analyzeMarket(data) {
    if (!Array.isArray(data) || data.length === 0) return;

    // 计算涨幅最大的币种（赚钱榜）
    const gainers = [...data]
        .sort((a, b) => (b.price_change_percentage_24h || 0) - (a.price_change_percentage_24h || 0))
        .slice(0, 5);

    // 计算跌幅最大的币种（亏损榜）
    const losers = [...data]
        .sort((a, b) => (a.price_change_percentage_24h || 0) - (b.price_change_percentage_24h || 0))
        .slice(0, 5);

    // 更新赚钱榜
    const topGainersDiv = document.getElementById('topGainers');
    if (topGainersDiv) {
        const gainersList = gainers.map(coin => `
            <div class="analysis-item">
                <span class="analysis-item-name">${coin.name}</span>
                <span class="analysis-item-change change-positive">
                    +${(coin.price_change_percentage_24h || 0).toFixed(2)}%
                </span>
            </div>
        `).join('');
        topGainersDiv.innerHTML = `<ul class="analysis-list">${gainersList}</ul>`;
    }

    // 更新亏损榜
    const topLosersDiv = document.getElementById('topLosers');
    if (topLosersDiv) {
        const losersList = losers.map(coin => `
            <div class="analysis-item">
                <span class="analysis-item-name">${coin.name}</span>
                <span class="analysis-item-change change-negative">
                    ${(coin.price_change_percentage_24h || 0).toFixed(2)}%
                </span>
            </div>
        `).join('');
        topLosersDiv.innerHTML = `<ul class="analysis-list">${losersList}</ul>`;
    }

    // 市场概况分析
    updateMarketOverview(data);

    // 价格波动分析
    updateVolatilityAnalysis(data);
}

/**
 * 更新市场概况
 */
function updateMarketOverview(data) {
    const marketOverviewDiv = document.getElementById('marketOverview');
    if (!marketOverviewDiv) return;

    const positiveCount = data.filter(d => (d.price_change_percentage_24h || 0) > 0).length;
    const negativeCount = data.filter(d => (d.price_change_percentage_24h || 0) < 0).length;
    const avgChange = (data.reduce((sum, d) => sum + (d.price_change_percentage_24h || 0), 0) / data.length).toFixed(2);

    marketOverviewDiv.innerHTML = `
        <div class="analysis-content" style="display: flex; flex-direction: column; gap: 1rem;">
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">
                <span style="color: var(--text-secondary);">上涨币种</span>
                <span style="color: var(--success-color); font-weight: bold;">${positiveCount}</span>
            </div>
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">
                <span style="color: var(--text-secondary);">下跌币种</span>
                <span style="color: var(--danger-color); font-weight: bold;">${negativeCount}</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--text-secondary);">平均涨跌幅</span>
                <span style="color: ${avgChange >= 0 ? 'var(--success-color)' : 'var(--danger-color)'}; font-weight: bold;">${avgChange > 0 ? '+' : ''}${avgChange}%</span>
            </div>
        </div>
    `;
}

/**
 * 更新价格波动分析
 */
function updateVolatilityAnalysis(data) {
    const volatilityDiv = document.getElementById('volatilityAnalysis');
    if (!volatilityDiv) return;

    // 计算波动率
    const priceChanges = data.map(d => Math.abs(d.price_change_percentage_24h || 0));
    const avgVolatility = (priceChanges.reduce((a, b) => a + b, 0) / priceChanges.length).toFixed(2);
    const maxVolatility = Math.max(...priceChanges).toFixed(2);
    const minVolatility = Math.min(...priceChanges).toFixed(2);

    volatilityDiv.innerHTML = `
        <div class="analysis-content" style="display: flex; flex-direction: column; gap: 1rem;">
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">
                <span style="color: var(--text-secondary);">平均波动率</span>
                <span style="color: var(--warning-color); font-weight: bold;">${avgVolatility}%</span>
            </div>
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">
                <span style="color: var(--text-secondary);">最大波动</span>
                <span style="color: var(--danger-color); font-weight: bold;">${maxVolatility}%</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--text-secondary);">最小波动</span>
                <span style="color: var(--success-color); font-weight: bold;">${minVolatility}%</span>
            </div>
        </div>
    `;
}

// ============================================
// 搜索和排序处理
// ============================================

/**
 * 处理搜索
 */
function handleSearch(event) {
    appState.searchQuery = event.target.value.toLowerCase();
    applyFiltersAndSort();
}

/**
 * 处理排序
 */
function handleSort(event) {
    appState.sortBy = event.target.value;
    applyFiltersAndSort();
}

/**
 * 应用过滤和排序
 */
function applyFiltersAndSort() {
    let filtered = [...appState.cryptoData];

    // 应用搜索过滤
    if (appState.searchQuery) {
        filtered = filtered.filter(crypto =>
            crypto.name.toLowerCase().includes(appState.searchQuery) ||
            crypto.symbol.toLowerCase().includes(appState.searchQuery)
        );
    }

    // 应用排序
    switch (appState.sortBy) {
        case 'price':
            filtered.sort((a, b) => b.current_price - a.current_price);
            break;
        case 'change_24h':
            filtered.sort((a, b) => (b.price_change_percentage_24h || 0) - (a.price_change_percentage_24h || 0));
            break;
        case 'market_cap':
        default:
            filtered.sort((a, b) => (b.market_cap || 0) - (a.market_cap || 0));
    }

    appState.filteredData = filtered;
    displayCryptoCards();
}

// ============================================
// 导航处理
// ============================================

/**
 * 处理导航链接点击
 */
function handleNavClick(event) {
    event.preventDefault();
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.remove('active');

    // 更新活跃链接
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    event.target.classList.add('active');

    // 平滑滚动到目标
    const targetId = event.target.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
    }
}

/**
 * 滚动到指定区域
 */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// ============================================
// 自动刷新功能
// ============================================

/**
 * 设置自动刷新
 */
function setupAutoRefresh() {
    // 初始加载
    fetchGlobalData();

    // 每5分钟刷新一次
    appState.autoRefreshInterval = setInterval(() => {
        console.log('自动刷新数据...');
        fetchGlobalData();
    }, API_CONFIG.refreshInterval);
}

/**
 * 停止自动刷新
 */
function stopAutoRefresh() {
    if (appState.autoRefreshInterval) {
        clearInterval(appState.autoRefreshInterval);
        appState.autoRefreshInterval = null;
    }
}

// ============================================
// 工具函数
// ============================================

/**
 * 格式化数字
 */
function formatNumber(num) {
    if (!num || num === 0) return '0.00';
    if (num < 0.01) return num.toExponential(2);
    if (num < 1) return num.toFixed(4);
    if (num < 1000) return num.toFixed(2);
    return num.toFixed(2);
}

/**
 * 格式化货币
 */
function formatCurrency(value) {
    if (!value || value === 0) return '$0';
    
    const absValue = Math.abs(value);
    let formatted;

    if (absValue >= 1e12) {
        formatted = (value / 1e12).toFixed(2) + 'T';
    } else if (absValue >= 1e9) {
        formatted = (value / 1e9).toFixed(2) + 'B';
    } else if (absValue >= 1e6) {
        formatted = (value / 1e6).toFixed(2) + 'M';
    } else if (absValue >= 1e3) {
        formatted = (value / 1e3).toFixed(2) + 'K';
    } else {
        formatted = value.toFixed(2);
    }

    return '$' + formatted;
}

/**
 * 显示错误消息
 */
function showErrorMessage(message) {
    console.error(message);
    // 可以在这里添加 Toast 通知
}

// ============================================
// 页面卸载处理
// ============================================
window.addEventListener('beforeunload', () => {
    stopAutoRefresh();
});

// ============================================
// 数据导出功能
// ============================================
function exportToCSV() {
    if (appState.filteredData.length === 0) {
        alert('没有数据可导出');
        return;
    }

    // 构建 CSV 标题行
    const headers = ['排名', '名称', '代码', '价格(USD)', '24h涨跌(%)', '7d涨跌(%)', '市值', '24h交易量', '最高价', '最低价'];
    
    // 构建数据行
    const rows = appState.filteredData.map((crypto, index) => [
        index + 1,
        crypto.name,
        crypto.symbol.toUpperCase(),
        crypto.current_price,
        (crypto.price_change_percentage_24h || 0).toFixed(2),
        (crypto.price_change_percentage_7d || 0).toFixed(2),
        crypto.market_cap || 'N/A',
        crypto.total_volume || 'N/A',
        crypto.high_24h || 'N/A',
        crypto.low_24h || 'N/A'
    ]);

    // 生成 CSV 内容
    const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => {
            if (typeof cell === 'string' && cell.includes(',')) {
                return `"${cell}"`;
            }
            return cell;
        }).join(','))
    ].join('\n');

    // 创建 Blob 并下载
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `cryptocurrency_data_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// ============================================
// 投资组合管理
// ============================================
function addPortfolioItem() {
    const cryptoInput = document.getElementById('portfolioCrypto');
    const amountInput = document.getElementById('portfolioAmount');
    const buyPriceInput = document.getElementById('portfolioBuyPrice');

    const crypto = cryptoInput.value.trim().toLowerCase();
    const amount = parseFloat(amountInput.value);
    const buyPrice = parseFloat(buyPriceInput.value);

    if (!crypto || isNaN(amount) || isNaN(buyPrice) || amount <= 0 || buyPrice <= 0) {
        alert('请填写完整且有效的数据');
        return;
    }

    // 查找币种
    const cryptoData = appState.cryptoData.find(c => 
        c.name.toLowerCase() === crypto || c.symbol.toLowerCase() === crypto
    );

    if (!cryptoData) {
        alert('未找到该币种，请输入正确的币种名称或代码');
        return;
    }

    const item = {
        id: cryptoData.id,
        name: cryptoData.name,
        symbol: cryptoData.symbol,
        amount: amount,
        buyPrice: buyPrice,
        currentPrice: cryptoData.current_price
    };

    appState.portfolio.push(item);
    localStorage.setItem('portfolio', JSON.stringify(appState.portfolio));

    cryptoInput.value = '';
    amountInput.value = '';
    buyPriceInput.value = '';

    displayPortfolio();
    updatePortfolioStats();
}

function removePortfolioItem(index) {
    if (confirm('确定要删除该持仓吗？')) {
        appState.portfolio.splice(index, 1);
        localStorage.setItem('portfolio', JSON.stringify(appState.portfolio));
        displayPortfolio();
        updatePortfolioStats();
    }
}

function displayPortfolio() {
    const portfolioList = document.getElementById('portfolioList');
    if (!portfolioList) return;

    if (appState.portfolio.length === 0) {
        portfolioList.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: var(--text-secondary);">暂无持仓</div>';
        return;
    }

    portfolioList.innerHTML = appState.portfolio.map((item, index) => {
        const gainLoss = (item.currentPrice - item.buyPrice) * item.amount;
        const gainLossPercent = ((item.currentPrice - item.buyPrice) / item.buyPrice * 100).toFixed(2);
        const currentValue = item.currentPrice * item.amount;
        const isProfit = gainLoss >= 0;

        return `
            <div class="portfolio-item">
                <div class="portfolio-item-header">
                    <span class="portfolio-item-name">${item.name} (${item.symbol.toUpperCase()})</span>
                    <button class="portfolio-item-delete" onclick="removePortfolioItem(${index})">×</button>
                </div>
                <div class="portfolio-item-details">
                    <div class="portfolio-item-detail">
                        <div class="portfolio-item-detail-label">持仓数量</div>
                        <div class="portfolio-item-detail-value">${item.amount.toFixed(8)}</div>
                    </div>
                    <div class="portfolio-item-detail">
                        <div class="portfolio-item-detail-label">买入价格</div>
                        <div class="portfolio-item-detail-value">$${item.buyPrice.toFixed(2)}</div>
                    </div>
                    <div class="portfolio-item-detail">
                        <div class="portfolio-item-detail-label">当前价格</div>
                        <div class="portfolio-item-detail-value">$${item.currentPrice.toFixed(2)}</div>
                    </div>
                    <div class="portfolio-item-detail">
                        <div class="portfolio-item-detail-label">当前价值</div>
                        <div class="portfolio-item-detail-value">$${currentValue.toFixed(2)}</div>
                    </div>
                    <div class="portfolio-item-detail" style="grid-column: 1 / -1;">
                        <div class="portfolio-item-detail-label">收益/亏损</div>
                        <div class="portfolio-item-detail-value" style="color: ${isProfit ? 'var(--success-color)' : 'var(--danger-color)'};">
                            ${isProfit ? '+' : ''}$${gainLoss.toFixed(2)} (${gainLossPercent}%)
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function updatePortfolioStats() {
    // 更新 portfolio 中的当前价格
    appState.portfolio.forEach(item => {
        const cryptoData = appState.cryptoData.find(c => c.id === item.id);
        if (cryptoData) {
            item.currentPrice = cryptoData.current_price;
        }
    });

    const totalInvested = appState.portfolio.reduce((sum, item) => sum + (item.buyPrice * item.amount), 0);
    const currentValue = appState.portfolio.reduce((sum, item) => sum + (item.currentPrice * item.amount), 0);
    const gainLoss = currentValue - totalInvested;
    const gainLossPercent = totalInvested === 0 ? 0 : ((gainLoss / totalInvested) * 100).toFixed(2);

    const totalInvestedEl = document.getElementById('totalInvested');
    const currentValueEl = document.getElementById('currentValue');
    const gainLossEl = document.getElementById('gainLoss');
    const gainLossPercentEl = document.getElementById('gainLossPercent');

    if (totalInvestedEl) totalInvestedEl.textContent = formatCurrency(totalInvested);
    if (currentValueEl) currentValueEl.textContent = formatCurrency(currentValue);
    if (gainLossEl) {
        gainLossEl.textContent = formatCurrency(gainLoss);
        gainLossEl.style.color = gainLoss >= 0 ? 'var(--success-color)' : 'var(--danger-color)';
    }
    if (gainLossPercentEl) {
        gainLossPercentEl.textContent = (gainLoss >= 0 ? '+' : '') + gainLossPercent + '%';
        gainLossPercentEl.style.color = gainLoss >= 0 ? 'var(--success-color)' : 'var(--danger-color)';
    }
}

// ============================================
// 币种对比分析
// ============================================
let comparisonCryptos = [];

function addComparisonCrypto(slot) {
    const input = document.getElementById(`comparisonInput${slot}`);
    const cryptoName = input.value.trim().toLowerCase();
    
    if (!cryptoName) {
        alert('请输入币种名称或代码');
        return;
    }

    const cryptoData = appState.cryptoData.find(c => 
        c.name.toLowerCase() === cryptoName || c.symbol.toLowerCase() === cryptoName
    );

    if (!cryptoData) {
        alert('未找到该币种');
        return;
    }

    // 检查是否已添加
    if (comparisonCryptos.some(c => c.id === cryptoData.id)) {
        alert('该币种已添加到对比');
        return;
    }

    comparisonCryptos.push(cryptoData);
    input.value = '';
    
    displayComparison();
}

function removeComparisonCrypto(id) {
    comparisonCryptos = comparisonCryptos.filter(c => c.id !== id);
    displayComparison();
}

function clearComparison() {
    comparisonCryptos = [];
    document.getElementById('comparisonContainer').innerHTML = '';
}

function displayComparison() {
    const container = document.getElementById('comparisonContainer');
    
    if (comparisonCryptos.length === 0) {
        container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: var(--text-secondary);">暂无对比数据，请选择币种对比</div>';
        return;
    }

    // 显示对比卡片
    const cardsHTML = comparisonCryptos.map(crypto => {
        const indicators = calculateTechnicalIndicators(crypto);
        return `
            <div class="comparison-card">
                <div class="comparison-card-header">
                    <span class="comparison-card-title">${crypto.name}</span>
                    <button class="comparison-card-remove" onclick="removeComparisonCrypto('${crypto.id}')">×</button>
                </div>
                <div class="comparison-metrics">
                    <div class="metric-item">
                        <span class="metric-label">价格</span>
                        <span class="metric-value">$${crypto.current_price.toFixed(2)}</span>
                    </div>
                    <div class="metric-item">
                        <span class="metric-label">市值</span>
                        <span class="metric-value">${formatCurrency(crypto.market_cap || 0)}</span>
                    </div>
                    <div class="metric-item">
                        <span class="metric-label">24h涨跌</span>
                        <span class="metric-value" style="color: ${(crypto.price_change_percentage_24h || 0) >= 0 ? 'var(--success-color)' : 'var(--danger-color)'};">
                            ${((crypto.price_change_percentage_24h || 0) >= 0 ? '+' : '')}${(crypto.price_change_percentage_24h || 0).toFixed(2)}%
                        </span>
                    </div>
                    <div class="metric-item">
                        <span class="metric-label">7d涨跌</span>
                        <span class="metric-value" style="color: ${(crypto.price_change_percentage_7d || 0) >= 0 ? 'var(--success-color)' : 'var(--danger-color)'};">
                            ${((crypto.price_change_percentage_7d || 0) >= 0 ? '+' : '')}${(crypto.price_change_percentage_7d || 0).toFixed(2)}%
                        </span>
                    </div>
                    <div class="metric-item">
                        <span class="metric-label">24h交易量</span>
                        <span class="metric-value">${formatCurrency(crypto.total_volume || 0)}</span>
                    </div>
                    <div class="metric-item">
                        <span class="metric-label">RSI(14)</span>
                        <span class="metric-value">${indicators.rsi.toFixed(2)}</span>
                    </div>
                    <div class="metric-item">
                        <span class="metric-label">波动率</span>
                        <span class="metric-value">${indicators.volatility.toFixed(2)}%</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    container.innerHTML = cardsHTML;

    // 显示对比表格
    if (comparisonCryptos.length > 1) {
        const tableHTML = createComparisonTable();
        container.innerHTML += tableHTML;
    }
}

function createComparisonTable() {
    let html = `<table class="comparison-table" style="grid-column: 1/-1;">
        <thead>
            <tr>
                <th>指标</th>`;
    
    comparisonCryptos.forEach(crypto => {
        html += `<th>${crypto.symbol.toUpperCase()}</th>`;
    });
    
    html += `</tr>
        </thead>
        <tbody>
            <tr>
                <td>价格 (USD)</td>`;
    
    comparisonCryptos.forEach(crypto => {
        html += `<td>$${crypto.current_price.toFixed(2)}</td>`;
    });
    
    html += `</tr>
            <tr>
                <td>市值</td>`;
    
    comparisonCryptos.forEach(crypto => {
        html += `<td>${formatCurrency(crypto.market_cap || 0)}</td>`;
    });
    
    html += `</tr>
            <tr>
                <td>24h涨跌</td>`;
    
    comparisonCryptos.forEach(crypto => {
        const change = (crypto.price_change_percentage_24h || 0).toFixed(2);
        const color = change >= 0 ? 'var(--success-color)' : 'var(--danger-color)';
        html += `<td style="color: ${color};">${change >= 0 ? '+' : ''}${change}%</td>`;
    });
    
    html += `</tr>
            <tr>
                <td>7d涨跌</td>`;
    
    comparisonCryptos.forEach(crypto => {
        const change = (crypto.price_change_percentage_7d || 0).toFixed(2);
        const color = change >= 0 ? 'var(--success-color)' : 'var(--danger-color)';
        html += `<td style="color: ${color};">${change >= 0 ? '+' : ''}${change}%</td>`;
    });
    
    html += `</tr>
        </tbody>
    </table>`;
    
    return html;
}

// ============================================
// 技术指标计算
// ============================================
function calculateTechnicalIndicators(crypto) {
    // RSI(14) - 简化计算，基于 24h 价格变化
    const rsi = calculateRSI(crypto);
    
    // 波动率 - 基于价格变化百分比
    const volatility = Math.abs(crypto.price_change_percentage_24h || 0);
    
    // 强度指标
    const strength = calculateStrength(crypto);
    
    return {
        rsi,
        volatility,
        strength
    };
}

function calculateRSI(crypto) {
    // 简化的 RSI 计算：基于价格涨跌
    const change24h = crypto.price_change_percentage_24h || 0;
    const change7d = crypto.price_change_percentage_7d || 0;
    const changeAvg = (Math.abs(change24h) + Math.abs(change7d)) / 2;
    
    // 将价格变化转换为 RSI 值 (0-100)
    let rsi = 50 + (change24h * 5); // 基准 50，变化幅度影响
    rsi = Math.max(0, Math.min(100, rsi));
    
    return rsi;
}

function calculateStrength(crypto) {
    // 市场强度指标：基于价格、交易量、市值
    const priceStrength = crypto.current_price > 0 ? Math.log(crypto.current_price) : 0;
    const volumeStrength = crypto.total_volume ? Math.log(crypto.total_volume) : 0;
    const mcStrength = crypto.market_cap ? Math.log(crypto.market_cap) : 0;
    
    return ((priceStrength + volumeStrength + mcStrength) / 3).toFixed(2);
}

// ============================================
// 历史价格图表
// ============================================
let priceChart = null;

async function loadPriceChart() {
    const cryptoInput = document.getElementById('chartCryptoInput');
    const periodSelect = document.getElementById('chartPeriodSelect');
    
    const cryptoName = cryptoInput.value.trim().toLowerCase();
    const days = periodSelect.value;

    if (!cryptoName) {
        alert('请选择币种');
        return;
    }

    const cryptoData = appState.cryptoData.find(c => 
        c.name.toLowerCase() === cryptoName || c.symbol.toLowerCase() === cryptoName
    );

    if (!cryptoData) {
        alert('未找到该币种');
        return;
    }

    try {
        // 获取历史价格数据
        const response = await fetch(
            `${API_CONFIG.baseUrl}/coins/${cryptoData.id}/market_chart?` +
            `vs_currency=usd&days=${days}&interval=daily`
        );
        const data = await response.json();
        
        // 处理数据
        const prices = data.prices.map(p => ({
            date: new Date(p[0]).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' }),
            price: p[1]
        }));

        displayPriceChart(cryptoData.name, prices);
    } catch (error) {
        console.error('获取价格数据失败:', error);
        alert('无法获取价格数据');
    }
}

function displayPriceChart(cryptoName, prices) {
    const ctx = document.getElementById('priceChart');
    
    if (priceChart) {
        priceChart.destroy();
    }

    const dates = prices.map(p => p.date);
    const priceValues = prices.map(p => p.price);
    const avgPrice = priceValues.reduce((a, b) => a + b) / priceValues.length;

    priceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: `${cryptoName} 价格 (USD)`,
                data: priceValues,
                borderColor: '#6366f1',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 0,
                pointHoverRadius: 6,
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: 'var(--text-primary)',
                        font: { size: 12, weight: 'bold' }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    callbacks: {
                        label: function(context) {
                            return `$${context.parsed.y.toFixed(2)}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    ticks: { color: 'var(--text-secondary)' },
                    grid: { color: 'var(--border-color)' }
                },
                x: {
                    ticks: { color: 'var(--text-secondary)' },
                    grid: { color: 'var(--border-color)' }
                }
            }
        }
    });
}

// ============================================
// 新闻聚合
// ============================================
let allNews = [];
let newsFilter = 'all';

async function loadNews() {
    try {
        // 使用免费 API: Cryptopanic
        const response = await fetch(
            'https://cryptopanic.com/api/v1/posts/?auth=a&kind=news&public=true'
        );
        const data = await response.json();
        
        allNews = data.results || [];
        displayNews();
    } catch (error) {
        console.error('获取新闻失败:', error);
        // 显示演示新闻
        displayDemoNews();
    }
}

function displayDemoNews() {
    allNews = [
        {
            title: '比特币突破新高',
            description: '比特币价格今日创下历史新高，市场情绪乐观。',
            source: { title: 'CryptoNews' },
            url: '#',
            created_at: new Date().toISOString(),
            category: 'bitcoin'
        },
        {
            title: '以太坊升级进展',
            description: '以太坊第二层扩容方案取得重大进展，性能提升显著。',
            source: { title: 'Ethereum Blog' },
            url: '#',
            created_at: new Date(Date.now() - 3600000).toISOString(),
            category: 'ethereum'
        },
        {
            title: 'DeFi 生态发展',
            description: 'DeFi 协议总锁定价值(TVL)超过 1000 亿美元，创新应用不断涌现。',
            source: { title: 'DeFi Pulse' },
            url: '#',
            created_at: new Date(Date.now() - 7200000).toISOString(),
            category: 'defi'
        }
    ];
    displayNews();
}

function displayNews() {
    const newsFeed = document.getElementById('newsFeed');
    
    let filteredNews = allNews;
    if (newsFilter !== 'all') {
        filteredNews = allNews.filter(news => {
            const title = news.title.toLowerCase();
            const desc = news.description ? news.description.toLowerCase() : '';
            
            if (newsFilter === 'bitcoin') return title.includes('bitcoin') || desc.includes('bitcoin');
            if (newsFilter === 'ethereum') return title.includes('ethereum') || desc.includes('ethereum');
            if (newsFilter === 'defi') return title.includes('defi') || desc.includes('defi');
            return true;
        });
    }

    if (filteredNews.length === 0) {
        newsFeed.innerHTML = '<div style="text-align: center; padding: 2rem; color: var(--text-secondary);">暂无相关新闻</div>';
        return;
    }

    newsFeed.innerHTML = filteredNews.slice(0, 10).map(news => {
        const date = new Date(news.created_at);
        const timeAgo = getTimeAgo(date);
        
        return `
            <div class="news-item">
                <div class="news-item-header">
                    <div class="news-item-title">${news.title}</div>
                    <div class="news-item-time">${timeAgo}</div>
                </div>
                <div class="news-item-description">
                    ${news.description || '暂无描述'}
                </div>
                <div>
                    <span class="news-item-source">${news.source?.title || 'News'}</span>
                </div>
                <a href="${news.url}" target="_blank" class="news-item-link">阅读全文 →</a>
            </div>
        `;
    }).join('');
}

function filterNews(category) {
    newsFilter = category;
    
    // 更新按钮状态
    document.querySelectorAll('.news-filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    displayNews();
}

function getTimeAgo(date) {
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    
    if (seconds < 60) return '刚刚';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}分钟前`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}小时前`;
    return `${Math.floor(seconds / 86400)}天前`;
}
