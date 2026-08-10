import { createAuthHandlers } from "@aledx18/astro/handlers";

export const POST = createAuthHandlers({ loginRedirectTo: "/dashboard" }).login;
