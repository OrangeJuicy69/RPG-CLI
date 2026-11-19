### SAVE
>In this file you find everything how the save.json file is build up and how it works

This is a full sample of the Save File 
```
{
  "tutorial": 1,                        #If the number is "1"  then the programm know that you already done with the tutorial
  "level": 1,                           #For some Rooms or shops you have to have sometimes a specific level
  "name": "Meli",                       #here is your player name 
  "hp": 92,                             #Your Hp 
  "weapon": "THE HERO SWORD",           #curent weapon 
  "inventory": {                        #inventory for potion or other things
    "basic_healing_potion": 2
  },
  "kills": 999999,                      #enemys kills
  "gold": 855                           #How much Gold you have
}
```
>You can change everything if the game is no running (if its running its just goes back to the last value)
> [!NOTE]
> If the games spits out a error or wout loud look if the json is correctly formatted.

in the stats.ts you can see the standart format of the json
```
const defaults: GameState = {
    tutorial: 1,
    level: 1,
    name: "siro",
    hp: 100,
    weapon: null,
    inventory: {},
    kills: 0,
    gold: 50,
};
```

## Rules
>How to Debugge the Save file
If the game wount start that means 1 of 4 things.
The Tutorial is not set to "1" but you have saved stats so the Game is not sure if you already done with the Tutorial 
```
"tutorial": 1,
```
the level is set to a invalid value 
>0 or any letters
```
"level": 1,
```
If no valid name has been saved in the save file, then the game will not start.
>empty or some special characters
```
"name": "example"
```
If nothing is saved in the inventory, it will creat a new invetory section
>If the inventory items were entered or saved incorrectly, the system simply claims that you don't have any.
```
"inventory": {
    "basic_healing_potion": 2
  },
```
If the kill section has a invalid value then the game wout start and spits out a error.
>The Game can only read numbers
```
 "kills": 3,
 ```

 The same goes with the Gold, if it has a invalid value then the game wout start and spits out a error.
 >The Game can only read numbers
  ```
 "gold": 855
 ```

 If you still running into errors, look if you forgot some characters in the JSON
 >Here is a blance example of the json save file
 ```
 {
  "tutorial": ,
  "level": ,
  "name": "",
  "hp": ,
  "weapon": "",
  "inventory": {
    "": 2
  },
  "kills": ,
  "gold": 
}
 ```
 >At the end of the JSON file should not be a ","

 > [!WARNING]
> If you still have trobule to start the game, then you can look inside the console output.
If the console puts out "Invalid tutorial value in save file" then the value in the Tutorial is wrong or was not defined correctly (SyntaxError)
see stats script [stats.ts](src/data/stats.ts)
```
Unable to start the game: SyntaxError: Unexpected token '*', ..." "kills": *,
  "gold"... is not valid JSON
```
This also applays for "level", "player name", HP Value", "weapon" "inventory", "gold" and "kills"
>distinct console output for all errors
