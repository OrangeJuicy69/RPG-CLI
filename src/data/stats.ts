import { readFileSync, writeFileSync, renameSync, existsSync, mkdirSync, unlinkSync, copyFileSync, } from "node:fs";
import { dirname, resolve } from "node:path";

export interface GameState {
  tutorial: number;
  level: number;
  name: string;
  hp: number;
  weapon: string | null;
  swords: string[];
  inventory: Record<string, number>;
  kills: number;
  gold: number;
  hour: number;
  min: number;
  storyCompleted: number;
}

const defaults: GameState = {
  tutorial: 1,
  level: 1,
  name: "siro",
  hp: 100,
  weapon: "BASIC SWORD",
  swords: ["BASIC SWORD"],
  inventory: {},
  kills: 0,
  gold: 50,
  hour: 12,
  min: 30,
  storyCompleted: 0,
};

const SAVE_PATH = resolve(__dirname, "../../save/save.json");
const SAVE_BACKUP = resolve(__dirname, "../../save/restore-save/backup.json");

export const state: GameState = { ...defaults, swords: [...defaults.swords], inventory: {} };

export function hasSave(path: string = SAVE_PATH): boolean {
  return existsSync(path);
}

export function hasBackup(): boolean {
  return existsSync(SAVE_BACKUP);
}

function loadFrom(path: string): boolean {
  if (!existsSync(path)) return false;

  const data: unknown = JSON.parse(readFileSync(path, "utf8"));
  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    throw new Error(`Invalid save file: expected a JSON object at ${path}`);
  }

  const saved = data as Partial<GameState>;
  const next: GameState = { ...defaults, swords: [...defaults.swords], inventory: {} };

  if (saved.tutorial !== undefined) {
    if (!Number.isInteger(saved.tutorial) || saved.tutorial < 0) throw new Error("Invalid tutorial value in save file");
    next.tutorial = saved.tutorial;
  }
  if (saved.level !== undefined) {
    if (!Number.isInteger(saved.level) || saved.level < 1) throw new Error("Invalid level value in save file");
    next.level = saved.level;
  }
  if (saved.name !== undefined) {
    if (typeof saved.name !== "string" || saved.name.length === 0) throw new Error("Invalid player name in save file");
    next.name = saved.name;
  }
  if (saved.hp !== undefined) {
    if (!Number.isFinite(saved.hp) || saved.hp < 0 || saved.hp > 100) throw new Error("Invalid HP value in save file");
    next.hp = saved.hp;
  }
  if (saved.weapon !== undefined) {
    if (saved.weapon !== null && typeof saved.weapon !== "string") throw new Error("Invalid weapon in save file");
    next.weapon = saved.weapon;
  }
  if (saved.swords !== undefined) {
    if (!Array.isArray(saved.swords) || saved.swords.some((sword) => typeof sword !== "string" || sword.length === 0)) {
      throw new Error("Invalid swords value in save file");
    }
    next.swords = [...new Set(saved.swords)];
  } else if (next.weapon) {
    // Older save files only stored the currently equipped weapon.
    next.swords = [next.weapon];
  }
  if (next.weapon && !next.swords.includes(next.weapon)) {
    next.swords.push(next.weapon);
  }
  if (saved.inventory !== undefined) {
    if (typeof saved.inventory !== "object" || saved.inventory === null || Array.isArray(saved.inventory)) {
      throw new Error("Invalid inventory in save file");
    }
    for (const [item, quantity] of Object.entries(saved.inventory)) {
      if (!Number.isInteger(quantity) || quantity < 0) throw new Error(`Invalid inventory quantity for "${item}"`);
      next.inventory[item] = quantity;
    }
  }
  if (saved.kills !== undefined) {
    if (!Number.isInteger(saved.kills) || saved.kills < 0) throw new Error("Invalid kills value in save file");
    next.kills = saved.kills;
  }
  if (saved.gold !== undefined) {
    if (!Number.isInteger(saved.gold) || saved.gold < 0) throw new Error("Invalid gold value in save file");
    next.gold = saved.gold;
  }
  if (saved.hour !== undefined) {
    if (!Number.isInteger(saved.hour) || saved.hour < 0 || saved.hour > 23) throw new Error("Invalid hour value in save file");
    next.hour = saved.hour;
  }
  if (saved.min !== undefined) {
    if (!Number.isInteger(saved.min) || saved.min < 0 || saved.min > 59) throw new Error("Invalid min value in save file");
    next.min = saved.min;
  }
  if (saved.storyCompleted !== undefined) {
    if (!Number.isInteger(saved.storyCompleted) || saved.storyCompleted < 0) throw new Error("Invalid story progress in save file");
    next.storyCompleted = saved.storyCompleted;
  }

  Object.assign(state, next);
  return true;
}

export const load = (): boolean => loadFrom(SAVE_PATH);
export const loadBackup = (): boolean => loadFrom(SAVE_BACKUP);

export function save(): void {
  mkdirSync(dirname(SAVE_PATH), { recursive: true });
  mkdirSync(dirname(SAVE_BACKUP), { recursive: true });

  // Keep the previous save as the backup before overwriting it
  const serialized = JSON.stringify(state, null, 2);
  if (existsSync(SAVE_PATH) && readFileSync(SAVE_PATH, "utf8") !== serialized) {
    copyFileSync(SAVE_PATH, SAVE_BACKUP);
  }

  const tmp = SAVE_PATH + ".tmp";
  writeFileSync(tmp, serialized, "utf8");
  renameSync(tmp, SAVE_PATH);
}

export function deleteSave(): boolean {
  if (!existsSync(SAVE_PATH)) return false;
  unlinkSync(SAVE_PATH);
  return true;
}

export function resetState(name: string = defaults.name): void {
  Object.assign(state, {
    ...defaults,
    name,
    swords: [...defaults.swords],
    inventory: { basic_healing_potion: 2 },
  });
}