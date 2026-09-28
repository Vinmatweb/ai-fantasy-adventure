import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "../../../components/SiteFooter";
import { SiteHeader } from "../../../components/SiteHeader";
import { gameData } from "../../../data";
import { animalTranslations } from "../../translations/animals";
import { peopleNpcTranslations } from "../../translations/people-npcs";

export const metadata: Metadata = {
  title: "Bestiary",
  description: "Browse all 62 creatures and non-player characters in the AI Fantasy Adventure bestiary.",
  alternates: { canonical: "/en/explorer/bestiary", languages: { "cs-CZ": "/explorer/bestiar", en: "/en/explorer/bestiary" } },
  openGraph: { locale: "en_US" },
};

const categoryNames: Record<string, string> = {
  zvirata: "Animals",
  "lide-npc": "People and NPCs",
  "fantasy-humanoidi": "Fantasy humanoids",
  nemrtvi: "Undead",
  nestvury: "Monsters",
};

const names: Record<string, string> = {
  krysa: "Rat", netopyr: "Bat", "divoka-kocka": "Wildcat", "toulavy-pes": "Stray Dog", liska: "Fox", vlk: "Wolf", "divoke-prase": "Wild Boar", "jedovaty-had": "Venomous Snake", medved: "Bear", krokodyl: "Crocodile", orel: "Eagle", jelen: "Deer",
  vesnican: "Villager", obchodnik: "Merchant", kovar: "Blacksmith", lovec: "Hunter", zlodej: "Thief", bandita: "Bandit", "vudce-banditu": "Bandit Leader", zoldner: "Mercenary", vojak: "Soldier", lucistnik: "Archer", rytir: "Knight", kouzelnik: "Wizard", lecitel: "Healer", slechtic: "Noble", "kral-kralovna": "King / Queen",
  goblin: "Goblin", "goblin-lucistnik": "Goblin Archer", kobold: "Kobold", hobgoblin: "Hobgoblin", bugbear: "Bugbear", gnom: "Gnome", kentaur: "Centaur", minotaur: "Minotaur", obr: "Giant", troll: "Troll",
  kostlivec: "Skeleton", "kostlivec-lucistnik": "Skeleton Archer", zombie: "Zombie", ghul: "Ghoul", duch: "Ghost", prizrak: "Wraith", mumie: "Mummy", upir: "Vampire", nekromant: "Necromancer",
  "obri-had": "Giant Snake", "obri-pavouk": "Giant Spider", harpyje: "Harpy", gryfon: "Griffin", bazilisek: "Basilisk", "kamenny-golem": "Stone Golem", elemental: "Elemental", chimera: "Chimera", hydra: "Hydra", wyverna: "Wyvern", "mlady-drak": "Young Dragon", "dospely-drak": "Adult Dragon", "prastary-drak": "Ancient Dragon", "goblini-nacelnik": "Goblin Chieftain", "orci-nacelnik": "Orc Chieftain", arcimag: "Archmage",
};

const categoryFor = (slug: string) => categoryNames[slug] ?? slug;

export default function EnglishBestiaryPage() {
  return (
    <>
      <SiteHeader locale="en" />
      <main lang="en" className="shell section">
        <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/en">Home</Link><span>/</span><Link href="/en/explorer">World Explorer</Link><span>/</span><strong>Bestiary</strong></nav>
        <header className="encyclopedia-header"><div><p className="kicker">Creatures and characters · v1.0</p><h1>Bestiary</h1><p>Browse the full roster of animals, people, fantasy folk, undead, and monsters. Each entry keeps the approved v1.0 challenge rating and Health value.</p></div><strong className="encyclopedia-header__count">{gameData.bestiary.length} entries</strong></header>
        <nav className="link-chips" aria-label="Bestiary categories">{gameData.bestiaryCategories.map((category) => <a href={`#${category.slug}`} key={category.slug}>{categoryFor(category.slug)} <small>{category.count}</small></a>)}</nav>
        <p><Link href="/en/explorer/bestiary/animals" className="button button--outline">Open all animal profiles</Link></p>
        <p><Link href="/en/explorer/bestiary/people" className="button button--outline">Open people and NPC profiles</Link></p>
        {gameData.bestiaryCategories.map((category) => (
          <section className="detail-section" id={category.slug} key={category.slug}>
            <div className="detail-section__heading"><span>✦</span><div><h2>{categoryFor(category.slug)}</h2><p>{category.count} entries from the approved Bestiary v1.0.</p></div></div>
            <div className="collection-grid">
              {gameData.bestiary.filter((entry) => entry.categorySlug === category.slug).map((entry) => (
                <article className="collection-card" key={entry.slug}>
                  <span className="collection-card__eyebrow">{categoryFor(category.slug)} · Challenge {entry.difficulty}</span>
                  <h3>{peopleNpcTranslations[entry.slug]?.name ?? animalTranslations[entry.slug]?.name ?? names[entry.slug] ?? entry.name}</h3>
                  <p>{entry.isBoss ? "Boss encounter" : "Bestiary entry"} · {entry.stats.hp} Health · {entry.xp} XP</p>
                  <div className="collection-card__footer"><span>Attack {entry.stats.physicalAttack} · Defense {entry.stats.physicalDefense}</span>{entry.isBoss && <strong>Boss</strong>}</div>
                </article>
              ))}
            </div>
          </section>
        ))}
        <Link href="/en/explorer" className="button button--outline">Back to World Explorer</Link>
      </main>
      <SiteFooter locale="en" />
    </>
  );
}
