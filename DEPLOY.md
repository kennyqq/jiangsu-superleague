# 🚀 公网部署指南

## 方案一：Vercel 部署（推荐，免费）

### 步骤 1：准备代码
```bash
# 确保代码已推送到 GitHub
# 如果没有GitHub账号，请先注册 https://github.com
```

### 步骤 2：部署到 Vercel

#### 方式 A：通过 GitHub 自动部署（推荐）
1. 访问 https://vercel.com/new
2. 使用 GitHub 账号登录
3. 导入 `super-league-command` 仓库
4. 框架选择 **Vite**
5. 点击 Deploy，约 1-2 分钟完成
6. 获得类似 `https://super-league-xxx.vercel.app` 的链接

#### 方式 B：使用 Vercel CLI
```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录（会打开浏览器让你授权）
vercel login

# 部署
vercel --prod

# 完成后会显示访问链接
```

---

## 方案二：Netlify 部署（免费）

### 方式 A：拖拽部署（最简单，无需GitHub）
1. 本地先构建：`npm run build`
2. 访问 https://app.netlify.com/drop
3. 将 `dist` 文件夹拖拽到页面
4. 立即获得公网链接

### 方式 B：GitHub 自动部署
1. 访问 https://app.netlify.com/start
2. 选择 GitHub 导入仓库
3. 构建设置：
   - Build command: `npm run build`
   - Publish directory: `dist`
4. 点击 Deploy

---

## 方案三：Cloudflare Pages（免费）

1. 访问 https://dash.cloudflare.com/
2. 登录后进入 Pages
3. 创建项目 → 连接到 Git
4. 构建设置：
   - Framework preset: None
   - Build command: `npm run build`
   - Build output directory: `dist`
5. 保存并部署

---

## 方案四：GitHub Pages（免费）

1. 代码推送到 GitHub 仓库
2. 进入仓库 Settings → Pages
3. Source 选择 "GitHub Actions"
4. 创建文件 `.github/workflows/deploy.yml`：

```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

## 🔗 快速获取链接的方法

### 最快方式：Netlify Drop（2分钟搞定）
```bash
# 1. 在项目中执行
npm install
npm run build

# 2. 打开 https://app.netlify.com/drop
# 3. 将 dist 文件夹拖进去
# 4. 立即获得 https://xxx.netlify.app 链接
```

---

## 📋 各平台对比

| 平台 | 难度 | 自定义域名 | 国内访问 | 推荐度 |
|------|------|-----------|---------|--------|
| Vercel | ⭐⭐ | ✅ 免费 | ⚠️ 需CDN | ⭐⭐⭐⭐⭐ |
| Netlify | ⭐ | ✅ 免费 | ⚠️ 需CDN | ⭐⭐⭐⭐⭐ |
| Cloudflare | ⭐⭐ | ✅ 免费 | ✅ 较好 | ⭐⭐⭐⭐ |
| GitHub Pages | ⭐⭐ | ✅ 免费 | ⚠️ 较慢 | ⭐⭐⭐ |

---

## ⚠️ 注意事项

1. **国内访问**：Vercel/Netlify 默认域名在国内可能较慢，建议：
   - 绑定自定义域名
   - 或使用 Cloudflare CDN 加速

2. **环境变量**：如需后端API，在平台设置环境变量

3. **路由问题**：已配置 `vercel.json` 支持前端路由

---

## 🆘 需要帮助？

如果需要我帮你：
1. 创建 GitHub 仓库并推送代码
2. 指导具体部署步骤
3. 配置自定义域名

请告诉我！
