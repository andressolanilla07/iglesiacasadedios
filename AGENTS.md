# Instrucciones de desarrollo

## Estado real y siguiente etapa

- La carpeta contiene una base de aplicación Next.js 16 con TypeScript estricto en `app/`, `components/` y `modules/`, y conserva el prototipo estático original en `src/`, `scripts/` y `dist/`.
- No hay backend de producción, autenticación, panel administrativo, formularios, pagos ni conexión a PostgreSQL. El modelo inicial está en `db/migrations/0001_init.sql` y `docs/CDD-009-base-nextjs-postgresql.md`; la migración no se ha ejecutado.
- La web pública arranca en modo demostración sin credenciales. El contenido no confirmado se marca como pendiente y los aportes permanecen deshabilitados; `PAYMENTS_ENABLED` no activa cobros.
- Para iniciar, leer el README, `docs/CDD-009-base-nextjs-postgresql.md` y CDD-007. El prototipo se ejecuta con `npm run prototype:verify` o `npm run prototype:dev`; la aplicación con `npm run dev`.
- Prototipo y boceto visual son materiales distintos: el código actual no reproduce todavía la propuesta visual 03 aprobada en conversación. No afirmar que el boceto está implementado.
- Está incorporado el PNG transparente elegido por Andrés como `public/brand/logo-oficial.png` (1197 × 1314); esta decisión reemplaza el uso anterior del JPEG. También hay una escena histórica ampliada y mejorada con IA. No hay archivos de los bocetos ni fotografías autorizadas del pastor o la comunidad. No simular haber visto recursos ausentes y mantener sus marcadores identificados.
- No delegar en subagentes durante la primera tarea. No usar o alterar otros proyectos.

## Reglas del proyecto

- Proyecto: Iglesia Presbiteriana Cumberland Casa de Dios, Jamundí.
- Prioridad: campaña del nuevo templo dentro del alcance institucional.
- Leer README y docs/CDD antes de modificar.
- Respetar el logo original: fondo azul y cruz amarilla. No reemplazarlo por la variante transparente sin decisión expresa.
- No inventar datos pastorales, horarios, contactos, hitos, cifras ni testimonios.
- Marcar como pendientes los contenidos no confirmados.
- No publicar datos privados ni capital reservado.
- Esta fase no procesa pagos ni recoge datos. Mantener esta frontera.
- No introducir cuentas, QR ni enlaces de donación sin verificación del titular y revisión independiente.
- Mantener accesibilidad por teclado, diseño móvil y preferencias de movimiento reducido.
- Ejecutar `npm run build` y `npm run check` tras cambios funcionales.
- La transformación nativa de TypeScript no es comprobación de tipos.
- Los SVG de identidad e historia son marcadores heredados. La aplicación usa `logo-oficial.png`; conservar su PNG, transparencia, proporción natural y dibujo sin regenerarlo. No aplicar borde, fondo, contorno ni sombra al logo. El marcador histórico del hero permanece hasta recibir el activo específico aprobado. La escena histórica publicada en Nuestra iglesia debe conservar el aviso de mejora con IA.

## Datos proporcionados por Andrés

- Dirección: Cl. 6 # 6As-27, Villapyme 2, Jamundí.
- Servicios: domingo de 10:00 a. m. a 12:00 p. m.; martes de 7:00 p. m. a 8:30 p. m.
- Dar protagonismo al pastor y a la comunidad como una familia unida. Mantener dos vías de comunicación: consultas a la iglesia y solicitud de acompañamiento pastoral; números oficiales pendientes.
- Páginas previstas: Inicio, Nuevo templo, Nuestra iglesia, Nuestro pastor, Vida en comunidad y Visítanos y contacto. El acceso para aportar debe ser visible y quedar inactivo o explicativo hasta habilitar la pasarela verificada.
- La reseña fue extraída e incorporada en `/nuestra-iglesia` para revisión: raíces en los años treinta; reinicio de la obra en 2004; lotes adquiridos en julio de 2022; nombramiento de Adrián Ponce en enero de 2024, ordenación el 19 de enero de 2025; constitución en iglesia el 25 de enero de 2026. El dato del pastor no confirma por sí solo continuidad o contacto actual. Las variantes de nombres y la redacción siguen pendientes de aprobación institucional; los detalles técnicos se mantienen en CDD-004, no en la web pública.
- No publicar cifras financieras solo a partir del historial de conversación. Requieren material vigente y autorización, sin confundir ejecutado con donaciones recaudadas.
- Andrés confirmó el 24 de noviembre de 2026 el presupuesto total de $1.099.873.000 COP, el ejecutado reportado de $172.500.000 COP y la diferencia presupuestal de $927.373.000 COP. La fecha de confirmación no es fecha de corte contable; las donaciones recaudadas siguen pendientes. Mantener las cifras centralizadas y no presentar la diferencia como dinero disponible.
- El proyecto arquitectónico publicado procede de `Templo_Casa_de_Dios_Junta_y_Web_R12_PRO.pptx` y se acredita a «Arq. Agustín Torres García». Las imágenes son visualizaciones conceptuales; los planos de junio de 2026 son referencias con ajustes pendientes. No afirmar licencias, aforo definitivo, accesibilidad certificada ni avance de construcción.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
