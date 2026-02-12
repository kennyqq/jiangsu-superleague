# 🚀 部署指南 - 中超联赛智慧保障系统

## 📦 快速开始（推荐方案）

### 方案一：Vercel CLI 一键部署（最简单，5分钟）

```bash
# 1. 双击运行
DEPLOY-VERCEL-CLI.BAT

# 2. 按提示操作：
#    - 首次需要登录 Vercel（会打开浏览器）
#    - 选择生产部署
#    - 等待 1-2 分钟

# 3. 获得链接如：https://super-league-xxx.vercel.app
```

---

### 方案二：GitHub + Vercel 自动部署（推荐长期维护）

```bash
# 1. 双击运行
SETUP-GITHUB.BAT

# 2. 按提示完成：
#    - 配置 Git 用户信息
#    - 创建 GitHub 仓库
#    - 推送代码

# 3. 访问 https://vercel.com/new 导入仓库
# 4. 选择 Vite 框架，点击 Deploy
```

---

### 方案三：Netlify 拖拽部署（无需命令行）

```bash
# 1. 本地构建
npm install
npm run build

# 2. 访问 https://app.netlify.com/drop
# 3. 将 dist 文件夹拖拽到页面
# 4. 立即获得链接
```

---

## 📋 详细文档

| 文档 | 说明 |
|------|------|
| `DEPLOY-GUIDE.md` | GitHub + Vercel 完整手动指南 |
| `DEPLOY.md` | 多平台部署对比 |
| `README.txt` | 项目介绍和本地运行 |

---

## 🌐 部署后链接示例

- Vercel: `https://super-league-command.vercel.app`
- Netlify: `https://super-league-command.netlify.app`

---

## ⚡ 部署前检查清单

- [ ] Node.js 已安装 (v18+)
- [ ] 已运行 `npm install` 安装依赖
- [ ] 本地运行 `npm run build` 无报错

---

## 🆘 需要帮助？

部署遇到问题请查看：
1. `DEPLOY-GUIDE.md` 中的常见问题
2. 或联系我协助

---

**推荐新手使用方案一（Vercel CLI），无需配置 Git，一键部署！**
