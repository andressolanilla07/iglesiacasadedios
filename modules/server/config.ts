import "server-only";

import {
  parseServerEnv,
  type ServerConfig,
} from "../config/schema";

let cachedConfig: ServerConfig | undefined;

/**
 * Única lectura de `process.env` para configuración de la aplicación.
 * El paquete `server-only` impide que este módulo entre en un componente cliente.
 */
export function getServerConfig(): ServerConfig {
  cachedConfig ??= parseServerEnv(process.env);
  return cachedConfig;
}
