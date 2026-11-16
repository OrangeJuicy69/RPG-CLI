"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwordSystem = void 0;
// sword system (items for attack) (optimized with copilot)
class SwordSystem {
    constructor() {
        this.swords = ["THE HERO SWORD", "THE MONSTER SWORD", "THE DRAGON SWORD"];
        this.herosword = "THE HERO SWORD";
        this.monstersword = "THE MONSTER SWORD";
        this.dragonsword = "THE DRAGON SWORD";
        this.basicsword = "BASIC SWORD";
        this.heroDamage = 80;
        this.monsterDamage = 50;
        this.dragonDamage = 60;
        this.basicDamage = 20;
    }
    damageONE() {
        return this.heroDamage;
    }
    damageTWO() {
        return this.monsterDamage;
    }
    damageTHREE() {
        return this.dragonDamage;
    }
    damageFOUR() {
        return this.basicDamage;
    }
    damageFor(weapon) {
        switch (weapon?.toUpperCase()) {
            case this.herosword:
                return this.damageONE();
            case this.monstersword:
                return this.damageTWO();
            case this.dragonsword:
                return this.damageTHREE();
            case this.basicsword:
            case "WOODEN_SWORD":
                return this.damageFOUR();
            default:
                return 10;
        }
    }
}
exports.SwordSystem = SwordSystem;
