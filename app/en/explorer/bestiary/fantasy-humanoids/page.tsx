import type { Metadata } from "next";
import Link from "next/link";
import { CollectionSearch, type SearchItem } from "../../../../components/CollectionSearch";
import { gameData } from "../../../../data";
import { fantasyHumanoidTranslations } from "../../../translations/fantasy-humanoids";

export const metadata: Metadata = {
  title: "Fantasy Humanoids",
  description: "Browse all twelve fantasy humanoid profiles in the AI Fantasy Adventure bestiary.",
  alternates: { canonical: "/en/explorer/bestiary/fantasy-humanoids", languages: { en: "/en/explorer/bestiary/fantasy-humanoids" } },
  openGraph: { locale: "en_US" },
};

const entries = gameData.bestiary.filter((entry) => entry.categorySlug === "fantasy-humanoidi");
const items: SearchItem[] = entries.map((entry) => {
  const translation = fantasyHumanoidTranslations[entry.slug]!;
  return {
    href: `/en/explorer/bestiary/fantasy-humanoids/${entry.slug}`,
    title: translation.name,
    eyebrow: `Challenge ${entry.difficulty}${entry.isBoss ? " · Boss" : ""}`,
    description: translation.abilityName,
    meta: `${entry.stats.hp} Health · ${entry.xp} XP`,
    image: `/assets/bestiary/${entry.slug}.webp`,
    imageAlt: `Fantasy illustration of ${translation.name}`,
  };
});

export default function EnglishFantasyHumanoidsPage() {
  return <><main lang="en" ><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/en">Home</Link><span>/</span><Link href="/en/explorer">World Explorer</Link><span>/</span><Link href="/en/explorer/bestiary">Bestiary</Link><span>/</span><strong>Fantasy Humanoids</strong></nav><header className="encyclopedia-header"><div><p className="kicker">Bestiary v1.0</p><h1>Fantasy Humanoids</h1><p>Meet goblins, kobolds, giants, and other folk of the fantasy world. Open an entry for its full stat block, equipment, and special abilities.</p></div><strong className="encyclopedia-header__count">{entries.length} profiles</strong></header><CollectionSearch items={items} placeholder="Search fantasy humanoids…" locale="en" /></main></>;
}
