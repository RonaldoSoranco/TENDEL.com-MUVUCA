#!/bin/bash
cd "$(dirname "$0")"

echo "=== MUVUCA Events - Rodar Frontend ==="
echo ""

# Verifica se npm existe
if ! command -v npm &> /dev/null; then
    echo "Erro: npm não encontrado. Instale Node.js primeiro."
    exit 1
fi

cd frontend

echo "Instalando dependências npm..."
npm install

echo "Iniciando Frontend..."
npm run dev &
FRONTEND_PID=$!

echo "Frontend iniciado (PID: $FRONTEND_PID)"
echo ""
echo "=== Acesse http://localhost:5173 ==="