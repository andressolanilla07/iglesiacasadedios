import type { ReactNode } from "react";

export function PageIntro({
  eyebrow,
  title,
  lead,
  children,
}: {
  readonly eyebrow: string;
  readonly title: ReactNode;
  readonly lead: string;
  readonly children?: ReactNode;
}) {
  return (
    <section className="page-intro">
      <div className="container page-intro-inner">
        <p className="eyebrow eyebrow--light">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="lead">{lead}</p>
        {children ? <div className="page-intro-actions">{children}</div> : null}
      </div>
    </section>
  );
}
