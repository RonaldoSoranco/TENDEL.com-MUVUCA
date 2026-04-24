import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  CalendarIcon, 
  MapPinIcon, 
  ClockIcon,
  HeartIcon
} from '@heroicons/react/24/outline'

const DEFAULT_IMAGES = [
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1511578314322-b379e24781db?w=600&h=400&fit=crop',
]

function getEventImage(evento) {
  if (evento.imagemUrl) {
    return evento.imagemUrl
  }
  const index = evento.id ? (evento.id % DEFAULT_IMAGES.length) : 0
  return DEFAULT_IMAGES[index]
}

export default function EventCard({ evento, index = 0 }) {
  const [imageLoaded, setImageLoaded] = useState(false)
  
  const dataFormatada = new Date(evento.data).toLocaleDateString('pt-BR', { 
    day: 'numeric', 
    month: 'short'
  })
  
  const horaFormatada = evento.hora?.substring(0, 5) || ''
  
  const getBadgeClass = (categoria) => {
    switch (categoria) {
      case 'FESTA': return 'badge-festa'
      case 'SHOW': return 'badge-show'
      case 'RPG': return 'badge-rpg'
      default: return 'badge-outro'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: index * 0.1,
        duration: 0.4,
        ease: 'easeOut'
      }}
      whileHover={{ y: -8 }}
      className="event-card"
    >
      <Link to={`/eventos/${evento.id}`}>
        {!imageLoaded && (
          <div className="w-full h-40 bg-gray-200 animate-pulse" />
        )}
        <img
          src={getEventImage(evento)}
          alt={evento.nome}
          className="event-card-image"
          style={{ display: imageLoaded ? 'block' : 'none' }}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            e.target.src = DEFAULT_IMAGES[0]
            setImageLoaded(true)
          }}
        />
        <div className="event-card-body">
          <span className={`event-card-badge ${getBadgeClass(evento.categoria)}`}>
            {evento.categoria}
          </span>
          
          <h3 className="event-card-title line-clamp-2">
            {evento.nome}
          </h3>
          
          <div className="event-card-meta">
            <CalendarIcon className="w-4 h-4 flex-shrink-0" />
            <span>{dataFormatada}</span>
            <span className="text-gray-300">•</span>
            <ClockIcon className="w-4 h-4 flex-shrink-0" />
            <span>{horaFormatada}</span>
          </div>
          
          <div className="event-card-meta">
            <MapPinIcon className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{evento.local}</span>
          </div>
          
          <p className="event-card-desc mt-3">
            {evento.descricao}
          </p>
          
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
            <span className={`event-card-price ${evento.preco > 0 ? 'text-primary' : 'text-success'}`}>
              {evento.preco > 0 ? `R$ ${parseFloat(evento.preco).toFixed(2)}` : 'Grátis'}
            </span>
            <motion.span
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-400"
            >
              <HeartIcon className="w-5 h-5" />
            </motion.span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}