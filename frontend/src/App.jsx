import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import Landing from './pages/Landing'
import Home from './pages/Home'
import EventDetail from './pages/EventDetail'
import CreateEvent from './pages/CreateEvent'
import MyEvents from './pages/MyEvents'
import Perfil from './pages/Perfil'
import PerfilPublico from './pages/PerfilPublico'
import EditarPerfil from './pages/EditarPerfil'
import Empresa from './pages/Empresa'

function PublicRoute({ children }) {
  const token = localStorage.getItem('tendel_token')
  const user = localStorage.getItem('tendel_user')
  if (token && user) return <Navigate to="/eventos" />
  return children
}

function PrivateRoute({ children }) {
  const token = localStorage.getItem('tendel_token')
  const user = localStorage.getItem('tendel_user')
  if (!token || !user) return <Navigate to="/login" />
  return children
}

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main">
        <Routes>
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="/" element={<PublicRoute><Landing /></PublicRoute>} />
          <Route path="/eventos" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/eventos/:id" element={<PrivateRoute><EventDetail /></PrivateRoute>} />
          <Route path="/criar" element={<PrivateRoute><CreateEvent /></PrivateRoute>} />
          <Route path="/meus-eventos" element={<PrivateRoute><MyEvents /></PrivateRoute>} />
          <Route path="/perfil" element={<PrivateRoute><Perfil /></PrivateRoute>} />
          <Route path="/perfil/:id" element={<PerfilPublico />} />
          <Route path="/perfil/editar" element={<PrivateRoute><EditarPerfil /></PrivateRoute>} />
          <Route path="/empresa/:id" element={<Empresa />} />
        </Routes>
      </main>
      <footer className="footer">
        <div className="footer-content">
          <p>© 2026 TENDEL - Todos os direitos reservados</p>
        </div>
      </footer>
    </div>
  )
}