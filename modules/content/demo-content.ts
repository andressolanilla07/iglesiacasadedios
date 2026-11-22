import type { SiteContent } from "./types";

/**
 * Contenido de demostración, claramente separado del contenido institucional
 * aprobado. No hay conexión a PostgreSQL ni datos pastorales inventados.
 * Todo dato no confirmado se marca como pendiente en la interfaz.
 */
export const demoContent: SiteContent = {
  source: "demo",
  pages: [
    {
      slug: "/",
      navLabel: "Inicio",
      title: "Un lugar para creer y construir",
      eyebrow: "Casa de Dios · Jamundí",
      summary:
        "Comunidad, historia y campaña del nuevo templo de la Iglesia Presbiteriana Cumberland Casa de Dios.",
    },
    {
      slug: "/nuevo-templo",
      navLabel: "Nuevo templo",
      title: "Un nuevo templo para servir",
      eyebrow: "Campaña de construcción",
      summary:
        "El propósito del proyecto, su estado de preparación y el compromiso de transparencia de la campaña.",
    },
    {
      slug: "/nuestra-iglesia",
      navLabel: "Nuestra iglesia",
      title: "Una historia que continúa",
      eyebrow: "Nuestra iglesia",
      summary:
        "Identidad institucional y memoria de una comunidad presbiteriana en Jamundí.",
    },
    {
      slug: "/nuestro-pastor",
      navLabel: "Nuestro pastor",
      title: "Acompañamiento pastoral cercano",
      eyebrow: "Nuestro pastor",
      summary:
        "El espacio para conocer el perfil pastoral y solicitar acompañamiento cuando los canales oficiales estén verificados.",
    },
    {
      slug: "/vida-en-comunidad",
      navLabel: "Vida en comunidad",
      title: "Una comunidad que se acompaña",
      eyebrow: "Vida en comunidad",
      summary:
        "Oración, acompañamiento, grupos, evangelización y servicio: la vida de la iglesia más allá del edificio.",
    },
    {
      slug: "/visitanos",
      navLabel: "Visítanos y contacto",
      title: "Nos alegrará conocerte",
      eyebrow: "Visítanos y contacto",
      summary:
        "Dirección, horarios confirmados y estado de los canales oficiales de comunicación.",
    },
  ],
  identity: {
    name: "Iglesia Presbiteriana Cumberland Casa de Dios",
    shortName: "Casa de Dios",
    denomination: "Iglesia Presbiteriana Cumberland",
    city: "Jamundí, Valle del Cauca, Colombia",
    legalNameStatus: "pending",
    doctrinalTextStatus: "pending",
  },
  address: {
    line1: "Cl. 6 # 6As-27",
    line2: "Villapyme 2",
    city: "Jamundí",
    region: "Valle del Cauca",
    country: "Colombia",
    mapStatus: "pending",
  },
  services: [
    {
      day: "Domingo",
      start: "10:00 a. m.",
      end: "12:00 p. m.",
      label: "Servicio dominical",
    },
    {
      day: "Martes",
      start: "7:00 p. m.",
      end: "8:30 p. m.",
      label: "Servicio de martes",
    },
  ],
  pastor: {
    status: "pending_confirmation",
    displayName: null,
    roleTitle: "Pastor",
    biography: null,
    photoAlt: null,
    note: "El nombre, la biografía, la fotografía y la continuidad del perfil pastoral están en revisión con la iglesia. No se publican como datos confirmados ni se ofrece un contacto directo.",
  },
  history: {
    status: "pending_review",
    note: "La reseña histórica fue incorporada como contenido para revisión. Sus nombres, fechas, formulaciones y permisos visuales aún requieren aprobación institucional.",
  },
  community: {
    groupsStatus: "pending_confirmation",
    note: "Los grupos, ministerios, responsables y actividades requieren confirmación. No se publican nombres, horarios ni contactos provisionales.",
  },
  contactChannels: [
    {
      key: "phone",
      label: "Teléfono institucional",
      status: "pending",
      detail: "Número oficial pendiente de confirmación.",
    },
    {
      key: "email",
      label: "Correo institucional",
      status: "pending",
      detail: "Dirección oficial pendiente de confirmación.",
    },
    {
      key: "whatsapp",
      label: "WhatsApp institucional",
      status: "pending",
      detail: "Canal pendiente de verificación.",
    },
    {
      key: "map",
      label: "Mapa y ubicación",
      status: "pending",
      detail: "Enlace de mapa pendiente de validación.",
    },
    {
      key: "social",
      label: "Redes sociales",
      status: "pending",
      detail: "Perfiles oficiales pendientes de confirmación.",
    },
  ],
  editorial: {
    approvedBy: null,
    lastReviewed: null,
    note: "Contenido de demostración para revisar la estructura del sitio. No sustituye la aprobación editorial de la iglesia.",
  },
};
