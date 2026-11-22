import { getServerConfig } from "@/modules/server/config";

export function EnvironmentNotice() {
  const config = getServerConfig();

  if (!config.isDemo) {
    return null;
  }

  return (
    <p className="environment-notice">
      Base en preparación · Contenido de demostración · Aportes deshabilitados
    </p>
  );
}
