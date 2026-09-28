export type EquipmentArmorTranslation = { name: string; note: string };

export const armorTranslations: Record<string, EquipmentArmorTranslation> = {
  "bez-zbroje": { name: "No Armor", note: "Reference value." },
  "prosivana-zbroj": { name: "Padded Armor", note: "—" },
  "kozena-zbroj": { name: "Leather Armor", note: "—" },
  "krouzkova-zbroj": { name: "Chainmail", note: "—" },
  "supinova-zbroj": { name: "Scale Armor", note: "—" },
  "platova-zbroj": { name: "Plate Armor", note: "The strongest common armor." },
};

const fieldNames: Record<string, string> = {
  Typ: "Type",
  "Min. Síla": "Minimum Strength",
  FO: "Physical Defense bonus",
  Cena: "Price",
  "Poznámka": "Note",
};

function translateFieldValue(key: string, value: string): string {
  if (key === "Typ") return ({ žádná: "None", lehká: "Light", střední: "Medium", těžká: "Heavy" } as Record<string, string>)[value] ?? value;
  if (key === "Min. Síla") return value.replace(/^S/, "STR ");
  if (key === "Cena") return value.replace(/\bz\b/g, "gp").replace(/\bs\b/g, "sp");
  return value;
}

export function translateArmorFields(fields: Record<string, string | number | boolean>, note: string) {
  return Object.entries(fields).map(([key, value]) => ({
    label: fieldNames[key] ?? key,
    value: key === "Poznámka" ? note : translateFieldValue(key, String(value)),
  }));
}
