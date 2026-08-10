import { readTemplate, writeFileIfMissing } from "./utils.js";

/** Writes src/middleware.ts re-exporting the auth middleware. */
export function writeMiddleware(targetDir: string): void {
  writeFileIfMissing(targetDir, "src/middleware.ts", readTemplate("middleware.ts.tmpl"));
}
