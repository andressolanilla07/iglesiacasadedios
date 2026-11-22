import assert from "node:assert/strict";
import {
  existsSync,
  readFileSync,
  readdirSync,
  type Dirent,
} from "node:fs";
import { join, relative } from "node:path";
import test from "node:test";

const root = process.cwd();
const sourceRoots = ["app", "components", "modules"];

function listFiles(directory: string): string[] {
  if (!existsSync(directory)) {
    return [];
  }

  const files: string[] = [];
  for (const entry of readdirSync(directory, { withFileTypes: true }) as Dirent[]) {
    const fullPath = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...listFiles(fullPath));
    } else if (entry.isFile() && /\.(ts|tsx)$/.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

const sourceFiles = sourceRoots.flatMap((directory) =>
  listFiles(join(root, directory)),
);

test("los módulos server-only declaran la frontera de servidor", () => {
  const serverFiles = sourceFiles.filter((file) => {
    const relativePath = relative(root, file).replaceAll("\\", "/");
    return (
      relativePath.startsWith("modules/server/") ||
      relativePath === "modules/donations/server.ts" ||
      relativePath === "modules/content/repository.ts"
    );
  });

  assert.ok(serverFiles.length >= 3);
  for (const file of serverFiles) {
    const source = readFileSync(file, "utf8");
    assert.match(
      source,
      /^import "server-only";/m,
      `${relative(root, file)} debe importar server-only`,
    );
  }
});

test("un componente cliente no importa módulos exclusivos del servidor", () => {
  const forbidden = [
    "server-only",
    "@/modules/server",
    "@/modules/donations/server",
    "@/modules/content/repository",
  ];

  for (const file of sourceFiles) {
    const source = readFileSync(file, "utf8");
    if (!/^["']use client["'];?/m.test(source)) {
      continue;
    }
    for (const specifier of forbidden) {
      assert.ok(
        !source.includes(specifier),
        `${relative(root, file)} no debe importar ${specifier}`,
      );
    }
  }
});

test("la validación de configuración solo se importa desde servidor", () => {
  for (const file of sourceFiles) {
    const source = readFileSync(file, "utf8");
    if (
      source.includes("modules/config/schema") ||
      source.includes("../config/schema")
    ) {
      assert.equal(
        relative(root, file).replaceAll("\\", "/"),
        "modules/server/config.ts",
        "La configuración solo debe leerse desde el módulo de servidor",
      );
    }
  }
});

test("no hay rutas de API ni formularios que recojan datos", () => {
  assert.equal(existsSync(join(root, "app", "api")), false);

  for (const file of sourceFiles) {
    const source = readFileSync(file, "utf8");
    assert.ok(
      !/<form\b/i.test(source),
      `${relative(root, file)} no debe contener formularios en esta fase`,
    );
  }
});

test("la migración usa tipos monetarios exactos y auditoría inmutable", () => {
  const sql = readFileSync(
    join(root, "db", "migrations", "0001_init.sql"),
    "utf8",
  );

  assert.match(sql, /budget_amount numeric\(16, 2\)/);
  assert.match(sql, /executed_amount numeric\(16, 2\)/);
  assert.match(sql, /raised_amount numeric\(16, 2\)/);
  assert.match(sql, /audit\.reject_mutation/);
  assert.match(sql, /CREATE TRIGGER audit_event_immutable/);
  assert.match(sql, /CREATE TRIGGER audit_event_no_truncate/);

  const sqlWithoutCommentsOrLiterals = sql
    .replace(/--[^\n]*/g, "")
    .replace(/'(?:[^']|'')*'/g, "''");
  assert.ok(
    !/\b(double precision|real|float)\b/i.test(sqlWithoutCommentsOrLiterals),
    "El dinero no debe usar tipos de coma flotante",
  );
});

test(".env.example no contiene una cadena de conexión activa", () => {
  const envExample = readFileSync(join(root, ".env.example"), "utf8");
  const databaseLines = envExample
    .split(/\r?\n/)
    .filter((line) => line.includes("DATABASE_URL"));

  assert.ok(databaseLines.length > 0);
  for (const line of databaseLines) {
    assert.match(line.trim(), /^#/, "DATABASE_URL debe estar comentada");
  }
});
