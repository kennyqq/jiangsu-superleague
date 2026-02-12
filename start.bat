@echo off
chcp 65001 >nul
title 中超联赛智慧保障系统 - P2场内微观视图
cls

echo ==========================================
echo    中超联赛智慧保障系统
echo    P2 场内微观视图
echo ==========================================
echo.

:: 检查Node.js
node -v >nul 2>&1
if errorlevel 1 (
    echo [错误] 未检测到 Node.js
    echo.
    echo 请先安装 Node.js (推荐 v18+):
    echo https://nodejs.org/dist/v20.11.0/node-v20.11.0-x64.msi
    echo.
    pause
    exit /b 1
)

echo [✓] Node.js 版本: 
node -v
echo.

:: 检查并安装依赖
if not exist "node_modules" (
    echo [*] 首次运行，正在安装依赖...
    echo [*] 这可能需要几分钟，请耐心等待...
    echo.
    npm install
    if errorlevel 1 (
        echo [错误] 依赖安装失败
        pause
        exit /b 1
    )
    echo.
    echo [✓] 依赖安装完成
) else (
    echo [✓] 依赖已安装
)

echo.
echo ==========================================
echo  系统即将启动
echo  访问地址: http://localhost:3002
echo  按 Ctrl+C 停止服务
echo ==========================================
echo.
echo 正在启动...
echo.

npm run dev

pause
