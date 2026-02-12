# 后端对接文档汇总

## 📋 文档清单

| 文档 | 说明 | 适用对象 |
|------|------|----------|
| [API_SPECIFICATION.md](./API_SPECIFICATION.md) | 完整接口规范 | 后端开发、联调测试 |
| [API_FIELD_MAPPING.md](./API_FIELD_MAPPING.md) | 字段映射表 | 前后端对照、数据核对 |
| [WEBSOCKET_SPEC.md](./WEBSOCKET_SPEC.md) | 实时数据推送规范 | WebSocket开发 |

---

## 🚀 快速开始

### 1. 接口概览

```
基础URL: http://localhost:3001/api/v1
WebSocket: ws://localhost:3001/ws/v1
```

### 2. 核心接口分类

| 页面 | 接口前缀 | 主要功能 |
|------|---------|---------|
| P0 宏观溯源 | `/p0/*` | 迁徙数据、文旅指数、来源地排名 |
| P1 全局态势 | `/p1/*` | 5G-A资源、数字孪生、Co-Pilot日志 |
| P2 场内微观 | `/p2/*` | 用户分层、放号评估、终端分析、VIP对比 |
| P3 评估闭环 | `/p3/*` | 战报数据、经营成果、AI贡献、优化建议 |

### 3. 开发优先级

**P0 优先级最高（开幕式展示）:**
1. `GET /p0/migration` - 迁徙流向
2. `GET /p0/tourism-index` - 文旅指数
3. `GET /p0/visitor-ranking` - 来源地排名

**P1 优先级高（实时监控）:**
1. `GET /p1/resource-status` - 5G-A资源
2. WebSocket `logs` 频道 - Co-Pilot终端
3. `GET /p1/digital-twin` - 数字孪生

**P2/P3 优先级中（赛后分析）:**
1. `GET /p2/user-hierarchy` - 用户分层
2. `GET /p3/battle-report` - 战报数据

---

## 📊 数据模型说明

### 时间粒度

| 场景 | 粒度 | 范围 |
|------|------|------|
| 赛前迁徙 | 15分钟 | 08:00-12:00 |
| 赛中监控 | 实时/秒级 | 18:00-22:00 |
| 赛后回放 | 15分钟 | 可调整 |

### 核心指标单位

| 指标 | 单位 | 示例 |
|------|------|------|
| 人流 | 人/万人 | 65,328人 |
| 流量 | TB/Gbps | 15.8 TB |
| 速率 | Mbps | 850 Mbps |
| 时延 | ms | 20 ms |
| 百分比 | % | 60% |

---

## 🔌 WebSocket 订阅

### 必订阅频道

```javascript
// P0/P1 实时监控
ws.subscribe(['crowd', 'traffic', 'alarms']);

// P1 Co-Pilot终端
ws.subscribe(['logs']);

// P2/P3 赛后回放（按需）
ws.subscribe(['kqi']);
```

---

## ⚙️ 场景切换

支持三种场景模式：

```
1. normal - 正常场景（默认）
2. congestion - 拥塞场景（人流高峰）
3. failure - 故障场景（设备故障演练）
```

**切换接口:**
```
POST /scenarios/switch
Body: { "scenarioId": "congestion" }
```

---

## 📞 联调对接人

| 角色 | 姓名 | 联系方式 |
|------|------|----------|
| 前端负责人 | kennyqq | qi.quan@qq.com |
| BFF中间件 | - | 待补充 |
| 数据团队 | - | 待补充 |

---

## 📝 变更日志

### v1.0.0 (2026-02-12)
- 初始版本，包含P0-P3完整接口定义
- WebSocket实时数据推送规范
- 字段映射表

---

**文档版本:** v1.0.0  
**最后更新:** 2026-02-12
