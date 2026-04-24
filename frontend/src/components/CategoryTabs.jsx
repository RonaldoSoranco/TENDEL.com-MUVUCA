import { motion } from 'framer-motion'
import { StarIcon, MusicalNoteIcon, CubeIcon, FireIcon } from '@heroicons/react/24/outline'

const categories = [
  { value: '', label: 'Todos', icon: StarIcon },
  { value: 'FESTA', label: 'Festas', icon: FireIcon },
  { value: 'SHOW', label: 'Shows', icon: MusicalNoteIcon },
  { value: 'RPG', label: 'RPG', icon: CubeIcon },
  { value: 'OUTRO', label: 'Outros', icon: StarIcon },
]

export default function CategoryTabs({ activeCategory, onChange }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="category-tabs justify-center"
    >
      {categories.map((cat, index) => {
        const Icon = cat.icon
        const isActive = activeCategory === cat.value
        
        return (
          <motion.button
            key={cat.value}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onChange(cat.value)}
            className={`category-tab ${isActive ? 'active' : ''}`}
          >
            <Icon className="w-4 h-4" />
            {cat.label}
          </motion.button>
        )
      })}
    </motion.div>
  )
}