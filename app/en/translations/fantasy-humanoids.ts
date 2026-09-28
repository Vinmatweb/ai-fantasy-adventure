import type { AnimalTranslation } from "./animals";

export const fantasyHumanoidTranslations: Record<string, AnimalTranslation> = {
  goblin: { name: "Goblin", weapon: "Short sword", armor: "Leather armor", abilityName: "Duck for Cover", abilityEffect: "Once per combat, gains +2 Defense against one ranged attack." },
  "goblin-lucistnik": { name: "Goblin Archer", weapon: "Shortbow", armor: "Quilted armor", abilityName: "Quick Reposition", abilityEffect: "After a ranged attack, gains +1 Physical Defense against the next close-range attack until its next turn." },
  kobold: { name: "Kobold", weapon: "Spear", armor: "Quilted armor", abilityName: "Teamwork", abilityEffect: "If at least one other kobold is next to the target, gains +1 to the final Attack result." },
  hobgoblin: { name: "Hobgoblin", weapon: "One-handed sword", armor: "Chainmail", abilityName: "Shield Wall", abilityEffect: "If at least one other hobgoblin is in combat, gains +2 Physical Defense." },
  bugbear: { name: "Bugbear", weapon: "Mace", armor: "Leather armor", abilityName: "Ambush", abilityEffect: "During the first round of combat, gains +2 to the final Attack result if it was not discovered before the fight." },
  gnom: { name: "Gnome", weapon: "Dagger", armor: "Quilted armor", abilityName: "Cleverness; Rune Resistance", abilityEffect: "Once per scene, gains +2 to one Intelligence result outside a direct attack. Gains +2 Magic Defense against magical attacks." },
  kentaur: { name: "Centaur", weapon: "Spear", armor: "Leather armor", abilityName: "Charge", abilityEffect: "During the first round, after an unobstructed charge, gains +2 to the final Attack result." },
  minotaur: { name: "Minotaur", weapon: "One-handed axe", armor: "Tough hide", abilityName: "Horned Charge; Bull's Endurance", abilityEffect: "Once per combat, may attack with horns (+4) instead of an axe. If the attack deals at least 3 damage, the target gets −2 to its Attack next round. Reduces the first physical and first magical damage it takes each round by 4; these are counted separately (minimum 0)." },
  obr: { name: "Giant", weapon: "Giant club", armor: "Tough hide", abilityName: "Wide Swing; Massive Body", abilityEffect: "Once per combat, attacks 2 targets, rolling separately against each and taking −2 to the final Attack result. Reduces each physical damage by 2 (minimum 0); magical damage is not reduced." },
  troll: { name: "Troll", weapon: "Heavy claws", armor: "Tough hide", abilityName: "Regeneration; Tough Hide", abilityEffect: "At the start of its turn, restores 2 Health if it has not taken magical damage since the end of its previous turn. Tough Hide reduces the first physical damage it takes each round by 2 (minimum 0)." },
  "goblini-nacelnik": { name: "Goblin Chieftain", weapon: "Short sword", armor: "Leather armor", abilityName: "Chieftain's Orders; Cunning Dodge", abilityEffect: "While the chieftain is conscious, one allied Goblin or Goblin Archer gains +1 to its final Attack result each round. Once per combat, after an attack target is declared, the chieftain gains +2 Defense against that attack." },
  "orci-nacelnik": { name: "Orc Chieftain", weapon: "One-handed axe", armor: "Scale armor", abilityName: "Battle Cry; Battle Fury", abilityEffect: "Once per combat before attacking, may choose up to 2 allies; they gain +1 to their final Attack result until the start of the chieftain's next turn. While below half of maximum Health, the chieftain gains +1 to the final result of close-range Attacks." },
};

export const translatedHumanoidShields: Record<string, string> = {
  "malý +1": "Small shield",
  "střední +2": "Medium shield",
};

export const translatedHumanoidGroupNotes: Record<string, string> = {
  "1–2 (2 těžké)": "1–2 (2 difficult)",
  "1; velmi těžké": "1; very difficult",
  "1 + 1 goblin": "1 + 1 goblin",
  "1 + 2 goblini": "1 + 2 goblins",
};

export const translatedResistance: Record<string, string> = {
  Fyzická: "Physical",
  Magická: "Magical",
  Smíšená: "Mixed",
  "Fyzická – skupinová": "Physical · group effect",
  "Fyzická + regenerace": "Physical + regeneration",
};
