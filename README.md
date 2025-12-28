# 加密货币观测平台 🚀# Observation-Cryptocurrency

## Observation-CryptocurrencyA website for observing cryptocurrencies


一个专业的加密货币市场观测平台，提供实时数据、市场分析和趋势预测。

---

## 📋 功能特性

### ✨ 核心功能
- **📊 实时行情展示**: 监测全球主流加密货币的实时价格和市场数据
- **📈 趋势分析**: 显示24小时、7天涨跌幅和波动率分析
- **💹 市场概览**: 市场总值、交易量、比特币占比等关键指标
- **🔍 高级搜索**: 快速搜索和排序加密货币
- **📱 响应式设计**: 完美适配桌面、平板和手机设备（768px/480px优化）
- **🔄 自动更新**: 每5分钟自动刷新市场数据
- **🎯 市场分析**: 涨幅最大、跌幅最大币种排行
- **💰 详细信息**: 市值、成交量、24小时高低价等详细数据

### 🎨 用户界面
- 深色/浅色主题切换，支持 localStorage 持久化
- 现代设计和光滑的动画效果
- 直观的数据可视化
- 流畅的用户交互体验

### 💼 高级功能

#### 1️⃣ **投资组合管理**
- ➕ 添加持仓币种和数量
- 💵 自动计算投资成本和当前价值
- 📊 实时计算盈亏和收益率
- 📥 导出投资组合数据为 CSV

#### 2️⃣ **价格预警系统**
- 🔔 设置目标价格提醒
- 🔊 浏览器通知（支持声音提醒）
- 📝 管理多个预警规则
- 💾 本地存储预警配置

#### 3️⃣ **币种对比分析**
- 🔀 并排比较多个币种
- 📊 查看关键指标对比表
- 💡 快速识别投资机会

#### 4️⃣ **技术指标计算**
- 📉 RSI（相对强弱指数）
- 📊 波动率分析
- 💪 市场强度评分
- 🎯 支撑位/阻力位

#### 5️⃣ **价格走势图表**
- 📈 7日、30日、1年走势图
- 🔍 Chart.js 可视化展示
- 📊 交互式数据探索

#### 6️⃣ **行业新闻聚合**
- 📰 实时新闻资讯
- 🔍 按类别过滤（比特币/以太坊/DeFi）
- 🔗 一键跳转原文链接
- ⏱️ 相对时间显示

#### 7️⃣ **币种收藏系统**
- ⭐ 标记收藏喜欢的币种
- 💾 本地存储收藏列表
- 🔖 快速访问关注的币种

#### 8️⃣ **AI 市场预测** ✨ NEW
- 🤖 基于历史数据的智能分析
- 📊 RSI、动量、趋势计算
- 🎯 价格目标预测
- 📈 看涨/看跌/震荡信号
- 💯 信心度评分（0-100%）
- 📍 支撑位/阻力位预测

#### 9️⃣ **实时 WebSocket 价格推送** ✨ NEW
- 🌐 实时价格数据流（2秒更新）
- 💰 当前价格和24小时涨跌幅
- 📊 交易量信息
- 🔌 连接状态实时显示
- ⚡ 轮询模式（支持大多数 API）

---

## 🛠️ 技术栈

### 前端技术
- **HTML5**: 语义化页面结构和表单
- **CSS3**: 响应式设计和现代样式
  - CSS 变量主题系统
  - Flexbox 和 Grid 布局
  - 渐变、阴影和过渡效果
  - 移动端优化（@media queries）
- **JavaScript (ES6+)**: 动态功能和交互
  - 异步数据获取 (async/await)
  - 实时数据更新和轮询
  - DOM 操作和事件处理
  - localStorage 数据持久化

### API 和库
- **CoinGecko API**: 免费的加密货币数据接口（支持历史数据和新闻）
- **Cryptopanic API**: 加密货币新闻聚合
- **Chart.js**: 专业的图表库
- **Font Awesome 6**: 图标库

---

## 📁 项目结构

```
Observation-Cryptocurrency/
├── index.html              # 主页面
├── css/
│   └── styles.css          # 全局样式表
├── js/
│   └── app.js              # 主要JavaScript逻辑
├── assets/                 # 资源文件夹
└── README.md               # 项目文档
```

### 文件说明

#### `index.html`
- 页面主体结构
- 包含导航栏、英雄区域、统计卡片、加密货币网格等
- 集成外部 CDN 资源

#### `css/styles.css`
- 完整的样式表（2000+ 行）
- 包含主题变量定义
- 响应式媒体查询
- 组件样式（导航栏、卡片、表单等）

#### `js/app.js`
- API 数据获取功能
- DOM 操作和事件处理
- 搜索、排序、过滤功能
- 市场分析计算
- 自动刷新机制
- 工具函数（格式化、计算等）

---

## 🚀 快速开始

### 前置要求
- 现代浏览器（Chrome、Firefox、Safari、Edge）
- 网络连接（使用 CoinGecko API）

### 本地运行

1. **克隆或下载项目**
   ```bash
   git clone https://github.com/lunina8403/Observation-Cryptocurrency.git
   cd Observation-Cryptocurrency
   ```

2. **启动本地服务器**
   
   **方式一**: 使用 Python
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```

   **方式二**: 使用 Node.js
   ```bash
   # 首先安装 http-server
   npm install -g http-server
   
   # 运行服务器
   http-server
   ```

   **方式三**: 使用 VS Code Live Server 插件
   - 在 VS Code 中安装 "Live Server" 插件
   - 右键点击 `index.html`
   - 选择 "Open with Live Server"

3. **打开浏览器**
   ```
   http://localhost:8000
   ```

---

## 💡 使用指南

### 主要页面功能

#### 导航栏
- **首页**: 快速导航到主要内容
- **概览**: 查看实时加密货币行情
- **分析**: 查看市场分析数据
- **投资组合**: 管理个人持仓
- **对比分析**: 多币种对比
- **价格图表**: 历史走势查看
- **AI预测**: 生成市场预测
- **实时推送**: 连接实时数据流
- **行业动态**: 浏览最新新闻
- **关于**: 了解平台功能

#### 统计卡片
显示以下关键指标：
- 🌍 全球市场总值
- 📊 24小时交易总量
- 🔝 比特币市场占比
- 💰 上市币种总数

#### 实时行情表
- 搜索框: 按名称或代码搜索加密货币
- 排序选项:
  - 按市值排序
  - 按价格排序
  - 按24小时涨跌幅排序
- 刷新按钮: 手动刷新数据

#### 行情卡片信息
每张卡片展示：
- 币种名称和代码
- 市场排名
- 当前价格
- 24小时和7天涨跌幅
- 市值、成交量、最高价、最低价

#### 市场分析
- **市场概况**: 上涨/下跌币种数量、平均涨跌幅
- **价格波动分析**: 平均波动率、最大波动、最小波动
- **赚钱榜**: 涨幅最大的5种币
- **亏损榜**: 跌幅最大的5种币

---

## 🔌 API 说明

### CoinGecko API

项目使用 **CoinGecko 免费 API**，无需认证密钥。

#### 主要端点

1. **全球数据**
   ```
   GET https://api.coingecko.com/api/v3/global
   ```
   获取市场总值、交易量、比特币占比等

2. **加密货币市场数据**
   ```
   GET https://api.coingecko.com/api/v3/coins/markets
   ```
   获取币种价格、市值、成交量等

### API 特点
- ✅ 完全免费
- ✅ 无需 API Key
- ✅ 实时数据更新
- ✅ 高速响应

---

## 🎨 配置和自定义

### 修改刷新间隔

编辑 `js/app.js` 中的 `API_CONFIG` 对象：

```javascript
const API_CONFIG = {
    baseUrl: 'https://api.coingecko.com/api/v3',
    refreshInterval: 300000 // 改为你想要的毫秒数
};
```

例如：
- `60000` = 1分钟
- `300000` = 5分钟（默认）
- `600000` = 10分钟

### 修改主题颜色

编辑 `css/styles.css` 中的 CSS 变量：

```css
:root {
    --primary-color: #6366f1;      /* 主色调 */
    --secondary-color: #8b5cf6;    /* 副色调 */
    --success-color: #10b981;      /* 成功色 */
    --danger-color: #ef4444;       /* 危险色 */
    /* ... 其他变量 */
}
```

### 修改币种数量

编辑 `js/app.js` 中的 `fetchCryptoData()` 函数：

```javascript
`&per_page=50`  // 改为你需要的数量
```

---

## 🐛 常见问题

### Q1: 数据无法加载怎么办？
**A**: 
- 检查网络连接
- 检查浏览器控制台是否有错误信息
- 确认 CoinGecko API 是否可访问
- 尝试刷新页面

### Q2: 页面加载缓慢
**A**:
- 减少每页加载的币种数量
- 增加刷新间隔时间
- 检查网络连接速度

### Q3: 支持离线使用吗？
**A**: 不支持。平台需要网络连接以获取实时数据。

### Q4: 可以添加我喜欢的加密货币吗？
**A**: 目前显示全球市值前50的币种。可以修改代码中的 `per_page` 参数来显示更多币种。

---

## 📊 数据更新频率

- **自动更新**: 每5分钟自动刷新全球数据
- **手动更新**: 点击刷新按钮立即更新
- **CoinGecko API**: 数据实时更新

---

## 🔒 隐私和安全

- ✅ 完全开源，代码公开透明
- ✅ 无数据收集或跟踪
- ✅ 仅使用公开的 API 数据
- ✅ 所有数据在浏览器端处理

---

## 📝 许可证

此项目采用 MIT 许可证。详见 LICENSE 文件。

---

## 🤝 贡献指南

欢迎提交 Pull Request 或报告 Issue！

### 如何贡献
1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交变更 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

---

## 📚 参考资源

- [CoinGecko API 文档](https://www.coingecko.com/en/api)
- [MDN Web 文档](https://developer.mozilla.org/)
- [CSS-Tricks 指南](https://css-tricks.com/)
- [JavaScript.info 教程](https://javascript.info/)

---

## 🎯 已完成功能

- [x] 实时加密货币行情展示
- [x] 市场数据分析和排序
- [x] 投资组合管理（计算盈亏）
- [x] 价格预警系统（浏览器通知）
- [x] 币种对比分析
- [x] 技术指标计算（RSI/波动率/强度）
- [x] 价格历史走势图表（Chart.js）
- [x] 新闻聚合和过滤
- [x] 币种收藏系统
- [x] 深色/浅色主题切换
- [x] CSV 数据导出
- [x] 完整移动端响应式设计（768px/480px）
- [x] AI 市场预测分析
- [x] 实时价格推送（WebSocket 轮询）

## 🎯 未来计划

- [ ] 集成更多技术指标（MACD、KDJ 等）
- [ ] 用户账户系统
- [ ] 自定义仪表板
- [ ] K线图展示
- [ ] 多币种对比图表
- [ ] 手机 App 版本
- [ ] 国际化（多语言支持）
- [ ] 高级筛选和扫描功能

---

## 📧 联系方式

- GitHub: [lunina8403](https://github.com/lunina8403)
- 项目主页: [Observation-Cryptocurrency](https://github.com/lunina8403/Observation-Cryptocurrency)

---

## ⭐ 致谢

感谢 [CoinGecko](https://www.coingecko.com/) 提供免费的加密货币数据 API。

---

**最后更新**: 2025年11月16日

*快来观测加密货币市场吧！🚀*
