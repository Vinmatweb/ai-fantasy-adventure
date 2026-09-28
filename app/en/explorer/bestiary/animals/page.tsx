import type { Metadata } from "next";
import Link from "next/link";
import { CollectionSearch, type SearchItem } from "../../../../components/CollectionSearch";
import { SiteFooter } from "../../../../components/SiteFooter";
import { SiteHeader } from "../../../../components/SiteHeader";
import { gameData } from "../../../../data";
import { animalTranslations } from "../../../translations/animals";

export const metadata: Metadata = {
  title: "Animals",
  description: "Browse the twelve animal profiles in the AI Fantasy Adventure bestiary.",
  alternates: { canonical: "/en/explorer/bestiary/animals", languages: { en: "/en/explorer/bestiary/animals" } },
  openGraph: { locale: "en_US" },
};

const entries = gameData.bestiary.filter((entry) => entry.categorySlug === "zvirata");
const items: SearchItem[] = entries.map((entry) => {
  const translation = animalTranslations[entry.slug]!;
  return {
    href: `/en/explorer/bestiary/animals/${entry.slug}`,
    title: translation.name,
    eyebrow: `Challenge ${entry.difficulty}`,
    description: translation.abilityName === "—" ? "No special ability" : translation.abilityName,
    meta: `${entry.stats.hp} Health · ${entry.xp} XP`,
    image: `/assets/bestiary/${entry.slug}.webp`,
    imageAlt: `Fantasy illustration of a ${translation.name}`,
  };
});

export default function EnglishAnimalsPage() {
  return <><SiteHeader locale="en" /><main lang="en" className="shell section"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/en">Home</Link><span>/</span><Link href="/en/explorer">World Explorer</Link><span>/</span><Link href="/en/explorer/bestiary">Bestiary</Link><span>/</span><strong>Animals</strong></nav><header className="encyclopedia-header"><div><p className="kicker">Bestiary v1.0</p><h1>Animals</h1><p>Meet the creatures that roam forests, fields, caves, and rivers. Open an entry for its full stat block, equipment, and special ability.</p></div><strong className="encyclopedia-header__count">{entries.length} profiles</strong></header><CollectionSearch items={items} placeholder="Search animals…" locale="en" /></main><SiteFooter locale="en" /></>;
}
