// 1. HP System start
export class HPsystem {
  private currentHp: number;  //current HP of the player (Private so it cannot be changed by the player)
  private readonly maxHp: number; //max HP of the player (Private so it cannot be changed by the player)

  constructor(maxHp: number = 100) { //default max HP is 100 (cant be under 0 )
    this.maxHp = maxHp;
    this.currentHp = maxHp;
  }

  public takeDamage(amount: number): void { //atake damage function for the player 
    if (amount <= 0) return;
    this.currentHp = Math.max(0, this.currentHp - amount);
  }

  public heal(amount: number): void { //heal function for the player
    if (amount <= 0) return;
    this.currentHp = Math.min(this.maxHp, this.currentHp + amount);
  }

  public getHp(): number { return this.currentHp; }
  public getMaxHp(): number { return this.maxHp; }
  public isAlive(): boolean { return this.currentHp > 0; }
}

// 2.Basic Player of use HP-System 
export class Player {
  public name: string;
  public health: HPsystem;

  constructor(name: string, maxHp: number) {
    this.name = name;
    this.health = new HPsystem(maxHp); // Here for a new player (start of game)
  }
}