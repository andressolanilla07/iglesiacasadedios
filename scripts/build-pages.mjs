import {
  copyFileSync,
  existsSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { spawnSync } from "node:child_process";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const nextBin = fileURLToPath(
  new URL("../node_modules/next/dist/bin/next", import.meta.url),
);

rmSync(new URL("../out", import.meta.url), { recursive: true, force: true });

const buildEnvironment = {};
const forwardedEnvironmentKeys = [
  "CI",
  "COMSPEC",
  "HOME",
  "NEXT_TELEMETRY_DISABLED",
  "NODE_OPTIONS",
  "PATH",
  "Path",
  "SYSTEMROOT",
  "SystemRoot",
  "TEMP",
  "TMP",
  "USERPROFILE",
];

for (const key of forwardedEnvironmentKeys) {
  if (process.env[key] !== undefined) {
    buildEnvironment[key] = process.env[key];
  }
}

const result = spawnSync(process.execPath, [nextBin, "build"], {
  cwd: root,
  env: {
    ...buildEnvironment,
    APP_ENV: "demo",
    DATABASE_URL: "",
    GITHUB_PAGES: "true",
    PAYMENTS_ENABLED: "false",
    PAYMENT_PROVIDER: "",
  },
  stdio: "inherit",
});

if (result.error) {
  throw result.error;
}

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

const outputDirectory = fileURLToPath(new URL("../out", import.meta.url));

function addFlatPagePayloads(directory) {
  let copied = 0;

  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (!entry.isDirectory()) {
      continue;
    }

    const childDirectory = join(directory, entry.name);
    const pagePayload = join(childDirectory, "__PAGE__.txt");

    // Next 16 exporta este payload en una subcarpeta, pero un host estático
    // recibe la solicitud del cliente con el separador convertido en punto.
    if (entry.name.startsWith("__next.") && existsSync(pagePayload)) {
      copyFileSync(pagePayload, join(directory, `${entry.name}.__PAGE__.txt`));
      copied += 1;
    }

    copied += addFlatPagePayloads(childDirectory);
  }

  return copied;
}

const copiedPayloads = addFlatPagePayloads(outputDirectory);
writeFileSync(new URL("../out/.nojekyll", import.meta.url), "");
console.log(
  `Exportación para GitHub Pages disponible en out/ (${copiedPayloads} payloads compatibles).`,
);
