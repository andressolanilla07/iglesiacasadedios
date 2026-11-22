import type { ReactNode } from "react";

export function PendingBadge({
  children = "Pendiente de confirmación",
}: {
  readonly children?: ReactNode;
}) {
  return <span className="pending-badge">{children}</span>;
}
