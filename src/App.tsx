import Footer from './presentation/components/Footer'
import Header from './presentation/components/Header'
import AppRoutes from './presentation/routes/AppRoutes'
import './styles/layout.css'
import './styles/commerce.css'

function App() {
  return (
    <div className="app-shell">
      <Header />
      <main>
        <AppRoutes />
      </main>
      <Footer />
    </div>
  )
}

export default App
