@echo off
chcp 65001 >nul
cd /d D:\VScode\super-league-command

echo ==========================================
echo   修复推送问题
echo ==========================================
echo.

echo [*] 尝试拉取远程内容...
git pull origin main --allow-unrelated-histories

echo.
echo [*] 重新推送...
git push -u origin main

if errorlevel 1 (
    echo.
    echo [*] 尝试强制推送（会覆盖远程内容）...
    echo 注意：这将覆盖 GitHub 上的所有内容！
    choice /c YN /m "是否强制推送"
    if errorlevel 2 exit /b 1
    
    git push -f origin main
)

echo.
echo [✓] 推送完成！
pause
