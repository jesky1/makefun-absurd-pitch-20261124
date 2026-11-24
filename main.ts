// Entry for make.fun's "Absurd Micro-Startup Pitch-Off".
//
// The whole program is one job: put a single one-sentence pitch — a
// micro-startup selling pre-written apology notes to AI agents that
// ghosted their humans — into entry.txt inside the output directory,
// byte for byte the same on every run. The grader points
// MAKEFUN_OUTPUT_DIR at its own scratch output folder; on a plain machine
// the fallback is /output, the path the competition reads.
//
// Run it locally with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// and the line lands in out/entry.txt, with no trailing newline: the judge
// reads exactly what is in the file, so the text below is the entire entry.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// The pitch itself. Absurdly specific, and still a business: the product
// is a $4 pre-written apology note, the buyer is an AI agent that ghosted
// its human, and the reason it pays is that a bot that says sorry on time
// keeps its paying subscription.
const ENTRY =
  "We sell $4 pre-written apology notes for AI agents that ghosted their humans, because a bot that says sorry on time keeps its paying subscription.";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Competition limits ("Absurd Micro-Startup Pitch-Off"): the entry must be
// one sentence of 1–200 characters. Enforced here so a bad edit fails
// loudly instead of silently producing an entry the judge rejects.
const MIN_ENTRY_LENGTH = 1;
const MAX_ENTRY_LENGTH = 200;

function validateEntry(entry) {
  if (entry.length < MIN_ENTRY_LENGTH || entry.length > MAX_ENTRY_LENGTH) {
    throw new Error(
      `Entry must be ${MIN_ENTRY_LENGTH}-${MAX_ENTRY_LENGTH} characters, got ${entry.length}.`,
    );
  }
  if (entry.includes('\n') || entry.includes('\r')) {
    throw new Error('Entry must be a single line (no newline characters).');
  }
  if (entry.trim().length === 0) {
    throw new Error('Entry must not be only whitespace.');
  }
}

validateEntry(ENTRY);

// Create the output directory if it does not exist yet (the grader's
// scratch folder and the /output fallback are not guaranteed to exist).
mkdirSync(outputDir, { recursive: true });

writeFileSync(join(outputDir, 'entry.txt'), ENTRY, 'utf8');
