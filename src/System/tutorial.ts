import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { state } from "../data/stats";
import { SwordSystem } from "./SwordSystem";


async function askName(): Promise<string> {
    const rl = createInterface({ input: stdin, output: stdout });
    try {
        while (true) {
            const name = (await rl.question("So tell me, what's your name? ")).trim();
            if (name.length >= 1 && name.length <= 20) return name;
            console.log("Please enter 1 to 20 characters.");
        }
    } finally {
        rl.close();
    }
}

export async function runTutorial(): Promise<void> {
    const swordSystem = new SwordSystem();

    console.log("It's your first time.");
    console.log("Let's start with the story. It's still your first time.");
    console.log("So let's start with the tutorial.");
    console.log("You have a HP bar. Your max HP is 100 when you start the game.");
    console.log("You have a weapon, you can use it to attack enemies.");
    console.log("Sometimes you have only 1 attack on a sword, but sometimes you can have 2 when you buy a new sword.");
    console.log("You have an inventory, you can use it to store items.");
    console.log("You start with 50 gold. Visit the shop for potions and swords.");
    console.log("Let's set your name before you start.");

    state.name = await askName();
    console.log(`Welcome, ${state.name}!`);

    state.weapon = swordSystem.basicsword;
    state.inventory.basic_healing_potion = 2;
    console.log(`You received the ${swordSystem.basicsword} and 2 basic healing potions.`);
}