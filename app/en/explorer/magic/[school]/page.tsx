import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CollectionSearch, type SearchItem } from "../../../../components/CollectionSearch";
import { gameData } from "../../../../data";
import { magicSchoolTranslations, spellBonus, spellTranslations, spellType } from "../../../translations/magic";

type PageProps = { params: Promise<{ school: string }> };

export function generateStaticParams() {
  return gameData.magicSchools.map((school) => ({ school: school.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { school: slug } = await params;
  const translation = magicSchoolTranslations[slug];
  return translation ? { title: translation.name, description: `${translation.description} Browse all spells in ${translation.name}.` } : {};
}

export default async function EnglishMagicSchoolPage({ params }: PageProps) {
  const { school: slug } = await params;
  const school = gameData.magicSchools.find((item) => item.slug === slug);
  const translation = magicSchoolTranslations[slug];
  if (!school || !translation) notFound();
  const spells = gameData.spells.filter((spell) => spell.schoolSlug === slug);
  const items: SearchItem[] = spells.map((spell) => {
    const english = spellTranslations[spell.slug]!;
    return {
      href: `/en/explorer/magic/${slug}/${spell.slug}`,
      title: english.name,
      eyebrow: spellType(spell.type),
      description: english.effect,
      meta: `Minimum INT ${spell.minIntelligence} · Level ${spell.minLevel}`,
      badge: spellBonus(spell.bonus),
      image: `/assets/magic/spells/${spell.schoolSlug}/${spell.slug}.webp`,
      imageAlt: `Fantasy illustration of the ${english.name} spell`,
    };
  });
  return <main lang="en">
    <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/en">Home</Link><span>/</span><Link href="/en/explorer">World Explorer</Link><span>/</span><Link href="/en/explorer/magic">Magic</Link><span>/</span><strong>{translation.name}</strong></nav>
    <div className={`school-hero school-hero--${school.tone}`}><div className="school-hero__art"><img src={`/assets/magic/${school.slug}.webp`} alt={`${translation.name} school illustration`} loading="eager" decoding="async" /><span className="school-hero__symbol" aria-hidden="true">{school.symbol}</span></div><div><p className="kicker">School of magic · {spells.length} spells</p><h1>{translation.name}</h1><p>{translation.description}</p></div></div>
    <CollectionSearch items={items} placeholder={`Search ${translation.name.toLowerCase()}…`} locale="en" />
    <Link href="/en/explorer/magic" className="button button--outline">All schools of magic</Link>
  </main>;
}
