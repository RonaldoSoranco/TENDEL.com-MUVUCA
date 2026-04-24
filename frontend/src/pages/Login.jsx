import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { login } from '../services/api'
import { EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon, SparklesIcon } from '@heroicons/react/24/outline'

const LOGO_SVG = (
  <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10">
    <defs>
      <linearGradient id="loginLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#fce7f3" />
      </linearGradient>
    </defs>
    <path 
      d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.266.248-.597.41-.944.41a2.28 2.28 0 00-1.876 1.117l-.044.164c-.318.905-.975 1.64-1.838 1.842-.863.202-1.712.227-2.539.227-.917 0-1.699-.663-1.85-1.567L3.214 7.75c-.031-.13-.144-.264-.335-.372a7.716 7.716 0 00-1.154-.267c-.35 0-.708.165-.99.453a2.28 2.28 0 00-.296.523l-.047.17c-.33.962-.97 1.71-1.794 1.91-.824.2-1.663.227-2.489.227zm6.736 10.683c.917 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.115-.26.297-.348a7.493 7.493 0 00.986-.57c.266-.248.597-.41.944-.41a2.28 2.28 0 001.876-1.117l.044-.164c.318-.905.975-1.64 1.838-1.842.863-.202 1.712-.227 2.539-.227.917 0 1.699.663 1.85 1.567l.178 1.072c.031.13.144.264.335.372a7.716 7.716 0 001.154.267c.35 0 .708-.165.99-.453a2.28 2.28 0 00.296-.523l.047-.17c.33-.962.97-1.71 1.794-1.91.824-.2 1.663-.227 2.489-.227z" 
      fill="url(#loginLogoGrad)"
    />
  </svg>
)

export default function Login() {
  const navigate = useNavigate()
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  
  const [form, setForm] = useState({
    email: '',
    senha: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro('')
    setLoading(true)
    
    try {
      const response = await login(form)
      
      localStorage.setItem('tendel_token', response.token)
      localStorage.setItem('tendel_user', JSON.stringify({
        id: response.id,
        email: response.email,
        nome: response.nome,
        fotoUrl: response.fotoUrl
      }))
      
      navigate('/eventos')
    } catch (err) {
      setErro('Email ou senha inválidos')
    } finally {
      setLoading(false)
    }
  }

  const handleDemoLogin = async (email) => {
    setLoading(true)
    try {
      const response = await login({ email, senha: 'senha123' })
      localStorage.setItem('tendel_token', response.token)
      localStorage.setItem('tendel_user', JSON.stringify({
        id: response.id,
        email: response.email,
        nome: response.nome,
        fotoUrl: response.fotoUrl
      }))
      navigate('/eventos')
    } catch {
      setErro('Credenciais inválidas')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Background com gradiente e padrões */}
      <div className="fixed inset-0 bg-gradient-to-br from-pink-600 via-violet-600 to-indigo-700 overflow-hidden">
        {/* Bolhas decorativas */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-violet-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Padrão de pontos */}
        <div className="absolute inset-0 opacity-10" style={{ 
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', 
          backgroundSize: '30px 30px' 
        }} />
      </div>

      {/* Card de login */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
        className="relative w-full max-w-md"
      >
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 sm:p-10">
          {/* Logo e título */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-500 to-violet-600 rounded-2xl shadow-lg shadow-pink-500/30 mb-4"
            >
              {LOGO_SVG}
            </motion.div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-pink-600 to-violet-600 bg-clip-text text-transparent">
              Bem-vindo de volta!
            </h1>
            <p className="text-gray-500 mt-2">Entre na sua conta TENDEL.COM</p>
          </motion.div>

          {/* Erro */}
          {erro && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl"
            >
              <p className="text-red-600 text-sm text-center">{erro}</p>
            </motion.div>
          )}
          
          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-pink-500 focus:ring-4 focus:ring-pink-500/20 transition-all duration-200 outline-none"
                  required
                />
              </div>
            </motion.div>
            
            {/* Senha */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="senha"
                  value={form.senha}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-14 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-pink-500 focus:ring-4 focus:ring-pink-500/20 transition-all duration-200 outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </motion.div>
            
            {/* Botão entrar */}
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 10px 30px rgba(233, 30, 99, 0.4)' }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-pink-500 to-violet-600 text-white font-semibold rounded-xl shadow-lg shadow-pink-500/30 transition-all duration-200"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Entrando...
                </span>
              ) : 'Entrar'}
            </motion.button>
          </form>

          {/* Divisor */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-400">ou entrar com demo</span>
            </div>
          </div>
          
          {/* Botões demo */}
          <div className="grid grid-cols-2 gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleDemoLogin('alice@exemplo.com')}
              disabled={loading}
              className="py-3 px-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl font-medium text-gray-700 transition-all duration-200"
            >
              🎤 Alice
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleDemoLogin('bruno@exemplo.com')}
              disabled={loading}
              className="py-3 px-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl font-medium text-gray-700 transition-all duration-200"
            >
              🎲 Bruno
            </motion.button>
          </div>
          
          {/* Link cadastro */}
          <p className="text-center mt-8 text-gray-500">
            Não tem conta?{' '}
            <Link to="/register" className="font-semibold text-pink-600 hover:text-pink-700 transition-colors">
              Cadastrar免费
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}