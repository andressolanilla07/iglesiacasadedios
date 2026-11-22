# CDD-007 · Arquitectura y seguridad de Iglesia Casa de Dios

Versión 0.1 · 17 de noviembre de 2026 · Propuesta técnica para revisión.

## Propósito y estado

El sitio de la Iglesia Presbiteriana Cumberland Casa de Dios, Jamundí, tiene como prioridad la campaña para construir el nuevo templo. También presentará su historia, identidad denominacional, oración, acompañamiento pastoral, grupos, evangelización y servicio. Debe proteger el dinero, los datos, la continuidad del servicio y la confianza en la obra.

Este documento amplía CDD-003. Sus controles son requisitos: todavía no constituyen una implementación, auditoría o certificación. La base actual es un prototipo estático sin backend, cuentas administrativas, base de datos ni pagos reales. Ninguna plataforma o lenguaje garantiza ausencia de ataques; los controles deben reducir su probabilidad e impacto y facilitar detección y recuperación.

El logo oficial conserva fondo azul, cruz amarilla, texto y proporciones. Solo se permite mejorar la calidad de reproducción a partir del original. La variante transparente es material secundario y no sustituye la identidad oficial.

## Arquitectura propuesta

Una aplicación modular con Next.js y TypeScript, lógica de servidor y PostgreSQL. Mantener separados los módulos de contenido, proyecto del templo, usuarios/permisos, donaciones y auditoría dentro de un mismo proyecto. La elección no obliga a usar microservicios. TypeScript ayuda a estructurar y comprobar código; la validación real de entradas y permisos ocurre también en el servidor.

| Área | Responsabilidad | Frontera de confianza |
| --- | --- | --- |
| Sitio público | Campaña, historia, renders, planos autorizados y servicios | Toda entrada del visitante es no confiable |
| Administración | Borradores, revisión y publicación de contenido | Identidad, MFA y permisos verificados en servidor |
| Donaciones | Crear referencias, validar importe y moneda, consultar pasarela | No aceptar beneficiarios o destinos del navegador |
| Datos | Contenido, estados de transacción y auditoría mínima | Base privada; conexiones cifradas; credenciales limitadas |
| Pasarela | Checkout y procesamiento de pagos | Verificar eventos y resultados por mecanismos oficiales |
| Publicación | Construir y desplegar código revisado | Separar secretos y entornos de pruebas/producción |

No guardar datos de tarjetas. El servidor inicia el proceso con una pasarela autorizada y el donante paga en el checkout de esta. La confirmación se verifica en servidor, con firma según el proveedor, referencia, importe, moneda y estado; se evita registrar dos veces el mismo evento. No declarar aprobado un pago por parámetros de una URL de retorno. Los eventos repetidos o fuera de orden se deben reconciliar con el estado del proveedor.

## Protección del dinero y del destino

1. Confirmar el titular legal y beneficiario con representantes autorizados de la iglesia mediante un canal independiente del panel web.
2. Mantener el beneficiario y las credenciales fuera del contenido editable y fuera del navegador. Usar la configuración del proveedor y del servidor según la integración elegida.
3. No incluir en el panel editorial campos libres que puedan reemplazar cuentas, enlaces o códigos QR de donación.
4. Cualquier cambio del destino exige solicitud, verificación independiente y aprobación de dos personas autorizadas. La misma persona no solicita y aprueba. Reautenticar operaciones sensibles y conservar auditoría.
5. Si la pasarela permite bloquear o limitar cambios de cuenta y reforzar su aprobación, configurarlo y probarlo. Una cuenta de pasarela comprometida sigue siendo un riesgo aunque la web esté protegida.
6. Admitir únicamente destinos aprobados; bloquear redirecciones arbitrarias. Si se publica un QR, verificar su contenido decodificado, titular y versión antes de aprobarlo.
7. Alertar por modificaciones de destino, permisos, configuración de pagos y publicación. Probar que el mecanismo permite detener los aportes cuando el destino no está aprobado.

Un control visual, un hash o una lista dentro del mismo código comprometido no protege por sí solo contra quien puede cambiar ese código. Las revisiones y avisos deben cubrir también la pasarela, el dominio y las cuentas de despliegue.

## Roles propuestos

| Rol | Puede | No puede |
| --- | --- | --- |
| Editor | Preparar contenido y avances en borrador | Publicar sin revisión o cambiar destinos de donación |
| Revisor institucional | Revisar contenido, permisos de imágenes y publicación | Alterar credenciales o beneficiario por función editorial |
| Responsable financiero | Consultar conciliación y proponer cambios financieros | Aprobar su propia solicitud de cambio |
| Segundo aprobador financiero | Verificar y aprobar solicitudes de otro responsable | Sustituir unilateralmente el destino |
| Administrador técnico | Operar infraestructura según procedimientos | Eludir silenciosamente controles; sus accesos deben auditarse |

La iglesia definirá las personas responsables. Si inicialmente trabaja una sola persona, la revisión financiera independiente sigue pendiente: no se debe presentar como doble control. Evitar cuentas compartidas, aplicar mínimo privilegio y revisar bajas y accesos periódicamente. Preferir MFA resistente al phishing cuando esté disponible y custodiar recuperación fuera del repositorio.

## Protección del contenido y de la comunidad

- Publicación con borrador, revisión e historial; incluir fechas de corte en cifras y avances. Distinguir presupuesto, ejecutado y donaciones recaudadas.
- No incorporar comentarios públicos, testimonios enviados automáticamente o publicación directa de visitantes en la primera fase.
- Documentar permisos y autoría de fotografías. Evitar exponer información personal innecesaria de miembros, niños y donantes.
- Las peticiones de oración y el acompañamiento pueden incluir información íntima. Preparar privacidad, acceso, consentimiento, retención y eliminación antes de recogerlos; inicialmente usar solo información pública y canales oficiales confirmados.
- Proteger el contenido contra inserción de scripts: validar y sanear formatos admitidos y evitar HTML arbitrario. Validar cargas de archivos por tipo real, tamaño y autorización, y almacenarlas fuera de rutas ejecutables.
- No inventar declaraciones doctrinales. Los textos sobre identidad presbiteriana deben ser aprobados por la iglesia.

## Aplicación e infraestructura

Requerir HTTPS, sesiones con cookies seguras, autenticación y autorización en cada operación protegida, defensa frente a CSRF cuando corresponda, límites de solicitudes y validación de entradas en servidor. Usar consultas parametrizadas y credenciales de base de datos con privilegios mínimos. No exponer errores internos o secretos. Diseñar controles contra abuso de formularios y endpoints, inyección, XSS, SSRF y cargas maliciosas según las funciones que se implementen.

Configurar cabeceras y CSP acordes con la pasarela; no copiar una política que impida su checkout o webhooks. Incorporar WAF y mitigación de tráfico abusivo según el proveedor, entendiendo sus límites. Mantener dependencias y runtime actualizados con revisiones y pruebas. Definir análisis de dependencias y secretos en CI; fijar las Actions a commits revisados. Los hallazgos deben valorarse y corregirse según su impacto y explotación posible, no solo por una cifra de un escáner.

## GitHub y alojamiento

GitHub contiene código y documentación apta para compartir, nunca claves, documentos de identidad, información bancaria interna o copias de datos reales. Proteger la rama principal, exigir revisión independiente, limitar quién puede desplegar y separar entornos. Comprobar qué protecciones permite el plan y la visibilidad elegidos. Un archivo CODEOWNERS por sí solo no bloquea cambios sin las reglas correspondientes. Restringir también quién puede modificar las reglas y los workflows; registrar cualquier excepción.

GitHub Pages aloja contenido estático y no ejecutará el backend. El alojamiento final debe soportar el runtime de Next.js/Node seleccionado, variables secretas, webhooks HTTPS, conexiones seguras a PostgreSQL, registros, restauración y despliegues controlados.

GoDaddy es una opción por evaluar, no una garantía suficiente por marca o por tener SSL. Su documentación actual ofrece Node.js Hosting y lo identifica como beta. Antes de contratar, comprobar el producto concreto disponible para la cuenta y región, versión de Node, persistencia, conexión a PostgreSQL, límites de proceso, protección de red, gestión de secretos, copias, recuperación y compatibilidad con el flujo de GitHub. El dominio puede estar registrado en un proveedor distinto del alojamiento de la aplicación.

Proteger dominio, DNS, correo de recuperación, GitHub, hosting y pasarela con MFA y accesos restringidos. Revisar renovaciones y cambios de DNS. El secuestro de dominio también podría desviar a los visitantes aun con una aplicación correcta.

## Verificación previa a recibir aportes

| Prueba | Resultado exigido |
| --- | --- |
| Editor intenta cambiar el destino o ejecutar una operación financiera | Rechazo del servidor |
| Cambio financiero con una sola aprobación | No se activa |
| Manipulación de importe, moneda, referencia o beneficiario desde el navegador | Rechazo o uso de datos confiables del servidor según la operación |
| Evento de pasarela falso, repetido o fuera de orden | Validación correcta, sin doble registro, con conciliación |
| Retorno del navegador que afirma éxito sin confirmación | No se marca como recibido |
| Enlace externo no aprobado | Rechazo |
| Restauración desde una copia | Recuperación verificada en entorno aislado, con integridad de datos comprobada |
| Cambio de contenido malicioso o cuenta comprometida | Registro, alerta, revocación y reversión ensayados |

Programar revisión técnica independiente antes de producción y cuando cambie la integración financiera. Asignar responsables y tiempos de respuesta. Acordar objetivos de recuperación y pérdida máxima de datos tolerable; no afirmar que hay respaldo suficiente hasta probar su restauración.

## Detección y respuesta

Registrar identificadores, cambios y resultados de validación con datos mínimos; excluir secretos y cuerpos completos de pagos o peticiones. Definir alertas operables, acceso restringido y conservación. Ante sospecha de desvío: detener entrada de aportes, preservar evidencias, avisar a responsables, verificar con la pasarela, revocar accesos afectados, corregir y reconciliar antes de reactivar. Preparar un mensaje institucional aprobado para incidentes y un canal alterno de contacto.

## Fuentes técnicas consultadas

- OWASP, Secure Integration of Third-Party Payment Gateways: https://cheatsheetseries.owasp.org/cheatsheets/Third_Party_Payment_Gateway_Integration_Cheat_Sheet.html
- GitHub, Deployments and environments: https://docs.github.com/en/actions/reference/workflows-and-actions/deployments-and-environments
- GoDaddy, Node.js Hosting FAQ: https://www.godaddy.com/help/nodejs-hosting-faq-42915
- Next.js, Backend for Frontend: https://nextjs.org/docs/app/guides/backend-for-frontend
- GitHub, What is GitHub Pages?: https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages

## Próxima implementación

Consolidar requisitos y el inventario de Agustín; definir esquema de datos, permisos y decisiones técnicas; preparar aplicación Next.js/TypeScript/PostgreSQL y pruebas; construir campaña y administración de contenido; integrar pagos en pruebas; verificar controles antes del lanzamiento. La información pendiente se incorpora sin inventarla. El presupuesto o el ejecutado no se presentarán como recaudo.
