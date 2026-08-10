import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const CONFIG_FILES = ["astro.config.mjs", "astro.config.js", "astro.config.cjs", "astro.config.ts"];

/**
 * Warns if the Astro config does not enable `output: "server"`.
 * SSR output (plus a server adapter) is required for auth middleware
 * and cookies to work. Purely advisory — never rewrites user config.
 */
export function checkServerOutput(targetDir: string): void {
  const configFile = CONFIG_FILES.find((file) => existsSync(path.join(targetDir, file)));
  if (!configFile) {
    return;
  }

  const content = readFileSync(path.join(targetDir, configFile), "utf-8");
  if (/output\s*:\s*["']server["']/.test(content)) {
    return;
  }

  console.log(`\n⚠ ${configFile} does not set output: "server". SSR is required for auth:`);
  console.log(`  output: "server",`);
  console.log('  adapter: node({ mode: "standalone" }),  // + "bun add -d @astrojs/node"');
}
