export const ruleChapters = [
  {
    title: "What is AI Fantasy Adventure?",
    paragraphs: [
      "A cooperative storytelling fantasy RPG for children around ages 5–10. Players say what their heroes want to do; Vaelor describes the world and the consequences.",
    ],
  },
  {
    title: "Creating a hero",
    paragraphs: [
      "Each attribute starts at 5. Add the chosen race and class modifiers, then make five separate virtual rolls to determine the hero’s final attributes. The race sets one strong and one weak attribute; the class adds an ability and starting equipment.",
    ],
    formula: "Maximum HP = STR + AGI + ⌈LUCK / 2⌉",
  },
  {
    title: "The virtual die",
    paragraphs: [
      "Before every roll, Vaelor secretly creates a new random mapping of the numbers 1–6. The player chooses a number from 1 to 6; Vaelor reveals the actual roll and applies the relevant attribute and rule.",
    ],
  },
  {
    title: "How an adventure unfolds",
    paragraphs: [
      "A typical adventure has about 5–8 scenes. A setback moves the story forward with a complication, a cost, or another route. Combat is never the only solution.",
    ],
    steps: ["Hook", "Exploration", "Complication", "Choice", "Climax", "Resolution"],
  },
  {
    title: "Combat",
    paragraphs: [
      "Each player takes one main action per round. Vaelor uses the approved creature statistics and resolves attacks, defenses, and damage before describing what happens. A significant encounter usually lasts around 3–5 rounds; creature statistics are never secretly changed during a fight.",
    ],
    formula: "Luck Bonus = ⌈LUCK / 3⌉",
  },
  {
    title: "Magic",
    paragraphs: [
      "There is no mana. A spell’s Intelligence and level requirements only make it eligible to learn; the hero must still acquire the spell in the story. An area spell can affect up to 3 valid targets unless its catalogue entry says otherwise.",
      "A caster can use at most one spell that restores HP during a combat and can maintain at most one concentration spell at a time. The spell catalogue gives the exact effect and limitations of every spell.",
    ],
  },
  {
    title: "Experience and levels",
    paragraphs: [
      "Heroes start at Level 1 with 0 XP. Each new level grants +1 to one chosen attribute, up to its natural maximum of 20. Playable levels are 1–99.",
    ],
    formula: "XP to the next level = 200 + 100 × current level",
  },
  {
    title: "Simple mode",
    paragraphs: [
      "Groups can play without XP or levels. After a significant adventure, a hero may increase one attribute by +1. A short episode is not enough for an increase.",
    ],
  },
] as const;

export const vaelorPage = {
  title: "Vaelor, also known as Oryn",
  epithet: "The One Who Knows All Stories",
  introduction: "Vaelor is the AI Game Master itself—not an NPC or another character in the world. Vaelor describes the setting, presents clear possibilities, resolves uncertain actions using the rules, and narrates their consequences. The players always make the decisions for their own heroes.",
  does: [
    "Describes places, events, and the consequences of the players’ choices",
    "Plays all NPCs and opponents",
    "Tracks HP, XP, levels, equipment, spells, and the campaign state",
    "Calculates attacks, defenses, damage, and other game rules",
    "Makes virtual rolls for opponents and keeps hidden information",
    "Reminds players about useful abilities, spells, and items",
  ],
  doesNot: [
    "Choose actions or make decisions for the heroes",
    "Change a random result to fit the story",
    "Alter approved creature statistics during an encounter",
    "Invent hidden bonuses or silently change approved values",
    "Force combat as the only way forward",
    "Let one failed roll bring the story to a halt",
  ],
  activation: "After the four v1.0 game documents are uploaded, an ordinary request such as “Let’s play” activates Vaelor. No special prompt or exact wording is needed.",
  preparation: [
    "Ask how many players are joining, their approximate ages, and the preferred length and mood of the game.",
    "Guide each player through choosing and creating a complete hero, including the required virtual rolls.",
    "Check that every hero is complete and confirmed before starting the adventure.",
    "Open with a clear situation and a meaningful choice; keep the story moving through action, exploration, puzzles, and conversations.",
  ],
  quote: "Every story has many paths. I know the world’s rules—but I leave the choices to the heroes.",
} as const;
