import type { Metadata } from "next";
import Link from "next/link";

import { publicAssetPath } from "@/modules/config/deployment";
import { CampaignFigures } from "@/components/campaign-figures";
import { DonationDisabledPanel } from "@/components/donation-disabled";
import { PendingBadge } from "@/components/pending-badge";
import { VisitCard } from "@/components/visit-card";
import { getSiteContent } from "@/modules/content/repository";
import {
  campaignSummary,
  templeProject,
} from "@/modules/temple-project/demo";
import {
  projectCredit,
  projectHeroImage,
} from "@/modules/temple-project/project-content";

export const metadata: Metadata = {
  title: "Inicio",
};

const communityAreas = [
  {
    number: "01",
    title: "Oración",
    description:
      "Un espacio para presentar necesidades y acompañarnos en la fe. La forma de participar se confirmará con la iglesia.",
  },
  {
    number: "02",
    title: "Acompañamiento",
    description:
      "Escucha y orientación para las distintas etapas de la vida, con un canal que se habilitará tras definir la privacidad.",
  },
  {
    number: "03",
    title: "Grupos y comunidad",
    description:
      "Encuentros para aprender, compartir y crecer juntos. Nombres, responsables y horarios están pendientes.",
  },
  {
    number: "04",
    title: "Evangelización y servicio",
    description:
      "Compartir el evangelio y expresar la fe al servicio de los demás, dentro del alcance institucional de la iglesia.",
  },
] as const;

const projectAssets = [
  {
    number: "01",
    title: "Cuatro niveles",
    description:
      "Auditorio, cafetería, salones de formación, sala polivalente y terraza.",
  },
  {
    number: "02",
    title: "Recorrido conceptual",
    description:
      "Visualizaciones para comprender cómo cada espacio puede servir a la comunidad.",
  },
  {
    number: "03",
    title: "Referencias técnicas",
    description:
      "Planos de junio de 2026 con ajustes todavía pendientes de consolidar.",
  },
] as const;

export default function HomePage() {
  const content = getSiteContent();

  return (
    <>
      <section className="hero" aria-labelledby="hero-titulo">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="hero-kicker">
                <span className="hero-kicker__line" aria-hidden="true" />
                Campaña del nuevo templo
              </p>
              <h1 id="hero-titulo">
                Una casa para la fe.
                <br />
                <em>Una familia que construye.</em>
              </h1>
              <p className="lead">
                Estamos preparando un nuevo templo para encontrarnos, compartir
                la Palabra y servir a Jamundí. Queremos contar el proyecto con
                claridad, paso a paso.
              </p>
              <div className="hero-actions">
                <Link
                  className="button button--primary button--large"
                  href="/nuevo-templo#aportes-templo"
                >
                  Conocer cómo aportar
                  <span aria-hidden="true">→</span>
                </Link>
                <Link
                  className="button button--ghost"
                  href="/nuevo-templo#recorrido-niveles"
                >
                  Recorre el futuro templo
                </Link>
              </div>
              <p className="fine-print fine-print--light">
                Los aportes siguen deshabilitados. El botón abre la información
                de la campaña; no inicia un pago ni solicita datos personales.
              </p>
            </div>

            <figure className="hero-media hero-media--project">
              <div className="hero-media__frame">
                <img
                  src={publicAssetPath(projectHeroImage.src)}
                  width={projectHeroImage.width}
                  height={projectHeroImage.height}
                  alt={projectHeroImage.alt}
                />
                <span className="hero-media__tag">
                  Visualización conceptual del proyecto
                </span>
              </div>
              <figcaption>
                Propuesta arquitectónica sujeta a ajustes · {projectCredit}
              </figcaption>
            </figure>
          </div>

          <dl className="hero-meta">
            <div>
              <dt>Proyecto</dt>
              <dd>En preparación</dd>
            </div>
            <div>
              <dt>Aportes</dt>
              <dd>Deshabilitados</dd>
            </div>
            <div>
              <dt>Sede</dt>
              <dd>Jamundí, Valle del Cauca</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="section" aria-labelledby="proyecto-titulo">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">El proyecto de Agustín</p>
              <h2 id="proyecto-titulo">
                Un templo pensado
                <br />
                <em>para la vida en comunidad.</em>
              </h2>
            </div>
            <p>
              El proyecto organiza cuatro niveles para el culto, la formación,
              el encuentro y el servicio. Las imágenes permiten recorrer la
              intención arquitectónica sin presentarla como obra ejecutada.
            </p>
          </div>

          <div className="project-grid">
            <div className="project-copy">
              <p>
                Las visualizaciones son propuestas y los planos de junio de 2026
                son referencias con ajustes pendientes. No acreditan licencias,
                aforo definitivo ni accesibilidad certificada.
              </p>
              <p>
                La campaña del nuevo templo es la prioridad de esta etapa. Antes
                de recibir aportes se confirmarán el titular beneficiario, la
                pasarela y la forma de conciliar cada pago.
              </p>
              <div className="pending-stack">
                <span className="reference-badge">
                  Visualizaciones conceptuales
                </span>
                <span className="reference-badge">
                  Planos de referencia · junio de 2026
                </span>
                <PendingBadge>Ajustes técnicos pendientes</PendingBadge>
              </div>
              <p className="section-link">
                <Link
                  className="text-link"
                  href="/nuevo-templo#recorrido-niveles"
                >
                  Recorrer el proyecto por niveles
                </Link>
              </p>
              <p className="fine-print">{projectCredit}</p>
            </div>

            <div className="asset-grid">
              {projectAssets.map((asset) => (
                <article className="asset-card" key={asset.number}>
                  <p className="asset-card__index" aria-hidden="true">
                    {asset.number}
                  </p>
                  <h3>{asset.title}</h3>
                  <p>{asset.description}</p>
                  <span className="reference-badge">Referencia publicada</span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className="section section--paper"
        aria-labelledby="avances-titulo"
      >
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Avances</p>
              <h2 id="avances-titulo">
                Un camino
                <br />
                <em>por etapas.</em>
              </h2>
            </div>
            <p>
              No se publican avances de obra sin evidencia. Estas etapas
              distinguen la presentación conceptual del proyecto de las
              verificaciones requeridas antes de habilitar aportes.
            </p>
          </div>

          <ol className="stage-list">
            {templeProject.stages.map((stage, index) => (
              <li key={stage.id} className="stage">
                <span className="stage-number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>{stage.title}</h3>
                  <p>{stage.description}</p>
                  <PendingBadge>
                    {stage.status === "in_progress"
                      ? "En preparación"
                      : "Etapa prevista"}
                  </PendingBadge>
                </div>
              </li>
            ))}
          </ol>

          <div className="note-panel">
            <h3>Avances de obra</h3>
            <p>{templeProject.note}</p>
            <p className="fine-print">
              No se usan porcentajes, cifras estimadas ni fechas de avance sin
              material vigente y autorización de la iglesia.
            </p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="transparencia-titulo">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Transparencia</p>
              <h2 id="transparencia-titulo">Cada cifra, en su lugar.</h2>
            </div>
            <p>
              Presupuesto, valor ejecutado, diferencia presupuestal y donaciones
              recaudadas no son lo mismo. Las cifras confirmadas se publican sin
              convertir la fecha de confirmación en una fecha de corte contable.
            </p>
          </div>

          <CampaignFigures />

          <div className="split-layout transparency-split">
            <DonationDisabledPanel headingLevel={2} />
            <div>
              <p className="eyebrow">Antes de recibir aportes</p>
              <h2>La confianza se verifica.</h2>
              <p>
                El acceso para aportar seguirá visible como informativo hasta
                completar la verificación del titular y la revisión
                independiente.
              </p>
              <ul className="check-list">
                <li>El navegador nunca decidirá el destinatario del dinero.</li>
                <li>El retorno del navegador no se tomará como pago confirmado.</li>
                <li>
                  Los cambios de destino exigirán dos aprobaciones distintas.
                </li>
                <li>
                  Los eventos repetidos o fuera de orden se reconciliarán.
                </li>
              </ul>
              <p className="fine-print">{content.editorial.note}</p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="section section--paper home-history"
        aria-labelledby="historia-resumen-titulo"
      >
        <div className="container home-history__layout">
          <div>
            <p className="eyebrow">Nuestra historia</p>
            <h2 id="historia-resumen-titulo">
              Una obra sostenida
              <br />
              <em>por generaciones.</em>
            </h2>
            <p>
              La memoria de Casa de Dios comienza con reuniones en hogares en la
              década de 1930, atraviesa el reinicio de la obra en 2004 y llega a
              su constitución como iglesia el 25 de enero de 2026.
            </p>
            <p className="fine-print">
              La reseña y sus nombres están incorporados para revisión
              institucional. La imagen histórica ampliada está identificada como
              una versión mejorada con inteligencia artificial.
            </p>
            <p className="section-link">
              <Link className="text-link" href="/nuestra-iglesia#memoria-titulo">
                Leer la reseña histórica completa
              </Link>
            </p>
          </div>

          <ol className="home-history__milestones">
            <li>
              <span>Década de 1930</span>
              <strong>Primeras reuniones en hogares</strong>
            </li>
            <li>
              <span>2004</span>
              <strong>Reinicio de la obra en Jamundí</strong>
            </li>
            <li>
              <span>25 de enero de 2026</span>
              <strong>Constitución como iglesia</strong>
            </li>
          </ol>
        </div>
      </section>

      <section className="section pastor-feature" aria-labelledby="pastor-titulo">
        <div className="container pastor-grid">
          <div className="portrait-frame" aria-hidden="true">
            <div className="portrait-frame__inner">
              <span>Perfil pastoral</span>
              <small>Fotografía y biografía por incorporar</small>
            </div>
          </div>

          <div>
            <p className="eyebrow eyebrow--light">Nuestro pastor</p>
            <h2 id="pastor-titulo">
              Una fe que se comparte.
              <br />
              <em>Un acompañamiento cercano.</em>
            </h2>
            <p>
              La iglesia quiere acompañar a cada persona y familia en las
              distintas etapas de la vida. El perfil pastoral, su nombre,
              biografía y fotografía se están confirmando con la iglesia.
            </p>
            <p>{content.pastor.note}</p>
            <div className="pending-stack">
              <PendingBadge>Perfil pastoral en revisión</PendingBadge>
              <PendingBadge>Fotografía autorizada pendiente</PendingBadge>
              <PendingBadge>Canal de contacto pendiente</PendingBadge>
            </div>
            <p className="section-link">
              <Link className="text-link text-link--light" href="/nuestro-pastor">
                Conocer el espacio pastoral
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="section family-band" aria-labelledby="familia-titulo">
        <div className="container family-layout">
          <div className="family-copy">
            <p className="eyebrow">Vida en comunidad</p>
            <h2 id="familia-titulo" className="family-statement">
              Una iglesia.
              <br />
              <em>Una familia.</em>
            </h2>
            <p>
              La construcción es parte del camino. La oración, el
              acompañamiento, los grupos y el servicio dan sentido a lo que
              hacemos juntos.
            </p>
            <div className="family-actions">
              <Link className="text-link" href="/vida-en-comunidad">
                Ver la vida de la iglesia
              </Link>
              <Link className="text-link" href="/nuestro-pastor">
                Conocer el espacio pastoral
              </Link>
            </div>
            <p className="fine-print">
              Nombres, responsables y horarios de grupos permanecen pendientes
              de confirmación.
            </p>
          </div>

          <div className="card-grid card-grid--two area-grid">
            {communityAreas.map((area) => (
              <article className="card card--feature area-card" key={area.number}>
                <p className="card-number">{area.number}</p>
                <h3>{area.title}</h3>
                <p>{area.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="visita-titulo">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Visítanos</p>
              <h2 id="visita-titulo">Nos alegrará conocerte.</h2>
            </div>
            <p>
              La dirección y los horarios de los servicios están confirmados.
              Los demás canales siguen en verificación.
            </p>
          </div>
          <VisitCard />
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="cierre-titulo">
        <div className="container">
          <div className="cta-band">
            <div>
              <p className="eyebrow eyebrow--light">Campaña del nuevo templo</p>
              <h2 id="cierre-titulo">La campaña sigue su curso.</h2>
              <p>
                Conoce el proyecto, el estado de la transparencia y cómo se
                habilitarán los aportes.
              </p>
            </div>
            <div className="cta-band__actions">
              <Link
                className="button button--primary"
                href="/nuevo-templo#aportes-templo"
              >
                Conocer cómo aportar
              </Link>
              <Link className="button button--ghost" href="/visitanos">
                Visítanos
              </Link>
            </div>
          </div>
          <p className="fine-print cta-band-note">
            {campaignSummary.lead} Los aportes permanecen deshabilitados.
          </p>
        </div>
      </section>
    </>
  );
}
