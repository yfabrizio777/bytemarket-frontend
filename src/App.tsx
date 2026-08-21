import Footer from './presentation/components/Footer'
import Header from './presentation/components/Header'
import HomePage from './presentation/pages/HomePage'
import './styles/layout.css'

function App() {
  return (
    <div className="app-shell">
      <Header />
      <main>
        <HomePage />
      </main>
      <Footer />
    </div>
  )
}

export default App
