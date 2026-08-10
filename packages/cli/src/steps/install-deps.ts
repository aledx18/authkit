import { spawnSync } from "node:child_process";

const DEPS = ["@aledx18/astro", "@supabase/supabase-js", "@supabase/ssr"];

const PM_COMMANDS: Record<string, [string, string[]]> = {
  bun: ["bun", ["add", ...DEPS]],
  pnpm: ["pnpm", ["add", ...DEPS]],
  npm: ["npm", ["install", ...DEPS]],
  yarn: ["yarn", ["add", ...DEPS]],
};

/** Installs the auth runtime dependencies using the detected package manager. */
export function installDeps(targetDir: string, packageManager: string): void {
  const fallback: [string, string[]] = ["bun", ["add", ...DEPS]];
  const [command, args] = PM_COMMANDS[packageManager] ?? fallback;
  const result = spawnSync(command, args, {
    cwd: targetDir,
    stdio: "inherit",
  });
  if (result.status !== 0) {
    console.error("✗ Failed to install dependencies");
    process.exit(1);
  }
}
