import "server-only";

import { getServerConfig } from "../server/config";
import {
  getDonationAvailability,
  type DonationAvailability,
} from "./policy";

/**
 * Estado público de aportes para componentes de servidor. No expone
 * credenciales ni detalles internos de configuración.
 */
export function getPublicDonationAvailability(): DonationAvailability {
  return getDonationAvailability({
    paymentsRequested: getServerConfig().paymentsRequested,
  });
}
