import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AssetSlot } from "../../../../../components/AssetSlot";
import { gameData } from "../../../../../data";
import { rangedWeaponTranslations, translateRangedWeaponFields } from "../../../../translations/equipment-ranged";

type PageProps = { params: Promise<{ slug: string }> };
const entries = gameData.equipment.filter((item) => item.categorySlug === "weapons-ranged");

export function generateStaticParams() {
  return entries.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const translation = rangedWeaponTranslations[slug];
  return translation ? { title: translation.name, description: `${translation.name}: approved weapon requirements, handedness, attack bonus, and price.` } : {};
}

export default async function EnglishRangedWeaponProfile({ params }: PageProps) {
  const { slug } = await params;
  const item = entries.find((entry) => entry.slug === slug);
  const translation = rangedWeaponTranslations[slug];
  if (!item || !translation) notFound();
  const fields = translateRangedWeaponFields(item.fields, translation.note);
  const price = fields.find((field) => field.label === "Price")?.value;

  return <><main lang="en" ><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/en">Home</Link><span>/</span><Link href="/en/explorer">World Explorer</Link><span>/</span><Link href="/en/explorer/equipment/melee-weapons">Equipment</Link><span>/</span><Link href="/en/explorer/equipment/ranged-weapons">Ranged Weapons</Link><span>/</span><strong>{translation.name}</strong></nav><div className="detail-hero"><div className="detail-hero__copy"><p className="kicker">Ranged weapon · Equipment catalogue v1.0</p><h1>{translation.name}</h1><p className="lead">Approved weapon profile</p><p>{translation.note}</p><div className="pill-row">{price && <strong>{price}</strong>}<span>{fields.find((field) => field.label === "Hands")?.value}</span><strong>Physical Attack {fields.find((field) => field.label === "Physical Attack bonus")?.value}</strong></div></div><AssetSlot title={translation.name} eyebrow="Equipment illustration" symbol="➶" tone="earth" src={`/assets/equipment/items/${item.slug}.webp`} alt={`Fantasy illustration of a ${translation.name}`} /></div><section className="detail-section"><div className="detail-section__heading"><span>01</span><div><h2>Approved item data</h2><p>Values are translated from the approved Equipment Catalogue v1.0.</p></div></div><dl className="definition-table">{fields.map(({label,value})=><div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></section><Link href="/en/explorer/equipment/ranged-weapons" className="button button--outline">Back to Ranged Weapons</Link></main></>;
}
