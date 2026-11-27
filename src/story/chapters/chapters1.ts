import { Chapter } from "./types";


//this code is heavly helped by copilot
export const chapter1: Chapter = {
    title: "Sira in the Strange Land",
    play: async (ask, player) => {
        console.log("You fall through a dark hole in the sky, hit your head, and wake in a strange place.");
        console.log("Your vision is blurry. A distant voice asks, \"Is someone here?\"");
        console.log("A wolf-like woman in a cloak steps from the trees, carrying a staff.");
        console.log("She introduces herself as Sira and says she saw you fall from a black spot in the sky.");
        console.log(`\"What is your name?\" she asks. You tell her ${player.name}.`);
        console.log("\"Are you hurt? Let me help you.\"");
        const previousHp = player.health.getHp();
        player.health.heal(player.health.getMaxHp());
        if (player.health.getHp() > previousHp) {
            console.log(`Sira heals you. You now have ${player.health.getHp()}/${player.health.getMaxHp()} HP.`);
        } else {
            console.log("Sira checks your health; you are already at full HP.");
        }
        console.log("Sira asks where you came from. \"I have never seen anyone fall from the sky before.\"");
        while (true) {
            const origin = (await ask("1. I came from another world  2. I don't know  0. Return to the village: "))
                .trim()
                .toLowerCase();
            if (origin === "0" || origin === "return" || origin === "quit") return "quit";
            if (origin === "1" || origin === "yes" || origin === "another world") {
                console.log("\"Then you really are from somewhere beyond our world,\" Sira says.");
                break;
            }
            if (origin === "2" || origin === "no" || origin === "unknown") {
                console.log("\"That's all right,\" Sira says. \"We'll find out more together.\"");
                break;
            }
            console.log("Please choose 1, 2, or 0.");
        }
        console.log("Sira says she will take you to the village, then asks if you have ever been there before.");
        console.log("On the path, you notice a small charm lying in the grass and pick it up.");
        // dialogue, choices, fights, etc. go here
        while (true) {
            const choice = (await ask("1. Yes, I have  2. No, I haven't  0. Return to the village: "))
                .trim()
                .toLowerCase();
            if (choice === "0" || choice === "return" || choice === "quit") return "quit";
            if (choice === "1" || choice === "yes" || choice === "y") {
                console.log("\"Good to hear that,\" Sira says. \"The village is still the safest place nearby.\"");
                return "completed";
            }
            if (choice === "2" || choice === "no" || choice === "n") {
                console.log("\"Then I'll show you around,\" Sira says. \"The village has everything you need to get started.\"");
                return "completed";
            }
            console.log("Please choose 1, 2, or 0.");
        }
    },
};