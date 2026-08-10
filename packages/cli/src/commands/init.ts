import { detectAstro } from "../detectors/astro.js";
import { installDeps } from "../steps/install-deps.js";
import { writeClient } from "../steps/write-client.js";
import { writeEnv } from "../steps/write-env.js";
import { writeMiddleware } from "../steps/write-middleware.js";
import { writePages } from "../steps/write-pages.js";
import { writeTypes } from "../steps/write-types.js";

/**
 * Scaffolds Supabase auth into an Astro project at `targetDir`.
 *
 * Detects Astro, installs the auth dependencies, and writes the pages,
 * endpoints, middleware, clients, env and types from templates. Existing
 * files are never overwritten.
 */
export async function init(targetDir = process.cwd()): Promise<void> {
  if (!detectAstro(targetDir)) {
    console.error(`✗ No Astro project detected in ${targetDir}`);
    console.error('  Run this inside a project with an astro config or an "astro" dependency.');
    process.exit(1);
  }

  console.log("→ Detected Astro project");

  console.log("→ Installing dependencies...");
  await installDeps(targetDir);

  console.log("→ Writing environment template...");
  writeEnv(targetDir);

  console.log("→ Writing Supabase clients...");
  writeClient(targetDir);

  console.log("→ Writing middleware...");
  writeMiddleware(targetDir);

  console.log("→ Writing pages and auth endpoints...");
  writePages(targetDir);

  console.log("→ Writing types...");
  writeTypes(targetDir);

  console.log("\n✓ Auth scaffolding complete.");
  console.log("  Next steps:");
  console.log("  1. Fill in SUPABASE_URL and PUBLIC_SUPABASE_PUBLISHABLE_KEY in .env");
  console.log("  2. Run bun dev and visit /signin");
}
