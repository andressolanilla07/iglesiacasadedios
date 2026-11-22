"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import type { PageDefinition } from "@/modules/content/types";

const NAV_ID = "primary-navigation";

export function SiteNav({
  pages,
}: {
  readonly pages: readonly PageDefinition[];
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Cerrar el menú al cambiar de página.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Cerrar al pulsar fuera del encabezado.
  useEffect(() => {
    if (!open) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      const target = event.target as Node;

      if (
        navRef.current?.contains(target) ||
        toggleRef.current?.contains(target)
      ) {
        return;
      }

      setOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  // Al abrir con teclado, llevar el foco al primer enlace del menú.
  useEffect(() => {
    if (!open) {
      return;
    }

    const firstLink = navRef.current?.querySelector<HTMLAnchorElement>("a");
    firstLink?.focus();
  }, [open]);

  function closeMenu({ restoreFocus = false } = {}) {
    setOpen(false);

    if (restoreFocus) {
      toggleRef.current?.focus();
    }
  }

  return (
    <div className="header-actions">
      <nav
        id={NAV_ID}
        ref={navRef}
        className={`main-nav${open ? " is-open" : ""}`}
        aria-label="Navegación principal"
        onKeyDown={(event) => {
          if (event.key === "Escape" && open) {
            event.stopPropagation();
            closeMenu({ restoreFocus: true });
          }
        }}
      >
        <ul className="nav-list">
          {pages.map((page) => {
            const isActive =
              page.slug === "/"
                ? pathname === "/"
                : pathname === page.slug ||
                  pathname.startsWith(`${page.slug}/`);

            return (
              <li key={page.slug}>
                <Link
                  href={page.slug}
                  className={isActive ? "is-active" : undefined}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => closeMenu()}
                >
                  {page.navLabel}
                </Link>
              </li>
            );
          })}
        </ul>

        <Link
          className="nav-donate"
          href="/nuevo-templo#aportes-templo"
          onClick={() => closeMenu()}
          title="Información de aportes. La pasarela de pagos está deshabilitada."
        >
          <span className="nav-donate__label">Aportar al templo</span>
          <span className="nav-donate__meta">Informativo · deshabilitado</span>
        </Link>
      </nav>

      <button
        ref={toggleRef}
        type="button"
        className="nav-toggle"
        aria-expanded={open}
        aria-controls={NAV_ID}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="nav-toggle__icon" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span className="nav-toggle__label">{open ? "Cerrar" : "Menú"}</span>
      </button>
    </div>
  );
}
