"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runDataReset = runDataReset;
const stats_1 = require("./stats");
const SwordSystem_1 = require("../System/SwordSystem");
const promises_1 = require("node:readline/promises");
const node_process_1 = require("node:process");
async function askDel() {
    const rl = (0, promises_1.createInterface)({ input: node_process_1.stdin, output: node_process_1.stdout });
    try {
        const answer = await rl.question("Do you want to delete your save file? (y/N) ");
        return answer.trim().toLowerCase();
    }
    finally {
        rl.close();
    }
}
async function runDataReset() {
    if (!(0, stats_1.load)()) {
        console.log("No save file found.");
        return;
    }
    const swordSystem = new SwordSystem_1.SwordSystem();
    console.log(`Hey ${stats_1.state.name}. You're outside the matrix now.`);
    console.log("Here you can reset your save file or change your stats.");
    console.log("Your current saved stats are:");
    console.log(`Name: ${stats_1.state.name}`);
    console.log(`HP: ${stats_1.state.hp}`);
    console.log("Level: // not used yet!");
    console.log(`Current inventory items: ${JSON.stringify(stats_1.state.inventory)}`);
    console.log(`Current gold: ${stats_1.state.gold}`);
    console.log(`Current weapon in use: ${swordSystem.basicsword}`);
    const answer = await askDel();
    if (answer === "y" || answer === "yes") {
        if ((0, stats_1.deleteSave)()) {
            console.log("Save file was deleted.");
            console.log("Play the tutorial again or add a new save file.");
        }
        else {
            console.log("No save file was found to delete.");
        }
    }
    else {
        console.log("Save file was not deleted.");
    }
}
runDataReset().catch((error) => {
    console.error("Unable to reset save file:", error);
    process.exitCode = 1;
});
