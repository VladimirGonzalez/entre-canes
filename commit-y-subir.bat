@echo off
REM ============================================================
REM Script para commitear cambios pendientes y subir a GitHub
REM Doble clic para ejecutar.
REM ============================================================

cd /d "%~dp0"

echo.
echo ============================================================
echo   Entre Canes - Commit y push a GitHub
echo ============================================================
echo.

REM Borrar lock file si quedó de un commit anterior
if exist ".git\index.lock" (
    echo Borrando lock file...
    del /f ".git\index.lock"
)

echo Cambios pendientes:
git status --short
echo.

echo Agregando archivos...
git add -A

echo.
echo Creando commit...
git commit -m "Agrega quiz de diagnostico interactivo - UX pulido" -m "Funcionalidad nueva:" -m "- Motor de quiz en lib/quiz.ts (5 preguntas, recomendacion personalizada)" -m "- Componente DiagnosticQuiz: modal con animaciones, progress bar" -m "- QuizBanner: seccion CTA en home con pulse y social proof" -m "- Integracion en Hero (CTA secundario primer scroll)" -m "- WhatsApp pre-llenado con todas las respuestas del quiz" -m "" -m "UX/UI:" -m "- Pregunta 1 en grid 2 columnas en tablet+" -m "- Emojis en preguntas de edad/duracion/gravedad" -m "- Reveal escalonado en pantalla de resultado" -m "- Social proof + boton para reiniciar" -m "- 5 eventos de analytics nuevos"

echo.
echo Pusheando a origin/main...
git push origin main

echo.
if %ERRORLEVEL% EQU 0 (
    echo  Listo. Cambios commiteados y subidos a GitHub.
) else (
    echo  Hubo un error. Revisa el mensaje de arriba.
    echo  Si te pide login, usa tu usuario de GitHub y un Personal Access Token.
)

echo.
pause
