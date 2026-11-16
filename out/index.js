"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const console_typewriter_1 = require("./System/console-typewriter");
const PlayerHPsystem_1 = require("./System/PlayerHPsystem");
const stats_1 = require("./data/stats");
const tutorial_1 = require("./System/tutorial");
const shop_1 = require("./story/shop");
const woods_1 = require("./story/woods");
const promises_1 = require("node:readline/promises");
const node_process_1 = require("node:process");
//typewriter configuration
console_typewriter_1.typewriterConfig.delayMs = 120; // delay for output (console.log in ms)
console_typewriter_1.typewriterConfig.enabled = true; // enable/disable typewriter effect
async function main() {
    if (!(0, stats_1.load)()) {
        await (0, tutorial_1.runTutorial)();
        (0, stats_1.save)();
    }
    const player = new PlayerHPsystem_1.Player(stats_1.state.name, 100, stats_1.state.hp, (hp) => {
        stats_1.state.hp = hp;
        (0, stats_1.save)();
    });
    (0, stats_1.save)();
    console.log(`Welcome ${stats_1.state.name}! HP: ${player.health.getHp()}/${player.health.getMaxHp()}, Gold: ${stats_1.state.gold}`);
    const prompt = (0, promises_1.createInterface)({ input: node_process_1.stdin, output: node_process_1.stdout });
    try {
        let exploring = true;
        while (exploring) {
            console.log("\nWhere would you like to go?");
            console.log("1. Shop");
            console.log("2. Woods");
            console.log("3. Camp (recover 30 HP)");
            console.log("4. Leave the game");
            const destination = (await prompt.question("Choose a place: ")).trim().toLowerCase();
            switch (destination) {
                case "1":
                case "shop":
                    await (0, shop_1.visitShop)((question) => prompt.question(question));
                    break;
                case "2":
                case "woods":
                case "forest":
                    await (0, woods_1.visitWoods)(player, (question) => prompt.question(question));
                    break;
                case "3":
                case "camp":
                case "rest": {
                    const previousHp = player.health.getHp();
                    player.health.heal(30);
                    if (player.health.getHp() === previousHp) {
                        console.log("You are already at full HP.");
                    }
                    else {
                        console.log(`You rested at camp. HP: ${player.health.getHp()}/${player.health.getMaxHp()}.`);
                    }
                    break;
                }
                case "4":
                case "quit":
                case "leave":
                    exploring = false;
                    console.log("See you next time!");
                    break;
                default:
                    console.log("Please choose shop, woods, camp, or leave.");
            }
        }
    }
    finally {
        prompt.close();
    }
}
main().catch((error) => {
    console.error("Unable to start the game:", error);
    process.exitCode = 1;
});
