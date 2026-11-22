import type { Metadata } from "next";
import Link from "next/link";

import { PageIntro } from "@/components/page-intro";
import { PendingBadge } from "@/components/pending-badge";
import { getSiteContent } from "@/modules/content/repository";

export const metadata: Metadata = {
  title: "Nuestro pastor",
  description:
    "Espacio de acompañamiento pastoral de la Iglesia Casa de Dios en Jamundí.",
};

export default function NuestroPastorPage() {
  const content = getSiteContent();
  const pastor = content.pastor;

  return (
    <>
      <PageIntro
        eyebrow="Nuestro pastor"
        title={
          <>
            Una fe que se comparte.
            <br />
            <em>Un acompañamiento cercano.</em>
          </>
        }
        lead="La iglesia quiere acompañar a cada persona y familia en las distintas etapas de la vida. Este espacio reunirá el perfil pastoral y la forma de solicitar acompañamiento."
      />

      <section className="section" aria-labelledby="perfil-titulo">
        <div className="container split-layout">
          <div className="profile-placeholder" aria-hidden="true">
            <span>Perfil pastoral</span>
            <small>Fotografía y biografía por incorporar</small>
          </div>

          <div>
            <p className="eyebrow">Perfil pastoral</p>
            <h2 id="perfil-titulo">Información en revisión.</h2>
            <p>
              El nombre, la biografía, la fotografía y la continuidad del perfil
              pastoral se están confirmando con la iglesia. No se publican como
              datos definitivos ni se ofrece un contacto directo todavía.
            </p>
            <p>{pastor.note}</p>
            <div className="pending-stack">
              <PendingBadge>Nombre y biografía pendientes</PendingBadge>
              <PendingBadge>Fotografía autorizada pendiente</PendingBadge>
              <PendingBadge>Canal de contacto pendiente</PendingBadge>
            </div>
          </div>
        </div>
      </section>

      <section
        className="section section--paper"
        aria-labelledby="acompanamiento-titulo"
      >
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Dos caminos de comunicación</p>
              <h2 id="acompanamiento-titulo">
                Consultas y acompañamiento.
              </h2>
            </div>
            <p>
              La iglesia prevé dos vías distintas. Ninguna está habilitada en esta
              entrega: no hay formularios, envíos ni almacenamiento de datos
              personales.
            </p>
          </div>

          <div className="card-grid card-grid--two">
            <article className="card">
              <p className="card-number">01</p>
              <h3>Consultas a la iglesia</h3>
              <p>
                Preguntas sobre reuniones, visita, grupos o la campaña del nuevo
                templo.
              </p>
              <PendingBadge>Canal oficial pendiente</PendingBadge>
            </article>

            <article className="card">
              <p className="card-number">02</p>
              <h3>Solicitud de acompañamiento pastoral</h3>
              <p>
                Un espacio de escucha y orientación para situaciones personales o
                familiares.
              </p>
              <PendingBadge>Canal oficial pendiente</PendingBadge>
            </article>
          </div>

          <div className="note-panel">
            <h3>Privacidad antes de habilitar</h3>
            <p>
              Las solicitudes pastorales pueden contener información íntima. Antes
              de recibirlas se definirán consentimiento, acceso, retención y
              eliminación. Por ahora solo se ofrece información pública y no se
              recoge ningún dato.
            </p>
            <Link className="text-link" href="/visitanos">
              Ver dirección y horarios confirmados
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
