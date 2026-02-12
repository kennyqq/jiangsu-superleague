# 江苏移动苏超联赛智慧保障系统

<p align="center">
  <img src="https://img.shields.io/badge/Vue-3.4+-green.svg" alt="Vue">
  <img src="https://img.shields.io/badge/React-18+-blue.svg" alt="React">
  <img src="https://img.shields.io/badge/Vite-5.0+-purple.svg" alt="Vite">
  <img src="https://img.shields.io/badge/Tailwind-3.0+-cyan.svg" alt="Tailwind">
  <img src="https://img.shields.io/badge/ECharts-5.0+-red.svg" alt="ECharts">
</p>

<p align="center">
  <b>"一张网，火一座城"</b> - 江苏移动苏超联赛通信保障智能化指挥中心
</p>

---

## 📋 项目简介

本项目是**江苏移动**为**苏超联赛**（江苏省足球超级联赛）打造的通信保障智能化指挥系统。系统通过实时数据可视化、AI智能分析、数字孪生等技术，实现对赛事期间网络态势的全方位感知、精准化保障和智能化决策。

### 🎯 核心目标

- **实时感知**：人流、话务、网络质量的实时监控
- **智能预警**：AI驱动的异常检测和根因诊断
- **精准保障**：VIP用户分层体验保障
- **数字化战报**：赛后总结与经营变现分析

---

## 🏗️ 系统架构

### 技术栈

| 层级 | 技术选型 |
|------|---------|
| **前端框架** | React 18 + Vite 5 |
| **状态管理** | React Hooks + Context |
| **UI样式** | Tailwind CSS + Framer Motion |
| **数据可视化** | ECharts + 自定义Canvas |
| **地图引擎** | ECharts Geo + 迁徙图 |
| **实时通信** | WebSocket |
| **BFF层** | Node.js + Express |

### 部署架构

```
┌─────────────────────────────────────────────────────────┐
│                     用户访问层                            │
│              (浏览器/大屏/移动端)                          │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                   Vercel/CDN 部署                        │
│              (React前端静态资源)                          │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                   BFF中间件层                            │
│         (Node.js + Express + WebSocket)                  │
│     接口聚合、数据转换、场景管理、实时推送                 │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                   数据中台层                              │
│    (移动大数据平台、网络监控系统、CRM系统)                 │
└─────────────────────────────────────────────────────────┘
```

---

## 🖥️ 四大核心视图

### P0 宏观溯源 - "一张网，火一座城"

<p align="center">
  <img src="./docs/images/p0-preview.png" width="80%" alt="P0宏观溯源">
</p>

**核心功能：**
- 🗺️ **迁徙流向图**：实时展示球迷从全国各地向南京的迁徙流向
- 📊 **文旅引流指数**：量化赛事对城市文旅的带动效应
- 🏆 **来源地TOP8**：球迷来源城市排行榜
- 🚄 **交通枢纽压力**：高铁、机场、地铁实时压力监测
- ⏰ **倒计时卡片**：距离开幕式倒计时

**数据支撑：**
- 信令数据（用户位置）
- 交通数据（铁路、航空）
- 文旅数据（景区客流）

---

### P1 全局态势 - "看得清态势，防得住隐患"

<p align="center">
  <img src="./docs/images/p1-preview.png" width="80%" alt="P1全局态势">
</p>

**核心功能：**
- 🔧 **5G-A资源网格**：48个5G-A站点、8块智能板、3CC载波状态
- 🗺️ **数字孪生地图**：奥体中心及周边网络拓扑可视化
- 🤖 **Co-Pilot智能体终端**：AI运维日志实时滚动，展示自愈过程
- 📈 **业务质量矩阵**：微信、抖音、直播等业务的KQI指标
- ⚠️ **实时告警推送**：拥塞、干扰、故障实时预警

**技术亮点：**
- Linux终端风格AI日志
- 固定高度内滚动（300px）
- 自动循环播放三种场景

---

### P2 场内微观 - "网业协同，体验变现"

<p align="center">
  <img src="./docs/images/p2-preview.png" width="80%" alt="P2场内微观">
</p>

**核心功能：**
- 🔺 **用户分层金字塔**：场馆包用户 / 全球通金卡 / 普通用户三层结构
- 📊 **放号评估智能体**：缺口圆环仪表盘 + 30分钟趋势预测
- 📱 **终端能力分析**：TOP5终端排行，5G-A支持能力标识
- ⚖️ **VIP体验对比**：VIP用户 vs 普通用户的多维度指标对比
- 📋 **根因诊断列表**：南看台干扰、西入口弱覆盖等问题定位
- 📹 **保障专员视频**：一键呼叫现场保障人员

**创新设计：**
- 金字塔图表（底部宽顶部窄）
- 缺口圆环进度条（现代化仪表盘）
- 胶囊式对比图（中心轴布局）

---

### P3 评估闭环 - "赛后总结，持续优化"

<p align="center">
  <img src="./docs/images/p3-preview.png" width="80%" alt="P3评估闭环">
</p>

**核心功能：**
- 📜 **数字化战报**：比赛结果、核心指标、S级保障评定
- 💎 **钻白卡用户统计**：3,241名重保VIP用户
- 📊 **上行流量趋势**：Peak 4.2 Gbps @ 进球时刻
- 📱 **VIP赛后关怀**：手机通知样式的关怀短信
- 🤖 **AI智算贡献**：156次自动优化、23起隐患拦截
- 🔧 **持续优化建议**：下一场比赛的改进建议

**赛后关怀示例：**
> "尊贵的钻白卡用户，昨晚智能体为您的微信视频/直播业务进行了专属加速 🚀，您的体验超越了现场99%的用户"

---

## 🎨 设计规范

### 视觉风格

| 页面 | 主题色 | 配色方案 |
|------|--------|---------|
| P0 | 青色 (#00F0FF) | 科技蓝绿，冷色调 |
| P1 | 青色 (#00F0FF) | 科技蓝绿，数据感 |
| P2 | 金色 (#FFD700) | 尊贵金黄，商业感 |
| P3 | 金色+青色 | 胜利金+科技青 |

### 统一组件

- **玻璃态面板**：`rgba(13,20,30,0.6) + blur(10px)`
- **四角高亮边框**：1px青色线条 + 四角L形装饰
- **装饰英文**：10px小字，透明度0.3
- **数字字体**：Orbitron（科技感）

---

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0
- npm >= 9.0
- Git

### 本地开发

```bash
# 克隆仓库
git clone https://github.com/kennyqq/jiangsu-superleague.git

# 进入目录
cd jiangsu-superleague

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问 http://localhost:3002
```

### 生产构建

```bash
# 构建
npm run build

# 预览构建结果
npm run preview
```

---

## 📡 接口文档

完整的接口规范请参考：

| 文档 | 说明 |
|------|------|
| [API_SPECIFICATION.md](./API_SPECIFICATION.md) | RESTful API完整规范 |
| [API_FIELD_MAPPING.md](./API_FIELD_MAPPING.md) | 字段映射对照表 |
| [WEBSOCKET_SPEC.md](./WEBSOCKET_SPEC.md) | WebSocket实时数据规范 |
| [BACKEND_INTEGRATION_README.md](./BACKEND_INTEGRATION_README.md) | 后端对接导读 |

### 核心接口概览

```
GET /p0/migration          # 迁徙流向数据
GET /p0/tourism-index      # 文旅引流指数
GET /p1/resource-status    # 5G-A资源状态
GET /p1/digital-twin       # 数字孪生地图
GET /p2/user-hierarchy     # 用户分层结构
GET /p2/capacity-assessment # 放号评估
GET /p3/battle-report      # 战后总结报
WS  /ws/v1                 # WebSocket实时推送
```

---

## 🌐 在线演示

**Vercel部署地址：**
```
https://jiangsu-superleague.vercel.app
```

**访问路径：**
- 首页（P0）：`/` 或 `/p0`
- 全局态势：`/p1`
- 场内微观：`/p2`
- 评估闭环：`/p3`

---

## 🛠️ BFF中间件

独立的BFF层项目：
```
/jiangsu-superleague-bff
├── src/
│   ├── controllers/     # 接口控制器
│   ├── services/        # 业务逻辑
│   ├── middleware/      # 中间件
│   └── websocket/       # WebSocket服务
├── config/
│   └── scenarios/       # 场景配置
└── package.json
```

**启动命令：**
```bash
cd ../jiangsu-superleague-bff
npm install
npm run dev
```

---

## 📦 项目结构

```
super-league-command/
├── public/                    # 静态资源
│   ├── stadium_internal_view.jpg
│   └── city_night_top_view.jpg
├── src/
│   ├── components/            # 公共组件
│   │   ├── Header.jsx         # 顶部导航
│   │   ├── CyberBorder.jsx    # 赛博边框
│   │   └── TimelineUnified.jsx # 统一时间轴
│   ├── pages/
│   │   ├── P0/               # 宏观溯源
│   │   ├── P1/               # 全局态势
│   │   ├── P2/               # 场内微观
│   │   └── P3/               # 评估闭环
│   ├── App.jsx               # 主应用
│   └── index.css             # 全局样式
├── docs/                     # 文档
│   └── images/               # 预览图
├── API_SPECIFICATION.md      # 接口规范
├── API_FIELD_MAPPING.md      # 字段映射
├── WEBSOCKET_SPEC.md         # WebSocket规范
└── README.md                 # 本文件
```

---

## 👥 团队成员

| 角色 | 姓名 | 职责 |
|------|------|------|
| 前端开发 | kennyqq | 可视化界面、交互逻辑 |
| 后端开发 | - | 数据中台、接口开发 |
| 数据团队 | - | 信令数据、网络数据 |
| 产品设计 | - | 交互设计、视觉规范 |

---

## 📄 许可证

本项目为**江苏移动内部项目**，未经授权不得外传。

---

## 🙏 鸣谢

- 江苏移动网络部
- 江苏移动大数据中心
- 江苏移动客户运营中心

---

<p align="center">
  <b>江苏移动 · 苏超联赛智慧保障系统</b><br>
  <i>One Network Ignites a City</i>
</p>
