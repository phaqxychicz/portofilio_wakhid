@echo off
echo ========================================
echo   UPDATE GITHUB + VERCEL OTOMATIS
echo ========================================
echo.

cd /d D:\portofolio-wakhid

echo [1/4] Menambahkan semua perubahan...
git add .

echo [2/4] Commit perubahan...
git commit -m "Auto update %date% %time%"

echo [3/4] Push ke GitHub...
git push origin main

echo [4/4] Deploy ke Vercel...
vercel --prod

echo.
echo ========================================
echo   UPDATE SELESAI TAI!
echo ========================================
pause