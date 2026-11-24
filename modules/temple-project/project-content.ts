export interface ProjectImage {
  readonly src: `/${string}`;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
}

export interface ProjectLevel {
  readonly id: "semisotano" | "primer-piso" | "segundo-piso" | "altillo";
  readonly shortLabel: string;
  readonly title: string;
  readonly summary: string;
  readonly benefit: string;
  readonly image: ProjectImage;
}

export interface GalleryItem {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly image: ProjectImage;
}

export const projectCredit =
  "Diseño arquitectónico: Arq. Agustín Torres García";

export const projectLevels: readonly ProjectLevel[] = [
  {
    id: "semisotano",
    shortLabel: "Semisótano",
    title: "Auditorio y culto congregacional",
    summary:
      "Una propuesta de auditorio central para la predicación, la alabanza y los encuentros de toda la iglesia.",
    benefit:
      "Busca reunir a la congregación en un espacio común y apoyar la experiencia de culto con recursos audiovisuales.",
    image: {
      src: "/temple-project/semisotano-auditorio.webp",
      width: 1400,
      height: 788,
      alt: "Visualización conceptual del auditorio en el semisótano, con sillas orientadas hacia una tarima y una pantalla",
    },
  },
  {
    id: "primer-piso",
    shortLabel: "Primer piso",
    title: "Cafetería y encuentro comunitario",
    summary:
      "El nivel de acceso se propone como una cafetería amplia para recibir, conversar y apoyar actividades de la iglesia.",
    benefit:
      "Ofrece un lugar flexible para el encuentro entre generaciones, refrigerios y momentos comunitarios antes y después de las reuniones.",
    image: {
      src: "/temple-project/primer-piso-cafeteria.webp",
      width: 1400,
      height: 788,
      alt: "Visualización conceptual de una cafetería amplia y luminosa en el primer piso",
    },
  },
  {
    id: "segundo-piso",
    shortLabel: "Segundo piso",
    title: "Tres salones para formación y reuniones",
    summary:
      "Tres ambientes se organizan alrededor de una circulación central para niñez, jóvenes, discipulado y reuniones de ministerios.",
    benefit:
      "Permite desarrollar actividades simultáneas y adaptar cada salón a procesos de enseñanza, acompañamiento y organización comunitaria.",
    image: {
      src: "/temple-project/segundo-piso-salones.webp",
      width: 1400,
      height: 788,
      alt: "Visualización conceptual en corte del segundo piso con tres salones para distintas reuniones",
    },
  },
  {
    id: "altillo",
    shortLabel: "Altillo",
    title: "Sala polivalente y terraza",
    summary:
      "La propuesta combina una sala flexible con una terraza y una cubierta transparente parcial junto a las ventanas.",
    benefit:
      "Amplía las posibilidades de encuentro en un ambiente abierto para talleres, conversaciones y actividades de grupos pequeños.",
    image: {
      src: "/temple-project/altillo-terraza.webp",
      width: 1400,
      height: 788,
      alt: "Visualización conceptual de la terraza del altillo con una zona parcialmente cubierta",
    },
  },
] as const;

const facadeMain: ProjectImage = {
  src: "/temple-project/fachada-principal.webp",
  width: 1117,
  height: 1408,
  alt: "Visualización conceptual vertical de la fachada principal del futuro templo en una esquina",
};

const facadeCorner: ProjectImage = {
  src: "/temple-project/fachada-esquina.webp",
  width: 1396,
  height: 1127,
  alt: "Visualización conceptual en perspectiva de esquina del futuro templo",
};

export const projectHeroImage = facadeMain;

export const projectGallery: readonly GalleryItem[] = [
  {
    id: "fachada-principal",
    title: "Perspectiva de fachada principal",
    description:
      "Exploración conceptual de la presencia urbana, la materialidad y el acceso desde la esquina.",
    image: facadeMain,
  },
  {
    id: "fachada-esquina",
    title: "Perspectiva de la esquina",
    description:
      "Variante conceptual que permite leer los niveles y su relación con el entorno inmediato.",
    image: facadeCorner,
  },
  ...projectLevels.map((level) => ({
    id: level.id,
    title: level.title,
    description: level.summary,
    image: level.image,
  })),
] as const;
