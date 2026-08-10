import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const ASTRO_CONFIG_FILES = [
  "astro.config.mjs",
  "astro.config.js",
  "astro.config.cjs",
  "astro.config.ts",
];

/**
 * Detects whether `targetDir` is an Astro project.
 * Checks for an astro config file or an "astro" dependency in package.json.
 */
export function detectAstro(targetDir: string): boolean {
  if (ASTRO_CONFIG_FILES.some((file) => existsSync(path.join(targetDir, file)))) {
    return true;
  }

  const pkgPath = path.join(targetDir, "package.json");
  if (!existsSync(pkgPath)) {
    return false;
  }

  try {
    const pkg = JSON.parse(readFileSync(pkgPath, "utf-8")) as {
      dependencies?: Record<string, string>;
      devDependencies?: Record<string, string>;
    };
    const deps = { ...pkg.dependencies, ...pkg.devDependencies };
    return "astro" in deps;
  } catch {
    return false;
  }
}
