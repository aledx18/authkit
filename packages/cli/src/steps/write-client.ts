import { readTemplate, writeFileIfMissing } from "./utils.js";

/** Writes src/lib/supabase/client.ts and server.ts from templates. */
export function writeClient(targetDir: string): void {
  writeFileIfMissing(
    targetDir,
    "src/lib/supabase/client.ts",
    readTemplate("lib/supabase/client.ts.tmpl"),
  );
  writeFileIfMissing(
    targetDir,
    "src/lib/supabase/server.ts",
    readTemplate("lib/supabase/server.ts.tmpl"),
  );
}
