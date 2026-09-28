import type { Metadata } from "next";
import Link from "next/link";
import { CollectionSearch, type SearchItem } from "../../../../components/CollectionSearch";
import { SiteFooter } from "../../../../components/SiteFooter";
import { SiteHeader } from "../../../../components/SiteHeader";
import { gameData } from "../../../../data";
import { armorTranslations, translateArmorFields } from "../../../translations/equipment-armor";

export const metadata: Metadata = {
  title: "Armor",
  description: "Browse the six translated armor options in the AI Fantasy Adventure equipment catalogue.",
  alternates: { canonical: "/en/explorer/equipment/armor", languages: { en: "/en/explorer/equipment/armor" } },
  openGraph: { locale: "en_US" },
};

const entries = gameData.equipment.filter((item) => item.categorySlug === "armor");
const items: SearchItem[] = entries.map((item) => {
  const translation = armorTranslations[item.slug]!;
  const fields = translateArmorFields(item.fields, translation.note);
  const bonus = fields.find((field) => field.label === "Physical Defense bonus")?.value;
  const price = fields.find((field) => field.label === "Price")?.value;
  return {
    href: `/en/explorer/equipment/armor/${item.slug}`,
    title: translation.name,
    eyebrow: String(fields.find((field) => field.label === "Type")?.value),
    description: translation.note,
    meta: `Physical Defense ${bonus}`,
    badge: price,
    image: `/assets/equipment/items/${item.slug}.webp`,
    imageAlt: `Fantasy illustration of ${translation.name}`,
  };
});

export default function EnglishArmorPage() {
  return <><SiteHeader locale="en" /><main lang="en" className="shell section"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/en">Home</Link><span>/</span><Link href="/en/explorer">World Explorer</Link><span>/</span><Link href="/en/explorer/equipment/melee-weapons">Equipment</Link><span>/</span><strong>Armor</strong></nav><nav className="link-chips" aria-label="Translated equipment categories"><Link href="/en/explorer/equipment/melee-weapons/">Melee Weapons <small>13</small></Link><Link href="/en/explorer/equipment/ranged-weapons/">Ranged Weapons <small>6</small></Link><Link href="/en/explorer/equipment/armor/">Armor <small>6</small></Link></nav><header className="encyclopedia-header"><div><p className="kicker">Equipment catalogue v1.0 · Category 3 of 8</p><h1>Armor</h1><p>Compare the approved armor types, Strength requirements, Defense bonuses, and prices.</p></div><strong className="encyclopedia-header__count">{entries.length} items</strong></header><CollectionSearch items={items} placeholder="Search armor…" locale="en" /></main><SiteFooter locale="en" /></>;
}
