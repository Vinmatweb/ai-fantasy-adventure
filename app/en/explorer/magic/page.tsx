import type { Metadata } from "next";
import Link from "next/link";
import { gameData } from "../../../data";
import { magicSchoolTranslations } from "../../translations/magic";

export const metadata: Metadata = {
  title: "Magic",
  description: "Explore all 110 spells across eleven schools of magic in AI Fantasy Adventure.",
  alternates: { canonical: "/en/explorer/magic", languages: { "cs-CZ": "/explorer/magie", en: "/en/explorer/magic" } },
  openGraph: { locale: "en_US" },
};

export default function EnglishMagicPage() {
  return <main lang="en">
    <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/en">Home</Link><span>/</span><Link href="/en/explorer">World Explorer</Link><span>/</span><strong>Magic</strong></nav>
    <header className="encyclopedia-header"><div><p className="kicker">Spell catalogue · v1.0</p><h1>Eleven Schools of Magic</h1><p>Browse all 110 approved spells. Intelligence and level requirements allow a character to learn a spell, but the character must still acquire it in play.</p></div><strong className="encyclopedia-header__count">{gameData.spells.length} spells</strong></header>
    <div className="editorial-image"><img src="/assets/illustrations/magic-hero.webp" width="1672" height="941" alt="A magical book showing the different schools of magic" /></div>
    <div className="school-grid">{gameData.magicSchools.map((school) => {
      const translation = magicSchoolTranslations[school.slug];
      const spellCount = gameData.spells.filter((spell) => spell.schoolSlug === school.slug).length;
      return <Link href={`/en/explorer/magic/${school.slug}`} className={`school-card school-card--${school.tone}`} key={school.slug}>
        <span>{school.symbol}</span><small>{spellCount} spells</small><h2>{translation.name}</h2><p>{translation.description}</p><strong>Explore school →</strong>
      </Link>;
    })}</div>
    <Link href="/en/explorer" className="button button--outline">Back to World Explorer</Link>
  </main>;
}
