export type AnimalTranslation = {
  name: string;
  weapon: string;
  armor: string;
  abilityName: string;
  abilityEffect: string;
};

export const animalTranslations: Record<string, AnimalTranslation> = {
  krysa: { name: "Rat", weapon: "Bite", armor: "No armor", abilityName: "Slip Away", abilityEffect: "Once per combat, after taking damage, gains +2 Defense against the next physical attack." },
  netopyr: { name: "Bat", weapon: "Bite", armor: "Fur", abilityName: "Flight", abilityEffect: "While it can fly, gains +1 Defense against close-range attacks." },
  "divoka-kocka": { name: "Wildcat", weapon: "Claws", armor: "Fur", abilityName: "Pounce", abilityEffect: "Gains +1 to the final Attack result during the first round of combat." },
  "toulavy-pes": { name: "Stray Dog", weapon: "Bite", armor: "Fur", abilityName: "—", abilityEffect: "No special ability." },
  liska: { name: "Fox", weapon: "Bite", armor: "Fur", abilityName: "Dodge", abilityEffect: "Once per combat, after an attack target is declared, gains +2 Defense against that attack." },
  vlk: { name: "Wolf", weapon: "Fangs", armor: "Fur", abilityName: "Pack Attack", abilityEffect: "If at least one other wolf attacked the same target this round, this wolf gains +1 to its final Attack result." },
  "divoke-prase": { name: "Wild Boar", weapon: "Tusks", armor: "Tough hide", abilityName: "Charge", abilityEffect: "During the first round, if it can attack after building up speed, gains +2 to its final Attack result." },
  "jedovaty-had": { name: "Venomous Snake", weapon: "Venomous bite", armor: "Scales", abilityName: "Venom", abilityEffect: "If a bite deals at least 1 damage, the target loses 1 additional Health at the end of each of the next 2 rounds. This effect does not stack." },
  medved: { name: "Bear", weapon: "Claws and paws", armor: "Thick fur", abilityName: "Mighty Blow", abilityEffect: "Once per combat, gains +2 to the final result of a close-range Attack." },
  krokodyl: { name: "Crocodile", weapon: "Jaws", armor: "Scales", abilityName: "Crush; Tough Hide", abilityEffect: "If one attack deals at least 3 damage, the target gets −1 to its final Attack result next round. Tough Hide reduces the first physical damage the crocodile takes each round by 2 (minimum 0)." },
  orel: { name: "Eagle", weapon: "Talons", armor: "Feathers", abilityName: "Dive Attack", abilityEffect: "Once per combat, gains +2 to the final Attack result. After this attack, has −1 Defense until the start of its next turn." },
  jelen: { name: "Deer", weapon: "Antlers", armor: "Fur", abilityName: "Flee", abilityEffect: "If it chooses to flee instead of attacking, gains +2 Defense until its next turn." },
};

export const attributeName: Record<string, string> = {
  S: "Strength",
  O: "Agility",
  CH: "Intelligence",
  CHA: "Charisma",
  Š: "Luck",
};
