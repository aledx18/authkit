import { renderTemplate, writeFileIfMissing } from "./utils.js";

const ENV_TEMPLATE = `SUPABASE_URL={{SUPABASE_URL}}
PUBLIC_SUPABASE_PUBLISHABLE_KEY={{PUBLIC_SUPABASE_PUBLISHABLE_KEY}}
`;

const PLACEHOLDERS: Record<string, string> = {
  SUPABASE_URL: "https://your-project.supabase.co",
  PUBLIC_SUPABASE_PUBLISHABLE_KEY: "your-anon-key",
};

/**
 * Writes the environment file.
 *
 * With credentials from the prompt: writes `.env` with the real values.
 * Without credentials: writes `.env.example` with placeholders.
 */
export function writeEnv(targetDir: string, env: { url: string; key: string }): void {
  if (env.url && env.key) {
    writeFileIfMissing(
      targetDir,
      ".env",
      renderTemplate(ENV_TEMPLATE, {
        SUPABASE_URL: env.url,
        PUBLIC_SUPABASE_PUBLISHABLE_KEY: env.key,
      }),
    );
  } else {
    writeFileIfMissing(targetDir, ".env.example", renderTemplate(ENV_TEMPLATE, PLACEHOLDERS));
    console.log("  · no credentials given — copy .env.example to .env and fill it in");
  }
}
