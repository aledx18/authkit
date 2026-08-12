import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { log } from "@clack/prompts";

const CONFIG_FILES = ["astro.config.mjs", "astro.config.js", "astro.config.cjs", "astro.config.ts"];

const DLX: Record<string, [string, string[]]> = {
  bun: ["bunx", ["astro", "add", "tailwind", "--yes"]],
  pnpm: ["pnpm", ["dlx", "astro", "add", "tailwind", "--yes"]],
  npm: ["npx", ["astro", "add", "tailwind", "--yes"]],
  yarn: ["yarn", ["dlx", "astro", "add", "tailwind", "--yes"]],
};

/** True when Tailwind is already installed/configured in the project. */
export function hasTailwind(targetDir: string): boolean {
  const pkgPath = path.join(targetDir, "package.json");
  if (existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(readFileSync(pkgPath, "utf-8")) as {
        dependencies?: Record<string, string>;
        devDependencies?: Record<string, string>;
      };
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };
      if (deps.tailwindcss && deps["@tailwindcss/vite"]) {
        return true;
      }
      if (deps["@astrojs/tailwind"]) {
        return true; // legacy Tailwind v3 integration
      }
    } catch {
      // fall through to config check
    }
  }

  for (const file of CONFIG_FILES) {
    const configPath = path.join(targetDir, file);
    if (existsSync(configPath)) {
      const content = readFileSync(configPath, "utf-8");
      if (content.includes("@tailwindcss/vite") || content.includes("@astrojs/tailwind")) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Installs and configures Tailwind (v4) via `astro add tailwind --yes`.
 * Uses the detected package manager to run the local astro CLI.
 */
export function configureTailwind(targetDir: string, packageManager: string): void {
  if (hasTailwind(targetDir)) {
    log.info("Tailwind already configured — skipping");
    return;
  }

  log.step("Installing Tailwind (astro add tailwind)");
  const fallback: [string, string[]] = ["bunx", ["astro", "add", "tailwind", "--yes"]];
  const [command, args] = DLX[packageManager] ?? fallback;

  const result = spawnSync(command, args, { cwd: targetDir, stdio: "inherit" });
  if (result.status !== 0) {
    log.warn("Failed to install Tailwind — auth pages still work without it");
  } else {
    log.success("Tailwind installed and configured");
  }
}
