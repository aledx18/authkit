import { spawnSync } from "node:child_process";

const DEPS = ["@aledx18/astro", "@supabase/supabase-js", "@supabase/ssr"];

/** Installs the auth runtime dependencies into the target project. */
export function installDeps(targetDir: string): void {
  const result = spawnSync("bun", ["add", ...DEPS], {
    cwd: targetDir,
    stdio: "inherit",
  });
  if (result.status !== 0) {
    console.error("✗ Failed to install dependencies");
    process.exit(1);
  }
}
