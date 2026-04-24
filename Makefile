.PHONY: run
SHELL := /bin/bash

run:
	@echo "🚀 Iniciando MUVUCA..."
	@(cd backend && mvn spring-boot:run > backend.log 2>&1 &)
	@sleep 2
	@echo "▶ Backend iniciado (porta 8080)"
	@(cd frontend && npm run dev > frontend.log 2>&1 &)
	@sleep 2
	@echo "▶ Frontend iniciado (porta 5173)"
	@echo ""
	@echo "✅ Pronto!"
	@echo "   Frontend: http://localhost:5173"
	@echo "   Backend:  http://localhost:8080"