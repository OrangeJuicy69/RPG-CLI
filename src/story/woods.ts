import { BasicHealingPotion } from "../System/HealingPotion";
import { Player } from "../System/PlayerHPsystem";
import { SwordSystem } from "../System/SwordSystem";
import { save, state } from "../data/stats";
import { createWoodsEnemy } from "./enemy";

type Ask = (question: string) => Promise<string>;

export async function visitWoods(player: Player, ask: Ask): Promise<void> {
  const enemy = createWoodsEnemy();
  const swords = new SwordSystem();
  const potion = new BasicHealingPotion();

  console.log(`A ${enemy.name} appears! It has ${enemy.health.getHp()} HP.`);
  while (player.health.isAlive() && enemy.health.isAlive()) {
    console.log(`Your HP: ${player.health.getHp()}/${player.health.getMaxHp()} | ${enemy.name} HP: ${enemy.health.getHp()}`);
    const choice = (await ask("1. Attack  2. Use a healing potion  3. Run away: ")).trim().toLowerCase();

    if (choice === "1" || choice === "attack") {
      const damage = swords.damageFor(state.weapon);
      enemy.health.takeDamage(damage);
      console.log(`You hit the ${enemy.name} for ${damage} damage.`);
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
      console.log("You escaped back to the village.");
      return;
    } else {
      console.log("Please choose attack, potion, or run.");
      continue;
    }

    if (enemy.health.isAlive()) {
      player.health.takeDamage(enemy.attackDamage);
      console.log(`The ${enemy.name} hits you for ${enemy.attackDamage} damage.`);
    }
  }

  if (!player.health.isAlive()) {
    console.log("You were knocked out. Return to camp to recover.");
    return;
  }

  state.kills += 1;
  state.gold += enemy.goldReward;
  save();
  console.log(`You defeated the ${enemy.name} and earned ${enemy.goldReward} gold.`);
}