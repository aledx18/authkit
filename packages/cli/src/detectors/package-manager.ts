import { existsSync } from "node:fs";
import path from "node:path";

const LOCKFILES: Array<[string, string]> = [
  ["bun.lock", "bun"],
  ["bun.lockb", "bun"],
  ["pnpm-lock.yaml", "pnpm"],
  ["package-lock.json", "npm"],
  ["yarn.lock", "yarn"],
];

/**
 * Detects the package manager from the lockfile present in `targetDir`.
 * Defaults to bun when no lockfile is found.
 */
export function detectPackageManager(targetDir: string): string {
  for (const [lockfile, packageManager] of LOCKFILES) {
    if (existsSync(path.join(targetDir, lockfile))) {
      return packageManager;
    }
  }
  return "bun";
}
