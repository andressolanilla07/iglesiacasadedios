import type { Metadata } from "next";
import Link from "next/link";

import { PageIntro } from "@/components/page-intro";
import { PendingBadge } from "@/components/pending-badge";
import { VisitCard } from "@/components/visit-card";
import { getSiteContent } from "@/modules/content/repository";

export const metadata: Metadata = {
  title: "Visítanos y contacto",
  description:
    "Dirección y horarios de la Iglesia Casa de Dios en Jamundí, con el estado de los canales oficiales de contacto.",
};

export default function VisitanosPage() {
  const content = getSiteContent();

  return (
    <>
      <PageIntro
        eyebrow="Visítanos y contacto"
        title={
          <>
            Nos alegrará
            <br />
            <em>conocerte.</em>
          </>
        }
        lead="La dirección y los horarios de los servicios están confirmados. Los canales de contacto y el mapa siguen en verificación para evitar datos equivocados."
      />

      <section className="section" aria-labelledby="visita-titulo">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Encuéntranos</p>
              <h2 id="visita-titulo">Un lugar en Jamundí.</h2>
            </div>
            <p>
              Puedes visitarnos en los servicios confirmados. La accesibilidad
              del lugar y el enlace de mapa se publicarán después de verificarlos.
            </p>
          </div>
          <VisitCard />
        </div>
      </section>

      <section
        className="section section--paper"
        aria-labelledby="canales-titulo"
      >
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Canales oficiales</p>
              <h2 id="canales-titulo">Sin números provisionales.</h2>
            </div>
            <p>
              No se publican teléfonos, correos, WhatsApp, redes ni enlaces de
              mapa sin confirmación. Esta tabla muestra el estado real.
            </p>
          </div>

          <div className="table-wrap">
            <table>
              <caption>
                Estado de los canales de comunicación de la iglesia. Ninguno está
                habilitado en esta entrega.
              </caption>
              <thead>
                <tr>
                  <th scope="col">Canal</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Detalle</th>
                </tr>
              </thead>
              <tbody>
                {content.contactChannels.map((channel) => (
                  <tr key={channel.key}>
                    <th scope="row">{channel.label}</th>
                    <td>
                      <PendingBadge>Pendiente</PendingBadge>
                    </td>
                    <td>{channel.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="note-panel">
            <h3>Sin formularios en esta fase</h3>
            <p>
              Consultas a la iglesia y solicitudes de acompañamiento pastoral
              serán dos vías distintas. Antes de habilitarlas se definirán
              consentimiento, acceso, retención y eliminación de datos. Hoy no se
              recoge ni se envía información personal.
            </p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="comunicacion-titulo">
        <div className="container split-layout">
          <div>
            <p className="eyebrow">Dos vías previstas</p>
            <h2 id="comunicacion-titulo">Consultas y acompañamiento.</h2>
            <p>
              La iglesia quiere distinguir las preguntas generales de las
              solicitudes de acompañamiento pastoral. Ambas vías permanecen
              inactivas hasta contar con canales oficiales y un tratamiento de
              datos revisado.
            </p>
            <p>
              <Link className="text-link" href="/nuestro-pastor">
                Conocer el espacio pastoral
              </Link>
            </p>
          </div>

          <aside className="status-card" aria-labelledby="estado-canales">
            <p className="eyebrow">Estado</p>
            <h2 id="estado-canales">Nada se envía todavía.</h2>
            <ul className="check-list check-list--muted">
              <li>No hay formulario de contacto.</li>
              <li>No hay solicitudes pastorales almacenadas.</li>
              <li>No hay peticiones de oración enviadas.</li>
              <li>No hay enlaces externos provisionales.</li>
            </ul>
            <p className="fine-print">
              Los datos de dirección y horarios provienen de la información
              aportada para esta base. El resto está pendiente de confirmación.
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
