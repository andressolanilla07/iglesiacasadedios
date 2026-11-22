import Link from "next/link";

import { getSiteContent } from "@/modules/content/repository";
import { PendingBadge } from "./pending-badge";

export function VisitCard() {
  const { address, services } = getSiteContent();

  return (
    <div className="visit-card">
      <div>
        <p className="eyebrow">Dirección</p>
        <address>
          {address.line1}
          <br />
          {address.line2}
          <br />
          {address.city}, {address.region}
          <br />
          {address.country}
        </address>
        <p className="pending-line">
          <PendingBadge>Mapa pendiente de validación</PendingBadge>
        </p>
      </div>

      <div>
        <p className="eyebrow">Horarios confirmados</p>
        <ul className="schedule-list">
          {services.map((service) => (
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
          Ver información de visita
        </Link>
      </div>
    </div>
  );
}
