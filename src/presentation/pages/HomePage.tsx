import Button from '../components/Button'
import Container from '../components/Container'
import '../../styles/home.css'

interface Benefit {
  icon: string
  title: string
  description: string
}

interface FeaturedCategory {
  id: string
  name: string
  label: string
}

const benefits: readonly Benefit[] = [
  { icon: '→', title: 'Envío rápido', description: 'Tus productos favoritos, en camino sin complicaciones.' },
  { icon: '✓', title: 'Compra segura', description: 'Una experiencia clara y confiable en cada paso.' },
  { icon: '◇', title: 'Selección inteligente', description: 'Tecnología útil, elegida para tu estilo de vida.' },
]

const categories: readonly FeaturedCategory[] = [
  { id: 'smartphones', name: 'Smartphones', label: 'Conecta' },
  { id: 'laptops', name: 'Laptops', label: 'Crea' },
  { id: 'audio', name: 'Audio', label: 'Escucha' },
  { id: 'wearables', name: 'Wearables', label: 'Muévete' },
]

function HomePage() {
  return (
    <>
      <section className="hero" id="inicio" aria-labelledby="hero-title">
        <Container className="hero__grid">
          <div className="hero__content">
            <p className="eyebrow">Tecnología para tu ritmo</p>
            <h1 id="hero-title">El futuro se siente más cerca.</h1>
            <p className="hero__description">
              Descubre dispositivos que simplifican, conectan e impulsan cada momento de tu día.
            </p>
            <div className="hero__actions">
              <Button href="#categorias">Explorar productos</Button>
              <Button href="#propuesta" variant="secondary">Conocer ByteMarket</Button>
            </div>
          </div>
          <div className="hero-product" aria-label="Representación visual de un dispositivo tecnológico">
            <span className="hero-product__glow" aria-hidden="true" />
            <div className="hero-product__device" aria-hidden="true">
              <span className="hero-product__speaker" />
              <span className="hero-product__screen">
                <span className="hero-product__orb" />
              </span>
              <span className="hero-product__button" />
            </div>
            <p className="hero-product__tag"><span>●</span> Diseño que conecta</p>
          </div>
        </Container>
      </section>

      <section className="benefits" aria-labelledby="benefits-title">
        <Container>
          <h2 className="sr-only" id="benefits-title">Beneficios de ByteMarket</h2>
          <div className="benefits__grid">
            {benefits.map((benefit) => (
              <article className="benefit" key={benefit.title}>
                <span className="benefit__icon" aria-hidden="true">{benefit.icon}</span>
                <div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="categories section" id="categorias" aria-labelledby="categories-title">
        <Container>
          <div className="section-heading">
            <div>
              <p className="eyebrow">Encuentra lo tuyo</p>
              <h2 id="categories-title">Categorías destacadas</h2>
            </div>
            <a href="#categorias">Ver todos los productos <span aria-hidden="true">→</span></a>
          </div>
          <div className="categories__grid">
            {categories.map((category, index) => (
              <article className={`category-card category-card--${index + 1}`} id={category.id} key={category.id}>
                <p>{category.label}</p>
                <h3>{category.name}</h3>
                <a href={`#${category.id}`} aria-label={`Explorar ${category.name}`}>Explorar <span aria-hidden="true">→</span></a>
                <span className="category-card__shape" aria-hidden="true" />
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="brand-promo section" id="propuesta" aria-labelledby="promo-title">
        <Container>
          <div className="brand-promo__content">
            <p className="eyebrow eyebrow--light">ByteMarket selection</p>
            <h2 id="promo-title">Menos ruido. Mejor tecnología.</h2>
            <p>Una selección pensada para que elegir el dispositivo ideal sea simple, claro y emocionante.</p>
            <Button href="#categorias" variant="secondary">Descubrir la selección</Button>
          </div>
        </Container>
      </section>
    </>
  )
}

export default HomePage
