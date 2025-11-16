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
    autoRefreshInterval: null
};

// ============================================
// 初始化函数
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('[应用初始化中...');
    setupEventListeners();
    renderGlobeBackground();
    loadCryptoData();
    setupAutoRefresh();
});

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

        return `
            <div class="crypto-card">
                <div class="crypto-header">
                    <div>
                        <div class="crypto-name">${crypto.name}</div>
                        <div class="crypto-symbol">${crypto.symbol?.toUpperCase()}</div>
                    </div>
                    <div class="crypto-rank">#${crypto.market_cap_rank || 'N/A'}</div>
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
// 地球背景绘制
// ============================================

/**
 * 绘制旋转的地球背景
 */
function drawGlobe() {
    const canvas = document.getElementById('globeCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // 设置 Canvas 尺寸
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let rotation = 0;

    function animate() {
        // 清空画布
        ctx.fillStyle = 'rgba(15, 23, 42, 0)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 获取画布中心
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(canvas.width, canvas.height) / 3;

        // 绘制地球
        drawEarthGlobe(ctx, centerX, centerY, radius, rotation);

        // 更新旋转角度
        rotation += 0.001;
        requestAnimationFrame(animate);
    }

    animate();
}

/**
 * 绘制地球球体
 */
function drawEarthGlobe(ctx, x, y, radius, rotation) {
    // 绘制地球阴影
    const gradient = ctx.createRadialGradient(x - radius * 0.3, y - radius * 0.3, 0, x, y, radius);
    gradient.addColorStop(0, '#6366f1');
    gradient.addColorStop(0.5, '#4f46e5');
    gradient.addColorStop(1, '#3730a3');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    // 绘制地球纹理（网格）
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;

    // 经度线
    for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2 + rotation;
        const x1 = x + Math.cos(angle) * radius;
        const y1 = y + Math.sin(angle) * radius;
        const x2 = x + Math.cos(angle + Math.PI) * radius;
        const y2 = y + Math.sin(angle + Math.PI) * radius;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    // 纬度线
    for (let i = 1; i < 6; i++) {
        const latRadius = radius * Math.sin((i / 6) * Math.PI);
        const offsetY = radius * Math.cos((i / 6) * Math.PI);

        ctx.beginPath();
        ctx.arc(x, y + offsetY, latRadius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(x, y - offsetY, latRadius, 0, Math.PI * 2);
        ctx.stroke();
    }

    // 绘制闪烁的数据点（代表全球市场）
    drawMarketPoints(ctx, x, y, radius, rotation);

    // 绘制地球表面光晕
    const glowGradient = ctx.createRadialGradient(x, y, radius * 0.8, x, y, radius);
    glowGradient.addColorStop(0, 'rgba(99, 102, 241, 0.2)');
    glowGradient.addColorStop(1, 'rgba(99, 102, 241, 0)');
    
    ctx.fillStyle = glowGradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
}

/**
 * 绘制全球市场数据点
 */
function drawMarketPoints(ctx, x, y, radius, rotation) {
    const points = [
        { lat: 40, lon: -74, label: '美国' },    // 纽约
        { lat: 51.5, lon: 0, label: '英国' },    // 伦敦
        { lat: 35.7, lon: 139.7, label: '日本' }, // 东京
        { lat: 22.3, lon: 114.2, label: '香港' }, // 香港
        { lat: 31.23, lon: 121.47, label: '中国' } // 上海
    ];

    points.forEach((point, index) => {
        // 将地理坐标转换为画布坐标
        const lon = (point.lon * Math.PI / 180) + rotation;
        const lat = point.lat * Math.PI / 180;

        const px = x + radius * Math.cos(lon) * Math.cos(lat);
        const py = y + radius * Math.sin(lat);

        // 仅绘制可见的点（面向观察者的一侧）
        if (Math.cos(lon - rotation) > 0) {
            // 根据深度改变大小和亮度
            const depth = (Math.cos(lon - rotation) + 1) / 2;
            const size = 3 + depth * 2;
            const opacity = 0.3 + depth * 0.7;

            // 绘制光点
            const pointGradient = ctx.createRadialGradient(px, py, 0, px, py, size);
            pointGradient.addColorStop(0, `rgba(16, 185, 129, ${opacity})`);
            pointGradient.addColorStop(1, `rgba(16, 185, 129, 0)`);

            ctx.fillStyle = pointGradient;
            ctx.beginPath();
            ctx.arc(px, py, size, 0, Math.PI * 2);
            ctx.fill();

            // 绘制脉冲效果
            ctx.strokeStyle = `rgba(16, 185, 129, ${opacity * 0.5})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(px, py, size + 2, 0, Math.PI * 2);
            ctx.stroke();
        }
    });
}

// ============================================
// Three.js 半球地球背景渲染
// ============================================
function renderGlobeBackground() {
    const container = document.getElementById('globe-bg');
    if (!container) return;
    container.innerHTML = '';

    // 设置默认尺寸，防止为0
    const width = container.offsetWidth || container.clientWidth || 600;
    const height = container.offsetHeight || container.clientHeight || 400;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 2.5;
    camera.position.y = 0.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(1, 64, 64, 0, Math.PI);
    const texture = new THREE.TextureLoader().load('assets/earth-map.jpg');
    const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: 0.95 });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    function onResize() {
        const w = container.offsetWidth || container.clientWidth || 600;
        const h = container.offsetHeight || container.clientHeight || 400;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
    }
    window.addEventListener('resize', onResize);

    function animate() {
        sphere.rotation.y += 0.003;
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
    animate();
}

window.addEventListener('DOMContentLoaded', renderGlobeBackground);
