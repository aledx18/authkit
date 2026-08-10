#!/usr/bin/env node
import { init } from "./commands/init.js";

const USAGE = `authkit — Supabase auth scaffolding

Usage:
  authkit init [dir]   Scaffold auth into an Astro project (default: current dir)
`;

const [command, ...rest] = process.argv.slice(2);

switch (command) {
  case "init": {
    await init(rest[0] ?? process.cwd());
    break;
  }
  case "--help":
  case "-h": {
    console.log(USAGE);
    break;
  }
  default: {
    console.error(`Unknown command: ${command ?? "(none)"}\n`);
    console.error(USAGE);
    process.exit(1);
  }
}
