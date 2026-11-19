### Install Help
>this Markdown is to help to install the game on your machine

> [!NOTE]
> This Markdown is not for downloading the game. Visit () for more info

## Section
>TypeEffect

>pnpm

>start

>Save

## TypeEffekt
When you play the game and all the messages are advertised directly, this means that the TypeEffect script has a bug or something is not setup correctly

For the TypeEffect you must have Node.js 18+, TypeScript target ES2020 or newer. 
>To check your version
```
node --version
```

If you still have trouble, look into the [console-typewriter.ts](..//src/System/console-typewriter.ts). 
<br>
You should see an the top of the script a section called "typewriterConfig"
>this is for delay in ms, pause after and for print instantly

```
export const typewriterConfig = {
  delayMs: 120,          // delay per normal character
  punctuationMs: 120,   // extra pause after . ! ? , : ;
  enabled: true,        // false = print instantly
};
```

In the [index.ts](..//src/index.ts) you can see:
>this has to be in the index file, so the program knows how to behave with the console.log
```
typewriterConfig.delayMs = 120;        // delay for output (console.log in ms)
typewriterConfig.enabled = true;       // enable/disable typewriter effect
```
Also look if everything is exportet form the places and is importet in the index file


## pnpm

The first thing you have to check is the version of your pnpm by:

```
pnpm --version
```

Also check if you in the installed pnpm in the right folder. 
>install pnpm in rpg-cli (not in out, data, story and so on)
 
Look if you have the "node_modules" inside the game
>will not work without it


## Start
You can the start the game by:
>this command compiles the game to js and then starts the game 
```
pnpm build:start
```
if this command doesn't work, go to the [package.json](..//package.json) and look if the build:start command is inside of it 
>you can also look if something is missing to compile or for running
```
"build:start": "pnpm run build && pnpm run start",
```
If it still not works then just run:
>compiles TypeScript to JavaScript
```
pnpm run build
```
Then
>starts the game!
```
pnpm start
```

after you run "pnpm run build" all the Typescript code from "src" should be inside of "out" and in JavaScript (folder files)
>only the "sava" folder will be not compile 

## Save
If your console shows things like:
```
Unable to start the game: SyntaxError: Unexpected token '*', ..." "kills": *,
  "gold"... is not valid JSON
```
That means you have problems with your save file. For troubleshooting, go to:
[json.md](..//save/json.md)


