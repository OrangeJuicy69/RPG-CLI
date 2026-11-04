import promptSync from 'prompt-sync'; //loading import


//function and class system for the game (start)

// sword system (items for attack) (optimized with copilot) (from line 6 to 29)
export class SwordSystem {
  public readonly herosword = "THE HERO SWORD";
  public readonly monstersword = "THE MONSTER SWORD";
  public readonly dragonsword = "THE DRAGON SWORD";

  private readonly heroDamage = 80;
  private readonly monsterDamage = 50;
  private readonly dragonDamage = 60;

  public damageONE(): number {
    return this.heroDamage;
  }

  public damageTWO(): number {
    return this.monsterDamage;
  }

  public damageTHREE(): number {
    return this.dragonDamage;
  }


}
//end of sword system (starts at line 6)


// Create one sword system so the sword names can be used with console.log interpolation.
export const swordSystem = new SwordSystem();
const herosword = swordSystem.herosword;
const monstersword = swordSystem.monstersword;
const dragonsword = swordSystem.dragonsword;


//stackoverflow code start
function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

//this function does not work right now but it will be used in the future for a better experience of the game to read text 
/* export async function say(text: string, ms = 800): Promise<void> {
    console.log(text);
    await delay(ms);
} */

//end (function called by "await delay(1000);")

// 1. HP System start
class HPsystem {
  private currentHp: number;
  private readonly maxHp: number;

  constructor(maxHp: number = 100) {
    this.maxHp = maxHp;
    this.currentHp = maxHp;
  }

  public takeDamage(amount: number): void {
    if (amount <= 0) return;
    this.currentHp = Math.max(0, this.currentHp - amount);
  }

  public heal(amount: number): void {
    if (amount <= 0) return;
    this.currentHp = Math.min(this.maxHp, this.currentHp + amount);
  }

  public getHp(): number { return this.currentHp; }
  public getMaxHp(): number { return this.maxHp; }
  public isAlive(): boolean { return this.currentHp > 0; }
}

// 2.Basic Player of use HP-System 
class Player {
  public name: string;
  public health: HPsystem;

  constructor(name: string, maxHp: number) {
    this.name = name;
    this.health = new HPsystem(maxHp); // Here for a new player (start of game)
  }
}

//start sword
const sword1 = ("basic sword ")

//shop swords (old)
/* const herosword = ("THE HERO SWORD")
const monstersword = ("THE MONSTER SWORD")
const dragonsword = ("THE DRAGON SWORD") */

/* //HP System (not done yet)
const HP100 = ("HP100")
const HP80 = ("HP80")
const HP60 = ("HP60")
const HP50 = ("HP50")
const HP25 = ("HP25")
const HP0 = ("HP0") */

//loading system for now (start)
const prompt = promptSync();

const total = 50;

const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms));

const loadAdventure = async (): Promise<void> => {
  const start = Date.now();
  for (let i = 0; i <= total; i++) {
    const elapsed = (Date.now() - start) / 1000;
    const remaining = i ? (elapsed / i) * (total - i) : 0;
    (globalThis as unknown as { process: { stdout: { write(text: string): void } } }).process.stdout.write(
      `\rProgress: ${i}/${total} | Remaining: ${remaining.toFixed(1)}s | Elapsed: ${elapsed.toFixed(1)}s`
    );
    await sleep(100);
  }
  console.log('\nAdventure loaded!');
};
//function and clas system for the game (end)
//loading system end (end)

const main = async (): Promise<void> => {
  console.log('Hello, welcome to the RPG CLI!');
  const username: string = prompt('My name is Sira, what is your name? ');
  const player = new Player(`${username}`, 100);
  console.log(`Nice to meet you, ${username}!`);
  console.log(`Please wait ${username}, your adventure is loading`);

  await loadAdventure(); //waitng for loading to stop

  console.log('The adventure begins!'); 
  const answer = prompt(`Hey ${username} ${player.health.getHp()}/${player.health.getMaxHp()} HP, You really hit your head hard—is everything okay? (yes/no)`);
  if (answer === "yes"|| answer === "y") {
    console.log('Oh okay just say if you need something');
    await delay(1000);
    console.log('now we go the the village')
  } else if (answer === "no"){
    await delay(500);
    console.log('We’re heading to the village now; you can get all sorts of things there')
  } else {
    await delay(500);
    console.log('okay? anyways, we’re heading to the village now; you can get all sorts of things there')
  }

  console.log("You both walking to the village")
  await delay(1000);
  console.log("on the way to the village you both  encounters a dragon on the way")
  await delay(1000);
  console.log(`Hey ${username} take this!`)
  console.log (`Sira gives you a ${sword1}`)

  const question = prompt(` do you take it? (yes/no)`)
  if (question === "yes"|| answer === "y"){
    console.log (`You take the${sword1} and you attack the dragon`)
    const attack = prompt (` Do you wanna use basic attack or heavy attack? (1/2)`)
    if (attack === "1") {
      console.log(`You attack the dragon (dragon now has 25HP! left of 50HP!`)
      await delay(500);
      console.log("the dragon fleeing from you and sira")
    } else if (attack === "2") {
      console.log(`You attack the dragon (dragon now has 0 HP! out of 50HP!)`)
      await delay(1000);
      console.log("You examine yourself. and checking you HP")
      await delay(500);
      console.log(`you have  HP: ${player.health.getHp()}/${player.health.getMaxHp()} `)
    }
    else {
      player.health.takeDamage(50);
        console.log(`Bcs you didnt attack the dragon you both try to run away but the dragon catch up on you lose 50HP`)
        await delay(2000);
        console.log(`you now have: ${player.health.getHp()}/${player.health.getMaxHp()}HP`)
    }
  }else if ( question === "no"){
    player.health.takeDamage(50);
    console.log (`Bcs you didnt take the sword you both try to run away but the dragon catch up on you and you lose 50HP`)
    await delay(2000);
    console.log(`you have now HP ${player.health.getHp()}/${player.health.getMaxHp()} `)
  }
  else {
    player.health.takeDamage(50);
    console.log (`Bcs you didnt take the sword you both try to run away but the dragon catch up on you and you lose 50HP`)
    await delay(2000);
    console.log(`you have now HP ${player.health.getHp()}/${player.health.getMaxHp()} `)
  }

  console.log("that was close")
  await delay(4000);
  console.log("you both walk to the village")
  await delay(2000);
  console.log("you slowly arrive at the village and go into a shop there.")
  await delay(5000);
  console.log("inside the shop you see some swords and healing potion")
  await delay(5000);
  if (player.health.getHp() <= 99){
    console.log(`hey ${username} i can see you only have ${player.health.getHp()}, i gona buy you a healing potion`)
    await delay(1000);
    player.health.heal(50)
    console.log(`sira buys you a healing potion and you get +50HP!`)
    console.log(`your ${player.health.getHp()} HP goes up to ${player.health.getMaxHp()}HP`)
    await delay(1000);
    console.log(`your current HP is ${player.health.getHp()}`)
  }
  else if (player.health.getHp() ===100){
    console.log ("we didnt take any damage so we dont need a healing potion")
  };
  await delay(1000);
  console.log("you and sira looking for a new sword")
  await delay(1000);
  console.log("you and siras eyes lock on to some swords")
  await delay(1000);
  console.log("There are 3 swords infront you")
  await delay(1000);
  console.log("the shop owner ask you and sira which you want")
  await delay(1000);
  console.log("you and sira see the 3 swords named")
  await delay(1000);
  console.log(".")
  await delay(1000);
  console.log("..")
  await delay(1000);
  console.log("...")
  await delay(1000);
  console.log(".")
  await delay(1000);
  console.log("..")
  await delay(1000);
  console.log("...")
  await delay(1000);
  console.log(`1.${herosword} 2.${monstersword} 3.${dragonsword}`)
  console.log("the shop onwer says")
  console.log("choose wisely ")
  await delay(5000);
  console.log("what do you choose?")
  console.log("1. 2. or 3.")
  const buyshop = prompt(`1.${herosword} 2.${monstersword} 3.${dragonsword}`);

if (buyshop === "1") {
  console.log(`you choose ${herosword}`);
  await delay(2000);
  console.log(`the shop owner gives you the ${herosword}, this sword makes ${swordSystem.damageONE()} damage`);
  await delay(2000);
  console.log(`you and sira leave the shop`);
} else if (buyshop === "2") {
  console.log(`you choose ${monstersword}`);
  await delay(2000);
  console.log(`the shop owner gives you the ${monstersword}, this sword makes ${swordSystem.damageTWO()} damage`);
  await delay(2000);
  console.log(`you and sira leave the shop`);
} else if (buyshop === "3") {
  console.log(`you choose ${dragonsword}`);
  await delay(2000);
  console.log(`the shop owner gives you the ${dragonsword}, this sword makes ${swordSystem.damageTHREE()} damage`);
  await delay(2000);
  console.log(`you and sira leave the shop`);
} else {
  console.log(`you choose`);
  await delay(2000);
  console.log(`nothing?`);
  await delay(2000);
  console.log(`sira and the owner looks at you confused`);
  await delay(2000);
  console.log(`you and sira leave the shop`);
}
  console.log("sira ask you something");
  const continuegame: string = prompt(`do you wanna continue with the game or leave? (y/n)`)
  if (continuegame === "y"|| answer === "yes"){
    console.log("so we continue with our adventure! ")
    await delay (2000);
  }
  else if (continuegame === "n"){
    console.log("oh okay i understand that")
    await delay(2000)
    console.log("sira looks sad but she understand you and your decision")
    await delay(2000)
    console.log("sira looks at you and your vision slowly turns dark")
    await delay(1500)
    console.log(`thank you for playing this game i hope we see you again ${username}`)
    await delay(3000)
    return;
    

  }
  
  
  


  
  


  



};

main();