import { Link } from 'react-router-dom'
import { productRepository } from '../../infrastructure/repositories/productRepository'
import '../../styles/catalog.css'
import '../../styles/home.css'
import Button from '../components/Button'
import CategoryIcon from '../components/CategoryIcon'
import Container from '../components/Container'
import EmptyState from '../components/EmptyState'
import ErrorState from '../components/ErrorState'
import ProductGrid from '../components/ProductGrid'
import ProductGridSkeleton from '../components/ProductGridSkeleton'
import { useProducts } from '../hooks/useProducts'
import type { CategoryFilter } from '../types/productFilters'

interface Benefit {
  title: string
  description: string
  icon: 'shipping' | 'security' | 'selection'
}

interface FeaturedCategory {
  id: Exclude<CategoryFilter, 'all'>
  name: string
  description: string
}

const benefits: readonly Benefit[] = [
  { icon: 'shipping', title: 'Envíos a todo el Perú', description: 'Tecnología lista para acompañarte donde estés.' },
  { icon: 'security', title: 'Compra segura', description: 'Un proceso claro y confiable de principio a fin.' },
  { icon: 'selection', title: 'Selección tecnológica', description: 'Productos útiles para trabajar, crear y conectar.' },
]

const categories: readonly FeaturedCategory[] = [
  { id: 'smartphones', name: 'Smartphones', description: 'Conecta estés donde estés' },
  { id: 'laptops', name: 'Laptops', description: 'Potencia para cada proyecto' },
  { id: 'tablets', name: 'Tablets', description: 'Ideas y entretenimiento' },
  { id: 'mobile-accessories', name: 'Accesorios', description: 'Completa tu experiencia' },
]

function BenefitIcon({ icon }: { icon: Benefit['icon'] }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      {icon === 'shipping' && <><path d="M3 6h11v11H3zM14 10h4l3 3v4h-7z" /><circle cx="7" cy="19" r="2" /><circle cx="18" cy="19" r="2" /></>}
      {icon === 'security' && <><path d="M12 3 20 6v5c0 5-3.2 8.2-8 10-4.8-1.8-8-5-8-10V6z" /><path d="m8.5 12 2.2 2.2 4.8-5" /></>}
      {icon === 'selection' && <><path d="m12 3 2.2 5.3L20 10l-4.3 3.7L17 20l-5-3-5 3 1.3-6.3L4 10l5.8-1.7z" /></>}
    </svg>
  )
}

function HomePage() {
  const { products, isLoading, error, retry } = useProducts(productRepository)
  const featuredProducts = products.slice(0, 4)

  return (
    <>
      <section className="hero" id="inicio" aria-labelledby="hero-title">
        <Container className="hero__grid">
          <div className="hero__content">
            <p className="eyebrow eyebrow--light">Tecnología para cada momento</p>
            <h1 id="hero-title">Encuentra tecnología que va contigo.</h1>
            <p className="hero__description">
              Smartphones, laptops, tablets y accesorios en un solo lugar.
            </p>
            <div className="hero__actions">
              <Button href="/products">Ver productos</Button>
              <Button href="/products?category=mobile-accessories" variant="secondary">Explorar accesorios</Button>
            </div>
            <ul className="hero__highlights" aria-label="Ventajas de ByteMarket">
              <li><span aria-hidden="true">✓</span> Catálogo tecnológico real</li>
              <li><span aria-hidden="true">✓</span> Precios en soles</li>
            </ul>
          </div>
          <div className="hero-showcase" aria-hidden="true">
            <span className="hero-showcase__orb hero-showcase__orb--one" />
            <span className="hero-showcase__orb hero-showcase__orb--two" />
            <div className="showcase-device showcase-device--phone"><span /><i /></div>
            <div className="showcase-device showcase-device--laptop"><span /><i /></div>
            <div className="showcase-device showcase-device--tablet"><span /></div>
            <div className="showcase-device showcase-device--audio"><span /><span /></div>
          </div>
        </Container>
      </section>

      <section className="benefits" aria-labelledby="benefits-title">
        <Container>
          <h2 className="sr-only" id="benefits-title">Beneficios de ByteMarket</h2>
          <div className="benefits__grid">
            {benefits.map((benefit) => (
              <article className="benefit" key={benefit.title}>
                <span className="benefit__icon"><BenefitIcon icon={benefit.icon} /></span>
                <div><h3>{benefit.title}</h3><p>{benefit.description}</p></div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="categories section" id="categorias" aria-labelledby="categories-title">
        <Container>
          <div className="section-heading">
            <div>
              <p className="eyebrow">Todo para tu día a día</p>
              <h2 id="categories-title">Explora por categoría</h2>
            </div>
            <Link to="/products">Ver catálogo <span aria-hidden="true">→</span></Link>
          </div>
          <div className="categories__grid">
            {categories.map((category) => (
              <Link
                className="category-card"
                to={`/products?category=${category.id}`}
                aria-label={`Explorar ${category.name}`}
                key={category.id}
              >
                <span className="category-card__icon"><CategoryIcon category={category.id} /></span>
                <span><strong>{category.name}</strong><small>{category.description}</small></span>
                <span className="category-card__arrow" aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="featured-products section" aria-labelledby="featured-products-title">
        <Container>
          <div className="section-heading">
            <div>
              <p className="eyebrow">Selección ByteMarket</p>
              <h2 id="featured-products-title">Tecnología destacada</h2>
            </div>
            <Link to="/products">Ver todos <span aria-hidden="true">→</span></Link>
          </div>
          {isLoading && <ProductGridSkeleton count={4} />}
          {!isLoading && error && <ErrorState onRetry={retry} />}
          {!isLoading && !error && featuredProducts.length === 0 && (
            <EmptyState title="No hay productos destacados" description="Vuelve a intentarlo más tarde." />
          )}
          {!isLoading && !error && featuredProducts.length > 0 && <ProductGrid products={featuredProducts} />}
        </Container>
      </section>

      <section className="brand-promo section" aria-labelledby="promo-title">
        <Container>
          <div className="brand-promo__content">
            <p className="eyebrow eyebrow--light">Compra con claridad</p>
            <h2 id="promo-title">Tecnología útil. Decisiones simples.</h2>
            <p>Compara, guarda tus favoritos y prepara tu compra con una experiencia pensada para ti.</p>
            <Button href="/products" variant="secondary">Descubrir el catálogo</Button>
          </div>
        </Container>
      </section>
    </>
  )
}

export default HomePage
