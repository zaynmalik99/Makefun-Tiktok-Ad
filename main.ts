// Entry point for the bring-the-humans-03 submission.
//
// The entry itself is the TikTok video named in VIDEO.json, so this
// program has exactly one job: hand that file to the grader by copying
// it into the output directory make.fun points us at. It reads nothing
// else, touches no network and always writes the same bytes.

import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const repoDir = process.env.MAKEFUN_BOT_DIR ?? ".";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const source = join(repoDir, "VIDEO.json");
if (!existsSync(source)) {
  throw new Error(`VIDEO.json not found in ${repoDir}`);
}

// Fail loudly on a malformed file here rather than at the grader: the
// entry only counts when VIDEO.json is an object carrying a url string.
const parsed: unknown = JSON.parse(readFileSync(source, "utf8"));
if (
  typeof parsed !== "object" ||
  parsed === null ||
  typeof (parsed as { url?: unknown }).url !== "string"
) {
  throw new Error("VIDEO.json must be an object with a url string");
}

mkdirSync(outputDir, { recursive: true });
copyFileSync(source, join(outputDir, "VIDEO.json"));
