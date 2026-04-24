#!/bin/bash
echo "🚀 Iniciando Muvuca..."

# Backend (porta 8080)
echo "📦 Iniciando Backend..."
cd backend && mvn spring-boot:run > backend.log 2>&1 &
BACKEND_PID=$!

# Aguarda backend iniciar
echo "⏳ Aguardando Backend..."
sleep 15

# Frontend (porta 5173)
echo "🎨 Iniciando Frontend..."
cd frontend && npm run dev > frontend.log 2>&1 &
FRONTEND_PID=$!

echo ""
echo "✅ Muvuca iniciado!"
echo "   Backend: http://localhost:8080"
echo "   Frontend: http://localhost:5173"
echo ""
echo "Para parar:"
echo "   kill $BACKEND_PID $FRONTEND_PID"
echo ""

# Mantém o script rodando
wait