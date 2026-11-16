"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rawLog = exports.typewriterConfig = void 0;
// Node.js 18+, TypeScript target ES2020 or newer
// This module patches console.log to print text with a typewriter effect, with configurable delays for normal characters and punctuation. It also provides a rawLog function for instant output.
const node_util_1 = require("node:util");
exports.typewriterConfig = {
    delayMs: 120, // delay per normal character
    punctuationMs: 120, // extra pause after . ! ? , : ;
    enabled: true, // false = print instantly
};
const originalLog = console.log.bind(console);
const write = process.stdout.write.bind(process.stdout);
const sleepBuffer = new Int32Array(new SharedArrayBuffer(4));
function sleepSync(ms) {
    if (ms > 0)
        Atomics.wait(sleepBuffer, 0, 0, ms);
}
const PAUSE_CHARS = new Set([".", "!", "?", ",", ":", ";"]);
/** Original, instant console.log for debug output. */
exports.rawLog = originalLog;
console.log = (...args) => {
    const text = (0, node_util_1.format)(...args) + "\n";
    if (!exports.typewriterConfig.enabled) {
        write(text);
        return;
    }
    for (const ch of Array.from(text)) {
        write(ch);
        if (ch === "\n" || ch === " ")
            continue;
        sleepSync(PAUSE_CHARS.has(ch) ? exports.typewriterConfig.punctuationMs : exports.typewriterConfig.delayMs);
    }
};
