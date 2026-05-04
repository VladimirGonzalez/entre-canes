# Entre Canes — Website

Web oficial de **Entre Canes**: escuela canina, adiestramiento, modificación de conducta, GICC y venta de accesorios.

> Construida como producto real, con foco 100% en conversión: WhatsApp en cada CTA, sticky mobile, FAQ que elimina objeciones, prueba social y método claro.

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** (con tokens de marca)
- **Framer Motion** (animaciones suaves)
- **Lucide React** (iconografía)
- Optimización de imágenes con `next/image`
- Listo para deploy en **Vercel**

## Quick start

```bash
# 1. Instalar dependencias
npm install

# 2. Copiar variables de entorno
cp .env.example .env.local

# 3. Editar .env.local con tu número de WhatsApp, GA, Meta Pixel, etc.

# 4. Levantar dev server
npm run dev
```

Abrí `http://localhost:3000`.

## Variables de entorno (importantes)

| Variable | Descripción |
|---|---|
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número de WhatsApp en formato internacional sin `+` (ej: `5491112345678`) |
| `NEXT_PUBLIC_PHONE` | Teléfono visible en el sitio |
| `NEXT_PUBLIC_EMAIL` | Email de contacto |
| `NEXT_PUBLIC_SITE_URL` | URL canónica del sitio |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 ID |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel ID |

## Estructura

```
app/
├── layout.tsx              # Layout root + fonts + analytics + WhatsApp flotante
├── page.tsx                # Home (landing principal)
├── globals.css             # Tokens y estilos base
├── sitemap.ts / robots.ts  # SEO
├── servicios/              # Servicios
├── gicc/                   # GICC — landing dedicada de alto impacto
├── tienda/                 # Tienda
├── sobre-nosotros/
├── resultados/
└── contacto/

components/
├── layout/                 # Header, Footer, WhatsAppFloat, StickyMobileCTA
├── sections/               # Bloques reutilizables: Hero, FAQ, Testimonials, etc.
└── ui/                     # Button, Container, Reveal, SectionLabel

lib/
├── constants.ts            # Datos de contacto, navegación, enlaces
├── analytics.ts            # Helpers de eventos GA / Meta Pixel
└── utils.ts
```

## Eventos de conversión trackeados

- `cta_whatsapp_click` — clic en cualquier botón de WhatsApp
- `cta_reservar_click` — clic en "Reservar evaluación gratis"
- `form_submit` — envío del formulario de contacto
- `gicc_view` — vista de la landing GICC
- `faq_open` — apertura de pregunta del FAQ

Disparados con `gtag` y `fbq` (si los IDs están configurados).

## Deploy en Vercel

1. Subí el repo a GitHub.
2. Importá el proyecto en [Vercel](https://vercel.com/new).
3. Configurá las variables de entorno (las del `.env.example`).
4. Listo. Cada push a `main` hace deploy automático.

## Para personalizar

- **Imágenes**: reemplazá las URLs de Unsplash en `lib/constants.ts` por tus fotos reales (perros con dueños, sesiones, instalación). Idealmente subilas a Cloudinary o `public/`.
- **Testimonios**: reemplazá los testimonios en `lib/constants.ts` con casos reales (con autorización del cliente).
- **Tienda**: la tienda actual es estática y deriva al WhatsApp. Cuando quieras escalar, podemos integrar Tienda Nube, Shopify o Stripe.

---

Hecho con foco en una sola cosa: que más perros y más dueños vivan mejor juntos.
