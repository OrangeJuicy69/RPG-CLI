import { typewriterConfig } from "./System/console-typewriter";
import promptSync from 'prompt-sync'; //loading import
import { SwordSystem } from './System/SwordSystem'; //import Sword System
import { HPsystem, Player } from './System/PlayerHPsystem';
import { MaxHealingPotion, BasicHealingPotion, BigHealingPotion, strangeHealingPotion } from './System/HealingPotion';

// Create one sword system so the sword names can be used with console.log interpolation.
export const swordSystem = new SwordSystem();
const herosword = swordSystem.herosword;
const monstersword = swordSystem.monstersword;
const dragonsword = swordSystem.dragonsword;
const basicsword = swordSystem.basicsword;


// Healing potions
const maxHealingPotion = new MaxHealingPotion();
const basicHealingPotion = new BasicHealingPotion();
const bigHealingPotion = new BigHealingPotion();
const strangePotion = new strangeHealingPotion();

//typewriter configuration
typewriterConfig.delayMs = 120;        // faster for a battle scene
typewriterConfig.delayMs = 120;       // slower for dramatic text
/* typewriterConfig.enabled = false; */    // instant output (menus, stats)
typewriterConfig.enabled = true;


//loading system for now (start)
const prompt = promptSync();

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

const start = async ()/* : Promise<void> */ => {
  console.log('You falling down a dark hole, you hit your head hard and wake up in a strange place...');
  console.log('Your eyes are blurry, you can barely see anything, but you can hear a voice in the distance...');
  console.log('You can barely make out the words, but you can hear it say "Is someone here?"');
  console.log('out of nowhere, a weird looking women appears, she looks like a wolf and a human at the same time, she has a long tail and sharp claws, she is wearing a long cloak and a hood, she has a staff in her hand, she looks like a wizard or a witch, she is looking at you with a curious expression on her face...');
  console.log('She says "Hello, my name is Sira, I am a Wolf, and I have been looking for you, i saw someone falling from a black spot in the sky,"');
  const username: string = prompt('Sira says "i almost forgot to ask, what is your name?" ');
  const player = new Player(`${username}`, 100);
  
  console.log(`Oh ${username}! `);

  console.log(`Please be careful ${username}, I will give you a heal with a ${maxHealingPotion.name} and restore your health to full.`);
  player.health.takeDamage(50);
  console.log(`you looking over you and see a health bar and it says ${player.health.getHp()}/${player.health.getMaxHp()} HP.`);
  maxHealingPotion.heal(player);
  console.log(`You have been healed by "sira"to ${player.health.getHp()}/${player.health.getMaxHp()} HP.`);
  console.log('Sira says "I will take you to the village, but first, I need to ask you a question."');
  console.log('Sira says "Where you from? i never saw anyone from this place before, you must be from a different world, right?"');

  

  
  const answer = prompt(`Hey ${username}, have you ever been to the village before? (yes/no) `).toLowerCase();
  if (answer === "yes" || answer === "y"|| answer === "Yes" || answer === "Y") {
    console.log('Good to hear that! I will take you to the village now, you can get all sorts of things there');
    
    
  } else if (answer === "no"|| answer === "n" || answer === "No"|| answer === "N") {
    
    console.log('Oh, I see. Well, I will take you to the village now, you can get all sorts of things there');
  } else {
    
    console.log('okay? I will take you to the village now, you can get all sorts of things there');
  }
  console.log('you and sira walk to the village.');
console.log('on the way to the village, you see a strange looking creature, it looks like a dragon');
console.log('Sira says "Be careful, that is a dragon, it is very dangerous, here take this"');
console.log(`Sira gives you a ${swordSystem.basicsword} and says "Use this to defend yourself"`);
const choice = prompt('Do you want to attack the dragon or run away? (1/2)');
if (choice === '1') {
  console.log(`You attack the dragon with your ${swordSystem.basicsword} and deal ${swordSystem.damageFOUR()} damage.`);
}
if (choice === '2') {
  console.log(`You run away from the dragon but the dragon chases you and you take ///damage 50 damage but escape safely.`);
}
};




start();