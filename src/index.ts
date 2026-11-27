import { typewriterConfig } from "./System/console-typewriter";
import { Player } from "./System/PlayerHPsystem";
import { load, save, state } from "./data/stats";
import { runTutorial } from "./System/tutorial";
import { visitShop } from "./story/shop";
import { visitWoods } from "./story/woods";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { runDataReset } from "./data/data-reset"
import { getStoryStatus, renderProgressBar, story } from "./story/main";


//Made by OrangeJuicy
//This is the main file where everything gets together (see above what is importet)
//NOTE!!!!
//every setion made or i got help from , AI is markt with comments and where its starts and ends



//typewriter configuration
typewriterConfig.delayMs = 12;        // delay for output (console.log in ms)
typewriterConfig.enabled = true;       // enable/disable typewriter effect

async function main(): Promise<void> {
  if (!load()) {
    await runTutorial();
    save();
    
  }
  else{
    await runDataReset();
  }

  const player = new Player(state.name, 100, state.hp, (hp) => {
    state.hp = hp;
    save();
  });
  save();
  console.log(`Welcome ${state.name}! HP: ${player.health.getHp()}/${player.health.getMaxHp()}, Gold: ${state.gold}`);
  const prompt = createInterface({ input: stdin, output: stdout });
 
  
  //you get ask where you wanna go :)
  try {
    let exploring = true;
    while (exploring) {
      console.log("\nWhere would you like to go?");
      console.log("1. Shop");
      console.log("2. Woods");
      console.log("3. Camp (recover 30 HP)");
      console.log(`4. Story mode (${getStoryStatus()})`);
      console.log("5. Leave the game");
      const destination = (await prompt.question("Choose a place: ")).trim().toLowerCase();


      //Help by Copilot 
      switch (destination) {
        case "1":
        case "shop":
          await visitShop((question) => prompt.question(question));
          break;
        case "2":
        case "woods":
        case "forest":
          await visitWoods(player, (question) => prompt.question(question));
          break;
        case "3":
        case "camp":
        case "rest": {
          const previousHp = player.health.getHp();
          player.health.heal(30);
          if (player.health.getHp() === previousHp) {
            console.log("You are already at full HP.");
            //idea (not implementet yet)
            //sleep time for random event for the night and day(not implementet yet!)
          } else {
            console.log(`You rested at camp. HP: ${player.health.getHp()}/${player.health.getMaxHp()}.`);
          }
          break;
        }
        case "4":
        case "story":
          await story((question) => prompt.question(question), player);
          break;
        case "5":
        case "quit":
        case "leave":
          exploring = false;
          console.log("See you next time!");
          break;
        default:
          console.log("Please choose shop, woods, camp, story, or leave.");
      }
    }
  } finally {
    prompt.close();
  }
}
//If the game is unable to start (Stats(json error) or Code Error)
main().catch((error: unknown) => {
  console.error("Unable to start the game:", error);
  process.exitCode = 1;
});
