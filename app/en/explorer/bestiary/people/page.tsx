import type { Metadata } from "next";
import Link from "next/link";
import { CollectionSearch, type SearchItem } from "../../../../components/CollectionSearch";
import { gameData } from "../../../../data";
import { peopleNpcTranslations } from "../../../translations/people-npcs";

export const metadata: Metadata = {
  title: "People and NPCs",
  description: "Browse all 16 people and non-player character profiles in the AI Fantasy Adventure bestiary.",
  alternates: { canonical: "/en/explorer/bestiary/people", languages: { en: "/en/explorer/bestiary/people" } },
  openGraph: { locale: "en_US" },
};

const entries = gameData.bestiary.filter((entry) => entry.categorySlug === "lide-npc");
const items: SearchItem[] = entries.map((entry) => {
  const translation = peopleNpcTranslations[entry.slug]!;
  return {
    href: `/en/explorer/bestiary/people/${entry.slug}`,
    title: translation.name,
    eyebrow: `Challenge ${entry.difficulty}${entry.isBoss ? " · Boss" : ""}`,
    description: translation.abilityName === "—" ? "No special ability" : translation.abilityName,
    meta: `${entry.stats.hp} Health · ${entry.xp} XP`,
    image: `/assets/bestiary/${entry.slug}.webp`,
    imageAlt: `Fantasy illustration of ${translation.name}`,
  };
});

export default function EnglishPeoplePage() {
  return <><main lang="en" ><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/en">Home</Link><span>/</span><Link href="/en/explorer">World Explorer</Link><span>/</span><Link href="/en/explorer/bestiary">Bestiary</Link><span>/</span><strong>People and NPCs</strong></nav><header className="encyclopedia-header"><div><p className="kicker">Bestiary v1.0</p><h1>People and NPCs</h1><p>Meet the people who live, work, trade, guard, and sometimes fight across the world. Open an entry for its approved stat block and special ability.</p></div><strong className="encyclopedia-header__count">{entries.length} profiles</strong></header><CollectionSearch items={items} placeholder="Search people and NPCs…" locale="en" /></main></>;
}
