# CDD-008 · Inicio de trabajo en OpenCode

## Carpeta y estado

Carpeta actual: `D:\proyectos\iglesia-casa-de-dios`.

Contiene una base de aplicación Next.js 16 con TypeScript estricto, el prototipo HTML/CSS/TypeScript conservado, documentación, una migración PostgreSQL revisable, el PNG transparente elegido por Andrés y una escena histórica mejorada con IA. La reseña fue extraída de una presentación externa e incorporada para revisión; la presentación y sus fotografías incrustadas no están en el repositorio. No contiene backend de producción, autenticación, conexión a base de datos, fotografías originales del pastor o la comunidad ni bocetos visuales. El repositorio remoto no está conectado. No confundir abrir esta carpeta con tener un sitio publicado.

## Inicio en Windows

En OpenCode Desktop, abrir esta carpeta como proyecto. También se puede iniciar desde PowerShell:

```powershell
Set-Location -LiteralPath 'D:\proyectos\iglesia-casa-de-dios'
opencode
```

No abrir FaithCore ni pegar el prompt dentro de otro repositorio. Para continuar en una sesión nueva, enviar:

> Lee AGENTS.md, README.md y docs/CDD-009-base-nextjs-postgresql.md. Revisa el estado actual, ejecuta las verificaciones y continúa con la siguiente tarea sin activar pagos reales ni inventar datos de la iglesia.

La primera tarea ya está ejecutada: existe la base Next.js y el modelo PostgreSQL, pero no hay backend operativo ni migración aplicada. No hace falta pegar todas las conversaciones ni ejecutar `/init`, porque ya existe una guía de proyecto específica. El logo elegido y la reseña ya están incorporados; antes de evaluar la interfaz final todavía será necesario recibir el boceto aprobado y las fotografías autorizadas pendientes.

## Configuración

Se ha preparado `opencode.json` con sintaxis V1, correspondiente a OpenCode 1.17.11 verificado localmente. No se fija proveedor ni modelo: se conserva la selección del usuario. No se modifica la configuración global ni se añaden servicios MCP.

Las lecturas habituales y los comandos explícitos de verificación tienen reglas de permiso; otros comandos de terminal y el acceso fuera de esta carpeta requieren decisión. Las lecturas directas de archivos .env con secretos se bloquean y .env.example permanece disponible. Estas reglas son una ayuda operativa, no un aislamiento del sistema: un shell o una integración puede acceder a otros recursos, y el usuario debe revisar las solicitudes. No iniciar con autoaprobación general. Las reglas no sustituyen controles reales de la aplicación.

Fuentes de sintaxis: https://opencode.ai/v1/docs/config/ y https://opencode.ai/v1/docs/permissions/.

Verificación realizada: versión instalada 1.17.11, JSON válido y archivos de instrucciones presentes. La comprobación de configuración mediante la CLI no pudo completarse porque este entorno no permite escribir el registro habitual de OpenCode fuera del proyecto. No se ha comprobado todavía la carga de la configuración en la aplicación del usuario. Si OpenCode muestra un error al abrir, revisar ese error antes de ejecutar la primera tarea.

## Qué ejecutar primero

La base está preparada y no integra pasarela, autenticación de producción ni recepción de datos sensibles. Para comprobarla:

```powershell
npm install
npm run check
npm run build
npm run prototype:verify
npm run dev
```

El siguiente trabajo será incorporar el diseño visual aprobado y los recursos auténticos, revisar el contenido con la iglesia, probar la migración en una base PostgreSQL desechable y después desarrollar administración segura y pagos en pruebas.

GitHub puede conectarse después de iniciar el trabajo local, usando el enlace real del repositorio. No está autorizado publicar secretos, datos privados o documentos financieros internos como parte del código.

## Contenido actualizado

Los datos aportados por Andrés (dirección y horarios) están en AGENTS.md y se usan en la base. El texto de la reseña se extrajo localmente y se incorporó en `/nuestra-iglesia`; la presentación y sus imágenes permanecen fuera del repositorio. Los detalles técnicos y las observaciones para cotejo están centralizados en CDD-004. Los nombres, fechas y permisos siguen pendientes de aprobación institucional. Los documentos CDD anteriores pueden describir pendientes históricos. CDD-007, CDD-008, CDD-009 y las instrucciones actuales guían la nueva etapa; actualizar el inventario conforme se integren recursos.
