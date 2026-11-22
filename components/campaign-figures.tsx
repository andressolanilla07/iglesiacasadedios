import { campaignSummary } from "@/modules/temple-project/demo";
import { PendingBadge } from "./pending-badge";

const figures = [
  campaignSummary.figures.budget,
  campaignSummary.figures.executed,
  campaignSummary.figures.raised,
];

export function CampaignFigures() {
  return (
    <div className="table-wrap">
      <table>
        <caption>
          Cifras de la campaña. Presupuesto, valor ejecutado y donaciones
          recaudadas se presentan por separado y todavía no están confirmados.
        </caption>
        <thead>
          <tr>
            <th scope="col">Concepto</th>
            <th scope="col">Estado</th>
            <th scope="col">Alcance</th>
          </tr>
        </thead>
        <tbody>
          {figures.map((figure) => (
            <tr key={figure.label}>
              <th scope="row">{figure.label}</th>
              <td>
                <PendingBadge />
              </td>
              <td>{figure.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
