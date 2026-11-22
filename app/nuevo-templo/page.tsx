import type { Metadata } from "next";
import Link from "next/link";

import { CampaignFigures } from "@/components/campaign-figures";
import { DonationDisabledPanel } from "@/components/donation-disabled";
import { PageIntro } from "@/components/page-intro";
import { PendingBadge } from "@/components/pending-badge";
import {
  campaignSummary,
  templeProject,
} from "@/modules/temple-project/demo";

export const metadata: Metadata = {
  title: "Nuevo templo",
  description:
    "Campaña del nuevo templo de la Iglesia Casa de Dios en Jamundí: propósito, etapas y compromiso de transparencia.",
};

export default function NuevoTemploPage() {
  return (
    <>
      <PageIntro
        eyebrow="Campaña de construcción"
        title={
          <>
            Un nuevo templo.
            <br />
            <em>Un lugar para servir.</em>
          </>
        }
        lead="Queremos dar el siguiente paso: un espacio que acompañe la vida de la iglesia y abra lugar para la oración, la enseñanza y el encuentro."
      >
        <Link className="button button--primary" href="/visitanos">
          Visítanos y contacto
        </Link>
        <button type="button" className="button button--ghost" disabled>
          Aportar · próximamente
        </button>
      </PageIntro>

      <section className="section" aria-labelledby="proposito-titulo">
        <div className="container split-layout">
          <div>
            <p className="eyebrow">El propósito</p>
            <h2 id="proposito-titulo">
              Más que un edificio,
              <br />
              <em>un lugar para la comunidad.</em>
            </h2>
            <p>
              El proyecto del nuevo templo es la prioridad de esta etapa del
              sitio. La campaña se presentará con información verificable y con
              claridad sobre el destino de cada aporte.
            </p>
            <p>
              Todavía no hay una pasarela habilitada, un titular beneficiario
              publicado ni cifras autorizadas para difundir. Esta página explica
              el camino previsto sin simular que esas condiciones ya se cumplen.
            </p>
            <p>
              <PendingBadge>Contenido en preparación</PendingBadge>
            </p>
          </div>

          <aside className="status-card" aria-labelledby="estado-campana">
            <p className="eyebrow">Estado de la campaña</p>
            <h2 id="estado-campana">{campaignSummary.headline}</h2>
            <p>{campaignSummary.lead}</p>
            <dl className="status-list">
              <div>
                <dt>Moneda</dt>
                <dd>
                  <PendingBadge>Pendiente de confirmar</PendingBadge>
                </dd>
              </div>
              <div>
                <dt>Fecha de corte</dt>
                <dd>
                  <PendingBadge>Sin fecha publicada</PendingBadge>
                </dd>
              </div>
              <div>
                <dt>Pasarela de aportes</dt>
                <dd>
                  <PendingBadge>No habilitada</PendingBadge>
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section className="section section--paper" aria-labelledby="cifras-templo">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Transparencia</p>
              <h2 id="cifras-templo">Presupuesto, ejecutado y recaudo.</h2>
            </div>
            <p>
              Son tres conceptos distintos. El valor ejecutado de una obra no se
              convierte en porcentaje de donaciones recaudadas, y ninguna cifra
              se publica sin aprobación.
            </p>
          </div>
          <CampaignFigures />
        </div>
      </section>

      <section className="section" aria-labelledby="etapas-titulo">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Cómo avanzamos</p>
              <h2 id="etapas-titulo">Un proceso por etapas.</h2>
            </div>
            <p>
              La campaña se habilitará solo después de completar verificaciones
              técnicas y financieras independientes.
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
            <h3>Planos, renders y avances de obra</h3>
            <p>{templeProject.note}</p>
          </div>
        </div>
      </section>

      <section className="section section--paper" aria-labelledby="aportes-templo">
        <div className="container split-layout">
          <DonationDisabledPanel headingLevel={2} />
          <div>
            <p className="eyebrow">Antes de recibir aportes</p>
            <h2 id="aportes-templo">La confianza se verifica.</h2>
            <p>
              Para habilitar donaciones se deberá confirmar el titular legal y
              beneficiario por un canal independiente, configurar la pasarela
              fuera del contenido editable y probar la conciliación de eventos.
            </p>
            <ul className="check-list">
              <li>El navegador nunca decidirá el destinatario del dinero.</li>
              <li>El retorno del navegador no se tomará como pago confirmado.</li>
              <li>Los cambios de destino exigirán dos aprobaciones distintas.</li>
              <li>Los eventos repetidos o fuera de orden se reconciliarán.</li>
            </ul>
            <Link className="text-link" href="/visitanos">
              Consultar canales oficiales
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
