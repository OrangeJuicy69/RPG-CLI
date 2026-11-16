import { HPsystem } from "./PlayerHPsystem";

export class Enemy {
  public readonly health: HPsystem;

  constructor(
    public readonly name: string,
    maxHp: number,
    public readonly attackDamage: number,
    public readonly goldReward: number,
  ) {
    this.health = new HPsystem(maxHp);
  }
}