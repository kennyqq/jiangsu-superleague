@echo off
chcp 65001 >nul
title Vercel CLI 一键部署
cls

echo ==========================================
echo   Vercel CLI 一键部署
echo ==========================================
echo.

:: 检查 Node.js
node -v >nul 2>&1
if errorlevel 1 (
    echo [✗] 未检测到 Node.js
    echo 请先安装: https://nodejs.org/
    pause
    exit /b 1
)

:: 检查是否已安装 Vercel CLI
vercel --version >nul 2>&1
if errorlevel 1 (
    echo [*] 安装 Vercel CLI...
    npm install -g vercel
)

echo [✓] Vercel CLI 已就绪
vercel --version
echo.

:: 检查是否已登录
vercel whoami >nul 2>&1
if errorlevel 1 (
    echo [*] 请先登录 Vercel...
    echo 将打开浏览器进行授权...
    vercel login
)

echo [✓] 已登录 Vercel
echo.

:: 安装依赖
if not exist "node_modules" (
    echo [*] 安装项目依赖...
    npm install
)

echo.
echo ==========================================
echo  开始部署到 Vercel
echo ==========================================
echo.
echo 选项:
echo   1. 预览部署 (Preview)
echo   2. 生产部署 (Production)
echo.
choice /c 12 /n /m "请选择 (1/2): "

if errorlevel 2 (
    echo.
    echo [*] 执行生产部署...
    vercel --prod
) else (
    echo.
    echo [*] 执行预览部署...
    vercel
)

echo.
echo ==========================================
echo  部署完成!
echo ==========================================
echo.
echo 查看项目: https://vercel.com/dashboard
echo.
pause
