/* eslint-disable @next/next/no-img-element -- curated WebP assets are pre-sized and manually optimized */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AssetSlot } from "../../../../components/AssetSlot";
import { CollectionSearch, type SearchItem } from "../../../../components/CollectionSearch";
import { gameData, type CharacterClass, type Hero, type Race } from "../../../../data";
import {
  attributeCodeNames,
  attributeNames,
  classTranslations,
  raceTranslations,
  shortAttributeNames,
  startingEquipmentNames,
  startingEquipmentNotes,
} from "../../../translations/heroes";

type PageProps = { params: Promise<{ slug?: string[] }> };

const raceIllustrations: Record<string, string> = {
  clovek: "/assets/heroes/clovek-hranicar.webp",
  elf: "/assets/heroes/elf-kouzelnik.webp",
  trpaslik: "/assets/heroes/trpaslik-bojovnik.webp",
  ork: "/assets/heroes/ork-lecitel.webp",
  pulcik: "/assets/heroes/pulcik-zlodej.webp",
  vila: "/assets/heroes/vila-lecitel.webp",
};

function routePath(segments: string[]) {
  return `/en/explorer/heroes${segments.length ? `/${segments.join("/")}` : ""}`;
}

function czechPath(segments: string[]) {
  if (!segments.length) return "/explorer/hrdinove";
  if (segments[0] === "races") return `/explorer/hrdinove/rasy${segments[1] ? `/${segments[1]}` : ""}`;
  if (segments[0] === "classes") return `/explorer/hrdinove/povolani${segments[1] ? `/${segments[1]}` : ""}`;
  return `/explorer/hrdinove/${segments[0]}`;
}

function pageMetadata(segments: string[]): Metadata {
  let title = "Starting Heroes";
  let description = "Browse all 36 starting heroes in AI Fantasy Adventure.";
  if (segments[0] === "races") {
    title = segments[1] ? raceTranslations[segments[1]]?.name ?? "Race" : "Playable Races";
    description = segments[1]
      ? `${raceTranslations[segments[1]]?.name ?? "Race"}: attributes, racial ability, and six starting hero combinations.`
      : "Meet the six playable races, their attribute modifiers, and racial abilities.";
  } else if (segments[0] === "classes") {
    title = segments[1] ? classTranslations[segments[1]]?.name ?? "Class" : "Character Classes";
    description = segments[1]
      ? `${classTranslations[segments[1]]?.name ?? "Class"}: class modifiers, ability, starting equipment, and six hero combinations.`
      : "Explore the six character classes, their attribute bonuses, abilities, and starting equipment.";
  } else if (segments[0]) {
    const hero = gameData.heroes.find((item) => item.slug === segments[0]);
    if (hero) {
      const race = raceTranslations[hero.raceSlug];
      const characterClass = classTranslations[hero.classSlug];
      title = `${race.name} – ${characterClass.name}`;
      description = `${title}: approved starting attributes, Health, abilities, and equipment.`;
    }
  }
  const path = routePath(segments);
  return {
    title,
    description,
    alternates: { canonical: path, languages: { "cs-CZ": czechPath(segments), en: path } },
    openGraph: { title, description, locale: "en_US", type: "website", images: ["/og-image.jpg"] },
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug = [] } = await params;
  return pageMetadata(slug);
}

export function generateStaticParams() {
  return [
    { slug: [] },
    { slug: ["races"] },
    ...gameData.races.map((race) => ({ slug: ["races", race.slug] })),
    { slug: ["classes"] },
    ...gameData.classes.map((characterClass) => ({ slug: ["classes", characterClass.slug] })),
    ...gameData.heroes.map((hero) => ({ slug: [hero.slug] })),
  ];
}

function Breadcrumbs({ items }: { items: Array<{ label: string; href?: string }> }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <Link href="/en">Home</Link><span>/</span><Link href="/en/explorer">World Explorer</Link>
      {items.map((item, index) => <span className="breadcrumbs__item" key={`${item.label}-${index}`}><span>/</span>{item.href ? <Link href={item.href}>{item.label}</Link> : <strong>{item.label}</strong>}</span>)}
    </nav>
  );
}

function HeroSectionNav({ active }: { active: "heroes" | "races" | "classes" }) {
  const links = [
    ["heroes", "All 36 heroes", "/en/explorer/heroes"],
    ["races", "Races", "/en/explorer/heroes/races"],
    ["classes", "Classes", "/en/explorer/heroes/classes"],
  ] as const;
  return <nav className="link-chips" aria-label="Heroes section">{links.map(([key, label, href]) => key === active ? <strong aria-current="page" key={key}>{label}</strong> : <Link href={href} key={key}>{label}</Link>)}</nav>;
}

function EnglishAttributeGrid({ values, modifiers = false }: { values: Race["modifiers"]; modifiers?: boolean }) {
  return (
    <div className="attribute-grid" aria-label="Attributes">
      {Object.entries(attributeNames).map(([key, name]) => {
        const value = values[key as keyof typeof values];
        const shown = modifiers && value > 0 ? `+${value}` : String(value);
        return <div className="attribute" key={key}><span className="attribute__short">{shortAttributeNames[key]}</span><strong>{shown}</strong><span>{name}</span></div>;
      })}
    </div>
  );
}

function className(slug: string) { return classTranslations[slug]?.name ?? slug; }
function translatedAttribute(code: string) { return attributeCodeNames[code] ?? code; }
function raceImage(slug: string) { return raceIllustrations[slug] ?? "/assets/illustrations/races-lineup.webp"; }
function heroImage(hero: Hero) { return `/assets/heroes/${hero.slug}.webp`; }
function translatedStartingItem(item: string) { return startingEquipmentNames[item] ?? item; }

function heroItems(heroes: Hero[] = gameData.heroes): SearchItem[] {
  return heroes.map((hero) => {
    const race = raceTranslations[hero.raceSlug];
    const characterClass = classTranslations[hero.classSlug];
    const name = `${race.name} – ${characterClass.name}`;
    return {
      href: `/en/explorer/heroes/${hero.slug}`,
      title: name,
      eyebrow: `${race.name} · ${characterClass.name}`,
      description: `${race.abilityName} + ${characterClass.abilityName}`,
      meta: Object.keys(attributeNames).map((key) => `${shortAttributeNames[key]} ${hero.stats[key as keyof typeof hero.stats]}`).join(" · "),
      badge: `${hero.hp} Health`,
      image: heroImage(hero),
      imageAlt: `Fantasy illustration of ${name}`,
    };
  });
}

function raceItems(): SearchItem[] {
  return gameData.races.map((race) => {
    const translation = raceTranslations[race.slug];
    return {
      href: `/en/explorer/heroes/races/${race.slug}`,
      title: translation.name,
      eyebrow: `Strong: ${translatedAttribute(race.strong)} · Weak: ${translatedAttribute(race.weak)}`,
      description: translation.tagline,
      meta: translation.abilityName,
      badge: `${gameData.classes.length} classes`,
      image: raceImage(race.slug),
      imageAlt: `Fantasy illustration of the ${translation.name} race`,
    };
  });
}

function classItems(): SearchItem[] {
  return gameData.classes.map((characterClass) => {
    const translation = classTranslations[characterClass.slug];
    return {
      href: `/en/explorer/heroes/classes/${characterClass.slug}`,
      title: translation.name,
      eyebrow: translation.abilityName,
      description: translation.tagline,
      meta: translation.playStyle,
      badge: `${gameData.races.length} races`,
      image: `/assets/heroes/clovek-${characterClass.slug}.webp`,
      imageAlt: `Fantasy illustration of the ${translation.name} class`,
    };
  });
}

function HeroesOverview() {
  return <>
    <Breadcrumbs locale="en" items={[{ label: "Heroes" }]} />
    <HeroSectionNav active="heroes" />
    <header className="encyclopedia-header"><div><p className="kicker">Six races × six classes</p><h1>36 starting heroes</h1><p>Every race and class combination has its own approved starting attributes, Health, abilities, and equipment.</p></div><strong className="encyclopedia-header__count">{gameData.heroes.length} heroes</strong></header>
    <div className="editorial-image"><img src="/assets/illustrations/classes-lineup.webp" width="1672" height="941" alt="The six starting classes: Warrior, Ranger, Wizard, Rogue, Healer, and Bard" /></div>
    <CollectionSearch items={heroItems()} placeholder="Search heroes, races, or classes…" locale="en" />
  </>;
}

function RacesOverview() {
  return <>
    <Breadcrumbs locale="en" items={[{ label: "Heroes", href: "/en/explorer/heroes" }, { label: "Races" }]} />
    <HeroSectionNav active="races" />
    <header className="encyclopedia-header"><div><p className="kicker">Heroes</p><h1>Six playable races</h1><p>Each race has approved attribute modifiers, one strong and one weak attribute, and a racial ability.</p></div><strong className="encyclopedia-header__count">{gameData.races.length} races</strong></header>
    <div className="editorial-image"><img src="/assets/illustrations/races-lineup.webp" width="1536" height="1024" alt="The six playable races: Human, Elf, Dwarf, Orc, Halfling, and Fairy" /></div>
    <CollectionSearch items={raceItems()} placeholder="Search races…" locale="en" />
  </>;
}

function RaceDetail({ race }: { race: Race }) {
  const translation = raceTranslations[race.slug];
  const heroes = gameData.heroes.filter((hero) => hero.raceSlug === race.slug);
  return <>
    <Breadcrumbs locale="en" items={[{ label: "Heroes", href: "/en/explorer/heroes" }, { label: "Races", href: "/en/explorer/heroes/races" }, { label: translation.name }]} />
    <HeroSectionNav active="races" />
    <div className="detail-hero"><div className="detail-hero__copy"><p className="kicker">Playable race</p><h1>{translation.name}</h1><p className="lead">{translation.tagline}</p><p>{translation.description}</p><div className="pill-row"><span>Strong: {translatedAttribute(race.strong)}</span><span>Weak: {translatedAttribute(race.weak)}</span></div></div><AssetSlot title={translation.name} eyebrow="Race illustration" src={raceImage(race.slug)} alt={`Fantasy illustration of the ${translation.name} race`} /></div>
    <section className="detail-section"><div className="detail-section__heading"><span>01</span><div><h2>Attribute modifiers</h2><p>All other attributes remain unchanged. Class choice does not change which attribute is strong or weak.</p></div></div><EnglishAttributeGrid values={race.modifiers} modifiers /></section>
    <section className="detail-grid-two"><article className="info-panel"><span className="panel-kicker">Racial ability</span><h2>{translation.abilityName}</h2><p>{translation.abilityEffect}</p></article><article className="info-panel"><span className="panel-kicker">Suggested classes</span><h2>Good starting choices</h2><div className="link-chips">{race.recommendedClassSlugs.map((slug) => <Link href={`/en/explorer/heroes/classes/${slug}`} key={slug}>{className(slug)}</Link>)}</div><p className="fine-print">These are thematic suggestions based on the approved attributes, not class restrictions.</p></article></section>
    <section className="detail-section"><div className="detail-section__heading"><span>02</span><div><h2>Six combinations</h2><p>Choose a class to open the exact starting profile for each hero.</p></div></div><CollectionSearch items={heroItems(heroes)} placeholder={`Search ${translation.name.toLocaleLowerCase("en-US")} classes…`} locale="en" /></section>
  </>;
}

function ClassesOverview() {
  return <>
    <Breadcrumbs locale="en" items={[{ label: "Heroes", href: "/en/explorer/heroes" }, { label: "Classes" }]} />
    <HeroSectionNav active="classes" />
    <header className="encyclopedia-header"><div><p className="kicker">Heroes</p><h1>Six character classes</h1><p>Each class adds exactly +3 attribute points, a class ability, and an approved starting loadout.</p></div><strong className="encyclopedia-header__count">{gameData.classes.length} classes</strong></header>
    <div className="editorial-image"><img src="/assets/illustrations/classes-lineup.webp" width="1672" height="941" alt="The six character classes: Warrior, Ranger, Wizard, Rogue, Healer, and Bard" /></div>
    <CollectionSearch items={classItems()} placeholder="Search classes…" locale="en" />
  </>;
}

function ClassDetail({ characterClass }: { characterClass: CharacterClass }) {
  const translation = classTranslations[characterClass.slug];
  const heroes = gameData.heroes.filter((hero) => hero.classSlug === characterClass.slug);
  const equipment = characterClass.startingEquipment;
  const note = startingEquipmentNotes[characterClass.slug];
  return <>
    <Breadcrumbs locale="en" items={[{ label: "Heroes", href: "/en/explorer/heroes" }, { label: "Classes", href: "/en/explorer/heroes/classes" }, { label: translation.name }]} />
    <HeroSectionNav active="classes" />
    <div className="detail-hero"><div className="detail-hero__copy"><p className="kicker">Character class</p><h1>{translation.name}</h1><p className="lead">{translation.tagline}</p><p>{translation.description}</p><div className="pill-row"><span>{translation.playStyle}</span></div></div><AssetSlot title={translation.name} eyebrow="Class illustration" src={`/assets/heroes/clovek-${characterClass.slug}.webp`} alt={`Fantasy illustration of the ${translation.name} class`} /></div>
    <section className="detail-section"><div className="detail-section__heading"><span>01</span><div><h2>Class bonuses</h2><p>Class bonuses change attribute values, not the strong or weak attribute category.</p></div></div><EnglishAttributeGrid values={characterClass.modifiers} modifiers /></section>
    <section className="detail-grid-two"><article className="info-panel"><span className="panel-kicker">Class ability</span><h2>{translation.abilityName}</h2><p>{translation.abilityEffect}</p></article><article className="info-panel"><span className="panel-kicker">Starting loadout</span><h2>Active equipment</h2><ul>{equipment.active.map((item) => <li key={item}>{translatedStartingItem(item)}</li>)}</ul><h3>In the inventory</h3><p>{equipment.inventory.map(translatedStartingItem).join(" · ")}</p>{note && <p className="fine-print">{note}</p>}</article></section>
    <section className="detail-section"><div className="detail-section__heading"><span>02</span><div><h2>Six races</h2><p>Open any race and class combination to see its exact starting profile.</p></div></div><CollectionSearch items={heroItems(heroes)} placeholder={`Search races for ${translation.name.toLocaleLowerCase("en-US")}…`} locale="en" /></section>
  </>;
}

function HeroDetail({ hero }: { hero: Hero }) {
  const race = raceTranslations[hero.raceSlug];
  const characterClass = classTranslations[hero.classSlug];
  const loadout = hero.startingEquipment;
  const note = startingEquipmentNotes[hero.classSlug];
  return <>
    <Breadcrumbs locale="en" items={[{ label: "Heroes", href: "/en/explorer/heroes" }, { label: `${race.name} – ${characterClass.name}` }]} />
    <HeroSectionNav active="heroes" />
    <header className="encyclopedia-header"><div><p className="kicker">Starting hero · Level 1</p><h1>{race.name} – {characterClass.name}</h1><p className="lead">{race.tagline} {characterClass.tagline}</p><p>{race.description} {characterClass.description}</p></div><strong className="encyclopedia-header__count">{hero.hp} Health</strong></header>
    <div className="detail-hero"><div className="detail-hero__copy"><div className="pill-row"><Link href={`/en/explorer/heroes/races/${hero.raceSlug}`}>{race.name}</Link><Link href={`/en/explorer/heroes/classes/${hero.classSlug}`}>{characterClass.name}</Link><span>Strong: {translatedAttribute(hero.strong)}</span><span>Weak: {translatedAttribute(hero.weak)}</span></div></div><AssetSlot title={`${race.name} – ${characterClass.name}`} eyebrow="Level 1 hero illustration" src={heroImage(hero)} alt={`Fantasy illustration of a ${race.name} ${characterClass.name}`} /></div>
    <section className="detail-section"><div className="detail-section__heading"><span>01</span><div><h2>Starting attributes</h2><p>Calculated from the base value of 5, plus the race and class modifiers.</p></div></div><EnglishAttributeGrid values={hero.stats} /><div className="derived-stats"><div><span>Strong attribute</span><strong>{translatedAttribute(hero.strong)}</strong></div><div><span>Weak attribute</span><strong>{translatedAttribute(hero.weak)}</strong></div><div><span>Maximum Health</span><strong>{hero.hp}</strong></div></div></section>
    <section className="detail-grid-two"><article className="info-panel"><span className="panel-kicker">Racial ability · {race.name}</span><h2>{race.abilityName}</h2><p>{race.abilityEffect}</p></article><article className="info-panel"><span className="panel-kicker">Class ability · {characterClass.name}</span><h2>{characterClass.abilityName}</h2><p>{characterClass.abilityEffect}</p></article></section>
    <section className="detail-section"><div className="detail-section__heading"><span>02</span><div><h2>Starting equipment</h2><p>Approved starting equipment from the v1.0 catalogue.</p></div></div><div className="loadout-grid"><article><span>Active</span>{loadout.active.map((item) => <strong key={item}>{translatedStartingItem(item)}</strong>)}</article><article><span>Inventory</span>{loadout.inventory.map((item) => <strong key={item}>{translatedStartingItem(item)}</strong>)}</article></div>{note && <p className="fine-print">{note}</p>}</section>
  </>;
}

function resolveContent(segments: string[]) {
  if (segments.length === 0) return <HeroesOverview />;
  if (segments[0] === "races") {
    if (segments.length === 1) return <RacesOverview />;
    const race = gameData.races.find((item) => item.slug === segments[1]);
    if (segments.length !== 2 || !race || !raceTranslations[race.slug]) notFound();
    return <RaceDetail race={race} />;
  }
  if (segments[0] === "classes") {
    if (segments.length === 1) return <ClassesOverview />;
    const characterClass = gameData.classes.find((item) => item.slug === segments[1]);
    if (segments.length !== 2 || !characterClass || !classTranslations[characterClass.slug]) notFound();
    return <ClassDetail characterClass={characterClass} />;
  }
  if (segments.length !== 1) notFound();
  const hero = gameData.heroes.find((item) => item.slug === segments[0]);
  if (!hero) notFound();
  return <HeroDetail hero={hero} />;
}

export default async function EnglishHeroesPage({ params }: PageProps) {
  const { slug = [] } = await params;
  return <><main lang="en" >{resolveContent(slug)}</main></>;
}
