import type { Metadata } from "next";
import Link from "next/link";

import { CampaignFigures } from "@/components/campaign-figures";
import { DonationDisabledPanel } from "@/components/donation-disabled";
import { PageIntro } from "@/components/page-intro";
import { PendingBadge } from "@/components/pending-badge";
import { TempleProjectExplorer } from "@/components/temple-project-explorer";
import {
  campaignSummary,
  templeProject,
} from "@/modules/temple-project/demo";
import { projectCredit } from "@/modules/temple-project/project-content";

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
              El diseño arquitectónico y tres cifras generales ya están
              incorporados para revisión visual. La pasarela, el titular
              beneficiario y las donaciones recaudadas continúan sin publicar o
              verificar.
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
                <dd>COP · confirmada</dd>
              </div>
              <div>
                <dt>Confirmación de cifras</dt>
                <dd>24 de noviembre de 2026</dd>
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

      <section
        className="section section--paper project-tour-section"
        id="recorrido-niveles"
        aria-labelledby="recorrido-titulo"
      >
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Recorrido por niveles</p>
              <h2 id="recorrido-titulo">
                Espacios pensados
                <br />
                <em>para servir juntos.</em>
              </h2>
            </div>
            <div>
              <p>
                Explora la propuesta desde el auditorio del semisótano hasta el
                altillo y su terraza. No hay reproducción automática.
              </p>
              <p className="fine-print">{projectCredit}</p>
            </div>
          </div>
          <TempleProjectExplorer />
        </div>
      </section>

      <section className="section" aria-labelledby="cifras-templo">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Transparencia</p>
              <h2 id="cifras-templo">Presupuesto, ejecutado y recaudo.</h2>
            </div>
            <p>
              Son conceptos distintos. La diferencia presupuestal no representa
              dinero disponible y el valor ejecutado no se convierte en
              porcentaje de donaciones recaudadas.
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
            <h3>Referencias, no evidencia de obra ejecutada</h3>
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
