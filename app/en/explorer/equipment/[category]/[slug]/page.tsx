import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AssetSlot } from "../../../../../components/AssetSlot";
import { gameData } from "../../../../../data";
import { equipmentCategoryName, equipmentNames, translateEquipmentFields } from "../../../../translations/equipment-catalog";

type PageProps = { params: Promise<{ category: string; slug: string }> };
const routedCategories = ["shields", "adventure-gear", "instruments", "potions", "magic-items"];
const routeFor = (slug: string) => slug === "weapons-ranged" ? "ranged-weapons" : slug === "weapons-melee" ? "melee-weapons" : slug;
const entries = gameData.equipment.filter((item) => routedCategories.includes(item.categorySlug));

export function generateStaticParams() {
  return entries.map((item) => ({ category: routeFor(item.categorySlug), slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = entries.find((entry) => entry.slug === slug);
  return item ? { title: equipmentNames[item.slug] ?? item.name, description: `${equipmentNames[item.slug] ?? item.name}: approved ${equipmentCategoryName(item.categorySlug).toLowerCase()} profile and game statistics.` } : {};
}

export default async function EnglishEquipmentProfile({ params }: PageProps) {
  const { category: route, slug } = await params;
  const item = entries.find((entry) => entry.slug === slug && routeFor(entry.categorySlug) === route);
  if (!item) notFound();
  const title = equipmentNames[item.slug] ?? item.name;
  const category = equipmentCategoryName(item.categorySlug);
  const fields = translateEquipmentFields(item);
  const price = fields.find((field) => field.label === "Price" || field.label === "Value")?.value;
  return <main lang="en">
    <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/en">Home</Link><span>/</span><Link href="/en/explorer">World Explorer</Link><span>/</span><Link href="/en/explorer/equipment/melee-weapons">Equipment</Link><span>/</span><Link href={`/en/explorer/equipment/${route}`}>{category}</Link><span>/</span><strong>{title}</strong></nav>
    <div className="detail-hero"><div className="detail-hero__copy"><p className="kicker">{category} · Equipment catalogue v1.0</p><h1>{title}</h1><p className="lead">Approved item profile</p>{price && <div className="pill-row"><strong>{price}</strong></div>}</div><AssetSlot title={title} eyebrow="Equipment illustration" symbol="⚔" tone="ember" src={`/assets/equipment/items/${item.slug}.webp`} alt={`Fantasy illustration of ${title}`} /></div>
    <section className="detail-section"><div className="detail-section__heading"><span>01</span><div><h2>Approved item data</h2><p>Values are translated from the approved Equipment Catalogue v1.0.</p></div></div><dl className="definition-table">{fields.map(({ label, value }) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></section>
    <Link href={`/en/explorer/equipment/${route}`} className="button button--outline">Back to {category}</Link>
  </main>;
}
