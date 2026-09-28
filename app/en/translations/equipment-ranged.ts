export type EquipmentRangedTranslation = { name: string; note: string };

export const rangedWeaponTranslations: Record<string, EquipmentRangedTranslation> = {
  "vrhaci-nuz": { name: "Throwing Knife", note: "Short range." },
  prak: { name: "Sling", note: "A simple ranged weapon." },
  ostep: { name: "Javelin", note: "A strength-based throwing weapon." },
  "kratky-luk": { name: "Shortbow", note: "—" },
  kuse: { name: "Crossbow", note: "—" },
  "dlouhy-luk": { name: "Longbow", note: "—" },
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
  if (key === "Typ") return value === "dálka" ? "Ranged" : value;
  if (key === "1/2R") return value === "1R" ? "1 hand" : value === "2R" ? "2 hands" : value;
  if (key === "S/O") return value.replace("S", "STR").replace("O", "AGI");
  if (key === "Min.") return value.replace(/^S/, "STR ").replace(/^O/, "AGI ");
  if (key === "Cena") return value.replace(/\bz\b/g, "gp").replace(/\bs\b/g, "sp");
  return value;
}

export function translateRangedWeaponFields(fields: Record<string, string | number | boolean>, note: string) {
  return Object.entries(fields).map(([key, value]) => ({
    label: fieldNames[key] ?? key,
    value: key === "Poznámka" ? note : translateFieldValue(key, String(value)),
  }));
}
