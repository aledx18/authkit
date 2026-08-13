import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { readTemplate, writeFileIfMissing } from "./utils.js";

const UI_COMPONENTS = ["Button", "Input", "Card"];

/**
 * Writes the reusable UI components (src/components/ui/*) when missing.
 * Never overwrites existing user components.
 */
function writeComponents(targetDir: string): void {
  for (const name of UI_COMPONENTS) {
    writeFileIfMissing(
      targetDir,
      `src/components/ui/${name}.astro`,
      readTemplate(`components/ui/${name}.astro.tmpl`),
    );
  }
}

/** Writes the auth form component (composite of the ui primitives). */
function writeAuthForm(targetDir: string): void {
  writeFileIfMissing(
    targetDir,
    "src/components/AuthForm.astro",
    readTemplate("components/AuthForm.astro.tmpl"),
  );
}

/**
 * Writes the design-system stylesheet (src/styles/global.css).
 *
 * Only replaces the file when it is missing or still the bare Tailwind stub
 * (`@import "tailwindcss";`) created by `astro add tailwind` — a user's own
 * global.css is left untouched.
 */
function writeStyles(targetDir: string): void {
  const cssPath = path.join(targetDir, "src/styles/global.css");
  const stub = '@import "tailwindcss";';

  if (existsSync(cssPath)) {
    const current = readFileSync(cssPath, "utf-8").trim();
    if (current !== stub) {
      console.log("  · skip src/styles/global.css (user stylesheet detected)");
      return;
    }
  }

  writeFileSync(cssPath, readTemplate("styles/global.css.tmpl"));
  console.log("  · src/styles/global.css");
}

/** Writes the UI components, the auth form and the design-system stylesheet. */
export function writeUi(targetDir: string): void {
  writeComponents(targetDir);
  writeAuthForm(targetDir);
  writeStyles(targetDir);
}
