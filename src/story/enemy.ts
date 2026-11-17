import { Enemy } from "../System/EnemyHPsystem";

//enemys for the woods
//will be used later in some other section in the game
const woodsEnemies = [
  { name: "Slime", hp: 30, damage: 8, gold: 15 },
  { name: "Wolf", hp: 45, damage: 12, gold: 25 },
  { name: "Goblin", hp: 40, damage: 10, gold: 20 },
];

export function createWoodsEnemy(): Enemy {
  const enemy = woodsEnemies[Math.floor(Math.random() * woodsEnemies.length)];
  return new Enemy(enemy.name, enemy.hp, enemy.damage, enemy.gold);
}