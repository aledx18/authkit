import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/** Template variant selected by the CLI (extensible per style). */
export const ASTRO_VARIANT = "default";

/**
 * Resolves the templates directory for the astro default variant.
 * At runtime this points to dist/templates/astro/default/.
 */
export function astroTemplatesDir(): string {
  const stepsDir = path.dirname(fileURLToPath(import.meta.url));
  return path.join(stepsDir, "..", "templates", "astro", ASTRO_VARIANT);
}

/** Reads a template file from the astro default variant. */
export function readTemplate(file: string): string {
  return readFileSync(path.join(astroTemplatesDir(), file), "utf-8");
}

/**
 * Writes a file into the target project, skipping (and reporting) if it
 * already exists so user customizations are never overwritten.
 */
export function writeFileIfMissing(targetDir: string, relPath: string, content: string): void {
  const target = path.join(targetDir, relPath);
  if (existsSync(target)) {
    console.log(`  · skip ${relPath} (already exists)`);
    return;
  }
  mkdirSync(path.dirname(target), { recursive: true });
  writeFileSync(target, content);
  console.log(`  · ${relPath}`);
}
