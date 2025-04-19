@echo off
title Sistema de Projeção Bíblica

cls
echo.
echo =======================================
echo      SISTEMA DE PROJECAO BIBLICA      
echo =======================================
echo.
echo Iniciando o sistema...
echo.

:: Verificar XAMPP
netstat -an | find "3306" > nul
if errorlevel 1 (
    echo [!] O XAMPP nao esta ligado
    echo.
    echo 1. Vou abrir o XAMPP para voce
    echo 2. Clique no botao START do MySQL
    echo 3. Depois pode fechar o XAMPP
    echo.
    echo Pressione qualquer tecla para continuar...
    pause > nul
    start "" "%ProgramFiles%\XAMPP\xampp-control.exe"
    echo.
    echo Aguardando voce ligar o MySQL...
    echo.
    pause > nul
)

:: Criar arquivo temporário para rastrear os PIDs
echo. > "%temp%\biblia_pids.txt"

:: Iniciar servidor silenciosamente e salvar PID
start "Servidor" /min cmd /c "echo Servidor em execucao... NAO FECHE ESTA JANELA! && npm run server"
for /f "tokens=2" %%a in ('tasklist /fi "windowtitle eq Servidor*" /nh') do echo %%a>> "%temp%\biblia_pids.txt"

:: Aguardar servidor
timeout /t 3 /nobreak > nul

:: Iniciar aplicação silenciosamente e salvar PID
start "Aplicacao" /min cmd /c "echo Aplicacao em execucao... NAO FECHE ESTA JANELA! && set BROWSER=none&& npm start"
for /f "tokens=2" %%a in ('tasklist /fi "windowtitle eq Aplicacao*" /nh') do echo %%a>> "%temp%\biblia_pids.txt"

:: Aguardar e abrir navegador
timeout /t 5 /nobreak > nul
start http://localhost:3000

cls
echo.
echo =======================================
echo    SISTEMA INICIADO COM SUCESSO!      
echo =======================================
echo.
echo O sistema esta funcionando!
echo.
echo Para usar:
echo 1. Painel de Controle: Use esta janela do navegador
echo 2. Projetor: Clique em "Abrir Tela de Exibicao"
echo.
echo [IMPORTANTE]
echo - NAO feche esta janela
echo - Para encerrar tudo, feche esta janela
echo.
pause > nul

:: Encerrar todos os processos
taskkill /F /IM node.exe > nul 2>&1
for /f "delims=" %%a in ('type "%temp%\biblia_pids.txt"') do (
    taskkill /F /PID %%a > nul 2>&1
)
del "%temp%\biblia_pids.txt" > nul 2>&1

:: Fechar todas as janelas cmd relacionadas
taskkill /F /FI "WINDOWTITLE eq Servidor*" > nul 2>&1
taskkill /F /FI "WINDOWTITLE eq Aplicacao*" > nul 2>&1 