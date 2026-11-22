/**
 * Validación pura de configuración del servidor.
 *
 * Este archivo no lee `process.env` ni importa secretos: recibe una fuente de
 * variables y devuelve una configuración tipada. La lectura real del entorno
 * ocurre únicamente en `modules/server/config.ts`, marcado como server-only.
 */

export const APP_ENVIRONMENTS = ["demo", "development", "production"] as const;

export type AppEnvironment = (typeof APP_ENVIRONMENTS)[number];

export type EnvSource = Readonly<Record<string, string | undefined>>;

export interface ServerConfig {
  readonly appEnv: AppEnvironment;
  /** Se conserva solo en el servidor. Nunca debe enviarse al navegador. */
  readonly databaseUrl: string | null;
  readonly paymentsRequested: boolean;
  readonly isDemo: boolean;
}

export class ConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ConfigurationError";
  }
}

const POSTGRES_PROTOCOLS = new Set(["postgres:", "postgresql:"]);

function isValidPostgresUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    return (
      POSTGRES_PROTOCOLS.has(parsed.protocol) &&
      parsed.hostname.length > 0 &&
      parsed.pathname.length > 1
    );
  } catch {
    return false;
  }
}

export function parseServerEnv(source: EnvSource): ServerConfig {
  const rawAppEnv = source.APP_ENV?.trim() || "demo";

  if (!(APP_ENVIRONMENTS as readonly string[]).includes(rawAppEnv)) {
    throw new ConfigurationError(
      `APP_ENV no es válido. Valores admitidos: ${APP_ENVIRONMENTS.join(", ")}.`,
    );
  }

  const appEnv = rawAppEnv as AppEnvironment;
  const rawDatabaseUrl = source.DATABASE_URL?.trim() ?? "";

  if (rawDatabaseUrl !== "" && !isValidPostgresUrl(rawDatabaseUrl)) {
    throw new ConfigurationError(
      "DATABASE_URL debe ser una URL PostgreSQL válida (postgres:// o postgresql://).",
    );
  }

  if (appEnv === "production" && rawDatabaseUrl === "") {
    throw new ConfigurationError(
      "APP_ENV=production requiere DATABASE_URL. La aplicación no arranca en producción sin una base configurada.",
    );
  }

  return Object.freeze({
    appEnv,
    databaseUrl: rawDatabaseUrl === "" ? null : rawDatabaseUrl,
    paymentsRequested: source.PAYMENTS_ENABLED === "true",
    isDemo: appEnv === "demo",
  });
}
