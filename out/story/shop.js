"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.visitShop = visitShop;
const stats_1 = require("../data/stats");
const SwordSystem_1 = require("../System/SwordSystem");
const BASIC_POTION_PRICE = 20;
const MONSTER_SWORD_PRICE = 75;
const HERO_SWORD_PRICE = 150;
async function visitShop(ask) {
    const swords = new SwordSystem_1.SwordSystem();
    console.log("Welcome to the shop.");
    while (true) {
        console.log(`You have ${stats_1.state.gold} gold.`);
        console.log(`1. Basic healing potion (${BASIC_POTION_PRICE} gold)`);
        console.log(`2. ${swords.monstersword} (${MONSTER_SWORD_PRICE} gold)`);
        console.log(`3. ${swords.herosword} (${HERO_SWORD_PRICE} gold)`);
        console.log("0. Leave the shop");
        const choice = (await ask("What would you like to buy? ")).trim().toLowerCase();
        if (choice === "0" || choice === "leave" || choice === "exit")
            return;
        const goods = {
            "1": { name: "basic healing potion", price: BASIC_POTION_PRICE },
            "2": { name: swords.monstersword, price: MONSTER_SWORD_PRICE },
            "3": { name: swords.herosword, price: HERO_SWORD_PRICE },
        };
        const item = goods[choice];
        if (!item) {
            console.log("Please choose 1, 2, 3, or 0.");
            continue;
        }
        if (stats_1.state.gold < item.price) {
            console.log("You don't have enough gold.");
            continue;
        }
        stats_1.state.gold -= item.price;
        if (choice === "1") {
            stats_1.state.inventory["basic_healing_potion"] = (stats_1.state.inventory["basic_healing_potion"] ?? 0) + 1;
        }
        else {
            stats_1.state.weapon = item.name;
        }
        (0, stats_1.save)();
        console.log(`Bought ${item.name}.`);
    }
}
