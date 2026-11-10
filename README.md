### RPG-CLI (Terminal only)

Developed by [OrangeJuicy69](https://github.com/OrangeJuicy69)

## Introduction to the game
This is a RPG terminal based game made with TypeScript
 
In this game you play as a person that fallen from the sky in a magic world full of strange creatures like humans, wolves, dragons, and so on.
Take track of your HP, heal yourself with a Healing potion, maybe buy a sword or fight a **BIG DRAGON**
This is just a small game for learning new skills and to show my skills

## Systems

## Sword System
>You can buy Sword in  shops like the **THE HERO SWORD**,**THE MONSTER SWORD**,**THE DRAGON SWORD**
or the **BASIC SWORD**

## HP System
>Track your HP with a HP System or Heal yourself **TRY NOT TO DIE!!!**

## Enemy HP System 
>HP System for big scary **DRAGONS** or even small ones like baby Dragons!

## Healing Potion System
> Heal yourself with a Potion or even lose HP with a **STRAGE POTION!!!**




> [!NOTE]
> This Webapp is still under development . Errors and bugs are to be expected.

> [!TIP]
> Read the installation instructions carefully to avoid errors.

> [!IMPORTANT]
> This Project can be used for a privat project .

> [!WARNING]
> When you using it please link **OrangeJuicy69**.

> [!WARNING]
> This Readme is not done **yet** and the full game will **released** soon.

### How to Play? 
>works on Linux and Windows

First download the Game via Git, Releases or downloading the Zip form the Repo

Then navigate to the place where you downloadet the file and the open the projekt in the Terminal 
```bash
cd rpg-cli
```
Befor you can play the game, you have to install pnpm first
>everything what you need will be installt via pnpm
```
pnpm install
```

To play it now just use this command for compile and start the game
```
pnpm build:start
```
>Normal start (build, then run the compiled app):

### Debuggin or Testing

For a Debbgin Session, use this command to enter the Debuggin session
```
pnpm dev:debug
```
>Debug start (same as dev, with the Node inspector on 127.0.0.1:9229):

The same goes for a dev session
```
pnpm dev
```
>Dev start (runs the TypeScript directly, with your typewriter preload):




## Project structure

```text
.
│
├── out
│   ├── "index.js"                  #Main Game in JS (showes up here after compile)
│   └── System                      #System file in JS (showes up here after compile)
├── package.json                    #Config file for Ts to JS and Version, name build and dev
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── README.md
├── src
│   ├── index.ts                    #Main Game (Not comilet yet)
│   ├── oldindex story
│   └── System                      #System files
│       ├── console-typewriter.ts   #type effect for console output (config file)
│       ├── EnemyHPsystem.ts        #Enemy HP System
│       ├── HealingPotion.ts        #Healing Potion System
│       ├── PlayerHPsystem.ts       #Player HP System
│       ├── SwordSystem.ts          #Sword System (Name, Damage)
│       └── typewriter.ts           #Type Effect for console (system)
└── tsconfig.json
```

##Update

- [x] HP System for Player and Enamys
- [x] Sword System
- [x] Healing Potion System (For iteams soon)
- [x] Typewriter effect for text in the game 
- [x] New Story
- [ ] Start Command for direkt build and start (pnpm run buld and pnpm start in one command)
- [ ] Skip Tutorial
- [ ] New Tutorial

## Links

- [OrangeJuicy69 auf GitHub](https://github.com/OrangeJuicy69)
- [Projekt-Repository](https://github.com/OrangeJuicy69/RPG-CLI)
- [pnpm: Installation](https://pnpm.io/installation) and [pnpm: FAQ](https://pnpm.io/faq)