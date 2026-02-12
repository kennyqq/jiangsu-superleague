# 前端-后端字段映射表

## P0 宏观溯源

| 前端显示 | 后端字段 | 类型 | 示例值 | 说明 |
|---------|---------|------|--------|------|
| 距离苏超开幕 | `opening.days` + `opening.hours` | int | 58天9小时 | 倒计时 |
| 城市文旅引流指数 | `tourismIndex.index` | int | 35241 | 当日外地访客 |
| 较平日均值 | `tourismIndex.increase` | int | +120% | 增长率 |
| 球迷来源地TOP8 | `visitorRanking[].city` | string | 上海 | 城市名称 |
| 流入人数 | `visitorRanking[].value` | int | 15200 | 信令统计 |
| 迁徙流向 | `migration.flowData[].fromCity` | string | 上海 | 出发城市 |
| 流量强度 | `migration.flowData[].value` | int | 15200 | 人数 |
| 交通枢纽压力 | `transport.hubs[].pressure` | float | 1.56 | 压力系数 |

## P1 全局态势

| 前端显示 | 后端字段 | 类型 | 示例值 | 说明 |
|---------|---------|------|--------|------|
| 5G-A站点 | `resource.sites.total` | int | 48个 | 运行中 |
| 智能板 | `resource.intelligentBoards.total` | int | 8个 | 协同中 |
| 3CC载波 | `resource.threeCC.enabled` | bool | true | 开启/关闭 |
| PRB负载 | `resource.prbLoad.current` | int | 42% | 平均利用率 |
| 应急通信车 | `resource.emergencyVehicles.total` | int | 2辆 | 在网 |
| 波束赋形 | `resource.beamforming.beams` | int | 128束 | 动态优化 |
| 智能运维日志 | `copilot.logs[].content` | string | [AI动作]... | 终端输出 |
| 业务质量 | `kqi.metrics[].value` | float | 99.5% | 成功率 |

## P2 场内微观

| 前端显示 | 后端字段 | 类型 | 示例值 | 说明 |
|---------|---------|------|--------|------|
| 场馆包用户 | `hierarchy.layers[0].count` | int | 200人 | 金字塔顶层 |
| 全球通金卡 | `hierarchy.layers[1].count` | int | 1,500人 | 金字塔中层 |
| 普通用户 | `hierarchy.layers[2].count` | int | 48,000人 | 金字塔底层 |
| 总用户数 | `hierarchy.total` | int | 49,700 | 合计 |
| 当前空间 | `capacity.currentSpace.value` | int | 60% | 容量使用率 |
| 未来30min预测 | `capacity.prediction.values[]` | array | [60,61...] | 趋势数据 |
| UE Logo支持率 | `terminal.logoSupportRate.value` | int | 60% | 个性化图标 |
| TOP终端排行 | `terminal.rankings[].model` | string | Mate 60 Pro | 型号 |
| 5G-A支持 | `terminal.rankings[].supports5GA` | bool | true/false | 能力标签 |
| VIP下行速率 | `vipExperience.comparison[0].vipValue` | int | 850 Mbps | VIP指标 |
| 普通下行速率 | `vipExperience.comparison[0].normalValue` | int | 60 Mbps | 普通指标 |
| 微信消息时延 | `kqi.metrics[0].value` | int | 20 ms | KQI指标 |
| 根因诊断问题 | `rootCause.issues[].problem` | string | 干扰过高 | 问题描述 |
| 问题级别 | `rootCause.issues[].level` | string | high/medium/low | 严重程度 |

## P3 评估闭环

| 前端显示 | 后端字段 | 类型 | 示例值 | 说明 |
|---------|---------|------|--------|------|
| 比赛日期 | `battleReport.match.date` | string | 5月2日 | 比赛时间 |
| 比分 | `battleReport.match.score` | string | 2:1 | 主:客 |
| 奥体球迷峰值 | `battleReport.metrics.peakCrowd.value` | int | 65,328人 | 历史新高 |
| 峰值话务量 | `battleReport.metrics.peakTraffic.value` | float | 15.8 TB | 总流量 |
| 5G-A场馆包 | `battleReport.metrics.fiveGAPackages.value` | int | 850份 | 销量 |
| S级保障 | `battleReport.grade` | string | S级 | 保障等级 |
| 钻白卡用户 | `business.vipUsers.diamondPlatinum.count` | int | 3,241人 | 重保VIP |
| 现场上行流量 | `business.uplinkTraffic.peak` | float | 4.2 Gbps | 峰值 |
| 峰值时刻 | `business.uplinkTraffic.peakTime` | string | 20:45 | 进球时刻 |
| 智能体自动优化 | `ai.contributions[0].value` | string | 156次 | 优化次数 |
| 潜在隐患拦截 | `ai.contributions[1].value` | string | 23起 | 拦截数 |
| VIP感知保障 | `ai.contributions[2].value` | string | 100% | 保障率 |
| 优化建议 | `optimization.suggestions[].area` | string | 南看台F区扩容 | 建议内容 |

## 统一时间轴（所有页面）

| 前端显示 | 后端字段 | 类型 | 示例值 | 说明 |
|---------|---------|------|--------|------|
| 当前时间 | `timeline.currentTime` | string | 20:30 | HH:mm |
| 人流数值 | `timeline.metrics.crowd` | float | 4.5万人 | 当前值 |
| 流量数值 | `timeline.metrics.traffic` | float | 8.2 TB | 当前值 |
| 5G-A数值 | `timeline.metrics.fiveGA` | float | 2.1 Gbps | 当前值 |
| 历史趋势 | `timeline.history[]` | array | [...] | 用于柱状图 |

---

## 关键计算逻辑

### 文旅引流指数
```
当日外地访客 ÷ 平日基准 × 100 = 引流指数
```

### 交通枢纽压力系数
```
今日流量 ÷ 平日流量 = 压力系数
>2.0 极高 | 1.5-2.0 高 | 1.0-1.5 正常 | <1.0 低
```

### VIP速率提升倍数
```
VIP下行速率 ÷ 普通下行速率 = 提升倍数
850 ÷ 60 ≈ 14倍 (展示为10倍取整)
```

---

**文档版本:** v1.0.0  
**更新日期:** 2026-02-12
