import type { AnimalTranslation } from "./animals";

export const peopleNpcTranslations: Record<string, AnimalTranslation> = {
  vesnican: { name: "Villager", weapon: "Improvised weapon", armor: "No armor", abilityName: "—", abilityEffect: "No special ability." },
  obchodnik: { name: "Merchant", weapon: "Dagger", armor: "No armor", abilityName: "Haggle", abilityEffect: "Gains +1 to the result of a roll in a social encounter based on Charisma." },
  kovar: { name: "Blacksmith", weapon: "Hammer", armor: "Leather armor", abilityName: "—", abilityEffect: "No special ability." },
  lovec: { name: "Hunter", weapon: "Longbow", armor: "Leather armor", abilityName: "Precise Shot", abilityEffect: "Once per combat, gains +2 to the final result of a ranged Attack." },
  zlodej: { name: "Thief", weapon: "Short sword", armor: "Leather armor", abilityName: "Sneak Attack", abilityEffect: "Once per combat, gains +2 to the final Attack result if the target has not yet acted this round." },
  bandita: { name: "Bandit", weapon: "Short sword", armor: "Leather armor", abilityName: "—", abilityEffect: "No special ability." },
  "vudce-banditu": { name: "Bandit Leader", weapon: "One-handed sword", armor: "Leather armor", abilityName: "Commander", abilityEffect: "While the leader is conscious, one allied bandit gains +1 to its final Attack result each round." },
  zoldner: { name: "Mercenary", weapon: "One-handed axe", armor: "Chainmail", abilityName: "—", abilityEffect: "No special ability." },
  vojak: { name: "Soldier", weapon: "Spear", armor: "Chainmail", abilityName: "—", abilityEffect: "No special ability." },
  lucistnik: { name: "Archer", weapon: "Longbow", armor: "Quilted armor", abilityName: "Covering Fire", abilityEffect: "If the archer has not been attacked at close range this round, gains +1 to the final result of a ranged Attack." },
  rytir: { name: "Knight", weapon: "Two-handed sword", armor: "Plate armor", abilityName: "Parry", abilityEffect: "Once per round, gains +2 Defense against the first physical attack aimed at the knight." },
  kouzelnik: { name: "Wizard", weapon: "Quarterstaff", armor: "No armor", abilityName: "Fire Bolt; Magic Shield", abilityEffect: "Can make a magic attack with a +3 spell bonus. Gains +2 Magic Defense against the first magic attack each round." },
  lecitel: { name: "Healer", weapon: "Quarterstaff", armor: "Quilted armor", abilityName: "Healing", abilityEffect: "Once per combat, restores 4 Health to themself or an ally instead of attacking." },
  slechtic: { name: "Noble", weapon: "Dagger", armor: "Quilted armor", abilityName: "Authority", abilityEffect: "In a social encounter where the noble has genuine authority, gains +2 to the Charisma result." },
  "kral-kralovna": { name: "King / Queen", weapon: "One-handed sword", armor: "Chainmail", abilityName: "Royal Authority", abilityEffect: "When dealing with their subjects, gains +2 to the Charisma result. This bonus does not apply in combat." },
  arcimag: { name: "Archmage", weapon: "Quarterstaff", armor: "Quilted armor", abilityName: "Chain Lightning; Power Crystal", abilityEffect: "Once per combat, instead of a regular attack, can target up to 2 enemies with a magic attack using a +3 spell bonus; roll separately for each target. While carrying the crystal, the first physical attack each round is resolved against Defense +2. If the crystal is destroyed or taken, this bonus ends, the spell bonus drops from +3 to +1, and magic protection drops from +3 to 0 (Magic Attack 14, Magic Defense 13)." },
};

export const translatedShields: Record<string, string> = { "malý +1": "Small shield" };

export const translatedGroupNote: Record<string, string> = {
  "1 (těžké)": "1 (difficult)",
  "1 + 1 bandita": "1 + 1 bandit",
  "1 + 2 bandité": "1 + 2 bandits",
  "1 + 1 voják": "1 + 1 soldier",
  "1 + 2 strážci": "1 + 2 guards",
  "1 + 1 strážce": "1 + 1 guard",
  "1; krystal oslabit": "1; weaken the crystal",
};
