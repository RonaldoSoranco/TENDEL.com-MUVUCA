import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const INGRESSOS = [
  { tipo: 'Promocional', descricao: 'Primeiros 50 ingresses', emoji: '🚀' },
  { tipo: 'Pista', descricao: 'Acesso geral', emoji: '🎟️' },
  { tipo: 'VIP', descricao: 'Área VIP + drink', emoji: '⭐' },
  { tipo: 'Camarote', descricao: 'Vista privilegiada', emoji: '👑' },
]

export default function CompraIngresso({ evento, isOpen, onClose }) {
  const [etapa, setEtapa] = useState('escolha')
  const [selecionado, setSelecionado] = useState(null)
  const [quantidade, setQuantidade] = useState(1)

  if (!isOpen || !evento) return null

  const valorBase = parseFloat(evento.preco) || 0
  const multiplicador = selecionado === 'Promocional' ? 0.7 :
                       selecionado === 'VIP' ? 2 :
                       selecionado === 'Camarote' ? 3 : 1
  const valorUnitario = valorBase * multiplicador
  const total = valorUnitario * quantidade

  function handleSelecionar(tipo) {
    setSelecionado(tipo)
    setEtapa('quantidade')
  }

  function handleFinalizar() {
    setEtapa('sucesso')
  }

  function handleFechar() {
    setEtapa('escolha')
    setSelecionado(null)
    setQuantidade(1)
    onClose()
  }

  return (
    <AnimatePresence>
      <div style={styles.overlay} onClick={handleFechar}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          style={styles.modal}
          onClick={e => e.stopPropagation()}
        >
          <button onClick={handleFechar} style={styles.fechar}>✕</button>

          {etapa === 'escolha' && (
            <>
              <div style={styles.header}>
                <h2 style={styles.titulo}>🎟️ Comprar Ingresso</h2>
                <p style={styles.eventoNome}>{evento.nome}</p>
                <p style={styles.eventoInfo}>
                  {new Date(evento.data).toLocaleDateString('pt-BR')} • {evento.local}
                </p>
                <div style={styles.precoDestaque}>
                  A partir de R$ {valorBase.toFixed(2)}
                </div>
              </div>

              <div style={styles.opcoes}>
                {INGRESSOS.map((ing, i) => {
                  const valor = valorBase * (ing.tipo === 'Promocional' ? 0.7 :
                                         ing.tipo === 'Vip' ? 2 :
                                         ing.tipo === 'Camarote' ? 3 : 1)
                  return (
                    <button
                      key={ing.tipo}
                      onClick={() => handleSelecionar(ing.tipo)}
                      style={styles.opcao}
                    >
                      <span style={styles.opcaoEmoji}>{ing.emoji}</span>
                      <div style={styles.opcaoInfo}>
                        <span style={styles.opcaoTipo}>{ing.tipo}</span>
                        <span style={styles.opcaoDesc}>{ing.descricao}</span>
                      </div>
                      <span style={styles.opcaoPreco}>
                        R$ {valor.toFixed(2)}
                      </span>
                    </button>
                  )
                })}
              </div>
            </>
          )}

          {etapa === 'quantidade' && (
            <>
              <div style={styles.header}>
                <h2 style={styles.titulo}>Quantos ingresses?</h2>
                <p style={styles.eventoNome}>{evento.nome}</p>
                <div style={styles.selecionadoTipo}>
                  {INGRESSOS.find(i => i.tipo === selecionado)?.emoji} {selecionado} - R$ {valorUnitario.toFixed(2)}
                </div>
              </div>

              <div style={styles.quantidadeArea}>
                <button
                  onClick={() => setQuantidade(q => Math.max(1, q - 1))}
                  style={styles.botaoQtd}
                >
                  −
                </button>
                <span style={styles.quantidade}>{quantidade}</span>
                <button
                  onClick={() => setQuantidade(q => Math.min(10, q + 1))}
                  style={styles.botaoQtd}
                >
                  +
                </button>
              </div>

              <div style={styles.total}>
                <span>Total:</span>
                <span style={styles.totalValor}>R$ {(valorUnitario * quantidade).toFixed(2)}</span>
              </div>

              <button onClick={handleFinalizar} style={styles.botaoFinalizar}>
                Finalizar Compra
              </button>
            </>
          )}

          {etapa === 'sucesso' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={styles.sucesso}
            >
              <div style={styles.sucessoIcon}>✅</div>
              <h2 style={styles.sucessoTitulo}>Compra Realizada!</h2>
              <p style={styles.sucessoTexto}>
                Você comprou {quantidade} ingresso{quantidade > 1 ? 's' : ''} {selecionado}
              </p>
              <p style={styles.sucessoValor}>
                Total: R$ {(valorUnitario * quantidade).toFixed(2)}
              </p>
              <button onClick={handleFechar} style={styles.botaoFechar}>
                Fechar
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    padding: '1rem'
  },
  modal: {
    background: 'white',
    borderRadius: '1.5rem',
    width: '100%',
    maxWidth: '400px',
    maxHeight: '90vh',
    overflow: 'auto',
    position: 'relative'
  },
  fechar: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    background: 'none',
    border: 'none',
    fontSize: '1.25rem',
    cursor: 'pointer',
    color: '#64748b'
  },
  header: {
    padding: '1.5rem',
    textAlign: 'center',
    borderBottom: '1px solid #e2e8f0'
  },
  titulo: {
    margin: 0,
    fontSize: '1.25rem',
    fontWeight: 700,
    color: '#1e293b'
  },
  eventoNome: {
    margin: '0.5rem 0 0',
    fontSize: '1rem',
    fontWeight: 600,
    color: '#1e293b'
  },
  eventoInfo: {
    margin: '0.25rem 0 0',
    fontSize: '0.875rem',
    color: '#64748b'
  },
  precoDestaque: {
    marginTop: '0.75rem',
    fontSize: '1.5rem',
    fontWeight: 800,
    color: '#ec4899'
  },
  opcoes: {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
  },
  opcao: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem',
    background: '#f8fafc',
    border: '2px solid #e2e8f0',
    borderRadius: '1rem',
    cursor: 'pointer'
  },
  opcaoEmoji: {
    fontSize: '1.5rem'
  },
  opcaoInfo: {
    flex: 1,
    textAlign: 'left'
  },
  opcaoTipo: {
    display: 'block',
    fontWeight: 600,
    color: '#1e293b'
  },
  opcaoDesc: {
    display: 'block',
    fontSize: '0.875rem',
    color: '#64748b'
  },
  opcaoPreco: {
    fontWeight: 700,
    color: '#ec4899',
    fontSize: '1.125rem'
  },
  quantidadeArea: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2rem',
    padding: '2rem'
  },
  botaoQtd: {
    width: '3rem',
    height: '3rem',
    borderRadius: '50%',
    border: '2px solid #e2e8f0',
    background: 'white',
    fontSize: '1.5rem',
    cursor: 'pointer'
  },
  quantidade: {
    fontSize: '2rem',
    fontWeight: 700,
    color: '#1e293b'
  },
  selectedTipo: {
    fontSize: '1.25rem',
    fontWeight: 600,
    color: '#8b5cf6'
  },
  total: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1rem 1.5rem',
    background: '#f8fafc',
    borderRadius: '0.75rem',
    margin: '0 1rem',
    fontWeight: 600
  },
  totalValor: {
    color: '#ec4899',
    fontSize: '1.25rem'
  },
  botaoFinalizar: {
    display: 'block',
    width: 'calc(100% - 2rem)',
    margin: '1rem auto 1.5rem',
    padding: '1rem',
    background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '0.75rem',
    fontSize: '1rem',
    fontWeight: 700,
    cursor: 'pointer'
  },
  sucesso: {
    padding: '3rem',
    textAlign: 'center'
  },
  sucessoIcon: {
    fontSize: '4rem',
    marginBottom: '1rem'
  },
  sucessoTitulo: {
    margin: 0,
    fontSize: '1.5rem',
    fontWeight: 800,
    color: '#1e293b'
  },
  sucessoTexto: {
    margin: '0.5rem 0',
    color: '#64748b'
  },
  sucessoValor: {
    fontSize: '1.25rem',
    fontWeight: 700,
    color: '#ec4899',
    marginBottom: '1.5rem'
  },
  botaoFechar: {
    padding: '0.75rem 2rem',
    background: '#1e293b',
    color: 'white',
    border: 'none',
    borderRadius: '0.5rem',
    fontWeight: 600,
    cursor: 'pointer'
  }
}