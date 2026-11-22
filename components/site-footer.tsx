import Link from "next/link";

import { getSiteContent } from "@/modules/content/repository";

export function SiteFooter() {
  const content = getSiteContent();
  const { address, services, identity } = content;

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-identity">
          <div className="footer-brand-row">
            {/* PNG elegido por Andrés; el nombre institucional permanece como texto. */}
            <img
              className="footer-logo"
              src="/brand/logo-oficial.png"
              width={1197}
              height={1314}
              alt=""
            />
            <p className="footer-brand">Casa de Dios</p>
          </div>
          <p className="footer-text">
            {identity.denomination}
            <br />
            {identity.city}
          </p>
          <p className="footer-note">
            Sitio en preparación. La imagen del hero sigue como marcador hasta
            incorporar el activo específico autorizado.
          </p>
        </div>

        <div>
          <h2 className="footer-heading">Visítanos</h2>
          <address className="footer-text">
            {address.line1}
            <br />
            {address.line2}
            <br />
            {address.city}, {address.region}
            <br />
            {address.country}
          </address>
          <p className="footer-note">Mapa oficial pendiente de validación.</p>
        </div>

        <div>
          <h2 className="footer-heading">Horarios</h2>
          <ul className="footer-list">
            {services.map((service) => (
              <li key={service.day}>
                <strong>{service.day}</strong>
                <span>
                  {service.start} – {service.end}
                </span>
              </li>
            ))}
          </ul>
          <p className="footer-note">
            Teléfono, correo y WhatsApp institucionales pendientes de
            confirmación.
          </p>
        </div>

        <div>
          <h2 className="footer-heading">Explorar</h2>
          <ul className="footer-list footer-links">
            {content.pages.map((page) => (
              <li key={page.slug}>
                <Link href={page.slug}>{page.navLabel}</Link>
              </li>
            ))}
            <li>
              <Link className="footer-donate" href="/nuevo-templo#aportes-templo">
                Aportar al templo
              </Link>
            </li>
          </ul>
          <p className="footer-note">
            El acceso para aportar es informativo: la pasarela de pagos sigue
            deshabilitada.
          </p>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>
          Contenido de demostración sujeto a revisión editorial. Aportes no
          habilitados.
        </p>
        <p>© {new Date().getFullYear()} Iglesia Casa de Dios · Jamundí</p>
      </div>
    </footer>
  );
}
