import { chapter1 } from "./chapters1";
import { chapter2 } from "./chapters2";
import { chapter3 } from "./chapters3";

// Add or remove chapters here(if you make new ones); everything else adapts automatically
//this export is only for exporting every chapter to the main index file
export const CHAPTERS = [chapter1, chapter2, chapter3] as const;
