import { rmSync } from "node:fs";
import { BasicHealingPotion } from "../System/HealingPotion";
import { Player } from "../System/PlayerHPsystem";
import { SwordSystem } from "../System/SwordSystem";
import { resetState, save, state } from "../data/stats";
import { createWoodsEnemy } from "./enemy";

//This Script is for the woods section to fight 1 of 3 enemy
//enemy names and damages can be seen in the story/enemys.ts
//You see how much hp the enemy has and so on
//When you killa enemy you will get gold

type Ask = (question: string) => Promise<string>;

export async function visitWoods(player: Player, ask: Ask): Promise<void> {
  const enemy = createWoodsEnemy();
  const swords = new SwordSystem();
  const potion = new BasicHealingPotion();

  //Enemy and hp will show here 
  console.log(`A ${enemy.name} appears! It has ${enemy.health.getHp()} HP.`);
  while (player.health.isAlive() && enemy.health.isAlive()) {
    console.log(`Your HP: ${player.health.getHp()}/${player.health.getMaxHp()} | ${enemy.name} HP: ${enemy.health.getHp()}`);
    const choice = (await ask("1. Attack  2. Use a healing potion  3. Run away: ")).trim().toLowerCase();

    if (choice === "1" || choice === "attack") {
      const damage = swords.damageFor(state.weapon);
      enemy.health.takeDamage(damage);
      console.log(`You hit the ${enemy.name} with ${swords.nameFor(state.weapon)} for ${damage} damage.`);
    } else if (choice === "2" || choice === "potion") {
      const potionCount = state.inventory["basic_healing_potion"] ?? 0;
      if (potionCount < 1) {
        console.log("You don't have any basic healing potions.");
        continue;
      }
      if (player.health.getHp() === player.health.getMaxHp()) {
        console.log("Your HP is already full.");
        continue;
      }
      state.inventory["basic_healing_potion"] = potionCount - 1;
      potion.heal(player);
      save();
      console.log("You used a basic healing potion.");
    } else if (choice === "3" || choice === "run" || choice === "flee") {
      console.log("You escaped");
      console.log("you are going back to the village.");
      return;
    } else {
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
    console.log(`your curent Hp is ${state.hp}`);
    console.log(`You lose everything but start again with the basic stuff`)

    const playerName = state.name;
    resetState(playerName);
    player.health.heal(player.health.getMaxHp());
    save();
    //Trying to restore to basic stats but doesent work at the moment
    //Note for me: 
    /* rmSync("save/save.json", {
      force: true
    }) */
    return;
  }
//when you killed the enemy your kill count goes up and you get gold
//i will also make a separate file for that
  state.kills += 1;
  state.gold += enemy.goldReward;
  save();
  console.log(`You defeated the ${enemy.name} and earned ${enemy.goldReward} gold.`);
}