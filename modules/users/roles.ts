/**
 * Matriz de roles y permisos. No implementa autenticación ni sesiones: define
 * el contrato que el servidor deberá comprobar en cada operación protegida.
 */

export const ROLES = [
  "editor",
  "institutional_reviewer",
  "finance_manager",
  "finance_approver",
  "technical_admin",
] as const;

export type Role = (typeof ROLES)[number];

export const PERMISSIONS = [
  "content.edit",
  "content.review",
  "content.publish",
  "media.approve",
  "donation.destination.read",
  "donation.destination.propose",
  "donation.destination.approve",
  "donation.reconciliation.read",
  "users.manage",
  "audit.read",
  "infrastructure.manage",
] as const;

export type Permission = (typeof PERMISSIONS)[number];

const ROLE_PERMISSIONS: Readonly<Record<Role, readonly Permission[]>> = {
  editor: ["content.edit"],
  institutional_reviewer: [
    "content.edit",
    "content.review",
    "content.publish",
    "media.approve",
  ],
  finance_manager: [
    "donation.destination.read",
    "donation.destination.propose",
    "donation.reconciliation.read",
  ],
  finance_approver: [
    "donation.destination.read",
    "donation.destination.approve",
    "donation.reconciliation.read",
    "audit.read",
  ],
  technical_admin: ["users.manage", "audit.read", "infrastructure.manage"],
};

export function can(role: Role, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role].includes(permission);
}

export interface FinancialChangeApproval {
  readonly requesterId: string;
  readonly approverId: string;
}

/**
 * Un cambio de destino financiero exige dos personas distintas y el rol de
 * aprobador. La misma persona no puede solicitar y aprobar.
 */
export function canApproveFinancialChange(
  role: Role,
  approval: FinancialChangeApproval,
): boolean {
  if (approval.requesterId === approval.approverId) {
    return false;
  }

  return can(role, "donation.destination.approve");
}
