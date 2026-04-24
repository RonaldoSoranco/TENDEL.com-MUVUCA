#!/bin/bash
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "🚀 Iniciando MUVUCA..."

cd "$SCRIPT_DIR/backend" && mvn spring-boot:run > "$SCRIPT_DIR/backend.log" 2>&1 &
echo "▶ Backend..."

cd "$SCRIPT_DIR/frontend" && npm run dev > "$SCRIPT_DIR/frontend.log" 2>&1 &
echo "▶ Frontend..."

echo ""
echo "✅ Pronto! http://localhost:5173"