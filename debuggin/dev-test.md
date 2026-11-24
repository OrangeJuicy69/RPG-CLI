# Dev-Test
>this markdown is for the dev function inside the project and how to use it

## Section
>Start

>How 

>Debuggin

## start

To start a dev session without converting all the code into JavaScript you can use

```
pnpm dev
```
if you get a error for some reason, look into the "package.json" and search for the dev command and look if its liked correct
>For example: ERR_PNPM_RECURSIVE_EXEC_FIRST_FAIL
>this means: Command "<name>" not found

## How

To test To test certain things, you can use the file called "dev-test.ts", inside there you can import the functions that you need 

To test a function like the HP system, Enemy or the shop system, you have to call them via:

```
console.log(`${your string here!}`)
```
## Debuggin

If you habe trouble to test specific things and you get a output like "object obeject" or "undefined", then you maybe forgot to import a system.

Most of the time is triggered by not importing the stats and saves, or the json save file has some arrays errors 

For troubleshooting the json save file, look inside the [json.md](..//save/json.md) for more infos

If you have the problem i mentioned earlier with the "object obeject" or "undefined" then try these things

Inside of the stats.ts you have the json structer and the default stats if they have not been defined

Look if the stats are importet in the dev-test.ts. 

```
import { load, save, state } from "./data/stats";
```

Look if the load function is importet if you want load stats from the save.json
>you need the load, state if you want it to work

Also check if the state function is importet 
>you need load and state if you want it to work

the same goes for the save if you want to test the save function 
>doesnt work sometime inside the dev-test

If you want to call stats or specific state you have to use:

```
console.log(`${your code here}`)
```
>just like i mentioned earlier

Also look if you have the Backtick for string interpolation inside template literals





