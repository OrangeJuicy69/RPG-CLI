import { Player } from "./PlayerHPsystem";
// healing potion system (items for healing) (optimized with copilot and w3school) (from line 31 to 70)
export class MaxHealingPotion {
  public readonly name = "Max Healing Potion";
  public readonly description = "A potion that restores your health to full.";
  public readonly healingAmount = 50;

  public heal(player: Player): void {
    player.health.heal(this.healingAmount);
  }
}
export class BasicHealingPotion {
  public readonly name = "Basic Healing Potion";
  public readonly description = "A potion that restores 25HP of your health.";
  public readonly healingAmount = 25;

  public heal(player: Player): void {
    player.health.heal(this.healingAmount);
  }
}
export class BigHealingPotion {
  public readonly name = "Big Healing Potion";
  public readonly description = "A potion that restores a lot of your health.";
  public readonly healingAmount = 50;

  public heal(player: Player): void {
    player.health.heal(this.healingAmount);
}
}
export class strangeHealingPotion {
  public readonly name = "strange Healing Potion";
  public readonly description = "A potion that restores your health or causes damage.";
  public readonly healingAmount = Math.floor(Math.random() * 201) - 100;

  public heal(player: Player): void {
    if (this.healingAmount < 0) {
      player.health.takeDamage(-this.healingAmount);
    } else {
      player.health.heal(this.healingAmount);
    }
  }
}