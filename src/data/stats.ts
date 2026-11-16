import { readFileSync, writeFileSync, renameSync, existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

export interface GameState {
    tutorial: number;
    level: number;
    name: string;
    hp: number;
    weapon: string | null;
    inventory: Record<string, number>;
    kills: number;
    gold: number;
}

const defaults: GameState = {
    tutorial: 1,
    level: 1,
    name: "siro",
    hp: 100,
    weapon: null,
    inventory: {},
    kills: 0,
    gold: 50,
};

const SAVE_PATH = resolve(__dirname, "../../save/save.json");

export const state: GameState = { ...defaults, inventory: {} };

export function hasSave(): boolean {
  return existsSync(SAVE_PATH);
}

export function load(): boolean {
  if (!hasSave()) return false;

  const data: unknown = JSON.parse(readFileSync(SAVE_PATH, "utf8"));
  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    throw new Error(`Invalid save file: expected a JSON object at ${SAVE_PATH}`);
  }

  const saved = data as Partial<GameState>;
  const next: GameState = {
    ...defaults,
    inventory: {},
  };

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

  Object.assign(state, next);
  return true;
}

export function save(): void {
  mkdirSync(dirname(SAVE_PATH), { recursive: true });
  const tmp = SAVE_PATH + ".tmp";
  writeFileSync(tmp, JSON.stringify(state, null, 2), "utf8");
  renameSync(tmp, SAVE_PATH);
}