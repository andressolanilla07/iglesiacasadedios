# CDD-004 · Inventario y datos pendientes

## Fuentes

| Material | Situación | Uso permitido en esta entrega |
| --- | --- | --- |
| Nombre en el logo original compartido | Visible en la conversación | Iglesia Presbiteriana Cumberland Casa de Dios |
| `public/brand/Escena histórica junto a la iglesia.png` | Incorporada; versión ampliada y mejorada con IA | Mostrar completa con aviso de procedencia; no identificar fecha, lugar, autor o edificio sin confirmación |
| `public/brand/logo-oficial.png` | Decisión vigente de Andrés; incorporado en encabezado y pie | Conservar el PNG transparente, sus proporciones de 1197 × 1314 y el dibujo original, sin efectos de borde, fondo, contorno o sombra |
| Logo generado transparente | Variante secundaria aceptada para otros usos | No reemplaza el logo original de la web |
| `Reseña casa de Dios actualizada.pptx` | Recuperada desde Descargas; 25 diapositivas y 96 imágenes incrustadas | Texto extraído e incorporado para revisión; no copiar ni publicar la presentación de 74 MB ni sus fotografías automáticamente |
| `Templo_Casa_de_Dios_Junta_y_Web_R12_PRO.pptx` | Fuente arquitectónica elegida; 22 diapositivas y 25 recursos | Publicar seis imágenes optimizadas como visualizaciones conceptuales; no publicar la presentación ni los originales completos |
| Cifras confirmadas por Andrés el 24 de noviembre de 2026 | Presupuesto, ejecutado y diferencia autorizados; fecha de corte contable pendiente | Publicar por separado con fuente y límites; recaudo permanece pendiente |

No confundir ejecutado, presupuesto, capital disponible y donaciones recaudadas. No convertir el ejecutado en porcentaje de recaudo.

La revisión y las decisiones del proyecto arquitectónico están detalladas en
[`CDD-010`](CDD-010-proyecto-arquitectonico.md).

## Contenido histórico incorporado

- `/nuestra-iglesia` presenta la imagen histórica, una cronología y el relato organizado por etapas.
- La portada ofrece un resumen con enlace al relato completo sin desplazar la prioridad de la campaña del nuevo templo.
- La imagen histórica se identifica expresamente como una versión ampliada y mejorada con inteligencia artificial. No se afirma que el edificio visible sea la primera capilla.
- Los horarios de la presentación se conservan solo como registros históricos y se separan de los horarios vigentes publicados en Visítanos.
- Las observaciones de escritura de nombres se conservan en el registro técnico de este documento, no como detalle de la presentación pública.

La incorporación no equivale a aprobación institucional. Permanecen pendientes la validación de nombres, fechas y formulaciones; la autoría, fecha, lugar y permiso definitivo de la imagen histórica; y la autorización individual de fotografías de personas o menores. Las imágenes incrustadas en la presentación no se publicaron.

## Registro técnico de extracción y revisión

- Fuente local: `Reseña casa de Dios actualizada.pptx`, leída desde Descargas sin copiarla al repositorio.
- Tamaño: 74.240.511 bytes, aproximadamente 74 MB.
- Estructura: 25 diapositivas y 96 archivos PNG incrustados.
- Método: se abrió el paquete OOXML localmente en una carpeta temporal y se leyó, en orden, el texto de `ppt/slides/slide*.xml`. No se aplicó OCR ni se dedujeron textos a partir de las fotografías.
- Publicación: solo se trasladó el contenido textual organizado. El PowerPoint y sus imágenes incrustadas no se publicaron ni se añadieron a `public/`.
- La imagen independiente `Escena histórica junto a la iglesia.png` mide 1477 × 1065 píxeles. Fue ampliada y mejorada con IA y no se trata como un original intacto.

Observaciones reservadas para cotejo editorial:

- La fuente alterna `Fabián Flores` y `Fabián Flórez`.
- Usa `Denis Adrián Ponce` y, posteriormente, `Adrián Ponce`.
- Escribe `Villa Pime`, mientras la dirección vigente entregada por la iglesia usa `Villapyme 2`.
- Transcripciones poco frecuentes, entre ellas `Luciría Aguirre`, deben verificarse contra la fuente institucional definitiva.

## Identidad visual elegida

Andrés reemplazó manualmente `public/brand/logo-oficial.png` y actualizó la decisión anterior basada en el JPEG de Descargas. El archivo vigente es un PNG real de 1197 × 1314 píxeles, con canal alfa y SHA-256 `847D38407F24B5F8A976854F23857A4EC634D4A16A1E8109DB65F7BC6DD2C314`.

La aplicación lo presenta con su proporción natural, junto al nombre institucional como texto HTML. No se recorta, estira, regenera ni reconstruye la cruz. Las clases `.brand-logo` y `.footer-logo` no aplican `outline`, borde, fondo ni `box-shadow`. `public/brand/logo-elegido.jpg` queda como registro de la decisión anterior, pero ya no se utiliza en la interfaz.

## Solicitud de información a la iglesia

- Nombre institucional/legal exacto y texto denominacional aprobado.
- Reseña revisada: hitos, fechas, personas y fotografías autorizadas.
- Confirmación institucional de cualquier futura versión de mayor resolución del logo elegido, sin regenerar el dibujo.
- Identificación, autoría y permisos de la fotografía histórica; archivo de mayor resolución si existe.
- Nombre, cargo, biografía, fotografía autorizada y contacto del pastor o pastora.
- Dirección exacta, enlace de mapa validado, horarios y accesibilidad.
- Grupos y ministerios reales, responsables y medios de contacto autorizados.
- Canales oficiales: WhatsApp institucional, correo y redes.
- Aprobación institucional final de las visualizaciones y de los ajustes a los planos de junio de 2026; fotografías verificables de avance si existen.
- Fecha de corte contable y responsable de actualización de las cifras; donaciones recaudadas conciliadas.
- Titular legal y responsables de pagos; documentación por canal privado, fuera del repositorio público.
- Responsable de aprobación editorial y frecuencia de actualización.

## Incorporar originales

Los SVG marcadores, el JPEG de la decisión anterior y las versiones regeneradas se conservan como materiales de referencia, pero no sustituyen la identidad vigente. La aplicación Next.js usa `public/brand/logo-oficial.png` en el encabezado y el pie, junto al nombre institucional como texto HTML. No inventar una vectorización ni reemplazar el PNG sin una nueva decisión expresa. El marcador de la fotografía del hero continúa hasta recibir el activo específico aprobado para esa composición.
