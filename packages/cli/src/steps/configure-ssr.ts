import { copyFileSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { cancel, confirm, isCancel, log, select } from "@clack/prompts";
import { addDevDeps } from "./install-deps.js";

const CONFIG_FILES = ["astro.config.mjs", "astro.config.js", "astro.config.cjs", "astro.config.ts"];

interface AdapterOption {
  value: string;
  label: string;
  pkg: string;
  snippet: string;
}

const ADAPTERS: AdapterOption[] = [
  {
    value: "node",
    label: "Node.js (VPS, Docker, standalone)",
    pkg: "@astrojs/node",
    snippet: 'node({ mode: "standalone" })',
  },
  { value: "vercel", label: "Vercel", pkg: "@astrojs/vercel", snippet: "vercel()" },
  {
    value: "cloudflare",
    label: "Cloudflare Workers",
    pkg: "@astrojs/cloudflare",
    snippet: "cloudflare()",
  },
  { value: "netlify", label: "Netlify", pkg: "@astrojs/netlify", snippet: "netlify()" },
];

function findConfig(targetDir: string): string | undefined {
  return CONFIG_FILES.find((file) => existsSync(path.join(targetDir, file)));
}

/** True when the Astro config already sets output: "server". */
export function hasServerOutput(targetDir: string): boolean {
  const configFile = findConfig(targetDir);
  if (!configFile) {
    return false;
  }
  const content = readFileSync(path.join(targetDir, configFile), "utf-8");
  return /output\s*:\s*["']server["']/.test(content);
}

/**
 * Adds `output: "server"` + the chosen adapter to the Astro config.
 * Keeps a `.bak` of the original file. No-op when the adapter is unknown
 * or no config file exists.
 */
export function applySsrConfig(targetDir: string, adapterValue: string): void {
  const configFile = findConfig(targetDir);
  if (!configFile) {
    console.log('  ⚠ No astro config found — add output: "server" and an adapter manually.');
    return;
  }
  const adapter = ADAPTERS.find((option) => option.value === adapterValue);
  if (!adapter) {
    return;
  }

  const configPath = path.join(targetDir, configFile);
  const original = readFileSync(configPath, "utf-8");
  copyFileSync(configPath, `${configPath}.bak`);

  let content = original;

  const importLine = `import ${adapter.value} from "${adapter.pkg}";`;
  if (!content.includes(adapter.pkg)) {
    const imports = [...content.matchAll(/^import[^\n]*$/gm)];
    const last = imports.at(-1);
    if (last && last.index !== undefined) {
      const end = last.index + last[0].length;
      content = `${content.slice(0, end)}\n${importLine}${content.slice(end)}`;
    } else {
      content = `${importLine}\n${content}`;
    }
  }

  if (/output\s*:\s*["'][^"']*["']/.test(content)) {
    content = content.replace(/output\s*:\s*["'][^"']*["']/, 'output: "server"');
  } else if (!/output\s*:/.test(content)) {
    content = content.replace("defineConfig({", 'defineConfig({\n  output: "server",');
  }

  if (!content.includes("adapter:")) {
    const outputWithComma = 'output: "server",';
    const replacement = `output: "server",\n  adapter: ${adapter.snippet},\n`;
    if (content.includes(outputWithComma)) {
      content = content.replace(outputWithComma, replacement);
    } else {
      content = content.replace(
        'output: "server"',
        `output: "server",\n  adapter: ${adapter.snippet},`,
      );
    }
  }

  writeFileSync(configPath, content);
  console.log(`  · patched ${configFile} (backup: ${configFile}.bak)`);
}

/**
 * Ensures the Astro project is SSR-ready for auth.
 *
 * If `output: "server"` is already set, does nothing. Otherwise prompts the
 * user: configure SSR now (choose an adapter, install it, patch the config)
 * or skip with a warning.
 */
export async function configureSsr(targetDir: string, packageManager: string): Promise<void> {
  if (hasServerOutput(targetDir)) {
    return;
  }

  const proceed = await confirm({
    message: 'Auth requires SSR — configure output: "server" now?',
    initialValue: true,
  });
  if (isCancel(proceed)) {
    cancel("Cancelled");
    process.exit(0);
  }

  if (!proceed) {
    log.warn('Skipped SSR setup — auth routes will not work until you set output: "server".');
    return;
  }

  const adapterValue = await select({
    message: "Where will the app run?",
    options: ADAPTERS.map((option) => ({ value: option.value, label: option.label })),
  });
  if (isCancel(adapterValue)) {
    cancel("Cancelled");
    process.exit(0);
  }

  const adapter = ADAPTERS.find((option) => option.value === adapterValue);
  if (!adapter) {
    return;
  }

  log.step(`Installing ${adapter.pkg}`);
  addDevDeps(targetDir, packageManager, [adapter.pkg]);
  log.success(`Installed ${adapter.pkg}`);

  applySsrConfig(targetDir, adapter.value);
  log.success(`Configured output: "server" + ${adapter.label}`);
}
