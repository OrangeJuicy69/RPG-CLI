"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Enemy = void 0;
const PlayerHPsystem_1 = require("./PlayerHPsystem");
class Enemy {
    constructor(name, maxHp, attackDamage, goldReward) {
        this.name = name;
        this.attackDamage = attackDamage;
        this.goldReward = goldReward;
        this.health = new PlayerHPsystem_1.HPsystem(maxHp);
    }
}
exports.Enemy = Enemy;
