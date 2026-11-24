# CDD-009 · Base Next.js, TypeScript y PostgreSQL

Versión 0.1 · 21 de noviembre de 2026 · Implementación inicial para revisión.

## Estado

Esta entrega sustituye la ejecución principal del prototipo por una base real de aplicación con Next.js y TypeScript estricto, sin backend de producción, autenticación, pagos ni conexión a PostgreSQL. El prototipo estático se conserva íntegro en `src/`, `scripts/` y `dist/` como referencia reproducible.

La aplicación pública arranca sin credenciales externas en modo demostración. El contenido institucional no confirmado se marca como pendiente; no se inventaron nombres, contactos, cifras, hitos ni testimonios. Los aportes permanecen deshabilitados.

## Versiones verificadas

| Componente | Versión | Comprobación |
| --- | --- | --- |
| Next.js | 16.4.6 | Etiqueta `latest` de npm y documentación oficial de instalación. |
| React / React DOM | 19.3.1 | Etiqueta `latest`; compatible con Next.js 16. |
| TypeScript | 5.9.3 | Última versión estable de la línea 5; Next.js exige 5.1 o superior. Se evitó TypeScript 7 para no introducir un compilador recién publicado en esta base. |
| Node.js | 24 LTS | Runtime local 24.18.0; Next.js exige 20.9 o superior. |
| npm | 11.16.0 | Único gestor; `package-lock.json` versionado. |

Fuentes: <https://nextjs.org/docs/app/getting-started/installation>, <https://www.npmjs.com/package/next>, <https://www.npmjs.com/package/react>, <https://www.npmjs.com/package/typescript>.

No se usaron versiones canary ni se desactivaron comprobaciones.

## Estructura

| Ruta | Responsabilidad |
| --- | --- |
| `app/` | Rutas del App Router, layout, estilos y páginas públicas. |
| `components/` | Componentes de interfaz reutilizables, sin estado ni datos personales. |
| `modules/content/` | Tipos, contenido de demostración y repositorio de contenido. |
| `modules/temple-project/` | Campaña, etapas y cifras pendientes del templo. |
| `modules/users/` | Roles, permisos y regla de doble aprobación financiera. Sin autenticación. |
| `modules/donations/` | Política de aportes deshabilitados y contratos de pasarela. Sin checkout. |
| `modules/audit/` | Contratos del registro append-only. Sin escritura implementada. |
| `modules/config/` | Validación pura de variables de entorno. |
| `modules/server/` | Configuración exclusiva de servidor con `server-only`. |
| `db/migrations/` | Migración SQL revisable del modelo PostgreSQL. |
| `tests/` | Pruebas de invariantes con `node:test` y TypeScript. |
| `src/`, `scripts/` | Prototipo estático original, conservado y ejecutable. |

## Fronteras de confianza

- `modules/server/config.ts`, `modules/donations/server.ts` y `modules/content/repository.ts` importan `server-only`. La configuración y una futura conexión a datos no deben entrar en componentes cliente.
- No hay componentes cliente con estado en esta entrega. Si se añaden, no pueden importar módulos de servidor ni `server-only`.
- No hay rutas `app/api`, formularios, webhooks, checkout, cuentas bancarias, QR ni enlaces de donación.
- `PAYMENTS_ENABLED` se lee, pero no habilita cobros: `isCheckoutEnabled()` siempre devuelve `false` mientras no exista una pasarela verificada.
- El contenido de demostración está separado en `modules/content/demo-content.ts` y `modules/temple-project/demo.ts`. No se presenta como aprobado.
- La aplicación no lee ni escribe PostgreSQL. La migración no se ejecutó.

## Contenido y datos confirmados

La base inicial usó únicamente la dirección y los dos horarios aportados en `AGENTS.md`. En etapas editoriales posteriores se incorporaron el logo elegido por Andrés, el texto de la reseña histórica y seis visualizaciones conceptuales del proyecto arquitectónico acreditado al Arq. Agustín Torres García. La reseña y el proyecto se publican para revisión, no como aprobación institucional definitiva. El perfil pastoral, los grupos, los canales de contacto y el mapa permanecen pendientes.

Andrés confirmó el 24 de noviembre de 2026 el presupuesto total, el ejecutado reportado y su diferencia presupuestal. Esos valores están centralizados en `modules/temple-project/demo.ts`; las donaciones recaudadas y la fecha de corte contable siguen pendientes. La fecha de confirmación no se presenta como fecha contable y el ejecutado no se trata como recaudo.

La aplicación usa `public/brand/logo-oficial.png` en el encabezado y el pie. El PNG transparente conserva la proporción natural de 1197 × 1314 y se muestra sin borde, fondo, contorno ni sombra; no debe sustituirse por una versión regenerada. Esta elección reemplaza el uso anterior de `logo-elegido.jpg`. `public/brand/logo-marcador.svg` se conserva solo como referencia del estado anterior. La escena histórica incorporada fue ampliada y mejorada con inteligencia artificial y debe mantener su aviso de procedencia.

## Modelo PostgreSQL

La migración [`db/migrations/0001_init.sql`](../db/migrations/0001_init.sql) crea los esquemas `app`, `content`, `ministry`, `project`, `donations` y `audit`.

Decisiones principales:

- Tipos monetarios `numeric(16,2)`, nunca coma flotante.
- `budget_amount`, `executed_amount` y `raised_amount` separados en `project.financial_snapshot`; el ejecutado no se presenta como recaudo.
- Publicación editorial con estados, revisión e historial en `content.page_revision`.
- Perfil pastoral, grupos y actividades sin datos reales, con permisos y estados editoriales.
- Metadatos de recursos con permiso de uso y regla de publicación.
- Referencias de donación y eventos de proveedor sin datos de tarjetas ni datos personales de donantes.
- Auditoría append-only mediante triggers que rechazan `UPDATE`, `DELETE` y `TRUNCATE`.
- Aprobación registrada para publicar cifras; doble persona para cambios de destino en la matriz de permisos.

El detalle de revisión y las pruebas pendientes están en [`db/README.md`](../db/README.md).

## Configuración

`.env.example` contiene solo nombres y ejemplos no secretos. La validación se ejecuta en servidor:

- `APP_ENV=demo` por defecto; valores admitidos: `demo`, `development`, `production`.
- En producción se exige `DATABASE_URL` PostgreSQL válida; la validación se rechaza y la página no se renderiza si falta.
- `PAYMENTS_ENABLED` solo se interpreta con el valor exacto `true` y no activa cobros.
- Los errores de configuración no incluyen credenciales ni el valor de la URL.
- Se añadieron cabeceras básicas de seguridad (`nosniff`, `DENY`, `Referrer-Policy`, `Permissions-Policy`, `COOP`) para alojamientos que ejecuten Next.js. La exportación de GitHub Pages omite `headers()` porque Pages controla las respuestas: esas cabeceras no deben declararse activas allí sin comprobarlas. La CSP queda pendiente de una política compatible con la futura pasarela; no se añadió una política laxa para aparentar protección.

## Verificación realizada

| Comprobación | Resultado |
| --- | --- |
| `npm run typecheck` (`tsc --noEmit`) | Superado. |
| `npm test` (32 pruebas de configuración, donaciones, permisos, contenido y fronteras) | Superado. |
| `npm run build` (Next.js 16.4.6, Turbopack) | Superado; 8 rutas estáticas (7 públicas y `not-found`). |
| `npm run prototype:verify` | Superado; el prototipo sigue construyendo y cumple sus límites. |
| Revisión HTTP de una muestra de páginas en servidor de producción | Superada como smoke test; no sustituye pruebas de navegador. |

No se realizaron pruebas con PostgreSQL real, autenticación, autorización efectiva, pasarela, webhooks, restauración, accesibilidad con lector de pantalla ni despliegue. No se declaran superadas.

## Siguiente tarea

1. Incorporar el diseño visual aprobado y los activos originales autorizados, sin reemplazar el logo oficial por la variante transparente.
2. Revisar con la iglesia el contenido pendiente y definir el flujo editorial.
3. Probar la migración en una base PostgreSQL desechable y definir el acceso de mínimo privilegio.
4. Implementar autenticación y autorización de servidor antes de cualquier panel administrativo.
5. Integrar pagos solo en entorno de pruebas, con titular verificado y conciliación; mantener producción deshabilitada hasta la revisión independiente.
