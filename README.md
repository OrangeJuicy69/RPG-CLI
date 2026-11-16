### RPG-CLI (Terminal only)

Developed by [OrangeJuicy69](https://github.com/OrangeJuicy69)

## Introduction to the game
This is a RPG terminal based game made with TypeScript
 
In this game you play as a person that fallen from the sky in a magic world full of strange creatures like humans, wolves, dragons, and so on.
Take track of your HP, heal yourself with a Healing potion, maybe buy a sword or fight a **BIG DRAGON**
This is just a small game for learning new skills and to show my skills

## Systems

Player data is saved as JSON in the project-root `save/save.json`. The file is created automatically the first time you start a new game. HP, weapon, inventory, kills, and gold are saved there.

## Gameplay

After the first-time tutorial, you arrive at the village menu. Choose a destination by entering its number or name:

| Choice | Destination | What you can do |
| --- | --- | --- |
| `1` / `shop` | Shop | Buy healing potions and swords with gold. |
| `2` / `woods` | Woods | Fight a random slime, wolf, or goblin, use a potion, or run away. |
| `3` / `camp` | Camp | Recover up to 30 HP. |
| `4` / `leave` | Leave | Save your progress and exit. |

You start with 50 gold. Defeating an enemy earns 15–25 gold. The shop sells a basic healing potion for 20 gold, a Monster Sword for 75 gold, and a Hero Sword for 150 gold. Potions restore 25 HP and are used during combat. Your basic sword deals 20 damage; the Monster Sword deals 50 and the Hero Sword deals 80.

During a fight, enter `1` or `attack` to attack, `2` or `potion` to use a basic healing potion, or `3` or `run` to escape back to the village. Enemies retaliate after an attack or potion use, so use camp to recover between fights.

## Sword System
>The current shop sells the **MONSTER SWORD** and **HERO SWORD**. New players start with the **BASIC SWORD**.

## HP System
>Keep an eye on your HP. Enemies can knock you out, and camp restores up to 30 HP.

## Enemy HP System 
>Enemies in the woods have their own HP and attack damage.

## Healing Potion System
>Basic healing potions restore 25 HP and can be used during a fight.




> [!NOTE]
> This terminal game is still under development. Errors and bugs are to be expected.

> [!TIP]
> Read the installation instructions carefully to avoid errors.

> [!IMPORTANT]
> This Project can be used for a privat project .

> [!WARNING]
> When you using it please link **OrangeJuicy69**.

> [!WARNING]
> This Readme is not done **yet** and the full game will **released** soon.

## How to Play

Download the game, then open a terminal in the `rpg-cli` project directory:

```bash
cd rpg-cli
```

Install dependencies with pnpm:

```
pnpm install
```

Build and start the game:

```
pnpm build:start
```

To run directly from TypeScript during development:

```
pnpm dev
```
For a debugging session, run `pnpm dev:debug`.

## Project structure

```text
.
├── package.json                 # Project scripts and dependencies
├── pnpm-lock.yaml               # Locked dependency versions
├── README.md                    # Game and setup guide
├── src/                         # TypeScript source code
│   ├── index.ts                 # Game startup and village navigation
│   ├── data/
│   │   └── stats.ts             # Player state and save-file handling
│   ├── story/
│   │   ├── enemy.ts             # Woods enemy selection
│   │   ├── shop.ts              # Shop menu and purchases
│   │   └── woods.ts             # Woods combat
│   └── System/
│       ├── console-typewriter.ts # Console text effect
│       ├── EnemyHPsystem.ts     # Enemy health
│       ├── HealingPotion.ts     # Potion healing
│       ├── PlayerHPsystem.ts    # Player health
│       ├── SwordSystem.ts       # Weapons and damage
│       ├── typewriter.ts        # Typewriter text helper
│       └── tutorial.ts          # New-player tutorial
├── out/                         # Compiled JavaScript created by `pnpm build`
│   ├── index.js                 # Compiled game entry point
│   ├── data/stats.js            # Compiled save handling
│   ├── story/
│   │   ├── enemy.js             # Compiled enemy selection
│   │   ├── shop.js              # Compiled shop
│   │   └── woods.js             # Compiled combat
│   └── System/                  # Compiled game systems
└── save/
    └── save.json                # Player save, created automatically
```

## Updates

- [x] HP System for Player and Enamys
- [x] Sword System
- [x] Healing Potion System
- [x] Typewriter effect for text in the game
- [x] Village menu, shop, woods combat, and camp
- [x] Build-and-start command (`pnpm build:start`)
- [ ] Skip Tutorial
- [ ] More locations and story content

## Links

- [OrangeJuicy69 auf GitHub](https://github.com/OrangeJuicy69)
- [Projekt-Repository](https://github.com/OrangeJuicy69/RPG-CLI)
- [pnpm: Installation](https://pnpm.io/installation) and [pnpm: FAQ](https://pnpm.io/faq)