import Container from '../components/Container'
import { useAuth } from '../hooks/useAuth'

function ProfilePage() {
  const { user, logout } = useAuth()

  if (user === null) {
    return null
  }

  return (
    <section className="profile-page" aria-labelledby="profile-title">
      <Container>
        <header className="profile-heading">
          <p className="eyebrow">Mi cuenta</p>
          <h1 id="profile-title">Hola, {user.firstName}</h1>
          <p>Consulta la información segura asociada a tu sesión de ByteMarket.</p>
        </header>
        <div className="profile-grid">
          <article className="profile-card profile-card--identity">
            {user.image ? (
              <img src={user.image} alt={`Avatar de ${user.firstName} ${user.lastName}`} />
            ) : (
              <span className="profile-avatar" aria-hidden="true">{user.firstName.charAt(0)}</span>
            )}
            <div>
              <h2>{user.firstName} {user.lastName}</h2>
              <p>@{user.username}</p>
            </div>
          </article>
          <article className="profile-card">
            <h2>Información de la cuenta</h2>
            <dl className="profile-data">
              <div><dt>Nombre</dt><dd>{user.firstName} {user.lastName}</dd></div>
              <div><dt>Usuario</dt><dd>{user.username}</dd></div>
              <div><dt>Correo electrónico</dt><dd>{user.email}</dd></div>
            </dl>
          </article>
          <article className="profile-card">
            <h2>Estado de sesión</h2>
            <p className="session-status"><span aria-hidden="true">●</span> Sesión activa</p>
            <p>Tu identidad fue verificada mediante la API de autenticación.</p>
            <button className="button button--secondary" type="button" onClick={logout}>
              Cerrar sesión
            </button>
          </article>
        </div>
      </Container>
    </section>
  )
}

export default ProfilePage
