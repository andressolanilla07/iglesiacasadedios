/**
 * Módulo del proyecto del templo. Presupuesto, ejecutado y diferencia fueron
 * confirmados por Andrés el 24 de noviembre de 2026. La fecha de corte contable
 * y las donaciones recaudadas siguen pendientes.
 */

export interface PendingFigure {
  readonly status: "pending";
  readonly label: string;
  readonly note: string;
}

export interface ConfirmedFigure {
  readonly status: "confirmed";
  readonly label: string;
  readonly amount: number;
  readonly currency: "COP";
  readonly note: string;
}

export interface CampaignSummary {
  readonly status: "preparation";
  readonly headline: string;
  readonly lead: string;
  readonly currencyStatus: "confirmed";
  readonly confirmationDate: "2026-11-24";
  readonly source: string;
  readonly cutoffDate: null;
  readonly figures: {
    readonly budget: ConfirmedFigure;
    readonly executed: ConfirmedFigure;
    readonly difference: ConfirmedFigure;
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
  readonly documentsStatus: "reference";
  readonly note: string;
}

export const campaignSummary: CampaignSummary = {
  status: "preparation",
  headline: "Preparando una campaña clara y verificable",
  lead: "El nuevo templo es la prioridad de esta etapa. Antes de habilitar aportes se confirmarán el titular beneficiario, la pasarela y la forma de conciliar cada pago.",
  currencyStatus: "confirmed",
  confirmationDate: "2026-11-24",
  source: "Confirmación directa de Andrés del 24 de noviembre de 2026.",
  cutoffDate: null,
  figures: {
    budget: {
      status: "confirmed",
      label: "Presupuesto total",
      amount: 1_099_873_000,
      currency: "COP",
      note: "Valor total confirmado para la presentación pública del proyecto.",
    },
    executed: {
      status: "confirmed",
      label: "Ejecutado reportado",
      amount: 172_500_000,
      currency: "COP",
      note: "No se confunde con las donaciones recaudadas.",
    },
    difference: {
      status: "confirmed",
      label: "Diferencia presupuestal",
      amount: 927_373_000,
      currency: "COP",
      note: "Presupuesto menos ejecutado; no representa dinero disponible ni saldo de caja.",
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
        "Presentar visualizaciones conceptuales, referencias técnicas y cifras confirmadas, distinguiendo lo aprobado de lo pendiente.",
      status: "in_progress",
    },
    {
      id: "habilitar",
      title: "Habilitar aportes",
      description:
        "Activar una pasarela verificada, con conciliación en servidor y revisión independiente antes de recibir dinero.",
      status: "planned",
    },
  ],
  documentsStatus: "reference",
  note: "Las visualizaciones publicadas describen una propuesta arquitectónica. Los planos de junio de 2026 son referencias con ajustes pendientes y no demuestran licencias, aforo definitivo, accesibilidad certificada ni avance de construcción.",
};
