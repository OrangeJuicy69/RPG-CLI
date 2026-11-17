import { save, state } from "../data/stats";
import { strangeHealingPotion } from "../System/HealingPotion"
// not used yet 
//still have to implement it in the index.ts
//this script is for random events based the main game 
//for example if you want to go to the shop or the wood you can get a random event, like getting into a storm and lose Hp or finde treasure with gold inside and so on
type GameEvent = {
  name: string;
  apply: () => void;
};

const events: GameEvent[] = [
  {
    name: "Storm",
    apply: () => {
      state.hp -= 10;
    },
  },
  {
    name: "Treasure found!",
    apply: () => {
      state.gold += 50;
      console.log("you found gold")
    },
  },
  {
    name: "Merchant arrives",
    apply: () => {
        console.log("A Merchant arrives infront of you")
        console.log(`Hey ${state.name} i have something for you!`)
        state.inventory.strangeHealingPotion = 1;
        console.log(`you received a ${state.inventory.strangeHealingPotion}`)
        

    
    },
  },
];

const interval = setInterval(() => {
  if (Math.random() < 0.05) {
    const event = events[Math.floor(Math.random() * events.length)];
    event.apply();
    console.log(`Random Event: ${event.name} | HP: ${state.hp} | Gold: ${state.gold}`);

    if (state.hp <= 0) {
      console.log("You died!");
      clearInterval(interval);
      return
    }
  }
}, 1000);

