import { cancel, confirm, isCancel, log, text } from "@clack/prompts";
import { detectAstro } from "../detectors/astro.js";
import { detectPackageManager } from "../detectors/package-manager.js";
import { configureSsr } from "../steps/configure-ssr.js";
import { configureTailwind } from "../steps/configure-tailwind.js";
import { installDeps } from "../steps/install-deps.js";
import { writeActions } from "../steps/write-actions.js";
import { writeClient } from "../steps/write-client.js";
import { writeEnv } from "../steps/write-env.js";
import { writeMiddleware } from "../steps/write-middleware.js";
import { writePages } from "../steps/write-pages.js";
import { writeTypes } from "../steps/write-types.js";

type EnvCredentials = { url: string; key: string };

function devCommand(packageManager: string): string {
  if (packageManager === "npm") return "npm run dev";
  if (packageManager === "yarn") return "yarn dev";
  return `${packageManager} dev`;
}

/**
 * Scaffolds Supabase auth into an Astro project at `targetDir`.
 *
 * Flow: detect Astro → detect package manager → prompt for Supabase
 * credentials → install deps → write env → write clients/middleware/pages
 * → check SSR output → final report.
 */
export async function init(targetDir = process.cwd()): Promise<void> {
  if (!detectAstro(targetDir)) {
    log.error(`No Astro project detected in ${targetDir}`);
    log.error(
      'Framework not supported yet — run this inside an Astro project (astro.config.mjs or an "astro" dependency).',
    );
    process.exit(1);
  }
  log.success("Detected Astro");

  const packageManager = detectPackageManager(targetDir);
  log.info(`Package manager detected: ${packageManager}`);

  const hasProject = await confirm({
    message: "Do you already have a Supabase project?",
    initialValue: false,
  });
  if (isCancel(hasProject)) {
    cancel("Cancelled");
    process.exit(0);
  }

  let env: EnvCredentials = { url: "", key: "" };
  if (hasProject) {
    const url = await text({
      message: "Supabase project URL",
      placeholder: "https://your-project.supabase.co",
      validate: (value) => (value?.startsWith("http") ? undefined : "Must be a valid URL"),
    });
    if (isCancel(url)) {
      cancel("Cancelled");
      process.exit(0);
    }

    const key = await text({
      message: "Supabase publishable key (anon)",
      placeholder: "your-anon-key",
      validate: (value) => (value && value.length > 0 ? undefined : "Required"),
    });
    if (isCancel(key)) {
      cancel("Cancelled");
      process.exit(0);
    }

    env = { url, key };
  }

  log.step("Installing dependencies");
  await installDeps(targetDir, packageManager);
  log.success("Installed dependencies");

  log.step("Checking SSR output");
  await configureSsr(targetDir, packageManager);

  log.step("Checking Tailwind");
  configureTailwind(targetDir, packageManager);

  log.step("Writing environment");
  writeEnv(targetDir, env);

  log.step("Writing Supabase clients (browser + server)");
  writeClient(targetDir);

  log.step("Writing middleware");
  writeMiddleware(targetDir);

  log.step("Writing auth actions");
  writeActions(targetDir);

  log.step("Writing auth pages and endpoints");
  writePages(targetDir);

  log.step("Writing types");
  writeTypes(targetDir);

  log.success("Auth scaffolding complete");
  log.message(`Next step: ${devCommand(packageManager)} and visit /signin`);
}
