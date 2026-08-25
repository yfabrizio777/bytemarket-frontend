import Footer from './presentation/components/Footer'
import Header from './presentation/components/Header'
import BottomNavigation from './presentation/components/BottomNavigation'
import AppRoutes from './presentation/routes/AppRoutes'
import './styles/layout.css'
import './styles/commerce.css'
import './styles/auth.css'

function App() {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Saltar al contenido principal</a>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <AppRoutes />
      </main>
      <Footer />
      <BottomNavigation />
    </div>
  )
}

export default App
