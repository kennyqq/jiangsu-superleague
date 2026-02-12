@echo off
cd /d D:\VScode\super-league-command
start /B npm run dev -- --port 3002 --host
echo 服务器已启动，请等待5秒后刷新浏览器...
timeout /t 5 /nobreak >nul
echo 访问地址: http://localhost:3002
pause
