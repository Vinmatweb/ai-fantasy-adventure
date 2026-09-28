export type EquipmentMeleeTranslation = { name: string; note: string };

export const meleeWeaponTranslations: Record<string, EquipmentMeleeTranslation> = {
  dyka: { name: "Dagger", note: "Light and easy to conceal." },
  "bojova-hul": { name: "Quarterstaff", note: "A simple weapon." },
  kyj: { name: "Club", note: "A simple strength-based weapon." },
  "kratky-mec": { name: "Short Sword", note: "—" },
  kopi: { name: "Spear", note: "Can also be used as a throwing weapon." },
  rapir: { name: "Rapier", note: "An agility-based alternative to a sword." },
  "jednorucni-mec": { name: "One-Handed Sword", note: "—" },
  palcat: { name: "Mace", note: "—" },
  "jednorucni-sekera": { name: "One-Handed Axe", note: "—" },
  halapartna: { name: "Halberd", note: "A long, two-handed weapon." },
  "obourucni-mec": { name: "Greatsword", note: "—" },
  "valecne-kladivo": { name: "Warhammer", note: "—" },
  "obourucni-sekera": { name: "Greataxe", note: "The strongest common weapon." },
};

const fieldNames: Record<string, string> = {
  Typ: "Type",
  "1/2R": "Hands",
  "S/O": "Attack attribute",
  "Min.": "Minimum attribute",
  "FÚ": "Physical Attack bonus",
  Cena: "Price",
  "Poznámka": "Note",
};

function translateFieldValue(key: string, value: string): string {
  if (key === "Typ") return value === "blízko" ? "Melee" : value;
  if (key === "1/2R") return value === "1R" ? "1 hand" : value === "2R" ? "2 hands" : value;
  if (key === "S/O") return value.replace("S", "STR").replace("O", "AGI");
  if (key === "Min.") return value.replace(/^S/, "STR ").replace(/^O/, "AGI ");
  if (key === "Cena") return value.replace(/\bz\b/g, "gp").replace(/\bs\b/g, "sp");
  return value;
}

export function translateMeleeWeaponFields(fields: Record<string, string | number | boolean>, note: string) {
  return Object.entries(fields).map(([key, value]) => ({
    label: fieldNames[key] ?? key,
    value: key === "Poznámka" ? note : translateFieldValue(key, String(value)),
  }));
}
