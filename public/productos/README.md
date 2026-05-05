# Fotos de productos de la tienda

Carpeta donde dejás las fotos reales de los productos que vendés.

## Cómo funciona

1. Sacás fotos de tus productos (con celular alcanza, idealmente sobre fondo blanco o de madera, luz natural).
2. Las guardás acá con nombres específicos.
3. En `lib/constants.ts`, cambiás la URL `image` del producto por `/productos/<nombre>.jpg`.

## Especificaciones recomendadas

- **Formato**: JPG o WebP (más liviano)
- **Tamaño**: 1200×900 px aprox (ratio 4:3)
- **Peso**: bajo 200 KB (compresá en [tinypng.com](https://tinypng.com) o [squoosh.app](https://squoosh.app))
- **Fondo**: blanco, gris claro o madera neutra. Que el producto sea el protagonista.
- **Iluminación**: luz natural difusa cerca de una ventana → siempre mejor que flash.

## Tips de fotos que venden

- Tomá la foto **a la altura del producto** (no desde arriba).
- Evitá sombras duras: cubrí la luz con una sábana blanca o usá el modo "horizonte nublado".
- Subilas ligeramente sobre-expuestas — pareces más limpio y profesional.
- Si vendés varios colores/tamaños del mismo producto, sacá una foto de la variedad para que el cliente entienda.

## Nombres de archivo sugeridos

Que matcheen el `id` del producto en `lib/constants.ts`. Por ejemplo:

```
public/productos/
├── kit-cachorro.jpg
├── correa-larga.jpg
├── arnes-antitiron.jpg
├── snacks-naturales.jpg
├── kong-rellenable.jpg
└── kit-conducta.jpg
```

Después en `lib/constants.ts`:

```ts
{
  id: "kit-cachorro",
  // ...
  image: "/productos/kit-cachorro.jpg",  // ← antes era la URL de Unsplash
}
```
