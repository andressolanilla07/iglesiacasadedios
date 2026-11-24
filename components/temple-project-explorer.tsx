"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";

import { publicAssetPath } from "@/modules/config/deployment";
import {
  projectCredit,
  projectGallery,
  projectLevels,
} from "@/modules/temple-project/project-content";

export function TempleProjectExplorer() {
  const [activeLevel, setActiveLevel] = useState(0);
  const [openGalleryItem, setOpenGalleryItem] = useState<number | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const galleryItem =
    openGalleryItem === null ? null : projectGallery[openGalleryItem];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || openGalleryItem === null || dialog.open) {
      return;
    }
    dialog.showModal();
    closeButtonRef.current?.focus();
  }, [openGalleryItem]);

  function activateLevel(index: number, focus = false) {
    setActiveLevel(index);
    if (focus) {
      tabRefs.current[index]?.focus();
    }
  }

  function handleLevelKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    let nextIndex: number | null = null;

    if (event.key === "ArrowRight") {
      nextIndex = (index + 1) % projectLevels.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (index - 1 + projectLevels.length) % projectLevels.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = projectLevels.length - 1;
    }

    if (nextIndex !== null) {
      event.preventDefault();
      activateLevel(nextIndex, true);
    }
  }

  return (
    <>
      <div className="level-explorer">
        <div
          className="level-tabs"
          role="tablist"
          aria-label="Niveles del proyecto arquitectónico"
          aria-orientation="horizontal"
        >
          {projectLevels.map((item, index) => (
            <button
              key={item.id}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              id={`tab-${item.id}`}
              type="button"
              role="tab"
              aria-selected={activeLevel === index}
              aria-controls={`panel-${item.id}`}
              tabIndex={activeLevel === index ? 0 : -1}
              onClick={() => activateLevel(index)}
              onKeyDown={(event) => handleLevelKeyDown(event, index)}
            >
              <span aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              {item.shortLabel}
            </button>
          ))}
        </div>

        {projectLevels.map((level, index) => {
          const isActive = activeLevel === index;

          return (
            <article
              className="level-panel"
              id={`panel-${level.id}`}
              key={level.id}
              role="tabpanel"
              aria-labelledby={`tab-${level.id}`}
              hidden={!isActive}
              tabIndex={isActive ? 0 : -1}
            >
              <figure className="level-panel__media">
                <img
                  src={publicAssetPath(level.image.src)}
                  width={level.image.width}
                  height={level.image.height}
                  alt={level.image.alt}
                />
                <span>Visualización conceptual</span>
              </figure>
              <div className="level-panel__copy">
                <p className="eyebrow">{level.shortLabel}</p>
                <h3>{level.title}</h3>
                <p>{level.summary}</p>
                <p className="level-panel__benefit">
                  <strong>Para la comunidad</strong>
                  {level.benefit}
                </p>
                <p className="fine-print">
                  Propuesta sujeta a ajustes técnicos y aprobación institucional.
                </p>
              </div>
            </article>
          );
        })}
      </div>

      <div className="gallery-heading">
        <p className="eyebrow">Galería del proyecto</p>
        <h3>Seis vistas para comprender la propuesta.</h3>
        <p>
          Las perspectivas exteriores y los ambientes interiores son
          visualizaciones conceptuales, no fotografías de una construcción
          terminada.
        </p>
      </div>

      <div className="project-gallery" aria-label="Galería conceptual del proyecto">
        {projectGallery.map((item, index) => (
          <button
            className="gallery-card"
            key={item.id}
            type="button"
            onClick={() => setOpenGalleryItem(index)}
            aria-label={`Ampliar: ${item.title}`}
          >
            <span className="gallery-card__media">
              <img
                src={publicAssetPath(item.image.src)}
                width={item.image.width}
                height={item.image.height}
                alt=""
                loading="lazy"
              />
              <span aria-hidden="true">Ampliar</span>
            </span>
            <span className="gallery-card__copy">
              <strong>{item.title}</strong>
              <small>{item.description}</small>
            </span>
          </button>
        ))}
      </div>

      <p className="project-credit">{projectCredit}</p>
      <p className="fine-print">
        Las personas y escenas de estas visualizaciones son ilustrativas; no son
        fotografías de la comunidad ni de una obra ejecutada.
      </p>

      <dialog
        className="project-lightbox"
        ref={dialogRef}
        aria-labelledby="project-lightbox-title"
        aria-describedby="project-lightbox-description"
        onClose={() => setOpenGalleryItem(null)}
        onCancel={() => setOpenGalleryItem(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            event.currentTarget.close();
          }
        }}
      >
        {galleryItem ? (
          <div className="project-lightbox__content">
            <button
              ref={closeButtonRef}
              className="project-lightbox__close"
              type="button"
              onClick={() => dialogRef.current?.close()}
            >
              Cerrar
            </button>
            <img
              src={publicAssetPath(galleryItem.image.src)}
              width={galleryItem.image.width}
              height={galleryItem.image.height}
              alt={galleryItem.image.alt}
            />
            <div>
              <h2 id="project-lightbox-title">{galleryItem.title}</h2>
              <p id="project-lightbox-description">{galleryItem.description}</p>
              <p className="fine-print">
                Visualización conceptual · propuesta sujeta a ajustes
              </p>
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
