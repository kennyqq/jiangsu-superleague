@echo off
chcp 65001 >nul
title GitHub + Vercel 部署配置
cls

echo ==========================================
echo   GitHub + Vercel 部署配置向导
echo ==========================================
echo.

:: 检查 Git
git --version >nul 2>&1
if errorlevel 1 (
    echo [✗] 未检测到 Git
    echo.
    echo 请先安装 Git:
    echo https://github.com/git-for-windows/git/releases/download/v2.43.0.windows.1/Git-2.43.0-64-bit.exe
    echo.
    echo 安装时请选择: Use Git from the Windows Command Prompt
    echo.
    pause
    exit /b 1
)

echo [✓] Git 已安装
git --version
echo.

:: 检查 Node.js
node -v >nul 2>&1
if errorlevel 1 (
    echo [✗] 未检测到 Node.js
    echo 请先安装 Node.js: https://nodejs.org/
    pause
    exit /b 1
)
echo [✓] Node.js 已安装
node -v
echo.

:: 安装依赖
if not exist "node_modules" (
    echo [*] 安装依赖...
    npm install
)

echo.
echo ==========================================
echo  步骤 1/4: 初始化 Git 仓库
echo ==========================================
echo.

if exist ".git" (
    echo [✓] Git 仓库已存在
) else (
    git init
    echo [✓] Git 仓库初始化完成
)

echo.
echo ==========================================
echo  步骤 2/4: 配置 Git 用户信息
echo ==========================================
echo.
echo 请输入你的 GitHub 信息（用于提交代码）
echo.

set /p GIT_NAME="GitHub 用户名: "
set /p GIT_EMAIL="GitHub 邮箱: "

git config user.name "%GIT_NAME%"
git config user.email "%GIT_EMAIL%"

echo [✓] Git 用户配置完成
echo.

:: 创建 .gitignore
echo node_modules > .gitignore
echo dist >> .gitignore
echo .vercel >> .gitignore
echo *.log >> .gitignore

echo.
echo ==========================================
echo  步骤 3/4: 提交代码到本地
echo ==========================================
echo.

git add .
git commit -m "Initial commit: Super League Command P2"

echo [✓] 代码已提交到本地仓库
echo.

echo ==========================================
echo  步骤 4/4: 推送到 GitHub
echo ==========================================
echo.
echo 请先在 GitHub 创建仓库:
echo 1. 访问 https://github.com/new
echo 2. 输入仓库名: super-league-command
echo 3. 选择 Public
echo 4. 不要勾选 README 和 .gitignore
echo 5. 点击 Create repository
echo.

set /p REPO_URL="GitHub 仓库地址 (如 https://github.com/用户名/super-league-command.git): "

git remote remove origin 2>nul
git remote add origin %REPO_URL%

echo [*] 推送到 GitHub...
git branch -M main
git push -u origin main

if errorlevel 1 (
    echo.
    echo [✗] 推送失败，请检查:
    echo 1. GitHub 仓库是否已创建
    echo 2. 仓库地址是否正确
    echo 3. 是否已配置 GitHub 身份验证
    echo.
    echo 如果是首次使用，请先运行:
    echo git config --global user.name "你的用户名"
    echo git config --global user.email "你的邮箱"
    pause
    exit /b 1
)

echo.
echo ==========================================
echo [✓] 代码已推送到 GitHub!
echo ==========================================
echo.
echo 下一步: 部署到 Vercel
echo.
echo 1. 访问 https://vercel.com/new
echo 2. 导入 GitHub 仓库 super-league-command
echo 3. 框架选择 Vite
echo 4. 点击 Deploy
echo.
echo 或者使用 Vercel CLI:
echo   npm i -g vercel
echo   vercel --prod
echo.
pause
