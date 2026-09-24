import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { mapFirebaseError } from '../../services/mapFirebaseError'
import './Register.css'

function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()

  // Estado del formulario controlado
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // Estado de UI: envío en curso y mensaje de error para mostrar en pantalla
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Validaciones básicas antes de golpear a Firebase
    if (!email || !password || !confirmPassword) {
      setError('Todos los campos son obligatorios.')
      return
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.')
      return
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.')
      return
    }

    try {
      setIsSubmitting(true)
      await register(email, password)
      // Registro exitoso: onAuthStateChanged actualizará el contexto solo,
      // acá redirigimos al catálogo
      navigate('/')
    } catch (err) {
      setError(mapFirebaseError(err.code))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="register">
      <h1>Crear cuenta</h1>

      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSubmitting}
        />

        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isSubmitting}
        />

        <label htmlFor="confirmPassword">Confirmar contraseña</label>
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={isSubmitting}
        />

        {error && <p className="register-error">{error}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creando cuenta...' : 'Registrarme'}
        </button>
      </form>

      <p className="register-login-link">
        ¿Ya tenés cuenta? <Link to="/login">Iniciar sesión</Link>
      </p>
    </div>
  )
}

export default Register
