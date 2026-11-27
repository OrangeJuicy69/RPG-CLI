import { save, state } from "../data/stats";
import { SwordSystem } from "../System/SwordSystem";

//Shop system to buy sword and potion
//rn you only can buy the Basic Healing Potion
//see more in the file called HealingPotion.ts for infos

type Ask = (question: string) => Promise<string>;

const BASIC_POTION_PRICE = 20;
const MONSTER_SWORD_PRICE = 75;
const HERO_SWORD_PRICE = 150;
const DRAGON_SWORD_PRICE = 250;

export async function visitShop(ask: Ask): Promise<void> {
  const swords = new SwordSystem();
  console.log("Welcome to the shop.");

  while (true) {
    console.log(`You have ${state.gold} gold.`);
    console.log(`Equipped: ${state.weapon ?? swords.basicsword}`);
    console.log(`Owned swords: ${state.swords.join(", ") || "none"}`);
    console.log(`1. Basic healing potion (${BASIC_POTION_PRICE} gold)`);
    console.log(`2. ${swords.monstersword} (${MONSTER_SWORD_PRICE} gold)`);
    console.log(`3. ${swords.herosword} (${HERO_SWORD_PRICE} gold)`);
    console.log(`4. ${swords.dragonsword} (${DRAGON_SWORD_PRICE} gold)`);
    console.log("5. Equip an owned sword");
    console.log("0. Leave the shop");

    const choice = (await ask("What would you like to buy? ")).trim().toLowerCase();
    if (choice === "0" || choice === "leave" || choice === "exit") return;
    if (choice === "5" || choice === "equip") {
      if (state.swords.length === 0) {
        console.log("You don't own any swords.");
        continue;
      }
      const weapon = (await ask(`Choose a sword (${state.swords.join(", ")}): `)).trim();
      const ownedSword = state.swords.find((sword) => sword.toLowerCase() === weapon.toLowerCase());
      if (!ownedSword) {
        console.log("You don't own that sword.");
        continue;
      }
      state.weapon = ownedSword;
      save();
      console.log(`Equipped ${ownedSword}.`);
      continue;
    }

    const goods: Record<string, { name: string; price: number }> = {
      "1": { name: "basic healing potion", price: BASIC_POTION_PRICE },
      "2": { name: swords.monstersword, price: MONSTER_SWORD_PRICE },
      "3": { name: swords.herosword, price: HERO_SWORD_PRICE },
      "4": { name: swords.dragonsword, price: DRAGON_SWORD_PRICE },
    };
    const item = goods[choice];
    if (!item) {
      console.log("Please choose 1, 2, 3, 4, 5, or 0.");
      continue;
    }
    if (choice !== "1" && state.swords.includes(item.name)) {
      console.log(`You already own ${item.name}.`);
      continue;
    }
    //if you dont have enough gold 
    if (state.gold < item.price) {
      console.log("You don't have enough gold.");
      continue;
    }
    //as already mentioned above, you only have rn the basic healing potion
    state.gold -= item.price;
    if (choice === "1") {
      state.inventory["basic_healing_potion"] = (state.inventory["basic_healing_potion"] ?? 0) + 1;
    } else {
      state.swords.push(item.name);
      state.weapon = item.name;
    }
    save();
    console.log(`Bought ${item.name}.`);
  }
}