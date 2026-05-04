# public/ — assets estáticos

Todo lo que esté acá se sirve desde la raíz del sitio. Por ejemplo
`public/logo.png` se accede desde el navegador como `/logo.png`.

## Archivos requeridos

| Archivo | Tamaño recomendado | Uso |
|---|---|---|
| `logo.png` | 512×512 (PNG transparente) | Logo en navbar, footer, favicon, mobile icon |
| `favicon.ico` | 32×32 / 48×48 (multi-size .ico) | Favicon clásico para navegadores viejos |
| `og.png` | 1200×630 (PNG/JPG) | Imagen al compartir el sitio en WhatsApp / Facebook / X |

## Cómo agregar el logo

1. Guardá tu logo circular en esta carpeta como `logo.png`.
   - Idealmente con fondo transparente y al menos 512×512 px.
   - Si tu archivo se llama distinto, renombralo a `logo.png` (lo más simple).
2. Para el favicon, podés usar el mismo logo. Si querés un .ico hecho:
   - Subí `logo.png` a [favicon.io](https://favicon.io/favicon-converter/)
   - Bajá el `favicon.ico` y dejalo en esta carpeta.
3. Para `og.png` (la imagen que aparece cuando compartís el link en redes):
   - Idealmente armá una imagen 1200×630 con tu logo + un fondo lindo + "Entre Canes — Escuela canina".
   - Mientras tanto, podés copiar el `logo.png` como `og.png` (no es ideal pero sirve).

Una vez que dejes los archivos acá, `npm run dev` los va a servir automáticamente.
No requiere reiniciar el servidor.
