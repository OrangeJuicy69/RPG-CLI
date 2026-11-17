import { HPsystem } from "./PlayerHPsystem";

//enemy hp system for the woods 
//i have to make it better 
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