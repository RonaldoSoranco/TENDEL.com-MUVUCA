#!/bin/bash
cd "$(dirname "$0")"

echo "=== MUVUCA Events - Script de Execução ==="
echo ""

# Verifica se Maven existe ou baixa
if ! command -v mvn &> /dev/null; then
    echo "Baixando Maven..."
    cd /tmp
    wget -q https://archive.apache.org/dist/maven/maven-3/3.9.6/binaries/apache-maven-3.9.6-bin.tar.gz -O maven.tar.gz
    tar -xzf maven.tar.gz
    export PATH="/tmp/apache-maven-3.9.6/bin:$PATH"
fi

cd "$(dirname "$0")/backend"

echo "Iniciando Backend..."
mvn spring-boot:run > backend.log 2>&1 &
BACKEND_PID=$!

echo "Backend iniciado (PID: $BACKEND_PID)"
echo "Aguardando inicialização..."
sleep 10

if curl -s http://localhost:8080/api/eventos > /dev/null 2>&1; then
    echo "✓ Backend rodando em http://localhost:8080"
else
    echo "✗ Erro ao iniciar backend. Verifique backend.log"
    exit 1
fi

echo ""
echo "=== Backend rodando ==="
echo "Para parar: kill $BACKEND_PID"
echo "Para ver logs: tail -f backend.log"