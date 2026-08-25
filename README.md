# ByteMarket

ByteMarket es un ecommerce de productos tecnológicos desarrollado como Proyecto Final de Frontend. La aplicación integra un catálogo real, autenticación, persistencia local y un flujo de compra simulado mediante una interfaz responsive y accesible construida con React y TypeScript.

## Demo

**Demo en producción:** [https://bytemarket-frontend.vercel.app/](https://bytemarket-frontend.vercel.app/)

## Características

- Catálogo tecnológico obtenido desde la API REST de DummyJSON.
- Búsqueda con debounce, filtros por categoría y disponibilidad, y ordenamiento.
- Detalle de producto accesible mediante una URL propia.
- Favoritos y carrito persistentes en `localStorage`.
- Autenticación JWT contra DummyJSON y sesión con expiración.
- Rutas protegidas para el perfil y el checkout.
- Formulario de checkout controlado y con validaciones por campo.
- Estados diferenciados de carga, error, contenido vacío y éxito.
- Diseño responsive con navegación móvil accesible.
- Skip link, foco visible, HTML semántico y atributos ARIA donde corresponden.
- Lazy loading de páginas y code splitting mediante `lazy()` y `Suspense`.

## Stack tecnológico

- React
- TypeScript
- Vite
- React Router
- HTML semántico mediante JSX
- CSS propio
- Fetch API
- DummyJSON
- `localStorage`
- Vercel

## Arquitectura

El código está organizado por responsabilidades y se inspira en la separación de dominio, puertos/adaptadores y presentación. No pretende ser una implementación hexagonal estricta.

- `domain`: entidades, modelos de autenticación, value objects y contratos de repositorios independientes de React.
- `application`: modelos y reglas de aplicación del flujo de checkout.
- `infrastructure`: acceso HTTP, DTO, mappers, almacenamiento local y adaptadores de DummyJSON.
- `presentation`: componentes, páginas, rutas, Context, providers y custom hooks de React.
- `styles`: estilos globales y estilos agrupados por área visual.

Los contratos `ProductRepository` y `AuthRepository` mantienen el dominio separado de los detalles de DummyJSON. Las implementaciones y el mapeo de las respuestas externas permanecen en infraestructura.

## Estructura

```text
src/
├── application/
│   └── checkout/
├── domain/
│   ├── auth/
│   ├── entities/
│   ├── repositories/
│   └── value-objects/
├── infrastructure/
│   ├── config/
│   ├── dtos/
│   ├── http/
│   ├── mappers/
│   ├── repositories/
│   └── storage/
├── presentation/
│   ├── components/
│   ├── contexts/
│   ├── hooks/
│   ├── pages/
│   ├── routes/
│   ├── types/
│   └── utils/
└── styles/
```

## Requisitos

- Node.js compatible con Vite 8.
- npm.

## Instalación

```bash
git clone https://github.com/yfabrizio777/bytemarket-frontend.git
cd bytemarket-frontend
npm install
```

Copia el archivo de variables de entorno:

```bash
cp .env.example .env
```

En Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Inicia el entorno de desarrollo:

```bash
npm run dev
```

## Variables de entorno

```env
VITE_API_BASE_URL=https://dummyjson.com
VITE_USD_TO_PEN_RATE=3.75
```

`VITE_API_BASE_URL` define el servicio REST utilizado por los repositorios. `VITE_USD_TO_PEN_RATE` configura la tasa de conversión empleada para mostrar precios en soles peruanos.

El archivo `.env` no debe versionarse. `.env.example` contiene únicamente valores públicos necesarios para ejecutar el proyecto.

## Scripts

```bash
npm run dev      # Inicia el servidor de desarrollo
npm run lint     # Ejecuta ESLint
npm run build    # Comprueba TypeScript y genera el build de producción
npm run preview  # Sirve localmente el build generado
```

## Credenciales de demostración

El login utiliza las siguientes credenciales públicas de demostración proporcionadas por DummyJSON:

```text
Usuario: emilys
Contraseña: emilyspass
```

No son credenciales privadas ni pertenecen a un usuario real.

## Flujo principal

```text
Catálogo
→ búsqueda y filtros
→ detalle de producto
→ carrito o favoritos
→ inicio de sesión
→ checkout
→ confirmación simulada
```

## Accesibilidad

ByteMarket utiliza HTML semántico, labels asociados a sus controles, mensajes de validación accesibles, foco visible y navegación por teclado. También incluye un skip link para acceder directamente al contenido principal y atributos ARIA únicamente en controles o estados que necesitan información adicional.

## Despliegue en Vercel

El proyecto incluye un `vercel.json` mínimo que redirige las solicitudes hacia `index.html`. Esto permite recargar rutas internas administradas por React Router sin recibir un error 404 del proveedor.

Antes de desplegar, deben configurarse en Vercel las mismas variables documentadas en `.env.example`.

## Autor

Fabrizio Alamo
