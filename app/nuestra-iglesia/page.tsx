import type { Metadata } from "next";
import Link from "next/link";

import { PageIntro } from "@/components/page-intro";
import { PendingBadge } from "@/components/pending-badge";
import { publicAssetPath } from "@/modules/config/deployment";
import { getSiteContent } from "@/modules/content/repository";
import {
  historicalImage,
  historicalSchedules,
  historyNarrative,
  historySourceNote,
  historyTimeline,
} from "@/modules/content/history";

export const metadata: Metadata = {
  title: "Nuestra iglesia",
  description:
    "Historia de la Iglesia Presbiteriana Cumberland Casa de Dios en Jamundí, desde sus raíces hasta su constitución como iglesia.",
};

export default function NuestraIglesiaPage() {
  const content = getSiteContent();
  const historicalImageSrc = publicAssetPath(historicalImage.src);

  return (
    <>
      <PageIntro
        eyebrow="Nuestra iglesia"
        title={
          <>
            Una historia de fe.
            <br />
            <em>Un camino compartido.</em>
          </>
        }
        lead="La memoria de Casa de Dios reúne hogares, familias y comunidades que han sostenido la obra presbiteriana en Jamundí durante distintas etapas."
      />

      <section className="section history-opening" aria-labelledby="memoria-titulo">
        <div className="container">
          <figure className="history-photo">
            <a
              className="history-photo__link"
              href={historicalImageSrc}
              target="_blank"
              rel="noreferrer"
              aria-label="Abrir imagen ampliada en una pestaña nueva"
            >
              <img
                src={historicalImageSrc}
                width={historicalImage.width}
                height={historicalImage.height}
                alt={historicalImage.alt}
              />
              <span>Abrir imagen ampliada</span>
            </a>
            <figcaption>
              Escena histórica entregada para esta reseña. Esta versión fue
              ampliada y mejorada con inteligencia artificial; no se presenta
              como un original intacto. La fecha, la autoría, el lugar exacto y
              la identificación del edificio están pendientes de confirmación.
            </figcaption>
          </figure>

          <div className="history-introduction">
            <div>
              <p className="eyebrow">Memoria para revisión</p>
              <h2 id="memoria-titulo">De los hogares a una iglesia constituida.</h2>
            </div>
            <div>
              <p>
                La reseña institucional sitúa las primeras reuniones en la
                década de 1930. Después de una primera etapa, la obra se reinició
                en 2004 y creció con el servicio de familias, pastores y
                colaboradores hasta la constitución como iglesia el 25 de enero
                de 2026.
              </p>
              <p className="fine-print">{historySourceNote}</p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="section section--paper"
        aria-labelledby="cronologia-titulo"
      >
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Cronología</p>
              <h2 id="cronologia-titulo">
                Hitos de una historia
                <br />
                <em>que continúa.</em>
              </h2>
            </div>
            <p>
              Las fechas y formulaciones proceden de la presentación entregada
              por la iglesia y permanecen sujetas a revisión institucional.
            </p>
          </div>

          <ol className="history-timeline">
            {historyTimeline.map((event) => (
              <li key={event.period}>
                <p className="history-timeline__period">{event.period}</p>
                <h3>{event.title}</h3>
                <p>{event.summary}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="relato-titulo">
        <div className="container history-story-layout">
          <aside className="history-index" aria-labelledby="relato-titulo">
            <p className="eyebrow">Relato completo</p>
            <h2 id="relato-titulo">La historia por etapas.</h2>
            <nav aria-label="Etapas de la reseña histórica">
              <ol>
                {historyNarrative.map((section) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`}>
                      <span>{section.period}</span>
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <div className="history-narrative">
            {historyNarrative.map((section) => (
              <article id={section.id} key={section.id}>
                <p className="history-narrative__period">{section.period}</p>
                <h3>{section.title}</h3>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </article>
            ))}

            <blockquote className="history-quote">
              <p className="history-quote__purpose">
                La presentación concluye con el propósito de servir cada día a
                Dios, guiados por su Santo Espíritu, y con este pasaje:
              </p>
              <p>
                “Te he puesto por luz a las naciones, a fin de que lleves mi
                salvación hasta los confines de la tierra”.
              </p>
              <cite>Hechos 13:47, cierre de la reseña entregada</cite>
            </blockquote>
          </div>
        </div>
      </section>

      <section
        className="section section--paper"
        aria-labelledby="revision-historica-titulo"
      >
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Cuidado editorial</p>
              <h2 id="revision-historica-titulo">
                Publicado con contexto.
                <br />
                <em>Pendiente de aprobación.</em>
              </h2>
            </div>
            <p>
              Incorporar la reseña no convierte automáticamente cada dato en
              contenido institucional aprobado. Estas observaciones acompañan la
              publicación para evitar conclusiones incorrectas.
            </p>
          </div>

          <div className="history-review-grid">
            <article className="note-panel history-review-card">
              <PendingBadge>Horarios históricos</PendingBadge>
              <h3>No son los horarios vigentes</h3>
              {historicalSchedules.map((schedule) => (
                <p key={schedule}>{schedule}</p>
              ))}
              <p className="fine-print">
                Para visitar la iglesia deben consultarse únicamente los horarios
                actuales publicados en la sección Visítanos.
              </p>
            </article>

            <article className="note-panel history-review-card">
              <PendingBadge>Revisión institucional</PendingBadge>
              <h3>Una versión pública, todavía revisable</h3>
              <p>
                La cronología y el relato conservan los hechos y nombres de la
                fuente entregada. Su redacción, ortografía de nombres, fechas y
                permisos visuales deben ser confirmados por la iglesia antes de
                considerarse una versión institucional definitiva.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="identidad-titulo">
        <div className="container split-layout">
          <div>
            <p className="eyebrow">Identidad</p>
            <h2 id="identidad-titulo">{content.identity.name}</h2>
            <p>
              La iglesia hace parte de la {content.identity.denomination} y sirve
              en {content.identity.city}. El relato histórico ya está incorporado
              para revisión, mientras el nombre legal y el texto doctrinal aún
              requieren aprobación institucional.
            </p>
            <div className="pending-stack">
              <PendingBadge>Nombre legal pendiente de confirmación</PendingBadge>
              <PendingBadge>Texto doctrinal pendiente de aprobación</PendingBadge>
            </div>
          </div>

          <aside className="identity-card" aria-labelledby="identidad-resumen">
            <p className="eyebrow">En síntesis</p>
            <h2 id="identidad-resumen">Casa de Dios</h2>
            <dl>
              <div>
                <dt>Denominación</dt>
                <dd>{content.identity.denomination}</dd>
              </div>
              <div>
                <dt>Ciudad</dt>
                <dd>{content.identity.city}</dd>
              </div>
              <div>
                <dt>Prioridad actual</dt>
                <dd>Campaña del nuevo templo</dd>
              </div>
            </dl>
            <Link className="text-link" href="/nuevo-templo">
              Conocer el proyecto
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}
