import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { gameData } from "../../data";

export const metadata: Metadata = {
  title: "World Explorer",
  description: "Explore the heroes, bestiary, equipment, magic, rules, and setting of AI Fantasy Adventure.",
  alternates: { canonical: "/en/explorer", languages: { "cs-CZ": "/explorer", en: "/en/explorer" } },
  openGraph: { locale: "en_US" },
};

const sections = [
  { id: "heroes", title: "Heroes", count: `${gameData.meta.counts.heroes} starting heroes`, icon: "♜", body: "Choose from six playable races and six classes. Each of the 36 combinations has its own starting stats, abilities, and equipment." },
  { id: "bestiary", title: "Bestiary", count: `${gameData.meta.counts.bestiary} creatures and NPCs`, icon: "◉", body: "Meet the animals, people, monsters, and other inhabitants of the world, with their game statistics and stories." },
  { id: "equipment", title: "Equipment", count: `${gameData.meta.counts.equipment} items`, icon: "⚔", body: "Browse weapons, armor, tools, potions, and magical items for your adventures." },
  { id: "magic", title: "Magic", count: `${gameData.meta.counts.spells} spells`, icon: "✦", body: "Discover the spell catalogue, organized by schools of magic and ready to use in play." },
  { id: "rules", title: "Rules", count: "Quick reference", icon: "📖", body: "Learn the basics of character creation, checks, combat, and cooperative play with the AI Game Master." },
  { id: "vaelor", title: "Vaelor", count: "AI Game Master", icon: "☼", body: "Meet the guide who describes the world, plays its characters, and helps the group shape each story." },
] as const;

export default function EnglishExplorerPage() {
  return (
    <>
      <SiteHeader locale="en" />
      <main lang="en" className="shell section">
        <header className="encyclopedia-header">
          <div><p className="kicker">World encyclopedia · v1.0</p><h1>World Explorer</h1><p>Explore the approved game content in one place. Choose a chapter to see what is in the world and find the right material for your next adventure.</p></div>
          <strong className="encyclopedia-header__count">{gameData.meta.counts.heroes + gameData.meta.counts.bestiary + gameData.meta.counts.equipment + gameData.meta.counts.spells} entries</strong>
        </header>
        <div className="explorer-portal-grid">
          {sections.map((section) => (
            <Link href={section.id === "heroes" ? "/en/explorer/heroes" : `#${section.id}`} className="explorer-portal" id={section.id} key={section.id}>
              <span className="explorer-portal__symbol" aria-hidden="true">{section.icon}</span>
              <small>{section.count}</small><h2>{section.title}</h2><p>{section.body}</p>
            </Link>
          ))}
        </div>
        <div className="source-banner"><span aria-hidden="true">✓</span><div><strong>Built from the approved v1.0 source documents</strong><p>Translations are being added chapter by chapter. The Czech source remains the reference for exact game rules and values.</p></div></div>
        <p className="section-heading"><Link href="/en#play" className="button button--outline">How to start playing</Link></p>
      </main>
      <SiteFooter locale="en" />
    </>
  );
}
