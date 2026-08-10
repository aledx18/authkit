import { readTemplate, writeFileIfMissing } from "./utils.js";

/** Template file → target path inside the generated project. */
const PAGE_TEMPLATES: Record<string, string> = {
  "pages/api/auth/signin.ts.tmpl": "src/pages/api/auth/signin.ts",
  "pages/api/auth/signout.ts.tmpl": "src/pages/api/auth/signout.ts",
  "pages/api/auth/register.ts.tmpl": "src/pages/api/auth/register.ts",
  "pages/api/auth/callback.ts.tmpl": "src/pages/api/auth/callback.ts",
  "pages/signin.astro.tmpl": "src/pages/signin.astro",
  "pages/register.astro.tmpl": "src/pages/register.astro",
  "pages/dashboard.astro.tmpl": "src/pages/dashboard.astro",
};

/** Writes the auth pages and API endpoints from templates. */
export function writePages(targetDir: string): void {
  for (const [template, target] of Object.entries(PAGE_TEMPLATES)) {
    writeFileIfMissing(targetDir, target, readTemplate(template));
  }
}
