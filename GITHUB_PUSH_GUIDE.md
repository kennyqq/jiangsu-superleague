# GitHub 推送指南

## 准备工作

1. **确保已安装 Git**
   - 下载地址：https://git-scm.com/download/win
   - 安装时一路默认即可

2. **确保 GitHub 仓库已创建**
   - 访问：https://github.com/new
   - 仓库名：`jiangsu-superleague`
   - 选择 **Public**
   - **不要勾选** "Initialize with README"

---

## 方法一：双击运行脚本（推荐）

1. 双击运行 `setup-git.bat`
2. 按提示操作
3. 如果提示输入密码，输入 GitHub Token（见下方说明）

---

## 方法二：手动命令行

在 CMD 或 PowerShell 中执行：

```bash
cd D:\VScode\super-league-command

# 初始化 Git
git init

# 配置用户信息
git config user.name "kennyqq"
git config user.email "qi.quan@qq.com"

# 创建 .gitignore
echo "node_modules" > .gitignore
echo "dist" >> .gitignore
echo ".vercel" >> .gitignore

# 添加并提交代码
git add .
git commit -m "Initial commit"

# 关联远程仓库
git remote add origin https://github.com/kennyqq/jiangsu-superleague.git

# 推送代码
git branch -M main
git push -u origin main
```

---

## 关于 GitHub Token

如果推送时提示输入密码，需要使用 GitHub Token 而不是密码：

1. 访问：https://github.com/settings/tokens
2. 点击 **Generate new token (classic)**
3. 勾选 **repo** 权限
4. 生成后复制 Token
5. 推送时输入 Token 作为密码

---

## 推送成功后

1. 访问 https://github.com/kennyqq/jiangsu-superleague 查看代码
2. 然后访问 https://vercel.com/new 导入仓库部署
