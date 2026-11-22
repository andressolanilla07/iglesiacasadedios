# CDD-002 · Arquitectura y decisiones

## ADR-001: prototipo estático con TypeScript

Estado: histórico. Describe el prototipo conservado; la ejecución principal actual es ADR-002.

El prototipo usa HTML semántico, CSS adaptable y TypeScript para las interacciones. El compilador nativo de Node elimina las anotaciones de tipos para generar JavaScript. **Esta transformación no comprueba tipos**; no se presenta como una ejecución de `tsc`. El prototipo no usa dependencias de producción ni scripts de terceros.

Motivo: el alcance actual consiste en contenido institucional y demostraciones locales; se puede alojar en GitHub Pages y continuar desde OpenCode sin herramientas privadas. No se añade un backend antes de conocer la pasarela y las necesidades de administración.

La propuesta anterior de evaluar un framework queda abierta para la fase de producción. Si crece el contenido, se evaluará un generador de sitios y un CMS según quién vaya a publicar y con qué frecuencia. Los pagos con secretos, webhooks y conciliación necesitan servicios de servidor y no se resuelven solo con GitHub Pages.

## ADR-002: base Next.js, TypeScript estricto y PostgreSQL modelado

Fecha: 21 de noviembre de 2026. Estado: implementación inicial, no producción.

Se añade una aplicación Next.js 16 con App Router y TypeScript estricto como base de la nueva etapa. La organización es modular, dentro de un solo proyecto: `content`, `temple-project`, `users`, `donations`, `audit` y `config`. Los módulos exclusivos de servidor importan `server-only`; la configuración y una futura conexión a datos no deben llegar al navegador.

El prototipo estático se conserva en `src/`, `scripts/` y `dist/` y se ejecuta con `npm run prototype:verify` o `npm run prototype:dev`. No se borró ni se mezcló con activos definitivos. GitHub Pages solo publica ese prototipo como referencia, no la aplicación dinámica.

PostgreSQL se define en `db/migrations/0001_init.sql` y en [CDD-009](CDD-009-base-nextjs-postgresql.md). La migración **no se ha ejecutado** y no hay conexión configurada. El modelo separa presupuesto, ejecutado y recaudo, usa `numeric(16,2)` y mantiene auditoría append-only.

Esta entrega no incluye autenticación, panel administrativo, formularios, recogida de datos, checkout, webhooks ni cuentas de donación. La aplicación pública arranca en modo demostración sin credenciales. `PAYMENTS_ENABLED` no habilita cobros.

## Componentes actuales

| Componente | Responsabilidad | Persistencia |
| --- | --- | --- |
| Aplicación Next.js | Páginas públicas, layout y contenido de demostración | Archivos versionados; sin base conectada |
| Módulos de dominio | Contratos de contenido, campaña, permisos, donaciones y auditoría | Tipos y datos de demostración |
| Prototipo estático | Referencia visual y de contenido anterior | Archivos en `src/` y `dist/` |
| Migración PostgreSQL | Modelo inicial revisable | No aplicada |
| Flujo GitHub | Verificación de tipos, pruebas, build y prototipo | CI; sin despliegue de la app dinámica |

## Límites

No hay API, sesiones, cookies de autenticación, analítica, formularios, base de datos operativa ni pagos. La aplicación no recoge datos personales. Las páginas se marcan `noindex, nofollow` mientras el contenido esté en preparación.

## Arquitectura futura de donaciones

El navegador solicitará una sesión al servidor de donaciones. El servidor asignará la entidad beneficiaria mediante configuración protegida y creará el pago en la pasarela. La pasarela notificará al servidor; solo después de verificar firma, referencia, moneda, importe y estado se registrará el resultado. El retorno del navegador no será prueba de pago. Los informes públicos se generarán desde datos conciliados y aprobados.

La selección de proveedor, hosting, almacenamiento, retención y controles concretos queda pendiente de análisis técnico y de las condiciones vigentes del proveedor. No se afirman comisiones ni disponibilidad internacional.
