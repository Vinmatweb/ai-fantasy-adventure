/* eslint-disable @next/next/no-img-element -- curated WebP assets are pre-sized and manually optimized */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CollectionSearch, type SearchItem } from "../../../../components/CollectionSearch";
import { SiteFooter } from "../../../../components/SiteFooter";
import { SiteHeader } from "../../../../components/SiteHeader";
import { gameData, type Hero } from "../../../../data";

type PageProps = { params: Promise<{ slug?: string[] }> };

const races: Record<string, { name: string; tagline: string; description: string; ability: string; effect: string; strong: string; weak: string }> = {
  clovek: { name: "Human", tagline: "A hero who chooses their own path.", description: "Humans are adaptable adventurers with no predetermined strength. During character creation, the player chooses one strong and one different weak attribute.", ability: "Adaptability", effect: "Once per adventure, after a failed roll of their own, the human may try again. Vaelor creates a new random permutation, the player chooses a number again, and the better result is used.", strong: "player's choice", weak: "player's choice" },
  elf: { name: "Elf", tagline: "A sharp mind, keen eyes, and a feel for magic.", description: "Elves excel in Intelligence and awareness. They can spot distant visible details, but lack brute strength.", ability: "Keen Sight", effect: "Automatically notices a distant visible detail, tracks, or movement unless it is magically or otherwise hidden.", strong: "Intelligence", weak: "Strength" },
  trpaslik: { name: "Dwarf", tagline: "Steady as stone and at home underground.", description: "Dwarves rely on Strength, resilience, and a deep knowledge of stone. They are less agile but excel at direct, practical solutions.", ability: "Stone Sense", effect: "In relevant stone or underground surroundings, automatically detects cavities, secret passages, unstable rock, good ore, or unusual properties of stone.", strong: "Strength", weak: "Agility" },
  ork: { name: "Orc", tagline: "Mighty strength guided by a courageous heart.", description: "Orcs are the strongest of the core races. When their Health is low, their close-range attacks grow stronger, though magic is harder for them.", ability: "Battle Fury", effect: "While below half of maximum Health, gains +1 to the result of every close-range attack.", strong: "Strength", weak: "Intelligence" },
  pulcik: { name: "Halfling", tagline: "Small in stature, lucky, and quick with their hands.", description: "Halflings rely on Agility and remarkable Luck. They are not strong, but once per adventure can turn a failure into a narrow success.", ability: "Lucky Break", effect: "Once per adventure, after their own failed virtual roll, changes the result to a narrow success. The roll is not repeated; this is the lowest success needed, with no extra benefit.", strong: "Luck", weak: "Strength" },
  vila: { name: "Fairy", tagline: "A tiny magical being with healing dust and light wings.", description: "Fairies are small winged beings gifted with magic, agility, and luck. Their fairy dust strengthens every healing effect, but their small size means very low Strength.", ability: "Fairy Dust", effect: "Every healing effect performed by a fairy restores 1 additional Health.", strong: "Intelligence", weak: "Strength" },
};

const classes: Record<string, { name: string; tagline: string; description: string; playStyle: string; ability: string; effect: string }> = {
  bojovnik: { name: "Warrior", tagline: "Holds the front line and protects the party.", description: "Warriors face danger with strength, courage, and reliable gear. Once per combat, a warrior can take an attack meant for a nearby ally.", playStyle: "Direct combat, protecting allies, and a wide choice of weapons and armor.", ability: "Protect", effect: "Once per combat, may take an attack aimed at a nearby ally. The attack is resolved against the warrior's defense instead." },
  hranicar: { name: "Ranger", tagline: "A tracker, archer, and guide through the wilds.", description: "Rangers combine Strength and Agility. They can automatically determine the direction of usable tracks and excel at exploration and ranged attacks.", playStyle: "Exploration, ranged combat, wilderness travel, and smart preparation.", ability: "Tracker", effect: "Automatically recognizes which way a person or animal being tracked went, if usable tracks remain." },
  kouzelnik: { name: "Wizard", tagline: "Commands the widest range of magic.", description: "Wizards begin with high Intelligence, the strongest magic modifiers, and five known spells. They can always sense magic, but may not know its exact purpose.", playStyle: "Spells, knowledge, puzzles, and powerful magical attacks.", ability: "Magic Sense", effect: "Automatically recognizes that an item, place, or creature is magical. This does not reveal the magic's exact type, purpose, trigger, or danger." },
  zlodej: { name: "Rogue", tagline: "Quiet, agile, and ready for locks and traps.", description: "Rogues excel in Agility and Luck. Ordinary sneaking succeeds automatically, and their tools open paths others cannot.", playStyle: "Stealth, locks, traps, precise attacks, and clever solutions.", ability: "Soft Steps", effect: "For ordinary sneaking, Vaelor assumes success. A roll is needed only for an exceptional obstacle; this cannot make hiding possible where it is objectively impossible." },
  lecitel: { name: "Healer", tagline: "Keeps the party standing and drives back the dark.", description: "Healers combine Intelligence and Charisma, begin with four spells, and have the strongest healing modifier. They can use first aid outside their magic limit.", playStyle: "Healing, protection, cleansing, support, and calm leadership.", ability: "First Aid", effect: "Once per combat, restores ⌈Intelligence/2⌉ Health to themself or one ally, up to the maximum. This is not a healing spell and does not use the healing magic limit." },
  bard: { name: "Bard", tagline: "Stories, music, and the right words at the right moment.", description: "Bards rely on Charisma and Agility. Once in an important scene or combat, they can improve their own or an ally's roll bonus by one step.", playStyle: "Social scenes, party support, music, and versatility.", ability: "Inspiration", effect: "Once during a combat or important scene, after a virtual roll is revealed, may raise their own or an ally's roll bonus by one step, up to that category's maximum. It takes no main action and cannot be used on an enemy." },
};

const attributeNames = ["Strength", "Agility", "Intelligence", "Charisma", "Luck"] as const;
const attributeKeys = ["strength", "agility", "intelligence", "charisma", "luck"] as const;
const raceFor = (hero: Hero) => races[hero.raceSlug]!;
const classFor = (hero: Hero) => classes[hero.classSlug]!;
const heroName = (hero: Hero) => `${raceFor(hero).name} – ${classFor(hero).name}`;

export function generateStaticParams() {
  return [{ slug: [] }, ...gameData.heroes.map((hero) => ({ slug: [hero.slug] }))];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug = [] } = await params;
  if (!slug.length) return { title: "Starting Heroes", description: "Browse all 36 starting heroes in AI Fantasy Adventure." };
  const hero = gameData.heroes.find((item) => item.slug === slug[0]);
  return hero ? { title: heroName(hero), description: `${heroName(hero)}: starting attributes, Health, and abilities.` } : {};
}

function HeroItems(): SearchItem[] {
  return gameData.heroes.map((hero) => ({
    href: `/en/explorer/heroes/${hero.slug}`,
    title: heroName(hero),
    eyebrow: `${raceFor(hero).name} · ${classFor(hero).name}`,
    description: `${raceFor(hero).ability} + ${classFor(hero).ability}`,
    meta: attributeKeys.map((key, index) => `${attributeNames[index]} ${hero.stats[key]}`).join(" · "),
    badge: `${hero.hp} Health`,
    image: `/assets/heroes/${hero.slug}.webp`,
    imageAlt: `Fantasy illustration of a ${heroName(hero)}`,
  }));
}

function HeroDetail({ hero }: { hero: Hero }) {
  const race = raceFor(hero);
  const cls = classFor(hero);
  return (
    <>
      <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/en">Home</Link><span>/</span><Link href="/en/explorer">World Explorer</Link><span>/</span><Link href="/en/explorer/heroes">Heroes</Link><span>/</span><strong>{heroName(hero)}</strong></nav>
      <header className="encyclopedia-header"><div><p className="kicker">Starting hero · {race.name} {cls.name}</p><h1>{heroName(hero)}</h1><p>{race.tagline} {cls.tagline}</p></div><strong className="encyclopedia-header__count">{hero.hp} Health</strong></header>
      <div className="detail-hero"><div className="detail-hero__copy"><p className="lead">{race.description} {cls.description}</p><div className="pill-row"><span>Strong: {race.strong}</span><span>Weak: {race.weak}</span></div></div><div className="detail-hero__image"><img src={`/assets/heroes/${hero.slug}.webp`} width="768" height="768" alt={`Fantasy illustration of ${heroName(hero)}`} /></div></div>
      <section className="detail-section"><div className="detail-section__heading"><span>01</span><div><h2>Starting attributes</h2><p>These are the approved level-one values for this race and class combination.</p></div></div><div className="attribute-grid" aria-label="Starting attributes">{attributeKeys.map((key, index) => <div className="attribute" key={key}><span className="attribute__short">{attributeNames[index].slice(0, 3)}</span><strong>{hero.stats[key]}</strong><span>{attributeNames[index]}</span></div>)}</div></section>
      <section className="detail-grid-two"><article className="info-panel"><span className="panel-kicker">Racial ability · {race.name}</span><h2>{race.ability}</h2><p>{race.effect}</p></article><article className="info-panel"><span className="panel-kicker">Class ability · {cls.name}</span><h2>{cls.ability}</h2><p>{cls.effect}</p></article></section>
      <Link href="/en/explorer/heroes" className="button button--outline">Back to all starting heroes</Link>
    </>
  );
}

export default async function EnglishHeroesPage({ params }: PageProps) {
  const { slug = [] } = await params;
  const hero = slug.length ? gameData.heroes.find((item) => item.slug === slug[0]) : undefined;
  if (slug.length > 1 || (slug.length === 1 && !hero)) notFound();
  return <><SiteHeader locale="en" /><main lang="en" className="shell section">{hero ? <HeroDetail hero={hero} /> : <><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/en">Home</Link><span>/</span><Link href="/en/explorer">World Explorer</Link><span>/</span><strong>Heroes</strong></nav><header className="encyclopedia-header"><div><p className="kicker">Six races × six classes</p><h1>36 starting heroes</h1><p>Each combination has its own approved starting attributes, Health, and two special abilities. Search by race or class, then open a hero to see the full starting profile.</p></div><strong className="encyclopedia-header__count">36 heroes</strong></header><div className="editorial-image"><img src="/assets/illustrations/classes-lineup.webp" width="1672" height="941" alt="The six starting classes: Warrior, Ranger, Wizard, Rogue, Healer, and Bard" /></div><CollectionSearch items={HeroItems()} placeholder="Search heroes, races, or classes…" locale="en" /></>}</main><SiteFooter locale="en" /></>;
}
