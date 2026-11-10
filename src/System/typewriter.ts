import { emitKeypressEvents } from "node:readline";

export interface TypewriterOptions {
  delayMs?: number;
  signal?: AbortSignal;
}

export async function typewrite(
  text: string,
  { delayMs = 30, signal }: TypewriterOptions = {},
): Promise<void> {
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
      await new Promise<void>(resolve => setTimeout(resolve, delayMs));
    }
  }
}

export function skipOnKey(): { signal: AbortSignal; dispose: () => void } {
  const controller = new AbortController();
  const stdin = process.stdin;

  if (!stdin.isTTY || typeof stdin.setRawMode !== "function") {
    return { signal: controller.signal, dispose: () => undefined };
  }

  emitKeypressEvents(stdin);
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
