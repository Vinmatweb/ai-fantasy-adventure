import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AssetSlot } from "../../../../../components/AssetSlot";
import { SiteFooter } from "../../../../../components/SiteFooter";
import { SiteHeader } from "../../../../../components/SiteHeader";
import { gameData } from "../../../../../data";
import { attributeName } from "../../../../translations/animals";
import { fantasyHumanoidTranslations, translatedHumanoidGroupNotes, translatedHumanoidShields, translatedResistance } from "../../../../translations/fantasy-humanoids";

type PageProps = { params: Promise<{ slug: string }> };
const entries = gameData.bestiary.filter((entry) => entry.categorySlug === "fantasy-humanoidi");

export function generateStaticParams() {
  return entries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = entries.find((item) => item.slug === slug);
  const translation = fantasyHumanoidTranslations[slug];
  return entry && translation ? { title: translation.name, description: `${translation.name}: approved challenge rating, attributes, combat values, and special ability.` } : {};
}

export default async function EnglishFantasyHumanoidProfile({ params }: PageProps) {
  const { slug } = await params;
  const entry = entries.find((item) => item.slug === slug);
  const translation = fantasyHumanoidTranslations[slug];
  if (!entry || !translation) notFound();

  const stats = [
    ["STR", entry.stats.strength], ["AGI", entry.stats.agility], ["INT", entry.stats.intelligence], ["CHA", entry.stats.charisma], ["LUCK", entry.stats.luck], ["HP", entry.stats.hp],
    ["Physical attack", entry.stats.physicalAttack], ["Physical defense", entry.stats.physicalDefense], ["Magic attack", entry.stats.magicAttack], ["Magic defense", entry.stats.magicDefense], ["Luck bonus", entry.stats.luckBonus], ["XP", entry.xp],
  ] as const;
  const groups = entry.recommendedGroups;

  return <><SiteHeader locale="en" /><main lang="en" className="shell section">
    <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/en">Home</Link><span>/</span><Link href="/en/explorer">World Explorer</Link><span>/</span><Link href="/en/explorer/bestiary">Bestiary</Link><span>/</span><Link href="/en/explorer/bestiary/fantasy-humanoids">Fantasy Humanoids</Link><span>/</span><strong>{translation.name}</strong></nav>
    <div className="detail-hero"><div className="detail-hero__copy"><p className="kicker">Fantasy humanoid · Challenge {entry.difficulty}</p><h1>{translation.name}</h1><p className="lead">{translation.abilityName}</p><p>{translation.abilityEffect}</p><div className="pill-row">{entry.isBoss && <strong>Boss stat block</strong>}<span>Strong: {attributeName[entry.strong] ?? entry.strong}</span><span>Weak: {attributeName[entry.weak] ?? entry.weak}</span><strong>{entry.stats.hp} Health</strong></div></div><AssetSlot title={translation.name} eyebrow={entry.isBoss ? "Bestiary boss illustration" : "Bestiary illustration"} symbol={entry.isBoss ? "♛" : "◉"} tone={entry.isBoss ? "ember" : "earth"} src={`/assets/bestiary/${entry.slug}.webp`} alt={`Fantasy illustration of ${translation.name}`} /></div>
    <section className="detail-section"><div className="detail-section__heading"><span>01</span><div><h2>Stat block</h2><p>Approved values from the Bestiary v1.0.</p></div></div><div className="stat-table">{stats.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div><details className="mechanics-details"><summary>Weapon, protection, and other values</summary><dl><div><dt>Attack attribute</dt><dd>{attributeName[entry.attackAttribute] ?? entry.attackAttribute}</dd></div><div><dt>Weapon</dt><dd>{translation.weapon} ({entry.weaponBonus >= 0 ? "+" : ""}{entry.weaponBonus})</dd></div><div><dt>Armor</dt><dd>{translation.armor} ({entry.armorBonus >= 0 ? "+" : ""}{entry.armorBonus})</dd></div><div><dt>Shield</dt><dd>{entry.shield ? `${translatedHumanoidShields[entry.shield] ?? entry.shield} (+${entry.shieldBonus})` : `None (+${entry.shieldBonus})`}</dd></div><div><dt>Spell bonus</dt><dd>{entry.spellBonus}</dd></div><div><dt>Magic protection</dt><dd>{entry.magicProtection}</dd></div></dl></details></section>
    <section className="detail-grid-two"><article className="info-panel"><span className="panel-kicker">Special ability</span><h2>{translation.abilityName}</h2><p>{translation.abilityEffect}</p></article><article className="info-panel"><span className="panel-kicker">Suggested party size</span><h2>Recommended number</h2><div className="group-counts"><span>2 players <strong>{translatedHumanoidGroupNotes[String(groups["2"])] ?? groups["2"] ?? "—"}</strong></span><span>3 players <strong>{translatedHumanoidGroupNotes[String(groups["3"])] ?? groups["3"] ?? "—"}</strong></span><span>4 players <strong>{translatedHumanoidGroupNotes[String(groups["4"])] ?? groups["4"] ?? "—"}</strong></span></div></article></section>
    {entry.defenseSpecialization && <section className="notice"><strong>{translation.abilityName}</strong><p>{translation.abilityEffect}</p><span>{translatedResistance[entry.defenseSpecialization.resistanceType] ?? "Defense specialization"}</span></section>}
    <Link href="/en/explorer/bestiary/fantasy-humanoids" className="button button--outline">Back to Fantasy Humanoids</Link>
  </main><SiteFooter locale="en" /></>;
}
