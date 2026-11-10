// Node.js 18+, TypeScript target ES2020 or newer
// This module patches console.log to print text with a typewriter effect, with configurable delays for normal characters and punctuation. It also provides a rawLog function for instant output.
import { format } from "node:util";

export const typewriterConfig = {
  delayMs: 120,          // delay per normal character
  punctuationMs: 120,   // extra pause after . ! ? , : ;
  enabled: true,        // false = print instantly
};

const originalLog = console.log.bind(console);
const write = process.stdout.write.bind(process.stdout);
const sleepBuffer = new Int32Array(new SharedArrayBuffer(4));

function sleepSync(ms: number): void {
  if (ms > 0) Atomics.wait(sleepBuffer, 0, 0, ms);
}

const PAUSE_CHARS = new Set([".", "!", "?", ",", ":", ";"]);

/** Original, instant console.log for debug output. */
export const rawLog = originalLog;

console.log = (...args: unknown[]): void => {
  const text = format(...args) + "\n";

  if (!typewriterConfig.enabled) {
    write(text);
    return;
  }

  for (const ch of Array.from(text)) {
    write(ch);
    if (ch === "\n" || ch === " ") continue;
    sleepSync(PAUSE_CHARS.has(ch) ? typewriterConfig.punctuationMs : typewriterConfig.delayMs);
  }
};