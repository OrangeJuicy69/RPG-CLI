import { load, resetState, save, state } from "./stats";
import { SwordSystem } from "../System/SwordSystem";
import { runTutorial } from "../System/tutorial";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
/* import { defaults: GameState } from "../data/stats" */ //i have to fix this today

async function askDel(): Promise<string> {
    const rl = createInterface({ input, output });
    try {
        const answer = await rl.question("Would you like to reset your game data? (y/N) ");
        return answer.trim().toLowerCase();
    }
    finally {
        rl.close();
    }
}

export async function runDataReset(): Promise<void> {
    if (!load()) {
        console.log("No save file found.");
        return;
    }

    const swordSystem = new SwordSystem();

/*     console.log(`Hey ${state.name}. You're outside the matrix now.`);
    console.log("Here you can reset your save file or change your stats.");
    console.log("Your current saved stats are:");
    console.log(`Name: ${state.name}`);
    console.log(`HP: ${state.hp}`);
    console.log("Level: // not used yet!");
    console.log(`Current inventory items: ${JSON.stringify(state.inventory)}`);
    console.log(`Current gold: ${state.gold}`);
    console.log(`Current weapon in use: ${state.weapon ?? swordSystem.basicsword}`); */

    const answer = await askDel();
    if (answer === "y" || answer === "yes") {
        resetState();
        await runTutorial();
        save();
        console.log("Save data was reset. A new game is ready.");
    } else {
        console.log("Save data was not reset.");
    }
}




