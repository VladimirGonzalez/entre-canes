@echo off
REM ============================================================
REM Script para subir cambios pendientes a GitHub (rama main)
REM Doble clic para ejecutar.
REM ============================================================

cd /d "%~dp0"

echo.
echo ============================================================
echo   Subiendo cambios al repositorio: entre-canes (rama main)
echo ============================================================
echo.

git status --short
echo.

echo Pusheando a origin/main...
git push origin main

echo.
if %ERRORLEVEL% EQU 0 (
    echo  Listo. Cambios subidos a GitHub.
) else (
    echo  Hubo un error al pushear. Revisa el mensaje de arriba.
    echo  Si te pide login, usa tu usuario de GitHub y un Personal Access Token
    echo  ^(no la contrasena comun^). Generalo en:
    echo  github.com -^> Settings -^> Developer settings -^> Personal access tokens
)

echo.
pause
