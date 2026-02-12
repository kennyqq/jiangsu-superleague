@echo off
chcp 65001 >nul
cd /d D:\VScode\super-league-command

echo ==========================================
echo   推送代码到 GitHub
echo   仓库: kennyqq/jiangsu-superleague
echo ==========================================
echo.

:: 检查 Git
git --version >nul 2>&1
if errorlevel 1 (
    echo [错误] 未检测到 Git
    echo 请先安装: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo [✓] Git 已安装
echo.

:: 检查远程仓库
git remote -v >nul 2>&1
if errorlevel 1 (
    echo [*] 添加远程仓库...
    git remote add origin https://github.com/kennyqq/jiangsu-superleague.git
)

echo [*] 检查文件更改...
git status --short
echo.

:: 添加所有更改
echo [*] 添加文件到暂存区...
git add .

:: 提交
echo [*] 提交更改...
set /p commit_msg="输入提交信息 (默认: Update unified timeline and UI): "
if "%commit_msg%"=="" set commit_msg=Update unified timeline and UI
git commit -m "%commit_msg%"

:: 推送
echo.
echo [*] 推送到 GitHub...
git push origin main

if errorlevel 1 (
    echo.
    echo [✗] 推送失败，尝试强制推送...
    choice /c YN /m "是否强制推送(会覆盖远程代码)?"
    if errorlevel 2 goto end
    git push -f origin main
)

echo.
echo ==========================================
echo [✓] 推送完成!
echo ==========================================
echo.
echo 查看仓库: https://github.com/kennyqq/jiangsu-superleague
echo.

:end
pause
