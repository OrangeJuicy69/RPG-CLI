"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swordSystem = void 0;
const console_typewriter_1 = require("./System/console-typewriter");
const prompt_sync_1 = __importDefault(require("prompt-sync")); //loading import
const SwordSystem_1 = require("./System/SwordSystem"); //import Sword System
const PlayerHPsystem_1 = require("./System/PlayerHPsystem");
const HealingPotion_1 = require("./System/HealingPotion");
// Create one sword system so the sword names can be used with console.log interpolation.
exports.swordSystem = new SwordSystem_1.SwordSystem();
const herosword = exports.swordSystem.herosword;
const monstersword = exports.swordSystem.monstersword;
const dragonsword = exports.swordSystem.dragonsword;
const basicsword = exports.swordSystem.basicsword;
// Healing potions
const maxHealingPotion = new HealingPotion_1.MaxHealingPotion();
const basicHealingPotion = new HealingPotion_1.BasicHealingPotion();
const bigHealingPotion = new HealingPotion_1.BigHealingPotion();
const strangePotion = new HealingPotion_1.strangeHealingPotion();
//typewriter configuration
console_typewriter_1.typewriterConfig.delayMs = 120; // faster for a battle scene
console_typewriter_1.typewriterConfig.delayMs = 120; // slower for dramatic text
/* typewriterConfig.enabled = false; */ // instant output (menus, stats)
console_typewriter_1.typewriterConfig.enabled = true;
//loading system for now (start)
const prompt = (0, prompt_sync_1.default)();
/* const total = 50;

const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms)); */
/* const loadAdventure = async (): Promise<void> => {
  const start = Date.now();
  for (let i = 0; i <= total; i++) {
    const elapsed = (Date.now() - start) / 1000;
    const remaining = i ? (elapsed / i) * (total - i) : 0;
    (globalThis as unknown as { process: { stdout: { write(text: string): void } } }).process.stdout.write(
      `\rProgress: ${i}/${total} | Remaining: ${remaining.toFixed(1)}s | Elapsed: ${elapsed.toFixed(1)}s`
    );
    await sleep(100);
  }
  
}; */
//function and clas system for the game (end)
//loading system end (end)
const start = async () => {
    console.log('You falling down a dark hole, you hit your head hard and wake up in a strange place...');
    console.log('Your eyes are blurry, you can barely see anything, but you can hear a voice in the distance...');
    console.log('You can barely make out the words, but you can hear it say "Is someone here?"');
    console.log('out of nowhere, a weird looking women appears, she looks like a wolf and a human at the same time, she has a long tail and sharp claws, she is wearing a long cloak and a hood, she has a staff in her hand, she looks like a wizard or a witch, she is looking at you with a curious expression on her face...');
    console.log('She says "Hello, my name is Sira, I am a Wolf, and I have been looking for you, i saw someone falling from a black spot in the sky,"');
    const username = prompt('Sira says "i almost forgot to ask, what is your name?" ');
    const player = new PlayerHPsystem_1.Player(`${username}`, 100);
    console.log(`Oh ${username}! `);
    console.log(`Please be careful ${username}, I will give you a heal with a ${maxHealingPotion.name} and restore your health to full.`);
    player.health.takeDamage(50);
    console.log(`you looking over you and see a health bar and it says ${player.health.getHp()}/${player.health.getMaxHp()} HP.`);
    maxHealingPotion.heal(player);
    console.log(`You have been healed by "sira"to ${player.health.getHp()}/${player.health.getMaxHp()} HP.`);
    console.log('Sira says "I will take you to the village, but first, I need to ask you a question."');
    console.log('Sira says "Where you from? i never saw anyone from this place before, you must be from a different world, right?"');
    const answer = prompt(`Hey ${username}, have you ever been to the village before? (yes/no) `).toLowerCase();
    if (answer === "yes" || answer === "y" || answer === "Yes" || answer === "Y") {
        console.log('Good to hear that! I will take you to the village now, you can get all sorts of things there');
    }
    else if (answer === "no" || answer === "n" || answer === "No" || answer === "N") {
        console.log('Oh, I see. Well, I will take you to the village now, you can get all sorts of things there');
    }
    else {
        console.log('okay? I will take you to the village now, you can get all sorts of things there');
    }
    console.log('you and sira walk to the village.');
    console.log('on the way to the village, you see a strange looking creature, it looks like a dragon');
    console.log('Sira says "Be careful, that is a dragon, it is very dangerous, here take this"');
    console.log(`Sira gives you a ${exports.swordSystem.basicsword} and says "Use this to defend yourself"`);
    const choice = prompt('Do you want to attack the dragon or run away? (1/2)');
    if (choice === '1') {
        console.log(`You attack the dragon with your ${exports.swordSystem.basicsword} and deal ${exports.swordSystem.damageFOUR()} damage.`);
    }
    if (choice === '2') {
        console.log(`You run away from the dragon but the dragon chases you and you take ///damage 50 damage but escape safely.`);
    }
};
start();
