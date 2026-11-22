import assert from "node:assert/strict";
import test from "node:test";

import {
  can,
  canApproveFinancialChange,
  ROLES,
  type Role,
} from "../modules/users/roles.ts";

test("un editor prepara contenido pero no publica", () => {
  assert.equal(can("editor", "content.edit"), true);
  assert.equal(can("editor", "content.publish"), false);
  assert.equal(can("editor", "donation.destination.propose"), false);
});

test("el revisor institucional puede publicar contenido revisado", () => {
  assert.equal(can("institutional_reviewer", "content.review"), true);
  assert.equal(can("institutional_reviewer", "content.publish"), true);
});

test("el responsable financiero no aprueba su propia solicitud", () => {
  assert.equal(can("finance_manager", "donation.destination.propose"), true);
  assert.equal(
    canApproveFinancialChange("finance_manager", {
      requesterId: "persona-1",
      approverId: "persona-2",
    }),
    false,
  );
});

test("una persona distinta con rol aprobador sí puede aprobar", () => {
  assert.equal(
    canApproveFinancialChange("finance_approver", {
      requesterId: "persona-1",
      approverId: "persona-2",
    }),
    true,
  );
});

test("la misma persona no puede solicitar y aprobar", () => {
  assert.equal(
    canApproveFinancialChange("finance_approver", {
      requesterId: "persona-1",
      approverId: "persona-1",
    }),
    false,
  );
});

test("el administrador técnico no aprueba cambios financieros", () => {
  assert.equal(can("technical_admin", "users.manage"), true);
  assert.equal(can("technical_admin", "donation.destination.approve"), false);
});

test("ningún rol concentra proponer y aprobar un cambio de destino", () => {
  for (const role of ROLES as readonly Role[]) {
    const canPropose = can(role, "donation.destination.propose");
    const canApprove = can(role, "donation.destination.approve");
    assert.equal(
      canPropose && canApprove,
      false,
      `El rol ${role} no debe concentrar ambas acciones`,
    );
  }
});
