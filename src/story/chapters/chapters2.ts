import { Chapter } from "./types";
import { SwordSystem } from "../../System/SwordSystem";
import { state } from "../../data/stats";

export const chapter2: Chapter = {
    title: "The Dragon on the Road",
    play: async (ask, player) => {
        const swords = new SwordSystem();
        const alreadyOwnsBasicSword = state.swords.includes(swords.basicsword);
        if (!alreadyOwnsBasicSword) state.swords.push(swords.basicsword);
        if (!state.weapon) state.weapon = swords.basicsword;

        console.log("As you and Sira walk toward the village, a dragon appears on the road.");
        console.log("\"Be careful! That dragon is dangerous,\" Sira warns.");
        console.log(alreadyOwnsBasicSword
            ? `Sira checks your ${swords.basicsword} and tells you to defend yourself.`
            : `Sira gives you a ${swords.basicsword} and tells you to defend yourself.`);
        console.log(`You prepare to fight with your ${swords.nameFor(state.weapon)}.`);
        while (true) {
            const choice = (await ask("1. Attack the dragon  2. Run away  0. Return to the village: "))
                .trim()
                .toLowerCase();
            if (choice === "0" || choice === "return" || choice === "quit") return "quit";
            if (choice === "1" || choice === "attack") {
                const weapon = swords.nameFor(state.weapon);
                const damage = swords.damageFor(state.weapon);
                console.log(`You strike the dragon with your ${weapon} and deal ${damage} damage.`);
                console.log("Sira distracts the dragon long enough for you both to reach the village safely.");
                return "completed";
            }
            if (choice === "2" || choice === "run" || choice === "flee") {
                player.health.takeDamage(50);
                console.log("You run, but the dragon catches you with a blast before Sira helps you escape.");
                if (!player.health.isAlive()) {
                    console.log("Sira uses a healing potion to get you back on your feet.");
                    player.health.heal(player.health.getMaxHp());
                }
                console.log(`You reach the village with ${player.health.getHp()}/${player.health.getMaxHp()} HP.`);
                return "completed";
            }
            console.log("Please choose 1, 2, or 0.");
        }
    },
};