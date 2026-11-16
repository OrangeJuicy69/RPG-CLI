"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.strangeHealingPotion = exports.BigHealingPotion = exports.BasicHealingPotion = exports.MaxHealingPotion = void 0;
// healing potion system (items for healing) (optimized with copilot and w3school) (from line 31 to 70)
class MaxHealingPotion {
    constructor() {
        this.name = "Max Healing Potion";
        this.description = "A potion that restores your health to full.";
        this.healingAmount = 50;
    }
    heal(player) {
        player.health.heal(this.healingAmount);
    }
}
exports.MaxHealingPotion = MaxHealingPotion;
class BasicHealingPotion {
    constructor() {
        this.name = "Basic Healing Potion";
        this.description = "A potion that restores 25HP of your health.";
        this.healingAmount = 25;
    }
    heal(player) {
        player.health.heal(this.healingAmount);
    }
}
exports.BasicHealingPotion = BasicHealingPotion;
class BigHealingPotion {
    constructor() {
        this.name = "Big Healing Potion";
        this.description = "A potion that restores a lot of your health.";
        this.healingAmount = 50;
    }
    heal(player) {
        player.health.heal(this.healingAmount);
    }
}
exports.BigHealingPotion = BigHealingPotion;
class strangeHealingPotion {
    constructor() {
        this.name = "strange Healing Potion";
        this.description = "A potion that restores your health or causes damage.";
        this.healingAmount = Math.floor(Math.random() * 201) - 100;
    }
    heal(player) {
        if (this.healingAmount < 0) {
            player.health.takeDamage(-this.healingAmount);
        }
        else {
            player.health.heal(this.healingAmount);
        }
    }
}
exports.strangeHealingPotion = strangeHealingPotion;
