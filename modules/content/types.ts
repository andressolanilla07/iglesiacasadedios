export type PageSlug =
  | "/"
  | "/nuevo-templo"
  | "/nuestra-iglesia"
  | "/nuestro-pastor"
  | "/vida-en-comunidad"
  | "/visitanos";

export interface PageDefinition {
  readonly slug: PageSlug;
  readonly navLabel: string;
  readonly title: string;
  readonly eyebrow: string;
  readonly summary: string;
}

export interface ServiceSchedule {
  readonly day: string;
  readonly start: string;
  readonly end: string;
  readonly label: string;
}

export interface PostalAddress {
  readonly line1: string;
  readonly line2: string;
  readonly city: string;
  readonly region: string;
  readonly country: string;
  readonly mapStatus: "pending";
}

export interface ContactChannel {
  readonly key: string;
  readonly label: string;
  readonly status: "pending";
  readonly detail: string;
}

export interface PastorProfile {
  readonly status: "pending_confirmation";
  readonly displayName: null;
  readonly roleTitle: string;
  readonly biography: null;
  readonly photoAlt: null;
  readonly note: string;
}

export interface SiteContent {
  readonly source: "demo";
  readonly pages: readonly PageDefinition[];
  readonly identity: {
    readonly name: string;
    readonly shortName: string;
    readonly denomination: string;
    readonly city: string;
    readonly legalNameStatus: "pending";
    readonly doctrinalTextStatus: "pending";
  };
  readonly address: PostalAddress;
  readonly services: readonly ServiceSchedule[];
  readonly pastor: PastorProfile;
  readonly history: {
    readonly status: "pending_review";
    readonly note: string;
  };
  readonly community: {
    readonly groupsStatus: "pending_confirmation";
    readonly note: string;
  };
  readonly contactChannels: readonly ContactChannel[];
  readonly editorial: {
    readonly approvedBy: null;
    readonly lastReviewed: null;
    readonly note: string;
  };
}
