import type { Metadata } from "next";
import Link from "next/link";
import { CollectionSearch, type SearchItem } from "../../../../components/CollectionSearch";
import { SiteFooter } from "../../../../components/SiteFooter";
import { SiteHeader } from "../../../../components/SiteHeader";
import { gameData } from "../../../../data";
import { monsterTranslations } from "../../../translations/monsters";

export const metadata: Metadata = {
  title: "Monsters",
  description: "Browse all thirteen monster profiles in the AI Fantasy Adventure bestiary.",
  alternates: { canonical: "/en/explorer/bestiary/monsters", languages: { en: "/en/explorer/bestiary/monsters" } },
  openGraph: { locale: "en_US" },
};

const entries = gameData.bestiary.filter((entry) => entry.categorySlug === "nestvury");
const items: SearchItem[] = entries.map((entry) => {
  const translation = monsterTranslations[entry.slug]!;
  return {
    href: `/en/explorer/bestiary/monsters/${entry.slug}`,
    title: translation.name,
    eyebrow: `Challenge ${entry.difficulty}${entry.isBoss ? " · Boss" : ""}`,
    description: translation.abilityName,
    meta: `${entry.stats.hp} Health · ${entry.xp} XP`,
    image: `/assets/bestiary/${entry.slug}.webp`,
    imageAlt: `Fantasy illustration of ${translation.name}`,
  };
});

export default function EnglishMonstersPage() {
  return <><SiteHeader locale="en" /><main lang="en" className="shell section"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/en">Home</Link><span>/</span><Link href="/en/explorer">World Explorer</Link><span>/</span><Link href="/en/explorer/bestiary">Bestiary</Link><span>/</span><strong>Monsters</strong></nav><header className="encyclopedia-header"><div><p className="kicker">Bestiary v1.0</p><h1>Monsters</h1><p>Explore the dangerous creatures that haunt the wilderness, ruins, and skies. Open an entry for its full stat block, equipment, and special abilities.</p></div><strong className="encyclopedia-header__count">{entries.length} profiles</strong></header><CollectionSearch items={items} placeholder="Search monsters…" locale="en" /></main><SiteFooter locale="en" /></>;
}
