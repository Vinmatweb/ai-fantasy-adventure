export type EnglishRace = {
  name: string;
  tagline: string;
  description: string;
  abilityName: string;
  abilityEffect: string;
};

export type EnglishClass = {
  name: string;
  tagline: string;
  description: string;
  playStyle: string;
  abilityName: string;
  abilityEffect: string;
};

export const raceTranslations: Record<string, EnglishRace> = {
  clovek: {
    name: "Human",
    tagline: "A hero who chooses their own path.",
    description: "Humans are adaptable adventurers with no predetermined strong or weak attribute. During character creation, the player chooses one of each, and they must be different.",
    abilityName: "Adaptability",
    abilityEffect: "Once per adventure, after a failed roll of their own, the human may try again. Vaelor creates a new random permutation, the player chooses a number again, and the better result is used.",
  },
  elf: {
    name: "Elf",
    tagline: "A sharp mind, keen eyes, and a feel for magic.",
    description: "Elves excel in Intelligence and awareness. They can spot distant visible details, but lack brute strength.",
    abilityName: "Keen Sight",
    abilityEffect: "Automatically notices a distant visible detail, tracks, or movement unless it is magically or otherwise hidden.",
  },
  trpaslik: {
    name: "Dwarf",
    tagline: "Steady as stone and at home underground.",
    description: "Dwarves rely on Strength, resilience, and a deep knowledge of stone. They are less agile but excel at direct, practical solutions.",
    abilityName: "Stone Sense",
    abilityEffect: "In relevant stone or underground surroundings, automatically detects cavities, secret passages, unstable rock, good ore, or unusual properties of stone.",
  },
  ork: {
    name: "Orc",
    tagline: "Mighty strength guided by a courageous heart.",
    description: "Orcs are the strongest of the core races. When their Health is low, their close-range attacks grow stronger, though magic is harder for them.",
    abilityName: "Battle Fury",
    abilityEffect: "While below half of maximum Health, gains +1 to the result of every close-range attack.",
  },
  pulcik: {
    name: "Halfling",
    tagline: "Small in stature, lucky, and quick with their hands.",
    description: "Halflings rely on Agility and remarkable Luck. They are not strong, but once per adventure can turn a failure into a narrow success.",
    abilityName: "Lucky Break",
    abilityEffect: "Once per adventure, after their own failed virtual roll, changes the result to a narrow success. The roll is not repeated; this is the lowest success needed, with no extra benefit.",
  },
  vila: {
    name: "Fairy",
    tagline: "A tiny magical being with healing dust and light wings.",
    description: "Fairies are small winged beings gifted with magic, agility, and luck. Their fairy dust strengthens every healing effect, but their small size means very low Strength.",
    abilityName: "Fairy Dust",
    abilityEffect: "Every healing effect performed by a fairy restores 1 additional Health.",
  },
};

export const classTranslations: Record<string, EnglishClass> = {
  bojovnik: {
    name: "Warrior",
    tagline: "Holds the front line and protects the party.",
    description: "Warriors face danger with strength, courage, and reliable gear. Once per combat, a warrior can take an attack meant for a nearby ally.",
    playStyle: "Direct combat, protecting allies, and a wide choice of weapons and armor.",
    abilityName: "Protect",
    abilityEffect: "Once per combat, may take an attack aimed at a nearby ally. The attack is resolved against the warrior's defense instead.",
  },
  hranicar: {
    name: "Ranger",
    tagline: "A tracker, archer, and guide through the wilds.",
    description: "Rangers combine Strength and Agility. They can automatically determine the direction of usable tracks and excel at exploration and ranged attacks.",
    playStyle: "Exploration, ranged combat, wilderness travel, and smart preparation.",
    abilityName: "Tracker",
    abilityEffect: "Automatically recognizes which way a person or animal being tracked went, if usable tracks remain.",
  },
  kouzelnik: {
    name: "Wizard",
    tagline: "Commands the widest range of magic.",
    description: "Wizards begin with high Intelligence, the strongest magic modifiers, and five known spells. They can always sense magic, but may not know its exact purpose.",
    playStyle: "Spells, knowledge, puzzles, and powerful magical attacks.",
    abilityName: "Magic Sense",
    abilityEffect: "Automatically recognizes that an item, place, or creature is magical. This does not reveal the magic's exact type, purpose, trigger, or danger.",
  },
  zlodej: {
    name: "Rogue",
    tagline: "Quiet, agile, and ready for locks and traps.",
    description: "Rogues excel in Agility and Luck. Ordinary sneaking succeeds automatically, and their tools open paths others cannot.",
    playStyle: "Stealth, locks, traps, precise attacks, and clever solutions.",
    abilityName: "Soft Steps",
    abilityEffect: "For ordinary sneaking, Vaelor assumes success. A roll is needed only for an exceptional obstacle; this cannot make hiding possible where it is objectively impossible.",
  },
  lecitel: {
    name: "Healer",
    tagline: "Keeps the party standing and drives back the dark.",
    description: "Healers combine Intelligence and Charisma, begin with four spells, and have the strongest healing modifier. They can use first aid outside their magic limit.",
    playStyle: "Healing, protection, cleansing, support, and calm leadership.",
    abilityName: "First Aid",
    abilityEffect: "Once per combat, restores ⌈Intelligence/2⌉ Health to themself or one ally, up to the maximum. This is not a healing spell and does not use the healing magic limit.",
  },
  bard: {
    name: "Bard",
    tagline: "Stories, music, and the right words at the right moment.",
    description: "Bards rely on Charisma and Agility. Once in an important scene or combat, they can improve their own or an ally's roll bonus by one step.",
    playStyle: "Social scenes, party support, music, and versatility.",
    abilityName: "Inspiration",
    abilityEffect: "Once during a combat or important scene, after a virtual roll is revealed, may raise their own or an ally's roll bonus by one step, up to that category's maximum. It takes no main action and cannot be used on an enemy.",
  },
};

export const attributeNames: Record<string, string> = {
  strength: "Strength",
  agility: "Agility",
  intelligence: "Intelligence",
  charisma: "Charisma",
  luck: "Luck",
};

export const shortAttributeNames: Record<string, string> = {
  strength: "STR",
  agility: "AGI",
  intelligence: "INT",
  charisma: "CHA",
  luck: "LUCK",
};

export const attributeCodeNames: Record<string, string> = {
  S: "Strength",
  O: "Agility",
  CH: "Intelligence",
  CHA: "Charisma",
  Š: "Luck",
  "volí hráč": "Player's choice",
};

export const startingEquipmentNames: Record<string, string> = {
  "Krátký meč": "Short Sword",
  "Střední štít": "Medium Shield",
  "Prošívaná zbroj": "Padded Armor",
  "Krátký luk": "Shortbow",
  "Dýka": "Dagger",
  "Vrhací nůž": "Throwing Knife",
  "Kožená zbroj": "Leather Armor",
  "Kouzelnická hůl": "Wizard's Staff",
  "bez zbroje": "No Armor",
  "Toulec": "Quiver",
  "Batoh": "Backpack",
  "batoh": "Backpack",
  "provaz": "Rope",
  "křesadlo": "Flint and steel",
  "měch na vodu": "Waterskin",
  "cestovní jídlo": "Trail rations",
  "Pergamen": "Parchment",
  "brk": "Quill",
  "inkoust": "Ink",
  "lucerna": "Lantern",
  "Paklíče": "Lockpicks",
  "křída": "Chalk",
  "Léčitelská brašna": "Healer's Kit",
  "obvazy": "Bandages",
  "měch s vínem": "Wine flask",
  "1 hudební nástroj dle výběru": "One musical instrument of choice",
};

export const startingEquipmentNotes: Record<string, string> = {
  bojovnik: "You may choose another reasonable combination of weapon, shield, and armor if you meet the requirements.",
  hranicar: "A long dagger uses the Dagger's game stats.",
  kouzelnik: "Wizard's Staff uses the Quarterstaff's base stats, with +1 Physical Attack and an additional +1 Intelligence.",
  lecitel: "The dagger may also serve as a practical knife for gathering herbs.",
  bard: "You may choose a crossbow or another suitable weapon if you meet its requirements and Vaelor keeps the loadout at roughly the same value.",
};
