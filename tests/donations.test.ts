import assert from "node:assert/strict";
import test from "node:test";

import {
  DONATION_GATEWAY_IMPLEMENTED,
  getDonationAvailability,
  isCheckoutEnabled,
} from "../modules/donations/policy.ts";

test("el checkout no está implementado", () => {
  assert.equal(DONATION_GATEWAY_IMPLEMENTED, false);
  assert.equal(isCheckoutEnabled(), false);
});

test("los aportes están deshabilitados sin la bandera de pagos", () => {
  const availability = getDonationAvailability({ paymentsRequested: false });

  assert.equal(availability.enabled, false);
  assert.equal(availability.code, "gateway_not_implemented");
  assert.match(availability.reason, /no procesa pagos/i);
});

test("PAYMENTS_ENABLED no habilita cobros por sí solo", () => {
  const availability = getDonationAvailability({ paymentsRequested: true });

  assert.equal(availability.enabled, false);
  assert.equal(availability.code, "payments_flag_ignored");
  assert.match(availability.reason, /no activa cobros/i);
});

test("la política no expone una vía alternativa de activación", () => {
  const availability = getDonationAvailability({ paymentsRequested: true });
  const serialized = JSON.stringify(availability);

  assert.ok(!/"enabled"\s*:\s*true/.test(serialized));
  assert.equal(availability.enabled, false);
});
