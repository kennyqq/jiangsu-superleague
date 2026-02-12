# 🚀 GitHub + Vercel 部署完整指南

## 📋 前置要求

1. **GitHub 账号**: https://github.com/signup
2. **Node.js**: https://nodejs.org/ (v18+)
3. **Git**: https://git-scm.com/download/win

---

## 方法一：使用配置脚本（推荐）

### 步骤 1: 运行配置脚本
```bash
双击运行: setup-github.bat
```

按提示输入：
- GitHub 用户名
- GitHub 邮箱
- GitHub 仓库地址

---

## 方法二：手动配置

### 步骤 1: 安装 Git
下载并安装：https://git-scm.com/download/win

安装选项默认即可。

### 步骤 2: 配置 Git
```bash
git config --global user.name "你的GitHub用户名"
git config --global user.email "你的GitHub邮箱"
```

### 步骤 3: 初始化并推送代码
```bash
cd D:/VScode/super-league-command

# 初始化 Git
git init

# 创建 .gitignore
echo "node_modules" > .gitignore
echo "dist" >> .gitignore
echo ".vercel" >> .gitignore

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit"
```

### 步骤 4: 创建 GitHub 仓库

1. 访问 https://github.com/new
2. 填写信息：
   - **Repository name**: `super-league-command`
   - **Description**: 中超联赛智慧保障系统
   - **Public** ✓ (选中)
   - **Initialize with README**: ❌ (不选)
3. 点击 **Create repository**

### 步骤 5: 关联并推送

在 GitHub 页面找到这段代码：

```bash
git remote add origin https://github.com/你的用户名/super-league-command.git
git branch -M main
git push -u origin main
```

依次执行即可。

---

## 部署到 Vercel

### 步骤 1: 注册/登录 Vercel
访问 https://vercel.com/login
选择 **Continue with GitHub**

### 步骤 2: 导入项目
1. 点击 **Add New Project**
2. 找到 `super-league-command` 仓库，点击 **Import**
3. 配置：
   - **Framework Preset**: Vite
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. 点击 **Deploy**

### 步骤 3: 等待部署
- 约 1-2 分钟
- 完成后会显示 🎉 **Congratulations!**
- 获得链接如：`https://super-league-command-xxx.vercel.app`

---

## 🌐 国内访问优化（可选）

Vercel 默认域名在国内访问较慢，建议绑定自定义域名：

### 绑定自定义域名
1. 在 Vercel 项目 → Settings → Domains
2. 添加你的域名（如 `superleague.yourdomain.com`）
3. 按提示配置 DNS 解析

### 或使用 Cloudflare 加速
1. 注册 Cloudflare: https://dash.cloudflare.com/
2. 添加你的域名
3. 修改域名 DNS 为 Cloudflare 提供的地址
4. 开启 CDN 加速

---

## 🔄 后续更新代码

代码修改后，推送到 GitHub 会自动触发 Vercel 重新部署：

```bash
# 修改代码后执行
git add .
git commit -m "更新描述"
git push
```

Vercel 会自动重新构建部署，约 30 秒后生效。

---

## 🆘 常见问题

### Q: 推送时报错 "remote: Permission denied"
**A**: 需要配置 GitHub 身份验证
```bash
# 方法 1: 使用 HTTPS + Token
git remote set-url origin https://用户名:Token@github.com/用户名/仓库.git

# 方法 2: 使用 SSH（推荐长期使用）
# 1. 生成密钥: ssh-keygen -t rsa -b 4096
# 2. 添加公钥到 GitHub: Settings → SSH Keys
# 3. 修改 remote: git remote set-url origin git@github.com:用户名/仓库.git
```

### Q: Vercel 构建失败
**A**: 检查项目根目录是否有 `vercel.json`，内容：
```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

### Q: 页面刷新 404
**A**: 已配置 `rewrites` 规则，确保 `vercel.json` 包含：
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## 📞 需要帮助？

如果遇到问题，请告诉我：
1. 当前执行到哪一步？
2. 报错信息是什么？
3. 你的 GitHub 用户名

我可以远程协助你完成部署！
