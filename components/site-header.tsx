import Link from "next/link";

import { getSiteContent } from "@/modules/content/repository";
import { SiteNav } from "./site-nav";

export function SiteHeader() {
  const content = getSiteContent();

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" href="/">
          {/* PNG elegido por Andrés; el nombre institucional permanece como texto. */}
          <img
            className="brand-logo"
            src="/brand/logo-oficial.png"
            width={1197}
            height={1314}
            alt=""
          />
          <span className="brand-copy">
            <strong>Casa de Dios</strong>
            <small>Iglesia Presbiteriana Cumberland</small>
          </span>
        </Link>

        <SiteNav pages={content.pages} />
      </div>
    </header>
  );
}
