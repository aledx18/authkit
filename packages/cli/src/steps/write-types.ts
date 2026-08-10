import { writeFileIfMissing } from "./utils.js";

const ENV_D_TYPES = `/// <reference types="@aledx18/astro/types" />
`;

/** Writes src/env.d.ts so Astro.locals is typed with the auth locals. */
export function writeTypes(targetDir: string): void {
  writeFileIfMissing(targetDir, "src/env.d.ts", ENV_D_TYPES);
}
