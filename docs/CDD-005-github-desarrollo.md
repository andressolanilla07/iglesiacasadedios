# CDD-005 · GitHub y trabajo con OpenCode

## Repositorio

Nombre previsto: `iglesia-casa-de-dios`. Título visible: Iglesia Casa de Dios. No se ha creado un repositorio remoto ni habilitado GitHub Pages en esta entrega.

Crear el repositorio en la cuenta correcta, definir su visibilidad conscientemente y comprobar el plan/configuración que permite Pages. No incluir documentos de identidad, RUT completo, datos privados, credenciales o documentos internos. La elegibilidad, opciones y políticas de GitHub deben verificarse en su documentación vigente al configurar el servicio.

Desde la carpeta del proyecto:

```powershell
git init -b main
git add .
git commit -m "feat: propuesta inicial del sitio Iglesia Casa de Dios"
```

Después de crear el repositorio, usar la URL exacta que GitHub proporcione para añadir `origin` y enviar `main`. No ejecutar estos comandos desde una carpeta distinta. Evitar repositorios anidados y nunca versionar `.env` ni recursos privados.

En Settings → Pages, seleccionar el flujo de GitHub Actions si está disponible. El workflow `ci.yml` verifica tipos, pruebas, build de Next.js y el prototipo conservado. El workflow `pages.yml` permite publicar manualmente desde `main` con `workflow_dispatch` **solo el prototipo estático de `dist/`**; no publica la aplicación Next.js ni simula un backend. Habilitar revisiones del entorno antes de publicar y proteger `main` conforme a las capacidades del repositorio. Las referencias de Actions están fijadas a SHAs revisados.

Las rutas relativas del prototipo permiten publicarlo bajo `/iglesia-casa-de-dios/`. La aplicación Next.js no se publica en GitHub Pages: requiere un runtime Node y PostgreSQL. La dirección remota final solo se confirmará cuando GitHub termine un despliegue válido.

## Ramas y revisión

Usar ramas `feat/tema`, `fix/tema` o `docs/tema`, cambios pequeños y PR con problema, resultado y validación. Revisar contenido y código antes de fusionar. Las modificaciones de pagos requieren revisión independiente del responsable autorizado.

## OpenCode

Abrir la carpeta del proyecto y leer `AGENTS.md`, `README.md` y los documentos CDD antes de modificar. Trabajar una tarea por rama y ejecutar construcción y comprobación. No conectar pagos reales o formularios como una mejora incidental. Mantener los campos pendientes visibles hasta recibir datos aprobados.

## Próximas etapas

1. Incorporar reseña e imágenes originales y revisar con Andrés y Agustín.
2. Completar datos institucionales y confirmar permisos de publicación.
3. Crear/conectar GitHub y desplegar la propuesta para revisión.
4. Definir administración de contenido y arquitectura de pagos.
5. Integrar pasarela en pruebas, endurecer seguridad y validar conciliación.
6. Publicar campaña operativa con canales verificados y responsables definidos.
