import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AssetSlot } from "../../../../../components/AssetSlot";
import { SiteFooter } from "../../../../../components/SiteFooter";
import { SiteHeader } from "../../../../../components/SiteHeader";
import { gameData } from "../../../../../data";
import { meleeWeaponTranslations, translateMeleeWeaponFields } from "../../../../translations/equipment-melee";

type PageProps = { params: Promise<{ slug: string }> };
const entries = gameData.equipment.filter((item) => item.categorySlug === "weapons-melee");

export function generateStaticParams() {
  return entries.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const translation = meleeWeaponTranslations[slug];
  return translation ? { title: translation.name, description: `${translation.name}: approved weapon requirements, handedness, attack bonus, and price.` } : {};
}

export default async function EnglishMeleeWeaponProfile({ params }: PageProps) {
  const { slug } = await params;
  const item = entries.find((entry) => entry.slug === slug);
  const translation = meleeWeaponTranslations[slug];
  if (!item || !translation) notFound();
  const fields = translateMeleeWeaponFields(item.fields, translation.note);
  const price = fields.find((field) => field.label === "Price")?.value;

  return <><SiteHeader locale="en" /><main lang="en" className="shell section"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/en">Home</Link><span>/</span><Link href="/en/explorer">World Explorer</Link><span>/</span><Link href="/en/explorer/equipment/melee-weapons">Melee Weapons</Link><span>/</span><strong>{translation.name}</strong></nav><div className="detail-hero"><div className="detail-hero__copy"><p className="kicker">Melee weapon · Equipment catalogue v1.0</p><h1>{translation.name}</h1><p className="lead">Approved weapon profile</p><p>{translation.note}</p><div className="pill-row">{price && <strong>{price}</strong>}<span>{fields.find((field) => field.label === "Hands")?.value}</span><strong>Physical Attack {fields.find((field) => field.label === "Physical Attack bonus")?.value}</strong></div></div><AssetSlot title={translation.name} eyebrow="Equipment illustration" symbol="⚔" tone="ember" src={`/assets/equipment/items/${item.slug}.webp`} alt={`Fantasy illustration of a ${translation.name}`} /></div><section className="detail-section"><div className="detail-section__heading"><span>01</span><div><h2>Approved item data</h2><p>Values are translated from the approved Equipment Catalogue v1.0.</p></div></div><dl className="definition-table">{fields.map(({label,value})=><div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></section><Link href="/en/explorer/equipment/melee-weapons" className="button button--outline">Back to Melee Weapons</Link></main><SiteFooter locale="en" /></>;
}
