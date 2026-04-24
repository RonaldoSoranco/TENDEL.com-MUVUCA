import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronLeftIcon, ChevronRightIcon, CalendarIcon, MapPinIcon, TicketIcon } from '@heroicons/react/24/solid'

const DEFAULT_IMAGES = [
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&h=600&fit=crop',
  'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1200&h=600&fit=crop',
  'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1200&h=600&fit=crop',
  'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1200&h=600&fit=crop',
  'https://images.unsplash.com/photo-1511578314322-b379e24781db?w=1200&h=600&fit=crop',
]

function getEventImage(evento, fallbackIndex = 0) {
  if (evento.imagemUrl) {
    return evento.imagemUrl
  }
  const index = evento.id ? (evento.id % DEFAULT_IMAGES.length) : fallbackIndex
  return DEFAULT_IMAGES[index]
}

export default function HeroCarousel({ eventos }) {
  const [current, setCurrent] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying || !eventos?.length) return
    
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % eventos.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [isAutoPlaying, eventos?.length])

  if (!eventos?.length) {
    return (
      <div className="hero-section rounded-3xl mb-8">
        <div className="hero-content text-center">
          <h1 className="hero-title">Descubra Eventos Incríveis</h1>
          <p className="hero-subtitle">
            Festas, shows, RPG, meetups e muito mais. Encontre o evento perfeito para você!
          </p>
        </div>
      </div>
    )
  }

  const goTo = (index) => {
    setCurrent(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 8000)
  }

  const goNext = () => goTo((current + 1) % eventos.length)
  const goPrev = () => goTo((current - 1 + eventos.length) % eventos.length)

  const evento = eventos[current]
  const dataFormatada = new Date(evento.data).toLocaleDateString('pt-BR', { 
    day: 'numeric', 
    month: 'short',
    year: 'numeric'
  })

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="hero-section rounded-3xl mb-8 overflow-hidden"
    >
      <div className="hero-content relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={evento.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden">
              <img
                src={getEventImage(evento, current)}
                alt={evento.nome}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = DEFAULT_IMAGES[0]
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase mb-3 ${
                    evento.categoria === 'FESTA' ? 'bg-pink-500' :
                    evento.categoria === 'SHOW' ? 'bg-violet-500' :
                    evento.categoria === 'RPG' ? 'bg-amber-500' :
                    'bg-slate-500'
                  } text-white`}
                >
                  {evento.categoria}
                </motion.span>

                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-2"
                >
                  {evento.nome}
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-wrap gap-4 text-white/80 text-sm"
                >
                  <span className="flex items-center gap-1.5">
                    <CalendarIcon className="w-4 h-4" />
                    {dataFormatada}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPinIcon className="w-4 h-4" />
                    {evento.local}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <TicketIcon className="w-4 h-4" />
                    {evento.preco > 0 ? `R$ ${parseFloat(evento.preco).toFixed(2)}` : 'Grátis'}
                  </span>
                </motion.div>
              </div>
            </div>

            <div className="flex justify-center gap-2 mt-4">
              {eventos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goTo(index)}
                  className={`w-8 h-1.5 rounded-full transition-all ${
                    index === current 
                      ? 'bg-white' 
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={goPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-white/30 transition"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>

            <button
              onClick={goNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-white/30 transition"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to="/register" className="btn btn-primary btn-lg">
            Criar Conta Grátis
          </Link>
          <Link to="/eventos/criar" className="btn btn-outline btn-lg">
            Criar Evento
          </Link>
        </div>
      </div>
    </motion.div>
  )
}