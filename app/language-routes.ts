import { gameData } from "./data";

const bestiaryEnglishToCzech: Record<string, string> = {
  animals: "zvirata",
  people: "lide-npc",
  "fantasy-humanoids": "fantasy-humanoidi",
  undead: "nemrtvi",
  monsters: "nestvury",
};
const bestiaryCzechToEnglish = Object.fromEntries(
  Object.entries(bestiaryEnglishToCzech).map(([english, czech]) => [czech, english]),
);
const equipmentEnglishToCzech: Record<string, string> = {
  "melee-weapons": "weapons-melee",
  "ranged-weapons": "weapons-ranged",
  armor: "armor",
  shields: "shields",
  "adventure-gear": "adventure-gear",
  instruments: "instruments",
  potions: "potions",
  "magic-items": "magic-items",
};
const equipmentCzechToEnglish = Object.fromEntries(
  Object.entries(equipmentEnglishToCzech).map(([english, czech]) => [czech, english]),
);

export function englishToCzechPath(pathname: string, hash = "") {
  const path = pathname.replace(/\/$/, "") || "/";
  if (path === "/en") return "/";
  if (path === "/en/explorer") {
    const section = hash.replace(/^#/, "");
    const sections: Record<string, string> = {
      heroes: "/explorer/hrdinove",
      bestiary: "/explorer/bestiar",
      equipment: "/explorer/vybaveni",
      magic: "/explorer/magie",
      rules: "/explorer/pravidla",
      vaelor: "/explorer/vaelor",
    };
    return sections[section] ?? "/explorer";
  }
  const heroPrefix = "/en/explorer/heroes";
  if (path === heroPrefix) return "/explorer/hrdinove";
  if (path.startsWith(`${heroPrefix}/`)) {
    const rest = path.slice(heroPrefix.length + 1).split("/");
    if (rest[0] === "races") return `/explorer/hrdinove/rasy${rest[1] ? `/${rest[1]}` : ""}`;
    if (rest[0] === "classes") return `/explorer/hrdinove/povolani${rest[1] ? `/${rest[1]}` : ""}`;
    return `/explorer/hrdinove/${rest.join("/")}`;
  }
  const bestiaryPrefix = "/en/explorer/bestiary";
  if (path === bestiaryPrefix) {
    const category = bestiaryEnglishToCzech[hash.replace(/^#/, "")];
    return category ? `/explorer/bestiar/kategorie/${category}` : "/explorer/bestiar";
  }
  if (path.startsWith(`${bestiaryPrefix}/`)) {
    const rest = path.slice(bestiaryPrefix.length + 1).split("/");
    const entrySlug = rest.length > 1 ? rest[1] : undefined;
    if (entrySlug) return `/explorer/bestiar/${entrySlug}`;
    const category = bestiaryEnglishToCzech[rest[0]];
    return category ? `/explorer/bestiar/kategorie/${category}` : "/explorer/bestiar";
  }
  const equipmentPrefix = "/en/explorer/equipment";
  if (path === equipmentPrefix) return "/explorer/vybaveni";
  if (path.startsWith(`${equipmentPrefix}/`)) {
    const rest = path.slice(equipmentPrefix.length + 1).split("/");
    if (rest.length > 1) return `/explorer/vybaveni/${rest[1]}`;
    const category = equipmentEnglishToCzech[rest[0]];
    return category ? `/explorer/vybaveni/kategorie/${category}` : "/explorer/vybaveni";
  }
  return "/explorer";
}

export function czechToEnglishPath(pathname: string) {
  const path = pathname.replace(/\/$/, "") || "/";
  if (path === "/") return "/en";
  if (path === "/explorer") return "/en/explorer";
  if (path === "/explorer/vybaveni") return "/en/explorer/equipment";
  const heroPrefix = "/explorer/hrdinove";
  if (path === heroPrefix) return "/en/explorer/heroes";
  if (path.startsWith(`${heroPrefix}/`)) {
    const rest = path.slice(heroPrefix.length + 1).split("/");
    if (rest[0] === "rasy") return `/en/explorer/heroes/races${rest[1] ? `/${rest[1]}` : ""}`;
    if (rest[0] === "povolani") return `/en/explorer/heroes/classes${rest[1] ? `/${rest[1]}` : ""}`;
    return `/en/explorer/heroes/${rest.join("/")}`;
  }
  const bestiaryPrefix = "/explorer/bestiar";
  if (path === bestiaryPrefix) return "/en/explorer/bestiary";
  if (path.startsWith(`${bestiaryPrefix}/kategorie/`)) {
    const category = path.slice(`${bestiaryPrefix}/kategorie/`.length);
    return bestiaryCzechToEnglish[category]
      ? `/en/explorer/bestiary/${bestiaryCzechToEnglish[category]}`
      : "/en/explorer/bestiary";
  }
  if (path.startsWith(`${bestiaryPrefix}/`)) {
    const slug = path.slice(bestiaryPrefix.length + 1);
    const entry = gameData.bestiary.find((item) => item.slug === slug);
    const category = entry && bestiaryCzechToEnglish[entry.categorySlug];
    return category ? `/en/explorer/bestiary/${category}/${slug}` : "/en/explorer/bestiary";
  }
  const equipmentPrefix = "/explorer/vybaveni";
  if (path.startsWith(`${equipmentPrefix}/kategorie/`)) {
    const category = path.slice(`${equipmentPrefix}/kategorie/`.length);
    const english = equipmentCzechToEnglish[category];
    return english ? `/en/explorer/equipment/${english}` : "/en/explorer/equipment/melee-weapons";
  }
  if (path.startsWith(`${equipmentPrefix}/`)) {
    const slug = path.slice(equipmentPrefix.length + 1);
    const item = gameData.equipment.find((entry) => entry.slug === slug);
    const category = item && equipmentCzechToEnglish[item.categorySlug];
    return category ? `/en/explorer/equipment/${category}/${slug}` : "/en/explorer/equipment/melee-weapons";
  }
  if (path.startsWith("/explorer/magie")) return "/en/explorer#magic";
  if (path.startsWith("/explorer/pravidla")) return "/en/explorer#rules";
  if (path.startsWith("/explorer/vaelor")) return "/en/explorer#vaelor";
  return "/en";
}
