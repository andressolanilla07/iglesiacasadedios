/**
 * Módulo del proyecto del templo. Las cifras son deliberadamente pendientes:
 * no se publican importes, avances ni recaudos sin material vigente y
 * autorización de la iglesia.
 */

export interface PendingFigure {
  readonly status: "pending";
  readonly label: string;
  readonly note: string;
}

export interface CampaignSummary {
  readonly status: "preparation";
  readonly headline: string;
  readonly lead: string;
  readonly currencyStatus: "pending";
  readonly cutoffDate: null;
  readonly figures: {
    readonly budget: PendingFigure;
    readonly executed: PendingFigure;
    readonly raised: PendingFigure;
  };
}

export interface ProjectStage {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly status: "planned" | "in_progress";
}

export interface TempleProject {
  readonly status: "preparation";
  readonly stages: readonly ProjectStage[];
  readonly documentsStatus: "pending";
  readonly note: string;
}

export const campaignSummary: CampaignSummary = {
  status: "preparation",
  headline: "Preparando una campaña clara y verificable",
  lead: "El nuevo templo es la prioridad de esta etapa. Antes de habilitar aportes se confirmarán el titular beneficiario, la pasarela y la forma de conciliar cada pago.",
  currencyStatus: "pending",
  cutoffDate: null,
  figures: {
    budget: {
      status: "pending",
      label: "Presupuesto del proyecto",
      note: "Pendiente de material vigente y autorización de publicación.",
    },
    executed: {
      status: "pending",
      label: "Valor ejecutado de la obra",
      note: "No se confunde con las donaciones recaudadas.",
    },
    raised: {
      status: "pending",
      label: "Donaciones recaudadas",
      note: "Solo se publicará a partir de registros conciliados y aprobados.",
    },
  },
};

export const templeProject: TempleProject = {
  status: "preparation",
  stages: [
    {
      id: "presentar",
      title: "Presentar el proyecto",
      description:
        "Explicar el propósito del nuevo templo y el lugar que ocupa dentro de la vida de la iglesia.",
      status: "in_progress",
    },
    {
      id: "verificar",
      title: "Publicar información verificada",
      description:
        "Incorporar planos, renders, avances y cifras autorizadas, con fecha de corte y responsable.",
      status: "planned",
    },
    {
      id: "habilitar",
      title: "Habilitar aportes",
      description:
        "Activar una pasarela verificada, con conciliación en servidor y revisión independiente antes de recibir dinero.",
      status: "planned",
    },
  ],
  documentsStatus: "pending",
  note: "Planos, renders, fotografías de avance y documentos técnicos permanecen pendientes de selección y autorización. No se presentan como publicados.",
};
