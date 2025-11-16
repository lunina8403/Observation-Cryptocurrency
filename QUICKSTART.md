# 快速开始指南

## 🚀 一分钟快速启动

### 选项 1: 使用 Python（推荐）

```powershell
# 进入项目目录
cd "f:\VScode\工作区\Observation-Cryptocurrency\Observation-Cryptocurrency"

# 启动服务器
python -m http.server 8000

# 打开浏览器访问
http://localhost:8000
```

### 选项 2: 使用 VS Code Live Server

1. 在 VS Code 中安装 **Live Server** 插件
2. 右键点击 `index.html`
3. 选择 "Open with Live Server"

### 选项 3: 使用 Node.js

```powershell
# 首先安装 http-server（仅需一次）
npm install -g http-server

# 启动服务器
http-server -p 8000

# 打开浏览器访问
http://localhost:8000
```

---

## 📁 项目文件说明

| 文件/文件夹 | 说明 |
|---------|------|
| `index.html` | 主页面 HTML 结构 |
| `css/styles.css` | 全局样式表（2000+ 行） |
| `js/app.js` | JavaScript 功能实现 |
| `assets/` | 资源文件夹（当前为空，可添加图片等） |
| `package.json` | 项目元数据 |
| `README.md` | 项目文档 |
| `LICENSE` | MIT 许可证 |

---

## ✨ 主要功能

### 📊 实时数据
- 全球市场总值
- 24小时交易量
- 比特币占比
- 上市币种数量

### 🪙 加密货币信息
- 实时价格
- 24小时涨跌幅
- 7天涨跌幅
- 市值排名
- 市值和交易量
- 24小时最高价/最低价

### 🔍 搜索和排序
- 按名称或代码搜索
- 按市值排序
- 按价格排序
- 按涨跌幅排序

### 📈 市场分析
- 市场概况（上涨/下跌币种）
- 价格波动分析
- 赚钱榜（涨幅最大）
- 亏损榜（跌幅最大）

---

## 🔧 自定义配置

### 修改刷新间隔

打开 `js/app.js`，找到第 8-11 行：

```javascript
const API_CONFIG = {
    baseUrl: 'https://api.coingecko.com/api/v3',
    refreshInterval: 300000 // 5分钟（毫秒）
};
```

修改 `refreshInterval` 的值：
- `60000` = 1分钟
- `300000` = 5分钟（默认）
- `600000` = 10分钟

### 修改显示的币种数量

打开 `js/app.js`，找到 `fetchCryptoData()` 函数（大约第 77 行）：

```javascript
`&per_page=50`  // 改为你想要的数量
```

### 修改主题颜色

打开 `css/styles.css`，找到第 13-22 行的 `:root` 选择器：

```css
:root {
    --primary-color: #6366f1;      /* 紫蓝色 */
    --secondary-color: #8b5cf6;    /* 紫色 */
    --success-color: #10b981;      /* 绿色 */
    --danger-color: #ef4444;       /* 红色 */
    /* ... 其他颜色 */
}
```

---

## 🌐 API 说明

本项目使用 **CoinGecko 免费 API**：
- ✅ 无需注册
- ✅ 无需 API Key
- ✅ 实时数据
- ✅ 高速稳定

API 文档: https://www.coingecko.com/en/api

---

## 🐛 常见问题解决

### 问题：页面显示"加载中..."后一直不动

**解决方案：**
1. 打开浏览器开发者工具（F12）
2. 查看 Console 标签是否有错误信息
3. 检查网络连接
4. 检查 CoinGecko API 是否可访问

### 问题：显示"无法获取市场数据"

**解决方案：**
- 检查互联网连接
- 尝试刷新页面
- 等待几分钟后重试（API 可能暂时不可用）

### 问题：页面加载很慢

**解决方案：**
- 减少 `per_page` 的值（在 `js/app.js` 中）
- 检查网络速度
- 关闭其他占用带宽的应用

---

## 💡 浏览器兼容性

| 浏览器 | 版本 | 兼容性 |
|------|------|-------|
| Chrome | 90+ | ✅ 完全兼容 |
| Firefox | 88+ | ✅ 完全兼容 |
| Safari | 14+ | ✅ 完全兼容 |
| Edge | 90+ | ✅ 完全兼容 |
| IE 11 | - | ❌ 不兼容 |

---

## 📚 学习资源

- [JavaScript 教程](https://javascript.info/)
- [CSS 完全指南](https://css-tricks.com/)
- [CoinGecko API 文档](https://www.coingecko.com/en/api)
- [MDN Web 文档](https://developer.mozilla.org/)

---

## 🚀 后续改进

想要改进这个项目？以下是一些想法：

- [ ] 添加本地存储保存用户偏好
- [ ] 实现深色/浅色主题切换
- [ ] 添加价格提醒功能
- [ ] 集成 TradingView 图表
- [ ] 添加国际化支持
- [ ] 创建移动应用版本
- [ ] 添加用户投资组合跟踪
- [ ] 实现高级技术指标

---

**祝你使用愉快！🎉**

如有问题，欢迎在 GitHub 提交 Issue：
https://github.com/lunina8403/Observation-Cryptocurrency/issues
