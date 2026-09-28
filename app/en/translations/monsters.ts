import type { AnimalTranslation } from "./animals";

export const monsterTranslations: Record<string, AnimalTranslation> = {
  "obri-had": { name: "Giant Snake", weapon: "Bite", armor: "Scales", abilityName: "Potent Venom", abilityEffect: "If its bite deals at least 1 damage, the target loses 2 Health at the end of the next round. This effect does not stack." },
  "obri-pavouk": { name: "Giant Spider", weapon: "Fangs", armor: "Carapace", abilityName: "Venom and Web", abilityEffect: "After its fangs deal damage, the target loses 1 Health at the end of the next round. Once per combat, its web gives the target −2 Defense until the end of its next turn." },
  harpyje: { name: "Harpy", weapon: "Claws", armor: "Feathers", abilityName: "Luring Song", abilityEffect: "Once per combat, makes a magic attack with a +2 bonus. If it beats the target's Magic Defense, the target gets −2 to Attack next round; this causes no damage." },
  gryfon: { name: "Griffin", weapon: "Claws", armor: "Feathers", abilityName: "Dive Attack", abilityEffect: "Once per combat, gains +2 to the final Attack result; afterward, its Physical Defense is −1 until its next turn." },
  bazilisek: { name: "Basilisk", weapon: "Bite", armor: "Scales", abilityName: "Petrifying Gaze; Magic Scales", abilityEffect: "Once per combat, makes a magic attack with a +3 bonus. If it beats the target's Magic Defense, the target cannot attack next round but can defend as normal; this causes no damage. The basilisk gains +2 Magic Defense against magical attacks." },
  "kamenny-golem": { name: "Stone Golem", weapon: "Stone fists", armor: "Stone body", abilityName: "Stone Body; Runic Core", abilityEffect: "Reduces each physical damage by 2 (minimum 0). If a single magic attack deals at least 4 damage, this reduction is disabled until the start of the golem's next turn." },
  elemental: { name: "Elemental", weapon: "Elemental strike", armor: "Elemental body", abilityName: "Elemental Blast; Elemental Essence", abilityEffect: "Can make a magic attack with a +3 spell bonus. Gains +2 Magic Defense against magical attacks, except magic that is clearly the natural opposite of its element; against that, its Magic Defense is −2 instead." },
  chimera: { name: "Chimera", weapon: "Fangs and claws", armor: "Tough hide", abilityName: "Double Strike", abilityEffect: "Once per combat, makes 2 physical attacks in one turn, each with −2 to the final Attack result." },
  hydra: { name: "Hydra", weapon: "Heads", armor: "Scales", abilityName: "Many Heads; Tenacious Necks", abilityEffect: "Each round, can attack 2 different targets; each attack has −2 to the final Attack result. Reduces the first 2 instances of damage it takes each round by 3 (minimum 0)." },
  wyverna: { name: "Wyvern", weapon: "Claws", armor: "Scales", abilityName: "Poisonous Stinger", abilityEffect: "Once per combat, after a physical hit, adds 2 damage. It cannot use this bonus if the basic attack dealt 0 damage." },
  "mlady-drak": { name: "Young Dragon", weapon: "Claws", armor: "Scales", abilityName: "Dragon Breath; Dragon Scales", abilityEffect: "Once per combat, makes a magic attack with a +3 spell bonus against up to 2 targets, rolling separately for each. Dragon Scales reduce the first physical damage it takes each round by 2 (minimum 0)." },
  "dospely-drak": { name: "Adult Dragon", weapon: "Claws", armor: "Scales", abilityName: "Dragon Breath; Ancient Scales and Revealed Weakness", abilityEffect: "Once per combat, makes a magic attack with a +4 spell bonus against up to 2 targets; each target defends separately. Reduces the first physical and first magical damage it takes each round by 2. If the party discovers and actually exploits its specific weakness, the reduction ends and its Physical and Magic Defense are −2." },
  "prastary-drak": { name: "Ancient Dragon", weapon: "Claws", armor: "Scales", abilityName: "Dragon Breath; Elder Scales and Revealed Weakness", abilityEffect: "Once per combat, makes a magic attack with a +4 spell bonus against up to 2 targets; each target defends separately. Reduces the first physical and first magical damage it takes each round by 3. If the party discovers and actually exploits its specific weakness, the reduction ends and its Physical and Magic Defense are −4." },
};

export const translatedMonsterGroupNotes: Record<string, string> = {
  "1; těžké": "1; difficult",
  "1; velmi těžké": "1; very difficult",
  "1; protikladný element vhodný": "1; opposing element recommended",
  "1; raději obejít": "1; avoid if possible",
  "1; slabina nutná": "1; weakness required",
};

export const translatedMonsterResistance: Record<string, string> = {
  "Magická": "Magical",
  "Fyzická": "Physical",
  "Smíšená proti focus-fire": "Mixed · resists focus fire",
  "Fyzická / prolomitelná magií": "Physical · can be broken by magic",
  "Magická / elementární slabina": "Magical · elemental weakness",
  "Smíšená + slabina": "Mixed · has a weakness",
};
