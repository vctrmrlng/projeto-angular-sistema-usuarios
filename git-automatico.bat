@echo off

:: Pega a data no formato yyyy-mm-dd (compatível com diferentes locais)
for /f %%i in ('powershell -NoProfile -Command "Get-Date -Format yyyy-MM-dd"') do set DATA=%%i

git add .
git commit -m "%DATA%"
git push