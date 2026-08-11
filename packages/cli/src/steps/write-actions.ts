import { readTemplate, writeFileIfMissing } from "./utils.js";

/** Writes src/actions/index.ts wiring the auth actions. */
export function writeActions(targetDir: string): void {
  writeFileIfMissing(targetDir, "src/actions/index.ts", readTemplate("src/actions/index.ts.tmpl"));
}
