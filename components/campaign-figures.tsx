import { campaignSummary } from "@/modules/temple-project/demo";
import { PendingBadge } from "./pending-badge";

const figures = [
  campaignSummary.figures.budget,
  campaignSummary.figures.executed,
  campaignSummary.figures.difference,
  campaignSummary.figures.raised,
];

function formatAmount(amount: number): string {
  return `$${new Intl.NumberFormat("es-CO", {
    maximumFractionDigits: 0,
  }).format(amount)} COP`;
}

export function CampaignFigures() {
  return (
    <div>
      <div className="table-wrap">
        <table>
          <caption>
            Presupuesto, valor ejecutado, diferencia presupuestal y donaciones
            recaudadas se presentan como conceptos separados.
          </caption>
          <thead>
            <tr>
              <th scope="col">Concepto</th>
              <th scope="col">Valor o estado</th>
              <th scope="col">Alcance</th>
            </tr>
          </thead>
          <tbody>
            {figures.map((figure) => (
              <tr key={figure.label}>
                <th scope="row">{figure.label}</th>
                <td>
                  {figure.status === "confirmed" ? (
                    <strong className="confirmed-amount">
                      {formatAmount(figure.amount)}
                    </strong>
                  ) : (
                    <PendingBadge>Pendiente de verificar</PendingBadge>
                  )}
                </td>
                <td>{figure.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="figure-source">
        Fuente: {campaignSummary.source} Esta fecha registra la confirmación y
        no equivale a una fecha de corte contable, que sigue pendiente.
      </p>
    </div>
  );
}
