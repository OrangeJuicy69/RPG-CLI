"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = exports.HPsystem = void 0;
// 1. HP System start
class HPsystem {
    constructor(maxHp = 100, currentHp = maxHp, onChange) {
        this.onChange = onChange;
        this.maxHp = maxHp;
        this.currentHp = Math.min(maxHp, Math.max(0, currentHp));
    }
    takeDamage(amount) {
        if (amount <= 0)
            return;
        const hp = Math.max(0, this.currentHp - amount);
        if (hp === this.currentHp)
            return;
        this.currentHp = hp;
        this.onChange?.(this.currentHp);
    }
    heal(amount) {
        if (amount <= 0)
            return;
        const hp = Math.min(this.maxHp, this.currentHp + amount);
        if (hp === this.currentHp)
            return;
        this.currentHp = hp;
        this.onChange?.(this.currentHp);
    }
    getHp() { return this.currentHp; }
    getMaxHp() { return this.maxHp; }
    isAlive() { return this.currentHp > 0; }
}
exports.HPsystem = HPsystem;
// 2.Basic Player of use HP-System
class Player {
    constructor(name, maxHp, currentHp = maxHp, onHealthChange) {
        this.name = name;
        this.health = new HPsystem(maxHp, currentHp, onHealthChange);
    }
}
exports.Player = Player;
