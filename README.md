# Iglesia Casa de Dios

Sitio en preparación de la **Iglesia Presbiteriana Cumberland Casa de Dios**, Jamundí. La prioridad es la campaña del nuevo templo, dentro de un sitio institucional que presenta historia, pastor, comunidad, oración, acompañamiento y servicio.

## Estado 0.2.0

La carpeta contiene una base de aplicación **Next.js 16 + TypeScript estricto** con App Router y páginas estructurales para Inicio, Nuevo templo, Nuestra iglesia, Nuestro pastor, Vida en comunidad y Visítanos y contacto.

- La web arranca sin credenciales externas en **modo demostración**.
- El contenido de demostración está separado y marcado; los datos no confirmados aparecen como pendientes.
- **No hay autenticación, panel administrativo, formularios, recogida de datos, pagos ni conexión a PostgreSQL.**
- Los aportes permanecen deshabilitados. `PAYMENTS_ENABLED` no activa cobros.
- El prototipo estático anterior se conserva en `src/`, `scripts/` y `dist/` y sigue siendo ejecutable.
- El modelo PostgreSQL está definido en `db/migrations/0001_init.sql`, pero **no se ha ejecutado**.
- El repositorio remoto está conectado y la demostración de GitHub Pages conserva un flujo de publicación manual.

El logo vigente elegido por Andrés está en `public/brand/logo-oficial.png`: es un PNG transparente de 1197 × 1314 que se muestra con su proporción natural, sin efectos de borde, fondo, contorno o sombra, junto al nombre institucional. Esta decisión reemplaza el uso anterior del JPEG. La reseña histórica fue extraída de la presentación entregada y publicada para revisión institucional sin copiar la presentación ni sus fotografías al sitio. `public/brand/Escena histórica junto a la iglesia.png` es una versión ampliada y mejorada con inteligencia artificial, no un original intacto, y se publica con esa advertencia. El proyecto arquitectónico incorpora seis visualizaciones conceptuales optimizadas y acredita al Arq. Agustín Torres García; los planos de junio de 2026 siguen como referencias con ajustes pendientes. Continúan pendientes el boceto visual 03, las fotografías autorizadas del pastor y la comunidad y la aprobación editorial definitiva de nombres y fechas.

## Requisitos

- Node.js 24 o superior.
- npm, único gestor del proyecto. El lockfile está versionado.

```powershell
npm install
```

## Ejecutar la aplicación

```powershell
npm run dev
```

Abrir http://localhost:3000. Para detener: Ctrl+C.

Producción local:

```powershell
npm run build
npm run start
```

Verificación:

```powershell
npm run check
```

`check` ejecuta `tsc --noEmit` y las pruebas con `node:test`. La transformación nativa de TypeScript no sustituye esta comprobación de tipos.

## Ejecutar el prototipo conservado

El prototipo estático mantiene su propia forma de ejecución:

```powershell
npm run prototype:verify
npm run prototype:dev
```

Abrir http://127.0.0.1:4173. `prototype:verify` construye `dist/` y comprueba archivos, anclas, IDs, ausencia de formularios y destinos externos. El prototipo se conserva como referencia, pero no es el contenido publicado por el flujo actual de GitHub Pages.

## Demostración estática en GitHub Pages

La aplicación actual puede exportarse específicamente para
`https://andressolanilla07.github.io/iglesiacasadedios/`:

```powershell
npm run build:pages
```

Este comando fuerza el modo de demostración, vacía cualquier configuración de
base de datos o pagos durante la construcción y genera `out/` con
`basePath=/iglesiacasadedios`, rutas con barra final, payloads de navegación
compatibles con un host sin reescrituras y `.nojekyll`. El comando habitual
`npm run build` y la ejecución local conservan la configuración para un futuro
alojamiento con servidor.

El workflow `pages.yml` se ejecuta únicamente de forma manual desde `main` y
solo publica después de superar `check`, el build habitual y la exportación.
Pages sirve archivos estáticos: no ejecuta backend, PostgreSQL, autenticación ni
pagos. Las cabeceras definidas por `headers()` en `next.config.ts` se omiten en
la exportación porque GitHub Pages controla la respuesta HTTP; no deben
considerarse activas allí sin comprobar las cabeceras reales del alojamiento.

## Estructura

| Ruta | Propósito |
| --- | --- |
| `app/` | Rutas, layout, estilos y páginas públicas de Next.js. |
| `components/` | Componentes de interfaz reutilizables. |
| `modules/content/` | Tipos, contenido de demostración y repositorio. |
| `modules/temple-project/` | Campaña, etapas y cifras pendientes. |
| `modules/users/` | Roles, permisos y regla de doble aprobación. |
| `modules/donations/` | Política de aportes deshabilitados y contratos. |
| `modules/audit/` | Contratos del registro append-only. |
| `modules/config/` | Validación pura de configuración. |
| `modules/server/` | Configuración exclusiva de servidor. |
| `db/migrations/` | Migración PostgreSQL revisable, no ejecutada. |
| `tests/` | Pruebas de invariantes. |
| `src/`, `scripts/` | Prototipo estático original. |
| `docs/` | Alcance, arquitectura, seguridad, contenido y operación. |

## Configuración

Copiar nombres desde `.env.example` solo cuando se necesiten. No se requieren variables para arrancar en modo demostración.

- `APP_ENV`: `demo` (por defecto), `development` o `production`.
- `DATABASE_URL`: obligatoria en producción; no hay conexión implementada.
- `PAYMENTS_ENABLED`: se valida, pero no habilita cobros.
- `PAYMENT_PROVIDER`: vacío hasta que exista una integración verificada.

La lectura de variables ocurre solo en servidor. No se deben incluir secretos en el repositorio ni en contenido editable.

## Documentación

- [Alcance y criterios de aceptación](docs/CDD-001-alcance.md)
- [Arquitectura y decisiones](docs/CDD-002-arquitectura.md)
- [Donaciones y seguridad](docs/CDD-003-seguridad-donaciones.md)
- [Contenido pendiente y activos](docs/CDD-004-contenido.md)
- [GitHub y guía de desarrollo](docs/CDD-005-github-desarrollo.md)
- [Arquitectura y seguridad ampliadas](docs/CDD-007-arquitectura-seguridad.md)
- [Inicio en OpenCode](docs/CDD-008-inicio-opencode.md)
- [Base Next.js, TypeScript y PostgreSQL](docs/CDD-009-base-nextjs-postgresql.md)
- [Proyecto arquitectónico para la web](docs/CDD-010-proyecto-arquitectonico.md)
- [Modelo de datos y revisión pendiente](db/README.md)

## Límites de esta entrega

No se han realizado pruebas con PostgreSQL real, autenticación, autorización efectiva, pasarela, webhooks, restauración ni lector de pantalla. El smoke test HTTP de las páginas no sustituye una prueba de navegador. Cualquier cifra, canal de contacto, grupo, biografía o activo visual debe incorporarse con material vigente y autorización de la iglesia.
