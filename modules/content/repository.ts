import "server-only";

import { demoContent } from "./demo-content";
import type { SiteContent } from "./types";

/**
 * Punto de acceso al contenido público. En esta entrega devuelve únicamente
 * contenido de demostración. La futura implementación con PostgreSQL deberá
 * leer solo revisiones publicadas y aprobadas.
 */
export function getSiteContent(): SiteContent {
  return demoContent;
}
