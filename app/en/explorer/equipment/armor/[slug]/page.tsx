import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AssetSlot } from "../../../../../components/AssetSlot";
import { gameData } from "../../../../../data";
import { armorTranslations, translateArmorFields } from "../../../../translations/equipment-armor";

type PageProps = { params: Promise<{ slug: string }> };
const entries = gameData.equipment.filter((item) => item.categorySlug === "armor");

export function generateStaticParams() {
  return entries.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const translation = armorTranslations[slug];
  return translation ? { title: translation.name, description: `${translation.name}: approved armor type, Strength requirement, Defense bonus, and price.` } : {};
}

export default async function EnglishArmorProfile({ params }: PageProps) {
  const { slug } = await params;
  const item = entries.find((entry) => entry.slug === slug);
  const translation = armorTranslations[slug];
  if (!item || !translation) notFound();
  const fields = translateArmorFields(item.fields, translation.note);
  const price = fields.find((field) => field.label === "Price")?.value;

  return <><main lang="en" ><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/en">Home</Link><span>/</span><Link href="/en/explorer">World Explorer</Link><span>/</span><Link href="/en/explorer/equipment/melee-weapons">Equipment</Link><span>/</span><Link href="/en/explorer/equipment/armor">Armor</Link><span>/</span><strong>{translation.name}</strong></nav><div className="detail-hero"><div className="detail-hero__copy"><p className="kicker">Armor · Equipment catalogue v1.0</p><h1>{translation.name}</h1><p className="lead">Approved armor profile</p><p>{translation.note}</p><div className="pill-row">{price && <strong>{price}</strong>}<span>{fields.find((field) => field.label === "Type")?.value}</span><strong>Physical Defense {fields.find((field) => field.label === "Physical Defense bonus")?.value}</strong></div></div><AssetSlot title={translation.name} eyebrow="Equipment illustration" symbol="⬡" tone="ember" src={`/assets/equipment/items/${item.slug}.webp`} alt={`Fantasy illustration of ${translation.name}`} /></div><section className="detail-section"><div className="detail-section__heading"><span>01</span><div><h2>Approved item data</h2><p>Values are translated from the approved Equipment Catalogue v1.0.</p></div></div><dl className="definition-table">{fields.map(({label,value})=><div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></section><Link href="/en/explorer/equipment/armor" className="button button--outline">Back to Armor</Link></main></>;
}
