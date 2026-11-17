"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.visitWoods = visitWoods;
const HealingPotion_1 = require("../System/HealingPotion");
const SwordSystem_1 = require("../System/SwordSystem");
const stats_1 = require("../data/stats");
const enemy_1 = require("./enemy");
async function visitWoods(player, ask) {
    const enemy = (0, enemy_1.createWoodsEnemy)();
    const swords = new SwordSystem_1.SwordSystem();
    const potion = new HealingPotion_1.BasicHealingPotion();
    //Enemy and hp will show here 
    console.log(`A ${enemy.name} appears! It has ${enemy.health.getHp()} HP.`);
    while (player.health.isAlive() && enemy.health.isAlive()) {
        console.log(`Your HP: ${player.health.getHp()}/${player.health.getMaxHp()} | ${enemy.name} HP: ${enemy.health.getHp()}`);
        const choice = (await ask("1. Attack  2. Use a healing potion  3. Run away: ")).trim().toLowerCase();
        if (choice === "1" || choice === "attack") {
            const damage = swords.damageFor(stats_1.state.weapon);
            enemy.health.takeDamage(damage);
            console.log(`You hit the ${enemy.name} for ${damage} damage.`);
        }
        else if (choice === "2" || choice === "potion") {
            const potionCount = stats_1.state.inventory["basic_healing_potion"] ?? 0;
            if (potionCount < 1) {
                console.log("You don't have any basic healing potions.");
                continue;
            }
            if (player.health.getHp() === player.health.getMaxHp()) {
                console.log("Your HP is already full.");
                continue;
            }
            stats_1.state.inventory["basic_healing_potion"] = potionCount - 1;
            potion.heal(player);
            (0, stats_1.save)();
            console.log("You used a basic healing potion.");
        }
        else if (choice === "3" || choice === "run" || choice === "flee") {
            console.log("You escaped");
            console.log("you are going back to the village.");
            return;
        }
        else {
            console.log("Please choose attack, potion, or run."); //if you dont choes 1 of 3 option
            continue;
        }
        if (enemy.health.isAlive()) {
            player.health.takeDamage(enemy.attackDamage);
            console.log(`The ${enemy.name} hits you for ${enemy.attackDamage} damage.`); //enemy name and attack and damage
        }
    }
    //when you die bcs of the enemy you lose your hole inventory (does not work rn(trying to wipe the json and making a new one))
    if (!player.health.isAlive()) {
        console.log("You were knocked out");
        console.log(`your curent Hp is ${stats_1.state.hp}`);
        console.log(`You lose everything but start again with the basic stuff`);
        //Trying to restore to basic stats but doesent work at the moment
        /* rmSync("save/save.json", {
          force: true
        }) */
        return;
    }
    //when you killed the enemy your kill count goes up and you get gold
    stats_1.state.kills += 1;
    stats_1.state.gold += enemy.goldReward;
    (0, stats_1.save)();
    console.log(`You defeated the ${enemy.name} and earned ${enemy.goldReward} gold.`);
}
