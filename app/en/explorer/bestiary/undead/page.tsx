import type { Metadata } from "next";
import Link from "next/link";
import { CollectionSearch, type SearchItem } from "../../../../components/CollectionSearch";
import { SiteFooter } from "../../../../components/SiteFooter";
import { SiteHeader } from "../../../../components/SiteHeader";
import { gameData } from "../../../../data";
import { undeadTranslations } from "../../../translations/undead";

export const metadata: Metadata = {
  title: "Undead",
  description: "Browse all nine undead profiles in the AI Fantasy Adventure bestiary.",
  alternates: { canonical: "/en/explorer/bestiary/undead", languages: { en: "/en/explorer/bestiary/undead" } },
  openGraph: { locale: "en_US" },
};

const entries = gameData.bestiary.filter((entry) => entry.categorySlug === "nemrtvi");
const items: SearchItem[] = entries.map((entry) => {
  const translation = undeadTranslations[entry.slug]!;
  return {
    href: `/en/explorer/bestiary/undead/${entry.slug}`,
    title: translation.name,
    eyebrow: `Challenge ${entry.difficulty}${entry.isBoss ? " · Boss" : ""}`,
    description: translation.abilityName,
    meta: `${entry.stats.hp} Health · ${entry.xp} XP`,
    image: `/assets/bestiary/${entry.slug}.webp`,
    imageAlt: `Fantasy illustration of ${translation.name}`,
  };
});

export default function EnglishUndeadPage() {
  return <><SiteHeader locale="en" /><main lang="en" className="shell section"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/en">Home</Link><span>/</span><Link href="/en/explorer">World Explorer</Link><span>/</span><Link href="/en/explorer/bestiary">Bestiary</Link><span>/</span><strong>Undead</strong></nav><header className="encyclopedia-header"><div><p className="kicker">Bestiary v1.0</p><h1>Undead</h1><p>Face skeletons, restless spirits, and other creatures that defy death. Open an entry for its full stat block, equipment, and special abilities.</p></div><strong className="encyclopedia-header__count">{entries.length} profiles</strong></header><CollectionSearch items={items} placeholder="Search undead…" locale="en" /></main><SiteFooter locale="en" /></>;
}
