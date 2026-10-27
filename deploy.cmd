@echo off
setlocal EnableExtensions
cd /d "%~dp0"
echo.
echo ==== FUTUREBOOK MIEN NAM - ECARD DEPLOY ====
echo Repo: gustavjung24-ops/kb-info
echo Vercel: khuongbinh24-info
echo.
where git >nul 2>&1 || (echo ERROR: Can cai Git. & exit /b 1)
for /f "delims=" %%R in ('git remote get-url origin 2^>nul') do set "REMOTE=%%R"
if not defined REMOTE (echo ERROR: Thu muc chua duoc clone GitHub. & exit /b 1)
echo %REMOTE% | findstr /i /c:"gustavjung24-ops/kb-info" >nul || (echo ERROR: Sai repository. & exit /b 1)
for /f "delims=" %%B in ('git branch --show-current') do set "BRANCH=%%B"
if /i not "%BRANCH%"=="main" (echo ERROR: Can dung branch main. Current: %BRANCH% & exit /b 1)
if /i "%~1"=="check" goto check
if /i "%~1"=="manual" goto manual
if not "%~1"=="" if /i not "%~1"=="deploy" (echo Usage: deploy.cmd [check^|deploy^|manual] & exit /b 1)
echo Mode: Git push - Vercel Auto Deploy
git add -A || exit /b 1
git diff --cached --quiet
if %errorlevel%==0 (echo Khong co thay doi nao de commit. & exit /b 0)
git diff --cached --name-only
echo.
choice /c YN /n /m "Commit va push len main de Vercel tu deploy? [Y/N]: "
if errorlevel 2 (echo Da huy. & exit /b 1)
git commit -m "update: Futurebook Mien Nam eCard" || exit /b 1
git push origin main || exit /b 1
echo.
echo Da push thanh cong. Vercel Git Integration se tu deploy branch main.
echo Kiem tra: https://vercel.com/dashboard
exit /b 0
:check
echo Repository va branch OK.
git status --short
echo.
echo Production: https://khuongbinh24-info.vercel.app/qr-khuong-binh.html
exit /b 0
:manual
where vercel >nul 2>&1 || (echo ERROR: Chua co Vercel CLI. Chay: npm i -g vercel & exit /b 1)
if not exist ".vercel\project.json" (echo ERROR: Can chay vercel link dung project goc truoc. & exit /b 1)
findstr /c:"prj_KLgmMUD9tpM7sYf9nTsx7WwIUbvD" ".vercel\project.json" >nul
if errorlevel 1 (echo ERROR: Project Vercel khong khop. KHONG deploy. & exit /b 1)
choice /c YN /n /m "Deploy thu cong len Production khuongbinh24-info? [Y/N]: "
if errorlevel 2 exit /b 1
vercel deploy --prod --yes
exit /b %errorlevel%
