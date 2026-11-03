"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync")); //loading import
const sword1 = ("basic sword ");
//HP System (not done yet)
const HP100 = ("HP100");
const HP80 = ("HP80");
const HP60 = ("HP60");
const HP50 = ("HP50");
const HP25 = ("HP25");
const HP0 = ("HP0");
//loading system for now (start)
const prompt = (0, prompt_sync_1.default)();
const total = 50;
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const loadAdventure = async () => {
    const start = Date.now();
    for (let i = 0; i <= total; i++) {
        const elapsed = (Date.now() - start) / 1000;
        const remaining = i ? (elapsed / i) * (total - i) : 0;
        globalThis.process.stdout.write(`\rProgress: ${i}/${total} | Remaining: ${remaining.toFixed(1)}s | Elapsed: ${elapsed.toFixed(1)}s`);
        await sleep(100);
    }
    console.log('\nAdventure loaded!');
};
//loading system end (end)
const main = async () => {
    console.log('Hello, welcome to the RPG CLI!');
    const username = prompt('My name is Sira, what is your name? ');
    console.log(`Nice to meet you, ${username}!`);
    console.log(`Please wait ${username}, your adventure is loading`);
    await loadAdventure(); //waitng for loading to stop
    console.log('The adventure begins!');
    const answer = prompt(`Hey ${username} ${HP100}You really hit your head hard—is everything okay? (yes/no)`);
    if (answer === "yes") {
        console.log('Oh okay just say if you need something');
        console.log('now we go the the village');
    }
    else if (answer === "no") {
        console.log('We’re heading to the village now; you can get all sorts of things there');
    }
    else {
        console.log('okay? anyways, we’re heading to the village now; you can get all sorts of things there');
    }
    console.log("You both walking to the village, on the way to the village you both encounters a dragon on the way");
    console.log(`Hey ${username} take this!`);
    console.log(`Sira gives you a ${sword1}`);
    const question = prompt(` do you take it? (yes/no)`);
    if (question === "yes") {
        console.log(`You take the${sword1} and you attack the dragon`);
        const attack = prompt(` Do you wanna use basic attack or heavy attack? (1/2)`);
        if (attack === "1") {
            console.log(`You attack the dragon (dragon now has ${HP25} left of ${HP50}`);
            console.log("the dragon fleeing from you");
        }
        else if (attack === "2") {
            console.log(`You attack the dragon (dragon now has 0 HP out of ${HP50})`);
            console.log(`you have  ${HP100} of ${HP100} `);
        }
        else {
            console.log(`Bcs you didnt attack the dragon you both try to run away but the dragon catch up on you and you lose ${HP50} of ${HP100}`);
        }
    }
    else if (question === "no") {
        console.log(`Bcs you didnt take the sword you both try to run away but the dragon catch up on you and you lose ${HP50} of ${HP100}`);
        console.log(`you have now ${HP50} of ${HP100} `);
    }
    console.log("that was close");
    console.log("you slowly arrive at the village and go into a shop there.");
};
main();
