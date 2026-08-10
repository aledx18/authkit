import { writeFileIfMissing } from "./utils.js";

const ENV_TEMPLATE = `SUPABASE_URL=https://your-project.supabase.co
PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-anon-key
`;

/** Writes .env and .env.example with placeholder Supabase credentials. */
export function writeEnv(targetDir: string): void {
  writeFileIfMissing(targetDir, ".env", ENV_TEMPLATE);
  writeFileIfMissing(targetDir, ".env.example", ENV_TEMPLATE);
}
