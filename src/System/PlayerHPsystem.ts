// 1. HP System start
//Player hp system
export class HPsystem {
  private currentHp: number;
  private readonly maxHp: number;

  //basic hp system
  constructor(
    maxHp: number = 100, // you can only have 100 hp 
    currentHp: number = maxHp,
    private readonly onChange?: (hp: number) => void,
  ) {
    this.maxHp = maxHp;
    this.currentHp = Math.min(maxHp, Math.max(0, currentHp)); //the lowest hp you can get is 0 hp
  }
//When you take damage
  public takeDamage(amount: number): void {
    if (amount <= 0) return;
    const hp = Math.max(0, this.currentHp - amount);
    if (hp === this.currentHp) return;
    this.currentHp = hp;
    this.onChange?.(this.currentHp);
  }
//hp healing system
  public heal(amount: number): void {
    if (amount <= 0) return;
    const hp = Math.min(this.maxHp, this.currentHp + amount);
    if (hp === this.currentHp) return;
    this.currentHp = hp;
    this.onChange?.(this.currentHp);
  }
  // public hp retrun for max and current hp
  public getHp(): number { return this.currentHp; }
  public getMaxHp(): number { return this.maxHp; }
  public isAlive(): boolean { return this.currentHp > 0; }
}

// 2.Basic Player of use HP-System
export class Player {
  public name: string;
  public health: HPsystem;

  constructor(name: string, maxHp: number, currentHp: number = maxHp, onHealthChange?: (hp: number) => void) {
    this.name = name;
    this.health = new HPsystem(maxHp, currentHp, onHealthChange);
  }
}