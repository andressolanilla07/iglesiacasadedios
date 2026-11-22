/**
 * Política pública de aportes. Es deliberadamente conservadora: en esta
 * entrega no existe pasarela, titular verificado ni conciliación, así que el
 * checkout permanece deshabilitado incluso si alguien define PAYMENTS_ENABLED.
 */

export const DONATION_GATEWAY_IMPLEMENTED = false;

export type DonationDisabledCode =
  | "gateway_not_implemented"
  | "payments_flag_ignored";

export interface DonationAvailability {
  readonly enabled: false;
  readonly code: DonationDisabledCode;
  readonly title: string;
  readonly reason: string;
}

export interface DonationAvailabilityInput {
  readonly paymentsRequested: boolean;
}

export function getDonationAvailability(
  input: DonationAvailabilityInput,
): DonationAvailability {
  if (input.paymentsRequested) {
    return Object.freeze({
      enabled: false,
      code: "payments_flag_ignored",
      title: "Aportes no habilitados",
      reason:
        "PAYMENTS_ENABLED no activa cobros: no existe una pasarela verificada ni un flujo de conciliación implementado. Esta entrega no procesa pagos ni recoge datos.",
    });
  }

  return Object.freeze({
    enabled: false,
    code: "gateway_not_implemented",
    title: "Aportes no habilitados",
    reason:
      "La pasarela, el titular beneficiario y la conciliación todavía no han sido verificados. Esta entrega no procesa pagos ni recoge datos.",
  });
}

/**
 * Contrato de capacidad. Debe seguir devolviendo `false` hasta completar la
 * verificación previa a recibir aportes descrita en CDD-007.
 */
export function isCheckoutEnabled(): false {
  return DONATION_GATEWAY_IMPLEMENTED;
}

export interface DonationIntentContract {
  /** Importe como texto decimal validado en servidor; nunca un número flotante. */
  readonly amount: string;
  readonly currency: "COP";
  readonly publicReference: string;
}

export interface DonationCheckoutSession {
  readonly providerReference: string;
  readonly redirectUrl: string;
}

export interface VerifiedDonationEvent {
  readonly providerEventId: string;
  readonly reference: string;
  readonly amount: string;
  readonly currency: string;
  readonly status: "pending" | "approved" | "rejected";
}

/**
 * Contrato previsto para una integración futura. No tiene implementación en
 * esta entrega y no debe conectarse a una pasarela real sin revisión.
 */
export interface DonationGatewayContract {
  createCheckout(
    intent: DonationIntentContract,
  ): Promise<DonationCheckoutSession>;
  verifyEvent(
    rawBody: Uint8Array,
    signature: string,
  ): Promise<VerifiedDonationEvent>;
}
