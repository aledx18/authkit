import { spawnSync } from "node:child_process";

const DEPS = ["@aledx18/astro", "@supabase/supabase-js", "@supabase/ssr"];

const PM_ADD: Record<string, [string, string[]]> = {
  bun: ["bun", ["add"]],
  pnpm: ["pnpm", ["add"]],
  npm: ["npm", ["install"]],
  yarn: ["yarn", ["add"]],
};

const PM_DEV_FLAG: Record<string, string> = {
  bun: "-d",
  pnpm: "-D",
  npm: "-D",
  yarn: "-D",
};

function runAdd(targetDir: string, packageManager: string, deps: string[], dev = false): void {
  const fallback: [string, string[]] = ["bun", ["add"]];
  const [command, addArgs] = PM_ADD[packageManager] ?? fallback;
  const flag = dev ? (PM_DEV_FLAG[packageManager] ?? "-d") : undefined;
  const args = flag ? [...addArgs, flag, ...deps] : [...addArgs, ...deps];

  const result = spawnSync(command, args, { cwd: targetDir, stdio: "inherit" });
  if (result.status !== 0) {
    console.error("✗ Failed to install dependencies");
    process.exit(1);
  }
}

/** Installs the auth runtime dependencies using the detected package manager. */
export function installDeps(targetDir: string, packageManager: string): void {
  runAdd(targetDir, packageManager, DEPS);
}

/** Installs devDependencies (e.g. the Astro adapter). */
export function addDevDeps(targetDir: string, packageManager: string, deps: string[]): void {
  runAdd(targetDir, packageManager, deps, true);
}
