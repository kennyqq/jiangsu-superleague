@echo off
chcp 65001 >nul
cd /d D:\VScode\super-league-command

echo ==========================================
echo   GitHub 代码推送配置
echo   用户名: kennyqq
echo   仓库: jiangsu-superleague
echo ==========================================
echo.

:: 检查 Git
git --version >nul 2>&1
if errorlevel 1 (
    echo [错误] 未检测到 Git，请先安装
    echo 下载地址: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo [✓] Git 已安装
echo.

:: 初始化仓库
if not exist ".git" (
    echo [*] 初始化 Git 仓库...
    git init
)

:: 配置用户信息
echo [*] 配置 Git 用户信息...
git config user.name "kennyqq"
git config user.email "qi.quan@qq.com"

:: 创建 .gitignore
echo [*] 创建 .gitignore...
echo node_modules > .gitignore
echo dist >> .gitignore
echo .vercel >> .gitignore
echo *.log >> .gitignore

:: 添加文件
echo [*] 添加文件到暂存区...
git add .

:: 提交
echo [*] 提交代码...
git commit -m "Initial commit: Jiangsu Super League Command Dashboard"

:: 关联远程仓库
echo [*] 关联远程仓库...
git remote remove origin 2>nul
git remote add origin https://github.com/kennyqq/jiangsu-superleague.git

:: 推送代码
echo [*] 推送到 GitHub...
echo 如果提示输入密码，请输入 GitHub 个人访问令牌 (Token)
echo.
git branch -M main
git push -u origin main

if errorlevel 1 (
    echo.
    echo [✗] 推送失败，可能原因：
    echo 1. GitHub 仓库未创建: https://github.com/new
    echo 2. 仓库名称不是 'jiangsu-superleague'
    echo 3. 需要配置 GitHub Token
    echo.
    echo 解决方法：
    echo 1. 访问 https://github.com/settings/tokens 创建 Token
    echo 2. 使用 HTTPS + Token 方式推送
    pause
    exit /b 1
)

echo.
echo ==========================================
echo [✓] 代码已成功推送到 GitHub!
echo ==========================================
echo.
echo 仓库地址: https://github.com/kennyqq/jiangsu-superleague
echo.
echo 下一步：访问 https://vercel.com/new 导入仓库
echo.
pause
