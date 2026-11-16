"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWoodsEnemy = createWoodsEnemy;
const EnemyHPsystem_1 = require("../System/EnemyHPsystem");
const woodsEnemies = [
    { name: "Slime", hp: 30, damage: 8, gold: 15 },
    { name: "Wolf", hp: 45, damage: 12, gold: 25 },
    { name: "Goblin", hp: 40, damage: 10, gold: 20 },
];
function createWoodsEnemy() {
    const enemy = woodsEnemies[Math.floor(Math.random() * woodsEnemies.length)];
    return new EnemyHPsystem_1.Enemy(enemy.name, enemy.hp, enemy.damage, enemy.gold);
}
