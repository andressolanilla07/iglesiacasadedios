import type { Metadata } from "next";
import Link from "next/link";

import { PageIntro } from "@/components/page-intro";
import { PendingBadge } from "@/components/pending-badge";
import { getSiteContent } from "@/modules/content/repository";

export const metadata: Metadata = {
  title: "Vida en comunidad",
  description:
    "Oración, acompañamiento, grupos, evangelización y servicio en la Iglesia Casa de Dios, Jamundí.",
};

const areas = [
  {
    number: "01",
    title: "Oración",
    description:
      "Un espacio para presentar necesidades y acompañarnos en la fe. La forma de participar se confirmará con la iglesia.",
  },
  {
    number: "02",
    title: "Acompañamiento pastoral",
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

export default function VidaEnComunidadPage() {
  const content = getSiteContent();

  return (
    <>
      <PageIntro
        eyebrow="Vida en comunidad"
        title={
          <>
            Una comunidad
            <br />
            <em>que se acompaña.</em>
          </>
        }
        lead="La construcción es parte del camino. La oración, el acompañamiento, los grupos y el servicio dan sentido a lo que hacemos juntos."
      />

      <section className="section" aria-labelledby="areas-titulo">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Caminamos contigo</p>
              <h2 id="areas-titulo">Una iglesia para vivir la fe.</h2>
            </div>
            <p>
              Estas áreas describen la vida que la iglesia quiere compartir. No
              se presentan actividades, testimonios ni grupos como si ya
              estuvieran confirmados.
            </p>
          </div>

          <div className="card-grid card-grid--two">
            {areas.map((area) => (
              <article className="card card--feature" key={area.number}>
                <p className="card-number">{area.number}</p>
                <h3>{area.title}</h3>
                <p>{area.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="section section--paper"
        aria-labelledby="grupos-titulo"
      >
        <div className="container split-layout">
          <div>
            <p className="eyebrow">Grupos y actividades</p>
            <h2 id="grupos-titulo">Sin nombres provisionales.</h2>
            <p>{content.community.note}</p>
            <p>
              Cuando la iglesia confirme sus grupos y ministerios, este espacio
              reunirá su propósito, responsables y forma de participación. La
              publicación requerirá revisión institucional.
            </p>
            <PendingBadge>Información pendiente de confirmación</PendingBadge>
          </div>

          <aside className="schedule-card" aria-labelledby="encuentros-titulo">
            <p className="eyebrow">Encuentros</p>
            <h2 id="encuentros-titulo">Horarios confirmados</h2>
            <ul className="schedule-list">
              {content.services.map((service) => (
                <li key={service.day}>
                  <strong>{service.day}</strong>
                  <span>
                    {service.start} – {service.end}
                  </span>
                  <small>{service.label}</small>
                </li>
              ))}
            </ul>
            <Link className="text-link" href="/visitanos">
              Ver dirección y cómo llegar
            </Link>
          </aside>
        </div>
      </section>

      <section className="section" aria-labelledby="familia-titulo">
        <div className="container narrow">
          <p className="eyebrow">Una familia unida</p>
          <h2 id="familia-titulo">
            Queremos crecer en fe,
            <br />
            <em>servicio y cercanía.</em>
          </h2>
          <p>
            La iglesia se describe como una familia unida. Este sitio quiere
            reflejar ese deseo con información clara, canales verificados y
            espacios que permitan conocerse antes de participar.
          </p>
          <p className="section-link">
            <Link className="text-link" href="/nuestro-pastor">
              Conocer el espacio de acompañamiento pastoral
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
