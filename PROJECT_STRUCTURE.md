# 项目结构说明

## 📁 文件组织

```
jiangsu-superleague/
│
├── 📄 项目文档（根目录）
│   ├── README.md                          # 项目主文档（整体方案介绍）
│   ├── PROJECT_STRUCTURE.md               # 本文件（结构说明）
│   ├── API_SPECIFICATION.md               # RESTful API接口规范
│   ├── API_FIELD_MAPPING.md               # 前后端字段映射表
│   ├── WEBSOCKET_SPEC.md                  # WebSocket实时数据规范
│   └── BACKEND_INTEGRATION_README.md      # 后端对接导读
│
├── 🚀 部署脚本
│   ├── push-final.bat                     # 一键推送GitHub脚本
│   ├── setup-git.bat                      # Git初始化脚本
│   ├── fix-push.bat                       # 推送修复脚本
│   └── DEPLOY-GUIDE.md                    # 部署指南
│
├── ⚙️ 配置文件
│   ├── package.json                       # Node.js依赖
│   ├── vite.config.js                     # Vite构建配置
│   ├── tailwind.config.js                 # Tailwind CSS配置
│   ├── vercel.json                        # Vercel部署配置
│   └── index.html                         # HTML入口
│
├── 📦 源码目录 (src/)
│   ├── components/                        # 公共组件
│   │   ├── Header.jsx                     # 顶部导航栏
│   │   ├── CyberBorder.jsx                # 赛博朋克边框
│   │   ├── TimelineUnified.jsx            # 统一时间轴（核心）
│   │   ├── LeftPanel.jsx                  # P0左侧面板
│   │   ├── RightPanel.jsx                 # P0右侧面板
│   │   └── MigrationMap.jsx               # 迁徙地图组件
│   │
│   ├── pages/                             # 四大页面
│   │   ├── P0/                            # 宏观溯源
│   │   │   ├── MacroOrigin.jsx            # 主页面（已合并到App）
│   │   │   └── ...
│   │   ├── P1/                            # 全局态势
│   │   │   ├── GlobalDefense.jsx          # 主页面
│   │   │   ├── LeftPanelP1.jsx            # 左侧5G-A资源
│   │   │   ├── RightPanelP1.jsx           # 右侧业务质量
│   │   │   ├── DigitalTwinMap.jsx         # 数字孪生地图
│   │   │   └── components/                # P1专属组件
│   │   │
│   │   ├── P2/                            # 场内微观
│   │   │   ├── VenueMicro.jsx             # 主页面
│   │   │   ├── LeftPanelP2.jsx            # 左侧商业变现
│   │   │   ├── RightPanelP2.jsx           # 右侧体验保障
│   │   │   └── components/                # P2专属组件
│   │   │       ├── CenterStage.jsx        # 中心舞台
│   │   │       ├── PyramidChart.jsx       # 金字塔图表
│   │   │       ├── CapacityAgentCard.jsx  # 放号评估
│   │   │       ├── TerminalRanking.jsx    # 终端排行
│   │   │       └── ...
│   │   │
│   │   └── P3/                            # 评估闭环
│   │       ├── EvaluationView.jsx         # 主页面
│   │       ├── LeftPanelP3.jsx            # 左侧经营成果
│   │       ├── RightPanelP3.jsx           # 右侧VIP对比
│   │       └── components/                # P3专属组件
│   │           ├── BattleReportCard.jsx   # 战报卡片
│   │           ├── VIPComparisonChart.jsx # VIP对比
│   │           └── ...
│   │
│   ├── App.jsx                            # 应用入口
│   ├── main.jsx                           # React渲染入口
│   └── index.css                          # 全局样式
│
├── 🎨 静态资源 (public/)
│   ├── stadium_internal_view.jpg          # P2体育场背景
│   ├── city_night_top_view.jpg            # P3城市夜景背景
│   └── vite.svg                           # Vite图标
│
└── 📦 构建输出 (dist/)
    ├── index.html
    ├── assets/                            # JS/CSS/图片
    └── ...
```

## 🎯 核心文件说明

### 文档类

| 文件 | 用途 | 目标读者 |
|------|------|----------|
| README.md | 项目整体介绍 | 所有人 |
| API_SPECIFICATION.md | 接口详细规范 | 后端开发 |
| API_FIELD_MAPPING.md | 字段对照表 | 前后端联调 |
| WEBSOCKET_SPEC.md | 实时数据规范 | WebSocket开发 |
| BACKEND_INTEGRATION_README.md | 对接导读 | 后端团队 |

### 核心组件

| 组件 | 功能 | 所在位置 |
|------|------|----------|
| TimelineUnified.jsx | 统一时间轴（四页共用） | src/components/ |
| Header.jsx | 顶部导航栏 | src/components/ |
| CyberBorder.jsx | 赛博朋克边框 | src/components/ |
| MigrationMap.jsx | 迁徙地图 | src/components/ |

### 页面主文件

| 页面 | 主文件 | 功能 |
|------|--------|------|
| P0 | App.jsx中的MacroOriginView | 迁徙可视化 |
| P1 | pages/P1/GlobalDefense.jsx | 态势监控 |
| P2 | pages/P2/VenueMicro.jsx | 场内保障 |
| P3 | pages/P3/EvaluationView.jsx | 战后总结 |

## 📊 代码统计

```bash
# 统计代码行数（估算）
find src -name "*.jsx" -o -name "*.js" -o -name "*.css" | xargs wc -l

# 文档统计
find . -maxdepth 1 -name "*.md" | xargs wc -l
```

## 🔗 关联项目

- **BFF中间件**: `../jiangsu-superleague-bff/`
- **部署平台**: Vercel (https://vercel.com)
- **代码仓库**: GitHub (https://github.com/kennyqq/jiangsu-superleague)

---

**更新时间**: 2026-02-12  
**版本**: v1.0.0
