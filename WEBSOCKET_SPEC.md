# WebSocket 实时数据推送规范

## 连接信息

```
地址: wss://api.jiangsu-superleague.com/ws/v1
协议: WebSocket (RFC 6455)
心跳间隔: 30秒
重连策略: 指数退避 (1s, 2s, 4s, 8s, max 30s)
```

## 消息格式

所有消息使用 JSON 格式：

```typescript
interface WebSocketMessage {
  type: 'subscribe' | 'unsubscribe' | 'data' | 'ping' | 'pong' | 'error';
  channel?: string;
  timestamp: number;
  data?: any;
  error?: string;
}
```

## 客户端操作

### 1. 建立连接后订阅频道

```json
{
  "type": "subscribe",
  "channels": ["crowd", "traffic", "alarms", "logs"],
  "date": "2026-05-02",
  "timestamp": 1707734400000
}
```

### 2. 心跳保活

客户端每 30 秒发送：
```json
{
  "type": "ping",
  "timestamp": 1707734400000
}
```

服务端响应：
```json
{
  "type": "pong",
  "timestamp": 1707734400100
}
```

### 3. 取消订阅

```json
{
  "type": "unsubscribe",
  "channels": ["alarms"],
  "timestamp": 1707734400000
}
```

## 数据频道说明

### crowd - 人流数据

推送频率: 15秒

```json
{
  "type": "data",
  "channel": "crowd",
  "timestamp": 1707734400000,
  "data": {
    "total": 65328,
    "increase": 120,
    "sections": [
      {"name": "南看台", "count": 15200, "capacity": 85},
      {"name": "北看台", "count": 12800, "capacity": 72},
      {"name": "东看台", "count": 18600, "capacity": 90},
      {"name": "西看台", "count": 18728, "capacity": 88}
    ],
    "trend": "up"
  }
}
```

### traffic - 流量数据

推送频率: 30秒

```json
{
  "type": "data",
  "channel": "traffic",
  "timestamp": 1707734400000,
  "data": {
    "total": 15.8,
    "unit": "TB",
    "breakdown": {
      "upload": 4.2,
      "download": 11.6
    },
    "peakApps": ["微信", "抖音", "微博"]
  }
}
```

### alarms - 告警推送

推送频率: 实时（有告警时）

```json
{
  "type": "data",
  "channel": "alarms",
  "timestamp": 1707734400000,
  "data": {
    "id": "alarm_001",
    "level": "high",
    "type": "interference",
    "location": "南看台F区",
    "message": "检测到外部干扰源，影响用户约3200人",
    "suggestion": "建议进行频谱清理",
    "autoResolved": false
  }
}
```

告警级别:
- `low` - 绿色，提示
- `medium` - 黄色，注意
- `high` - 橙色，警告
- `critical` - 红色，紧急

### logs - Co-Pilot终端日志

推送频率: 实时（有新日志时）

```json
{
  "type": "data",
  "channel": "logs",
  "timestamp": 1707734400000,
  "data": {
    "time": "20:42:05",
    "type": "ai",
    "level": "info",
    "content": "[AI动作] 分析下倾角参数，计算最优路由...",
    "scenario": "congestion_relief"
  }
}
```

日志类型:
- `info` - 普通信息（白色）
- `warn` - 警告（橙色）
- `error` - 错误（红色）
- `ai` - AI动作（青色）
- `success` - 成功（绿色）

### kqi - 业务质量指标

推送频率: 60秒

```json
{
  "type": "data",
  "channel": "kqi",
  "timestamp": 1707734400000,
  "data": {
    "indicators": [
      {"name": "微信视频", "successRate": 99.5, "latency": 20},
      {"name": "抖音直播", "successRate": 98.8, "latency": 35}
    ]
  }
}
```

## 场景推送

### 场景切换通知

当后端切换场景时，主动推送给所有客户端：

```json
{
  "type": "data",
  "channel": "scenario",
  "timestamp": 1707734400000,
  "data": {
    "scenarioId": "congestion",
    "scenarioName": "拥塞场景",
    "description": "南看台人流突增，触发拥塞预案",
    "autoTriggered": false
  }
}
```

## 错误处理

### 服务端错误推送

```json
{
  "type": "error",
  "timestamp": 1707734400000,
  "error": "Invalid channel name",
  "code": 4001
}
```

错误码:
- `4001` - 无效频道
- `4002` - 未授权访问
- `4003` - 订阅过多频道
- `5001` - 服务端内部错误

## 连接状态管理

```javascript
// 连接状态枚举
const ConnectionState = {
  CONNECTING: 0,
  OPEN: 1,
  CLOSING: 2,
  CLOSED: 3,
  RECONNECTING: 4
};

// 重连策略
const reconnectStrategy = {
  maxAttempts: 10,
  baseDelay: 1000,
  maxDelay: 30000,
  backoffMultiplier: 2
};
```

## 前端集成示例

```javascript
class SuperLeagueWebSocket {
  constructor(url) {
    this.url = url;
    this.ws = null;
    this.channels = new Set();
    this.reconnectAttempts = 0;
    this.listeners = {};
  }

  connect() {
    this.ws = new WebSocket(this.url);
    
    this.ws.onopen = () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;
      // 重新订阅
      this.subscribe([...this.channels]);
    };

    this.ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      this.handleMessage(msg);
    };

    this.ws.onclose = () => {
      console.log('WebSocket closed, reconnecting...');
      this.reconnect();
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  subscribe(channels) {
    channels.forEach(c => this.channels.add(c));
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({
        type: 'subscribe',
        channels: channels,
        timestamp: Date.now()
      }));
    }
  }

  handleMessage(msg) {
    if (msg.type === 'ping') {
      this.ws.send(JSON.stringify({ type: 'pong', timestamp: Date.now() }));
      return;
    }
    
    if (msg.channel && this.listeners[msg.channel]) {
      this.listeners[msg.channel].forEach(cb => cb(msg.data));
    }
  }

  on(channel, callback) {
    if (!this.listeners[channel]) {
      this.listeners[channel] = [];
    }
    this.listeners[channel].push(callback);
  }

  reconnect() {
    if (this.reconnectAttempts >= 10) return;
    
    const delay = Math.min(
      1000 * Math.pow(2, this.reconnectAttempts),
      30000
    );
    
    setTimeout(() => {
      this.reconnectAttempts++;
      this.connect();
    }, delay);
  }
}

// 使用示例
const ws = new SuperLeagueWebSocket('wss://api.jiangsu-superleague.com/ws/v1');
ws.connect();
ws.subscribe(['crowd', 'alarms', 'logs']);
ws.on('crowd', (data) => updateCrowdDisplay(data));
ws.on('alarms', (data) => showAlarmNotification(data));
```

---

**文档版本:** v1.0.0  
**更新日期:** 2026-02-12
