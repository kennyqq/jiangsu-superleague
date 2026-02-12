# 江苏移动苏超联赛 - 前端接口需求文档

## 文档信息

| 项目 | 内容 |
|------|------|
| 版本 | v1.0.0 |
| 日期 | 2026-02-12 |
| 前端负责人 | kennyqq |
| 协议 | HTTP/HTTPS + WebSocket |
| 数据格式 | JSON |

---

## 目录

1. [通用规范](#通用规范)
2. [P0 宏观溯源接口](#p0-宏观溯源接口)
3. [P1 全局态势接口](#p1-全局态势接口)
4. [P2 场内微观接口](#p2-场内微观接口)
5. [P3 评估闭环接口](#p3-评估闭环接口)
6. [WebSocket 实时数据](#websocket-实时数据)
7. [错误码定义](#错误码定义)

---

## 通用规范

### 基础URL

```
开发环境: http://localhost:3001/api/v1
测试环境: https://api-test.jiangsu-superleague.com/api/v1
生产环境: https://api.jiangsu-superleague.com/api/v1
```

### 请求/响应格式

**请求头:**
```http
Content-Type: application/json
Authorization: Bearer {token}
X-Request-ID: {uuid}
```

**响应格式:**
```json
{
  "code": 200,
  "message": "success",
  "data": {},
  "timestamp": 1707734400000
}
```

### 分页参数

| 参数 | 类型 | 说明 |
|------|------|------|
| page | int | 页码，默认1 |
| size | int | 每页数量，默认20 |

### 通用时间参数

| 参数 | 类型 | 格式 | 说明 |
|------|------|------|------|
| date | string | YYYY-MM-DD | 比赛日期 |
| time | string | HH:mm | 时间点 |
| timestamp | long | 毫秒 | 时间戳 |

---

## P0 宏观溯源接口

### 1. 获取迁徙数据

**接口:** `GET /p0/migration`

**描述:** 获取球迷迁徙流向数据

**请求参数:**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| date | string | 是 | 比赛日期，如 "2026-05-02" |
| viewType | string | 否 | 视图类型: national/jiangsu，默认 national |
| timeSlot | string | 否 | 时间点，如 "10:00" |

**响应字段:**

```json
{
  "code": 200,
  "data": {
    "totalCount": 65200,
    "updateTime": "2026-05-02T20:30:00",
    "flowData": [
      {
        "fromCity": "上海",
        "fromCoord": [121.4737, 31.2304],
        "toCoord": [118.7969, 32.0603],
        "value": 15200,
        "percentage": 23.3,
        "transportation": "高铁/自驾"
      }
    ],
    "timeSlots": ["08:00", "08:15", "08:30", ...]
  }
}
```

### 2. 获取文旅引流指数

**接口:** `GET /p0/tourism-index`

**描述:** 获取城市文旅引流指数及排名

**请求参数:**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| date | string | 是 | 比赛日期 |

**响应字段:**

```json
{
  "code": 200,
  "data": {
    "index": 35241,
    "unit": "人",
    "increase": 120,
    "formula": "当日外地访客 ÷ 平日基准 × 100",
    "updateTime": "2026-05-02T20:30:00",
    "topAttractions": [
      {
        "name": "夫子庙秦淮河",
        "visitors": 29000,
        "increase": 156
      }
    ]
  }
}
```

### 3. 获取球迷来源地排名

**接口:** `GET /p0/visitor-ranking`

**描述:** 获取球迷来源城市TOP排名

**请求参数:**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| date | string | 是 | 比赛日期 |
| type | string | 否 | 类型: national/jiangsu，默认 national |
| limit | int | 否 | 返回数量，默认8 |

**响应字段:**

```json
{
  "code": 200,
  "data": {
    "rankingType": "national",
    "list": [
      {
        "rank": 1,
        "city": "上海",
        "enName": "Shanghai",
        "value": 15200,
        "percentage": 23.3,
        "color": "#FF3333"
      }
    ]
  }
}
```

### 4. 获取交通枢纽压力

**接口:** `GET /p0/transport-pressure`

**描述:** 获取交通枢纽实时压力监测

**响应字段:**

```json
{
  "code": 200,
  "data": {
    "hubs": [
      {
        "name": "南京南站",
        "enName": "Nanjing South",
        "todayFlow": 12.5,
        "weekdayFlow": 8.0,
        "unit": "万",
        "pressure": 1.56,
        "status": "high",
        "iconType": "train"
      }
    ]
  }
}
```

---

## P1 全局态势接口

### 1. 获取5G-A资源状态

**接口:** `GET /p1/resource-status`

**描述:** 获取5G-A网络资源实时状态

**响应字段:**

```json
{
  "code": 200,
  "data": {
    "sites": {
      "total": 48,
      "online": 48,
      "status": "normal"
    },
    "intelligentBoards": {
      "total": 8,
      "active": 8
    },
    "threeCC": {
      "enabled": true,
      "description": "三载波聚合"
    },
    "prbLoad": {
      "current": 42,
      "unit": "%",
      "trend": "stable"
    },
    "emergencyVehicles": {
      "total": 2,
      "inService": 2
    },
    "beamforming": {
      "beams": 128,
      "status": "动态优化"
    }
  }
}
```

### 2. 获取数字孪生地图数据

**接口:** `GET /p1/digital-twin`

**描述:** 获取数字孪生地图站点数据

**请求参数:**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| time | string | 否 | 时间点，默认当前 |

**响应字段:**

```json
{
  "code": 200,
  "data": {
    "stations": [
      {
        "id": "site_001",
        "name": "奥体中心-1",
        "coord": [118.7969, 32.0603],
        "status": "normal",
        "indicators": {
          "rsrp": -85,
          "sinr": 18,
          "throughput": 850,
          "users": 3200
        },
        "alarmLevel": 0
      }
    ],
    "coverage": {
      "excellent": 85,
      "good": 12,
      "fair": 3
    }
  }
}
```

### 3. 获取Co-Pilot终端日志

**接口:** `GET /p1/copilot-logs`

**描述:** 获取AI智能运维终端日志

**请求参数:**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| limit | int | 否 | 返回条数，默认15 |

**响应字段:**

```json
{
  "code": 200,
  "data": {
    "logs": [
      {
        "timestamp": "19:42:05",
        "type": "ai",
        "level": "info",
        "content": "[AI动作] 分析下倾角参数...",
        "scenario": "自动优化"
      }
    ],
    "currentScenario": 1,
    "totalScenarios": 3,
    "systemStatus": "自愈运行中"
  }
}
```

### 4. 获取业务质量矩阵

**接口:** `GET /p1/kqi-matrix`

**描述:** 获取业务质量KQI矩阵数据

**响应字段:**

```json
{
  "code": 200,
  "data": {
    "indicators": [
      {
        "name": "微信视频",
        "value": 99.5,
        "unit": "%",
        "status": "excellent",
        "trend": "up"
      },
      {
        "name": "抖音直播",
        "value": 98.8,
        "unit": "%",
        "status": "excellent",
        "trend": "stable"
      }
    ]
  }
}
```

---

## P2 场内微观接口

### 1. 获取用户分层结构

**接口:** `GET /p2/user-hierarchy`

**描述:** 获取用户分层金字塔数据

**响应字段:**

```json
{
  "code": 200,
  "data": {
    "total": 49700,
    "layers": [
      {
        "level": "premium",
        "label": "场馆包用户",
        "count": 200,
        "percentage": 0.4,
        "color": "#FFD700"
      },
      {
        "level": "gold",
        "label": "全球通金卡",
        "count": 1500,
        "percentage": 3.0,
        "color": "#C0C0C0"
      },
      {
        "level": "regular",
        "label": "普通用户",
        "count": 48000,
        "percentage": 96.6,
        "color": "#0055FF"
      }
    ]
  }
}
```

### 2. 获取放号评估数据

**接口:** `GET /p2/capacity-assessment`

**描述:** 获取实时放号空间评估

**响应字段:**

```json
{
  "code": 200,
  "data": {
    "currentSpace": {
      "value": 60,
      "unit": "%",
      "status": "green",
      "suggestion": "建议推广"
    },
    "prediction": {
      "timeline": ["-30分", "-20分", "-10分", "当前", "+10分", "+20分", "+30分"],
      "values": [60, 61, 62, 62, 63, 64, 65],
      "peak": 65
    }
  }
}
```

### 3. 获取终端能力分析

**接口:** `GET /p2/terminal-analysis`

**描述:** 获取TOP终端排行及5G-A支持情况

**响应字段:**

```json
{
  "code": 200,
  "data": {
    "logoSupportRate": {
      "value": 60,
      "unit": "%",
      "target": 80
    },
    "rankings": [
      {
        "rank": 1,
        "brand": "华为",
        "model": "Mate 60 Pro",
        "supports5GA": false
      },
      {
        "rank": 2,
        "brand": "苹果",
        "model": "iPhone 15 Pro",
        "supports5GA": true
      }
    ]
  }
}
```

### 4. 获取VIP体验对比

**接口:** `GET /p2/vip-experience`

**描述:** 获取VIP与普通用户体验对比数据

**响应字段:**

```json
{
  "code": 200,
  "data": {
    "comparison": [
      {
        "indicator": "下行速率",
        "icon": "🚀",
        "vipValue": 850,
        "normalValue": 60,
        "unit": "Mbps"
      },
      {
        "indicator": "微信上传",
        "icon": "⬆️",
        "vipValue": 120,
        "normalValue": 20,
        "unit": "Mbps"
      },
      {
        "indicator": "游戏时延",
        "icon": "🎮",
        "vipValue": 18,
        "normalValue": 35,
        "unit": "ms",
        "lowerIsBetter": true
      }
    ],
    "summary": {
      "speedImprovement": "10倍",
      "latencyReduction": "50%"
    }
  }
}
```

### 5. 获取KQI指标

**接口:** `GET /p2/kqi-metrics`

**描述:** 获取基础业务保障KQI

**响应字段:**

```json
{
  "code": 200,
  "data": {
    "metrics": [
      {
        "name": "微信消息",
        "value": 20,
        "unit": "ms",
        "quality": "excellent"
      },
      {
        "name": "抖音播放",
        "value": "高清",
        "quality": "excellent"
      }
    ]
  }
}
```

### 6. 获取根因诊断

**接口:** `GET /p2/root-cause`

**描述:** 获取智能根因诊断列表

**响应字段:**

```json
{
  "code": 200,
  "data": {
    "issues": [
      {
        "id": "issue_001",
        "location": "南看台",
        "problem": "干扰过高",
        "level": "high",
        "description": "检测到外部干扰源",
        "suggestion": "建议频谱清理"
      }
    ],
    "totalIssues": 3,
    "resolvedIssues": 2
  }
}
```

---

## P3 评估闭环接口

### 1. 获取战报数据

**接口:** `GET /p3/battle-report`

**描述:** 获取通信保障总结战报

**请求参数:**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| date | string | 是 | 比赛日期 |

**响应字段:**

```json
{
  "code": 200,
  "data": {
    "match": {
      "date": "5月2日",
      "homeTeam": "南京城市",
      "awayTeam": "常州队",
      "score": "2:1",
      "result": "主场胜利"
    },
    "metrics": {
      "peakCrowd": {
        "value": 65328,
        "unit": "人",
        "label": "奥体球迷峰值",
        "highlight": "历史新高"
      },
      "peakTraffic": {
        "value": 15.8,
        "unit": "TB",
        "label": "峰值话务量"
      },
      "fiveGAPackages": {
        "value": 850,
        "unit": "份",
        "label": "5G-A场馆包销量"
      }
    },
    "grade": "S级保障",
    "status": "圆满完成"
  }
}
```

### 2. 获取经营变现成果

**接口:** `GET /p3/business-results`

**描述:** 获取经营变现数据

**响应字段:**

```json
{
  "code": 200,
  "data": {
    "vipUsers": {
      "diamondPlatinum": {
        "count": 3241,
        "unit": "人",
        "label": "钻白卡用户"
      },
      "packages": {
        "count": 850,
        "unit": "份",
        "label": "5G-A场馆包销量"
      }
    },
    "uplinkTraffic": {
      "peak": 4.2,
      "unit": "Gbps",
      "peakTime": "20:45",
      "trend": [0.8, 2.1, 3.5, 4.2, 3.8, 2.5]
    }
  }
}
```

### 3. 获取AI智算贡献

**接口:** `GET /p3/ai-contribution`

**描述:** 获取AI智能体贡献数据

**响应字段:**

```json
{
  "code": 200,
  "data": {
    "contributions": [
      {
        "label": "智能体自动优化",
        "value": "156 次",
        "progress": 80,
        "trend": "+12% 效率提升"
      },
      {
        "label": "潜在隐患拦截",
        "value": "23 起",
        "progress": 100,
        "trend": "0 故障发生"
      },
      {
        "label": "VIP感知保障",
        "value": "100%",
        "progress": 100,
        "trend": "满意度 4.9/5"
      }
    ]
  }
}
```

### 4. 获取优化建议

**接口:** `GET /p3/optimization-suggestions`

**描述:** 获取持续优化建议

**响应字段:**

```json
{
  "code": 200,
  "data": {
    "suggestions": [
      {
        "priority": 1,
        "area": "南看台F区扩容",
        "description": "建议增加2个4T4R小区",
        "impact": "high"
      },
      {
        "priority": 2,
        "area": "VIP专席保障优化",
        "description": "下一场提前15分钟预激活",
        "impact": "medium"
      }
    ]
  }
}
```

---

## WebSocket 实时数据

### 连接地址

```
wss://api.jiangsu-superleague.com/ws/v1
```

### 消息类型

#### 1. 订阅实时数据

**发送:**
```json
{
  "action": "subscribe",
  "channels": ["crowd", "traffic", "alarms"],
  "date": "2026-05-02"
}
```

**接收 - 人流更新:**
```json
{
  "channel": "crowd",
  "timestamp": 1707734400000,
  "data": {
    "total": 65328,
    "increase": 120,
    "hotZones": [
      {"location": "南看台", "density": "high"}
    ]
  }
}
```

**接收 - 告警推送:**
```json
{
  "channel": "alarms",
  "timestamp": 1707734400000,
  "data": {
    "id": "alarm_001",
    "level": "high",
    "location": "南看台F区",
    "message": "干扰过高",
    "suggestion": "建议频谱清理"
  }
}
```

### 心跳机制

```json
// 客户端发送
{"type": "ping", "timestamp": 1707734400000}

// 服务端响应
{"type": "pong", "timestamp": 1707734400100}
```

---

## 场景切换接口

### 获取场景列表

**接口:** `GET /scenarios`

**响应:**
```json
{
  "code": 200,
  "data": {
    "scenarios": [
      {"id": "normal", "name": "正常场景", "description": "正常比赛日"},
      {"id": "congestion", "name": "拥塞场景", "description": "人流高峰拥塞"},
      {"id": "failure", "name": "故障场景", "description": "设备故障演练"}
    ],
    "current": "normal"
  }
}
```

### 切换场景

**接口:** `POST /scenarios/switch`

**请求体:**
```json
{
  "scenarioId": "congestion"
}
```

---

## 错误码定义

| 错误码 | 说明 | 处理建议 |
|--------|------|----------|
| 200 | 成功 | - |
| 400 | 请求参数错误 | 检查参数格式 |
| 401 | 未授权 | 检查Token |
| 403 | 禁止访问 | 检查权限 |
| 404 | 资源不存在 | 检查日期/ID |
| 429 | 请求过于频繁 | 降低请求频率 |
| 500 | 服务器内部错误 | 联系后端 |
| 503 | 服务不可用 | 稍后重试 |

---

## 附录

### 状态枚举

**站点状态:**
- `normal` - 正常
- `warning` - 警告
- `error` - 故障
- `offline` - 离线

**告警级别:**
- `low` - 低
- `medium` - 中
- `high` - 高
- `critical` - 紧急

**指标质量:**
- `excellent` - 优
- `good` - 良
- `fair` - 中
- `poor` - 差

---

**文档结束**
