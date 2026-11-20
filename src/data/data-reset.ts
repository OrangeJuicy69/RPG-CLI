import { deleteSave, load, state } from "./stats";
import { SwordSystem } from "../System/SwordSystem";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

async function askDel(): Promise<string> {
    const rl = createInterface({ input, output });
    try {
        const answer = await rl.question("Do you want to delete your save file? (y/N) ");
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

    console.log(`Hey ${state.name}. You're outside the matrix now.`);
    console.log("Here you can reset your save file or change your stats.");
    console.log("Your current saved stats are:");
    console.log(`Name: ${state.name}`);
    console.log(`HP: ${state.hp}`);
    console.log("Level: // not used yet!");
    console.log(`Current inventory items: ${JSON.stringify(state.inventory)}`);
    console.log(`Current gold: ${state.gold}`);
    console.log(`Current weapon in use: ${state.weapon ?? swordSystem.basicsword}`);

    const answer = await askDel();
    if (answer === "y" || answer === "yes") {
        if (deleteSave()) {
            console.log("Save file was deleted.");
            console.log("Play the tutorial again or add a new save file.");
        } else {
            console.log("No save file was found to delete.");
        }
    } else {
        console.log("Save file was not deleted.");
    }
}

runDataReset().catch((error: unknown) => {
    console.error("Unable to reset save file:", error);
    process.exitCode = 1;
});


