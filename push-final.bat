@echo off
chcp 65001 >nul
cd /d D:\VScode\super-league-command

echo ==========================================
echo   推送最终版本到 GitHub
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
git commit -m "feat: Final release v1.0.0 - Unified timeline, complete documentation

- Add unified full-feature timeline with multi-metric support
- Complete API specification documentation
- Add WebSocket real-time data specification
- Add field mapping and integration guide
- Update README with comprehensive project overview
- Optimize UI components and remove redundant elements
- Fix layout issues on all four pages

Pages completed:
- P0: Macro origin with migration visualization
- P1: Global defense with Co-Pilot terminal
- P2: Venue micro with user hierarchy pyramid
- P3: Evaluation with battle report card"

:: 推送
echo.
echo [*] 推送到 GitHub...
git push origin main

if errorlevel 1 (
    echo.
    echo [*] 尝试强制推送...
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
echo 在线演示: https://jiangsu-superleague.vercel.app
echo.

:end
pause
