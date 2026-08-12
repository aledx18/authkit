import { readTemplate, writeFileIfMissing } from "./utils.js";

/** Template file → target path inside the generated project. */
const PAGE_TEMPLATES: Record<string, string> = {
  "pages/api/auth/callback.ts.tmpl": "src/pages/api/auth/callback.ts",
  "pages/api/auth/oauth/[provider].ts.tmpl": "src/pages/api/auth/oauth/[provider].ts",
  "pages/signin.astro.tmpl": "src/pages/signin.astro",
  "pages/register.astro.tmpl": "src/pages/register.astro",
  "pages/forgot-password.astro.tmpl": "src/pages/forgot-password.astro",
  "pages/reset-password.astro.tmpl": "src/pages/reset-password.astro",
  "pages/dashboard.astro.tmpl": "src/pages/dashboard.astro",
};

/** Writes the auth pages and the email-confirmation callback endpoint. */
export function writePages(targetDir: string): void {
  for (const [template, target] of Object.entries(PAGE_TEMPLATES)) {
    writeFileIfMissing(targetDir, target, readTemplate(template));
  }
}
