// Keeping the type in its own file avoids circular imports between main.ts and the chapters.
import type { Player } from "../../System/PlayerHPsystem";

export type ChapterResult = "completed" | "quit";

export type Ask = (question: string) => Promise<string>;

export interface Chapter {
    title: string;
    play: (ask: Ask, player: Player) => Promise<ChapterResult>;
}