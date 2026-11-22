# Primera tarea de OpenCode · Base de Iglesia Casa de Dios

Trabaja únicamente en esta carpeta. Lee AGENTS.md, README.md, docs/CDD-007-arquitectura-seguridad.md y docs/CDD-008-inicio-opencode.md antes de editar. La meta de esta tarea es dejar una base real, pequeña y comprobable para la aplicación, no intentar construir todo el producto en una sola ejecución. No delegues en subagentes.

## Contexto

Estamos creando el sitio de la Iglesia Presbiteriana Cumberland Casa de Dios de Jamundí. La portada prioriza reunir fondos para el nuevo templo; el sitio también presenta historia, pastor, comunidad, grupos, oración, acompañamiento y evangelización. La comunidad se describe como una familia unida. Logo oficial: fondo azul y cruz amarilla, sin cambiar símbolos ni proporciones. Estética profesional: azul institucional, blanco cálido y amarillo selectivo; tipografía elegante, espacios amplios, adaptación real a móvil y accesibilidad.

El código existente es un prototipo estático y sus SVG son marcadores. No contiene los archivos originales de fotos, renders ni la propuesta visual 03. No supongas que puedes reproducir fielmente una imagen que no está en la carpeta. Conserva y documenta estos límites.

## Trabajo autorizado en esta primera tarea

1. Inspecciona árbol, scripts, Node/npm y estado de Git. Si no existe Git, inicializa una rama main exclusivamente aquí; no añadas remotos ni cambies la configuración global. Si ya existe, conserva los cambios del usuario y usa una rama de trabajo cuando haya un commit base. No hagas commit, push, publicación o contratación en esta tarea.
2. Resume en pocas líneas la estructura que vas a preparar y continúa implementando. Verifica en documentación oficial las versiones estables compatibles de Next.js, React, TypeScript y runtime antes de instalar. Deja un único gestor de paquetes, npm, con lockfile; no uses versiones canary ni desactives verificaciones para resolver errores.
3. Conserva el prototipo y su forma de ejecución como referencia reproducible antes de modificar scripts o estructura. No lo borres ni mezcles sus marcadores con activos definitivos. No ejecutes un generador con --force sobre esta carpeta.
4. Prepara una aplicación Next.js con TypeScript estricto y rutas App Router. Organiza por módulos: contenido, proyecto del templo, usuarios/permisos, donaciones y auditoría, sin microservicios innecesarios. Separa módulos exclusivos del servidor para que secretos y acceso a datos no lleguen al navegador.
5. Crea la navegación y el layout compartido de estas páginas: Inicio, Nuevo templo, Nuestra iglesia, Nuestro pastor, Vida en comunidad y Visítanos y contacto. En esta fase basta con páginas estructurales dignas, no una réplica final del boceto. La portada debe destacar la campaña y los espacios de pastor/comunidad. Señala datos pendientes con claridad.
6. Usa la dirección y los dos horarios aportados en AGENTS.md. No inventes teléfonos, email, mapas verificados, retratos, testimonios o cifras de recaudo. No expongas los documentos de desarrollo o internos como descargas públicas.
7. Define el modelo inicial de datos PostgreSQL en un documento y en una migración SQL revisable: páginas/contenido y su estado editorial, perfil pastoral, grupos/actividades, avances de obra, metadatos de recursos, usuarios/roles, auditoría y referencias de donación. Separa presupuesto/ejecutado de recaudo. Usa tipos monetarios exactos, nunca coma flotante para dinero. No ejecutes migraciones en bases existentes ni inventes una conexión. Explica qué queda pendiente de probar con PostgreSQL real.
8. Añade .env.example solo con nombres y valores de ejemplo no secretos, y validación de configuración exclusivamente en servidor. La web pública preliminar debe poder arrancar sin credenciales externas usando contenido de demostración claramente separado; no simules una conexión de base de datos operativa. Las funciones que requieran servicios ausentes deben permanecer deshabilitadas y documentadas.
9. No implementes autenticación casera, panel administrativo abierto, formularios que recojan datos, cuentas bancarias, QR, checkout real ni webhooks ficticios. Define fronteras y contratos para esos módulos; ninguna ruta de escritura debe quedar accesible sin autorización. Las solicitudes pastorales y peticiones de oración no se guardarán ni enviarán en esta entrega.
10. Actualiza README, la decisión de arquitectura y las instrucciones para ejecutar el proyecto. Adapta la verificación de CI al nuevo framework conservando constancia del prototipo. El workflow estático de Pages no debe publicar la aplicación dinámica como si incluyera backend.
11. Añade y ejecuta comprobación real de tipos, construcción y pruebas enfocadas en invariantes relevantes que implementes: protección de configuración del servidor y funciones de donación deshabilitadas, si existen en esta tarea. No escribas tests que solo copien el código. No declares pruebas de PostgreSQL, navegador, autorización o pagos como superadas si no las has realizado.

## Entrega

Termina con: qué construiste, archivos relevantes, comandos exactos de arranque, resultado de verificaciones, limitaciones comprobadas y siguiente tarea. Mantén pagos reales deshabilitados. Si una dependencia o servicio falta, informa el bloqueo concreto y deja intacto lo que ya funciona; no lo sustituyas silenciosamente con una implementación falsa.
