import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { AuthError } from '../../domain/auth/AuthError'
import Container from '../components/Container'
import { useAuth } from '../hooks/useAuth'

interface LoginErrors {
  username?: string
  password?: string
}

function getOriginalDestination(state: unknown): string {
  if (
    typeof state === 'object'
    && state !== null
    && 'from' in state
    && typeof state.from === 'string'
    && state.from.startsWith('/')
    && !state.from.startsWith('//')
  ) {
    return state.from
  }

  return '/profile'
}

function validateCredentials(username: string, password: string): LoginErrors {
  const validationErrors: LoginErrors = {}

  if (!username.trim()) {
    validationErrors.username = 'Ingresa tu usuario.'
  }

  if (!password) {
    validationErrors.password = 'Ingresa tu contraseña.'
  }

  return validationErrors
}

function LoginPage() {
  const { isAuthenticated, isInitializing, login } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const redirectTo = getOriginalDestination(location.state)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<LoginErrors>({})
  const [authError, setAuthError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const requestController = useRef<AbortController | null>(null)
  const hasInvalidFields = !username.trim() || !password || Boolean(errors.username || errors.password)

  useEffect(() => () => {
    requestController.current?.abort()
  }, [])

  if (isInitializing) {
    return (
      <section className="session-loading" aria-live="polite" aria-busy="true">
        <span className="session-loading__spinner" aria-hidden="true" />
        <p>Verificando sesión...</p>
      </section>
    )
  }

  if (!isInitializing && isAuthenticated) {
    return <Navigate to={redirectTo} replace />
  }

  function validateField(field: 'username' | 'password') {
    const validationErrors = validateCredentials(username, password)
    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: validationErrors[field],
    }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (isSubmitting) {
      return
    }

    const validationErrors = validateCredentials(username, password)
    setErrors(validationErrors)

    if (validationErrors.username || validationErrors.password) {
      return
    }

    requestController.current?.abort()
    const controller = new AbortController()
    requestController.current = controller
    setIsSubmitting(true)
    setAuthError('')

    try {
      await login({ username: username.trim(), password }, controller.signal)
      navigate(redirectTo, { replace: true })
    } catch (error: unknown) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return
      }

      if (error instanceof AuthError && error.code === 'service-unavailable') {
        setAuthError('No pudimos conectar con el servicio. Inténtalo nuevamente.')
      } else {
        setAuthError('Usuario o contraseña incorrectos.')
      }
    } finally {
      if (!controller.signal.aborted) {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <section className="login-page" aria-labelledby="login-title">
      <Container className="login-layout">
        <div className="login-brand">
          <p className="eyebrow eyebrow--light">Acceso ByteMarket</p>
          <h1 id="login-title">Tu tecnología, en un solo lugar.</h1>
          <p>Inicia sesión para consultar tu perfil y mantener una experiencia personalizada.</p>
        </div>
        <div className="login-card">
          <h2>Iniciar sesión</h2>
          <p>Ingresa tus credenciales para continuar.</p>
          {authError && <p className="form-alert" role="alert">{authError}</p>}
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-field">
              <label htmlFor="username">Usuario</label>
              <input
                id="username"
                name="username"
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value)
                  if (event.target.value.trim()) {
                    setErrors((currentErrors) => ({ ...currentErrors, username: undefined }))
                  }
                }}
                onBlur={() => validateField('username')}
                autoComplete="username"
                aria-invalid={Boolean(errors.username)}
                aria-describedby={errors.username ? 'username-error' : undefined}
              />
              {errors.username && <span id="username-error" className="form-field__error">{errors.username}</span>}
            </div>
            <div className="form-field">
              <label htmlFor="password">Contraseña</label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value)
                  if (event.target.value) {
                    setErrors((currentErrors) => ({ ...currentErrors, password: undefined }))
                  }
                }}
                onBlur={() => validateField('password')}
                autoComplete="current-password"
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? 'password-error' : undefined}
              />
              {errors.password && <span id="password-error" className="form-field__error">{errors.password}</span>}
            </div>
            <button
              className="button button--primary login-submit"
              type="submit"
              disabled={isSubmitting || hasInvalidFields}
            >
              {isSubmitting ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>
          </form>
          <aside className="demo-credentials" aria-label="Credenciales públicas de demostración">
            <strong>Usuario de prueba</strong>
            <span>Usuario: emilys</span>
            <span>Contraseña: emilyspass</span>
          </aside>
        </div>
      </Container>
    </section>
  )
}

export default LoginPage
