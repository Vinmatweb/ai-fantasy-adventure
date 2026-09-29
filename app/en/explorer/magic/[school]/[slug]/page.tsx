import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AssetSlot } from "../../../../../components/AssetSlot";
import { gameData } from "../../../../../data";
import { magicSchoolTranslations, spellBonus, spellDuration, spellLimitations, spellTarget, spellTranslations, spellType } from "../../../../translations/magic";

type PageProps = { params: Promise<{ school: string; slug: string }> };

export function generateStaticParams() {
  return gameData.spells.map((spell) => ({ school: spell.schoolSlug, slug: spell.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const translation = spellTranslations[slug];
  return translation ? { title: translation.name, description: translation.effect } : {};
}

export default async function EnglishSpellProfile({ params }: PageProps) {
  const { school: schoolSlug, slug } = await params;
  const school = gameData.magicSchools.find((item) => item.slug === schoolSlug);
  const spell = gameData.spells.find((item) => item.slug === slug && item.schoolSlug === schoolSlug);
  const schoolEnglish = magicSchoolTranslations[schoolSlug];
  const english = spellTranslations[slug];
  if (!school || !spell || !schoolEnglish || !english) notFound();
  const type = spellType(spell.type);
  const bonus = spellBonus(spell.bonus);
  const target = spellTarget(spell.target);
  const duration = spellDuration(spell.duration);
  const limitations = spellLimitations(spell.limitations);
  return <main lang="en">
    <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/en">Home</Link><span>/</span><Link href="/en/explorer">World Explorer</Link><span>/</span><Link href="/en/explorer/magic">Magic</Link><span>/</span><Link href={`/en/explorer/magic/${schoolSlug}`}>{schoolEnglish.name}</Link><span>/</span><strong>{english.name}</strong></nav>
    <div className={`detail-hero spell-detail spell-detail--${school.tone}`}><div className="detail-hero__copy"><p className="kicker">{schoolEnglish.name} · {type}</p><h1>{english.name}</h1><p className="lead">{english.effect}</p><div className="pill-row"><span>Minimum INT {spell.minIntelligence}</span><span>Minimum level {spell.minLevel}</span><strong>{bonus}</strong></div></div><AssetSlot title={english.name} eyebrow={`${schoolEnglish.name} spell illustration`} symbol={school.symbol} tone={school.tone} src={`/assets/magic/spells/${spell.schoolSlug}/${spell.slug}.webp`} alt={`Fantasy illustration of the ${english.name} spell`} /></div>
    <section className="detail-section"><div className="detail-section__heading"><span>01</span><div><h2>Spell details</h2><p>Approved values from the v1.0 spell catalogue.</p></div></div><dl className="definition-table"><div><dt>School</dt><dd>{schoolEnglish.name}</dd></div><div><dt>Type</dt><dd>{type}</dd></div><div><dt>Minimum Intelligence</dt><dd>{spell.minIntelligence}</dd></div><div><dt>Minimum level</dt><dd>{spell.minLevel}</dd></div><div><dt>Bonus</dt><dd>{bonus}</dd></div><div><dt>Target</dt><dd>{target}</dd></div><div><dt>Duration</dt><dd>{duration}</dd></div><div><dt>Limitations</dt><dd>{limitations}</dd></div><div className="definition-table__wide"><dt>Exact effect</dt><dd>{english.effect}</dd></div></dl></section>
    <div className="notice"><strong>Knowing a spell is not the same as meeting its requirements</strong><p>Minimum Intelligence and level only make a spell eligible to learn. The character must still acquire it through leveling up, a teacher, book, scroll, reward, discovery, or story event.</p></div>
    <Link href={`/en/explorer/magic/${schoolSlug}`} className="button button--outline">Back to {schoolEnglish.name}</Link>
  </main>;
}
