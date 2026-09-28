import type { AnimalTranslation } from "./animals";

export const undeadTranslations: Record<string, AnimalTranslation> = {
  kostlivec: { name: "Skeleton", weapon: "Short sword", armor: "No armor", abilityName: "Bones", abilityEffect: "Reduces each physical damage from a dagger or arrow by 1 (minimum 0)." },
  "kostlivec-lucistnik": { name: "Skeleton Archer", weapon: "Shortbow", armor: "No armor", abilityName: "Bones", abilityEffect: "Reduces each physical damage from a dagger or arrow by 1 (minimum 0)." },
  zombie: { name: "Zombie", weapon: "Strike", armor: "Tattered protection", abilityName: "Relentless", abilityEffect: "The first time it would drop to 0 Health, it stays at 1 Health. The second time, it falls as normal." },
  ghul: { name: "Ghoul", weapon: "Claws", armor: "Tough hide", abilityName: "Paralyzing Chill", abilityEffect: "Once per combat, if it deals damage, the target gets −1 to Attack and Defense until the end of the next round." },
  duch: { name: "Ghost", weapon: "Touch", armor: "Incorporeal protection", abilityName: "Incorporeal", abilityEffect: "Reduces each physical damage by 2 (minimum 0); magical damage is not reduced." },
  prizrak: { name: "Wraith", weapon: "Shadow touch", armor: "No natural protection", abilityName: "Chilling Touch; Partial Incorporeality", abilityEffect: "Can make a magic attack with a +3 spell bonus instead of a physical attack. Reduces each physical damage by 1 (minimum 0); magical damage is not reduced." },
  mumie: { name: "Mummy", weapon: "Strike", armor: "Bandages", abilityName: "Curse; Ancient Protection", abilityEffect: "Once per combat, after successfully dealing damage, the target gets −1 to all final rolls until the end of the next round. The mummy gains +2 Magic Defense against magical attacks." },
  upir: { name: "Vampire", weapon: "Fangs", armor: "Natural protection", abilityName: "Life Drain; Supernatural Resilience and Sunlight Weakness", abilityEffect: "Once per combat, if its fangs deal at least 2 damage, restores 3 Health. Reduces the first physical and first magical damage it takes each round by 2 (minimum 0). In direct sunlight, this reduction does not apply, Physical and Magic Defense are −4, and it cannot use Life Drain." },
  nekromant: { name: "Necromancer", weapon: "Dagger", armor: "Enchanted cloak", abilityName: "Dark Blast; Dark Shield", abilityEffect: "Can make a magic attack with a +3 spell bonus. Gains +3 Magic Defense against the first magic attack each round." },
};

export const translatedUndeadGroupNotes: Record<string, string> = {
  "1; těžké": "1; difficult",
  "1; slabina nutná": "1; weakness required",
  "1; slabina vhodná": "1; weakness recommended",
  "1; spíš obejít/slabina": "1; avoid if possible or use its weakness",
};

export const translatedUndeadResistance: Record<string, string> = {
  Fyzická: "Physical",
  Magická: "Magical",
  Smíšená: "Mixed",
};
