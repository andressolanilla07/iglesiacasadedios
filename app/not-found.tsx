import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container narrow">
        <p className="eyebrow">Página no encontrada</p>
        <h1>Este espacio todavía no existe.</h1>
        <p>
          Puede que el enlace sea antiguo o que la página aún no se haya
          publicado. Vuelve al inicio para continuar.
        </p>
        <p className="section-link">
          <Link className="button button--primary" href="/">
            Volver al inicio
          </Link>
        </p>
      </div>
    </section>
  );
}
