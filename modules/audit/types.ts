/**
 * Contratos de auditoría. La escritura real todavía no está implementada; la
 * migración SQL define una tabla append-only. No se deben registrar secretos,
 * datos de tarjetas ni cuerpos completos de pagos.
 */

export const AUDIT_OUTCOMES = ["success", "denied", "error"] as const;

export type AuditOutcome = (typeof AUDIT_OUTCOMES)[number];

export const AUDIT_ACTIONS = [
  "content.draft.created",
  "content.published",
  "media.permission.updated",
  "user.role.granted",
  "user.role.revoked",
  "donation.destination.proposed",
  "donation.destination.approved",
  "donation.reference.created",
  "donation.event.processed",
  "config.changed",
] as const;

export type AuditAction = (typeof AUDIT_ACTIONS)[number];

export type AuditActorType = "user" | "system" | "integration";

export interface AuditEventInput {
  readonly actorType: AuditActorType;
  readonly actorUserId: string | null;
  readonly action: AuditAction;
  readonly entityType: string;
  readonly entityId: string | null;
  readonly outcome: AuditOutcome;
  readonly requestId: string | null;
  /** Valores mínimos y no sensibles; nunca secretos ni datos de pago completos. */
  readonly metadata: Readonly<Record<string, string | number | boolean | null>>;
}
