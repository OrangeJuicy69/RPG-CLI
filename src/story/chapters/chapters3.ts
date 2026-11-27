import { Chapter } from "./types";

export const chapter3: Chapter = {
    title: "A Clue at the Village Gate",
    play: async (ask) => {
        console.log("At the village gate, a traveler recognizes a strange charm from the road.");
        console.log("\"The old watchtower may explain why you fell from the sky,\" they say.");
        while (true) {
            const choice = (await ask("1. Ask about the watchtower  2. Keep the charm  0. Return to the village: "))
                .trim()
                .toLowerCase();
            if (choice === "0" || choice === "return" || choice === "quit") return "quit";
            if (choice === "1" || choice === "ask") {
                console.log("The traveler marks the watchtower on your map. Your journey has a direction.");
                return "completed";
            }
            if (choice === "2" || choice === "keep") {
                console.log("You tuck the charm away. Its faint glow points toward the watchtower.");
                return "completed";
            }
            console.log("Please choose 1, 2, or 0.");
        }
    },
};
