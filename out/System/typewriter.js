"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typewrite = typewrite;
exports.skipOnKey = skipOnKey;
const node_readline_1 = require("node:readline");
async function typewrite(text, { delayMs = 30, signal } = {}) {
    if (!Number.isFinite(delayMs) || delayMs < 0) {
        throw new RangeError("delayMs must be a non-negative finite number");
    }
    const characters = Array.from(text);
    for (let index = 0; index < characters.length; index++) {
        if (signal?.aborted) {
            process.stdout.write(characters.slice(index).join(""));
            return;
        }
        process.stdout.write(characters[index]);
        if (delayMs > 0) {
            await new Promise(resolve => setTimeout(resolve, delayMs));
        }
    }
}
function skipOnKey() {
    const controller = new AbortController();
    const stdin = process.stdin;
    if (!stdin.isTTY || typeof stdin.setRawMode !== "function") {
        return { signal: controller.signal, dispose: () => undefined };
    }
    (0, node_readline_1.emitKeypressEvents)(stdin);
    const wasRaw = stdin.isRaw;
    const onKeypress = () => controller.abort();
    stdin.setRawMode(true);
    stdin.on("keypress", onKeypress);
    return {
        signal: controller.signal,
        dispose: () => {
            stdin.off("keypress", onKeypress);
            if (stdin.isRaw !== wasRaw) {
                stdin.setRawMode(wasRaw);
            }
        },
    };
}
