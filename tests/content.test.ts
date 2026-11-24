import assert from "node:assert/strict";
import test from "node:test";

import { demoContent } from "../modules/content/demo-content.ts";
import {
  campaignSummary,
  templeProject,
} from "../modules/temple-project/demo.ts";
import {
  projectCredit,
  projectGallery,
  projectLevels,
} from "../modules/temple-project/project-content.ts";

test("el contenido se identifica como demostración y sin aprobación editorial", () => {
  assert.equal(demoContent.source, "demo");
  assert.equal(demoContent.editorial.approvedBy, null);
  assert.equal(demoContent.editorial.lastReviewed, null);
  assert.match(demoContent.editorial.note, /demostración/i);
});

test("la dirección y los dos horarios confirmados están presentes", () => {
  assert.equal(demoContent.address.line1, "Cl. 6 # 6As-27");
  assert.equal(demoContent.address.line2, "Villapyme 2");
  assert.equal(demoContent.address.city, "Jamundí");
  assert.equal(demoContent.services.length, 2);

  const sunday = demoContent.services.find((service) => service.day === "Domingo");
  const tuesday = demoContent.services.find((service) => service.day === "Martes");

  assert.ok(sunday);
  assert.equal(sunday.start, "10:00 a. m.");
  assert.equal(sunday.end, "12:00 p. m.");
  assert.ok(tuesday);
  assert.equal(tuesday.start, "7:00 p. m.");
  assert.equal(tuesday.end, "8:30 p. m.");
});

test("las seis páginas previstas existen y no se repiten", () => {
  const slugs = demoContent.pages.map((page) => page.slug);

  assert.deepEqual(slugs, [
    "/",
    "/nuevo-templo",
    "/nuestra-iglesia",
    "/nuestro-pastor",
    "/vida-en-comunidad",
    "/visitanos",
  ]);
  assert.equal(new Set(slugs).size, slugs.length);
});

test("el perfil pastoral permanece pendiente y sin datos inventados", () => {
  assert.equal(demoContent.pastor.status, "pending_confirmation");
  assert.equal(demoContent.pastor.displayName, null);
  assert.equal(demoContent.pastor.biography, null);
  assert.equal(demoContent.pastor.photoAlt, null);
  assert.match(demoContent.pastor.note, /revisión/i);
});

test("todos los canales de contacto están pendientes", () => {
  assert.ok(demoContent.contactChannels.length > 0);
  for (const channel of demoContent.contactChannels) {
    assert.equal(channel.status, "pending");
  }
});

test("no hay enlaces externos, correos ni teléfonos provisionales", () => {
  const serialized = JSON.stringify(demoContent);

  assert.ok(!/https?:\/\//i.test(serialized));
  assert.ok(!/mailto:/i.test(serialized));
  assert.ok(!/tel:/i.test(serialized));
  assert.ok(!/wa\.me/i.test(serialized));
});

test("las cifras confirmadas están centralizadas y separadas del recaudo", () => {
  assert.equal(campaignSummary.status, "preparation");
  assert.equal(campaignSummary.cutoffDate, null);
  assert.equal(campaignSummary.currencyStatus, "confirmed");
  assert.equal(campaignSummary.confirmationDate, "2026-11-24");
  assert.equal(campaignSummary.figures.budget.amount, 1_099_873_000);
  assert.equal(campaignSummary.figures.executed.amount, 172_500_000);
  assert.equal(campaignSummary.figures.difference.amount, 927_373_000);
  assert.equal(
    campaignSummary.figures.budget.amount -
      campaignSummary.figures.executed.amount,
    campaignSummary.figures.difference.amount,
  );
  assert.equal(campaignSummary.figures.raised.status, "pending");
});

test("las etapas del proyecto no se presentan como terminadas", () => {
  for (const stage of templeProject.stages) {
    assert.notEqual(stage.status, "completed");
  }
  assert.equal(templeProject.documentsStatus, "reference");
});

test("el recorrido arquitectónico conserva cuatro niveles, seis vistas y el crédito", () => {
  assert.equal(projectLevels.length, 4);
  assert.equal(projectGallery.length, 6);
  assert.equal(
    projectCredit,
    "Diseño arquitectónico: Arq. Agustín Torres García",
  );
  assert.deepEqual(
    projectLevels.map((level) => level.id),
    ["semisotano", "primer-piso", "segundo-piso", "altillo"],
  );
});
