
// sword system (items for attack) (optimized with copilot) 
export class SwordSystem {
  public readonly swords: string[] = ["THE HERO SWORD", "THE MONSTER SWORD", "THE DRAGON SWORD"];
  public readonly herosword = "THE HERO SWORD";
  public readonly monstersword = "THE MONSTER SWORD";
  public readonly dragonsword = "THE DRAGON SWORD";
  public readonly basicsword = "BASIC SWORD";

  private readonly heroDamage = 80;
  private readonly monsterDamage = 50;
  private readonly dragonDamage = 60;
  private readonly basicDamage = 20;

  public damageONE(): number {
    return this.heroDamage;
  }

  public damageTWO(): number {
    return this.monsterDamage;
  }

  public damageTHREE(): number {
    return this.dragonDamage;
  }

  public damageFOUR(): number {
    return this.basicDamage;
  }

}