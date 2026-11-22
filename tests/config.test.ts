import assert from "node:assert/strict";
import test from "node:test";

import {
  ConfigurationError,
  parseServerEnv,
} from "../modules/config/schema.ts";

test("la configuración arranca en modo demostración sin credenciales", () => {
  const config = parseServerEnv({});

  assert.equal(config.appEnv, "demo");
  assert.equal(config.isDemo, true);
  assert.equal(config.databaseUrl, null);
  assert.equal(config.paymentsRequested, false);
});

test("rechaza un APP_ENV desconocido", () => {
  assert.throws(
    () => parseServerEnv({ APP_ENV: "staging" }),
    ConfigurationError,
  );
});

test("rechaza una DATABASE_URL que no sea PostgreSQL", () => {
  assert.throws(
    () => parseServerEnv({ DATABASE_URL: "mysql://usuario:clave@host/base" }),
    ConfigurationError,
  );
});

test("el error de URL no revela el valor recibido", () => {
  const secret = "postgresql://usuario:clave-super-secreta@";

  assert.throws(
    () => parseServerEnv({ DATABASE_URL: secret }),
    (error: unknown) => {
      assert.ok(error instanceof ConfigurationError);
      assert.ok(!error.message.includes("clave-super-secreta"));
      return true;
    },
  );
});

test("producción exige DATABASE_URL", () => {
  assert.throws(
    () => parseServerEnv({ APP_ENV: "production" }),
    /DATABASE_URL/,
  );
});

test("producción acepta una URL PostgreSQL válida", () => {
  const databaseUrl =
    "postgresql://usuario:clave@127.0.0.1:5432/casa_de_dios_pruebas";
  const config = parseServerEnv({
    APP_ENV: "production",
    DATABASE_URL: databaseUrl,
  });

  assert.equal(config.appEnv, "production");
  assert.equal(config.isDemo, false);
  assert.equal(config.databaseUrl, databaseUrl);
});

test("PAYMENTS_ENABLED solo se interpreta con el valor exacto true", () => {
  assert.equal(
    parseServerEnv({ PAYMENTS_ENABLED: "true" }).paymentsRequested,
    true,
  );
  assert.equal(
    parseServerEnv({ PAYMENTS_ENABLED: "TRUE" }).paymentsRequested,
    false,
  );
  assert.equal(
    parseServerEnv({ PAYMENTS_ENABLED: "1" }).paymentsRequested,
    false,
  );
});
