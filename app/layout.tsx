import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { EnvironmentNotice } from "@/components/environment-notice";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#080875",
  colorScheme: "light",
};

export const metadata: Metadata = {
  title: {
    default: "Casa de Dios · Jamundí",
    template: "%s · Casa de Dios",
  },
  description:
    "Sitio en preparación de la Iglesia Presbiteriana Cumberland Casa de Dios, Jamundí. Campaña del nuevo templo, comunidad y acompañamiento pastoral.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: {
  readonly children: ReactNode;
}) {
  return (
    <html lang="es-CO" data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#contenido">
          Saltar al contenido
        </a>
        <EnvironmentNotice />
        <SiteHeader />
        <main id="contenido" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
