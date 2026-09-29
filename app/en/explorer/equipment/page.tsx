import type { Metadata } from "next";
import Link from "next/link";
import { gameData } from "../../../data";
import { equipmentCategoryName } from "../../translations/equipment-catalog";

export const metadata: Metadata = {
  title: "Equipment",
  description: "Browse all 92 approved weapons, armor, adventuring gear, potions, and magic items.",
  alternates: { canonical: "/en/explorer/equipment", languages: { "cs-CZ": "/explorer/vybaveni", en: "/en/explorer/equipment" } },
  openGraph: { locale: "en_US" },
};

const routeFor = (slug: string) => slug === "weapons-ranged" ? "ranged-weapons" : slug === "weapons-melee" ? "melee-weapons" : slug;

export default function EnglishEquipmentPage() {
  return <main lang="en">
    <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/en">Home</Link><span>/</span><Link href="/en/explorer">World Explorer</Link><span>/</span><strong>Equipment</strong></nav>
    <header className="encyclopedia-header"><div><p className="kicker">Equipment catalogue · v1.0</p><h1>Equipment</h1><p>Explore every approved weapon, piece of armor, adventuring tool, potion, and magic item.</p></div><strong className="encyclopedia-header__count">{gameData.equipment.length} items</strong></header>
    <div className="category-strip category-strip--wide">{gameData.equipmentCategories.map((category) => <Link href={`/en/explorer/equipment/${routeFor(category.slug)}`} key={category.slug}><strong>{equipmentCategoryName(category.slug)}</strong><span>{category.count} items</span></Link>)}</div>
    <Link href="/en/explorer" className="button button--outline">Back to World Explorer</Link>
  </main>;
}
