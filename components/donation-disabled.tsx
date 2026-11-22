import { getPublicDonationAvailability } from "@/modules/donations/server";

export function DonationDisabledPanel({
  headingLevel = 2,
}: {
  readonly headingLevel?: 2 | 3;
}) {
  const donation = getPublicDonationAvailability();
  const Heading = headingLevel === 3 ? "h3" : "h2";

  return (
    <aside className="donation-panel" aria-labelledby="aportes-estado">
      <p className="eyebrow">Aportes</p>
      <Heading id="aportes-estado">{donation.title}</Heading>
      <p>{donation.reason}</p>
      <ul className="check-list check-list--muted">
        <li>No se solicitan datos personales ni de tarjetas.</li>
        <li>No se muestran cuentas, códigos QR ni enlaces de pago.</li>
        <li>No se simula un pago exitoso.</li>
      </ul>
      <p className="fine-print">
        El acceso para aportar seguirá visible como informativo hasta completar
        la verificación del titular y la revisión independiente.
      </p>
    </aside>
  );
}
