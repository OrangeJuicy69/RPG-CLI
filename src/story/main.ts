// story.ts  (TypeScript 5.x, Node 18+ assumed look if your node is on the newest version)
import { save, state } from "../data/stats";
import { Player } from "../System/PlayerHPsystem";
import { CHAPTERS } from "./chapters";
import { type Ask } from "./chapters/types";

/** Number of finished chapters, clamped to a valid range (guards against bad save data). */
export function getCompletedChapters(): number {
    const raw = Number(state.storyCompleted ?? 0);
    return Math.min(Math.max(Number.isFinite(raw) ? Math.floor(raw) : 0, 0), CHAPTERS.length);
}

export function getStoryStatus(): string {
    const done = getCompletedChapters();
    if (done === 0) return "Not started yet";
    if (done === CHAPTERS.length) return "Completed";
    return `In progress: next is "${CHAPTERS[done].title}"`;
}

export function renderProgressBar(width = 20): string {
    const done = getCompletedChapters();
    const ratio = done / CHAPTERS.length;
    const filled = Math.round(ratio * width);
    return `[${"#".repeat(filled)}${"-".repeat(width - filled)}] ${Math.round(ratio * 100)}% (${done}/${CHAPTERS.length})`;
}

export async function story(ask: Ask, player: Player): Promise<void> {
    console.log(`Hey ${state.name}`);
    console.log("Before we start, here is some info:");
    console.log("- Your story progress is saved after each chapter.");
    console.log("- You can always go back to the base game.");
    console.log(`Current status: ${getStoryStatus()}`);
    console.log(renderProgressBar());

    if (getCompletedChapters() >= CHAPTERS.length) {
        console.log("You already finished the story.");
        return;
    }

    // Resume from the first unfinished chapter.
    for (let i = getCompletedChapters(); i < CHAPTERS.length; i++) {
        console.log(`\n=== ${CHAPTERS[i].title} ===`);
        const result = await CHAPTERS[i].play(ask, player);

        if (result === "quit") {
            console.log("Returning to the base game. Progress kept.");
            return;
        }

        state.storyCompleted = i + 1;
        save(); // persist after every chapter
        console.log(renderProgressBar());
    }

    console.log("\nStory completed.");
}