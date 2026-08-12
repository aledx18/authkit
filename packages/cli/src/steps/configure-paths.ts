import { copyFileSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { log } from "@clack/prompts";

type Tsconfig = {
  compilerOptions?: {
    baseUrl?: string;
    paths?: Record<string, string[]>;
  };
};

/** True when the project already maps `@/*` to `./src/*`. */
export function hasPathAlias(targetDir: string): boolean {
  const tsconfigPath = path.join(targetDir, "tsconfig.json");
  if (!existsSync(tsconfigPath)) {
    return false;
  }
  try {
    const tsconfig = JSON.parse(readFileSync(tsconfigPath, "utf-8")) as Tsconfig;
    return tsconfig.compilerOptions?.paths?.["@/*"] !== undefined;
  } catch {
    return false;
  }
}

/**
 * Adds the `@/*` → `./src/*` path alias to tsconfig.json (Astro resolves it
 * at runtime, no Vite config needed). Keeps a `.bak` of the original file.
 */
export function configurePaths(targetDir: string): void {
  if (hasPathAlias(targetDir)) {
    log.info("@/* path alias already configured — skipping");
    return;
  }

  const tsconfigPath = path.join(targetDir, "tsconfig.json");
  if (!existsSync(tsconfigPath)) {
    log.warn("No tsconfig.json found — skipping @/* alias setup");
    return;
  }

  let tsconfig: Tsconfig;
  try {
    tsconfig = JSON.parse(readFileSync(tsconfigPath, "utf-8")) as Tsconfig;
  } catch {
    log.warn("Could not parse tsconfig.json — skipping @/* alias setup");
    return;
  }

  copyFileSync(tsconfigPath, `${tsconfigPath}.bak`);

  tsconfig.compilerOptions ??= {};
  // No baseUrl: paths resolve relative to the tsconfig location since TS 4.1,
  // and baseUrl is deprecated in TypeScript 7.
  tsconfig.compilerOptions.paths ??= {};
  tsconfig.compilerOptions.paths["@/*"] = ["./src/*"];

  writeFileSync(tsconfigPath, `${JSON.stringify(tsconfig, null, 2)}\n`);
  log.success('Configured "@/*" path alias in tsconfig.json');
}
