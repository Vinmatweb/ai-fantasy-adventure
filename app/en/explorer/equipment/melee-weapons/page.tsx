import type { Metadata } from "next";
import Link from "next/link";
import { CollectionSearch, type SearchItem } from "../../../../components/CollectionSearch";
import { gameData } from "../../../../data";
import { EquipmentCategoryNav } from "../../../components/EquipmentCategoryNav";
import { meleeWeaponTranslations, translateMeleeWeaponFields } from "../../../translations/equipment-melee";

export const metadata: Metadata = {
  title: "Melee Weapons",
  description: "Browse the thirteen translated melee weapons in the AI Fantasy Adventure equipment catalogue.",
  alternates: { canonical: "/en/explorer/equipment/melee-weapons", languages: { en: "/en/explorer/equipment/melee-weapons" } },
  openGraph: { locale: "en_US" },
};

const entries = gameData.equipment.filter((item) => item.categorySlug === "weapons-melee");
const items: SearchItem[] = entries.map((item) => {
  const translation = meleeWeaponTranslations[item.slug]!;
  const fields = translateMeleeWeaponFields(item.fields, translation.note);
  const bonus = fields.find((field) => field.label === "Physical Attack bonus")?.value;
  const price = fields.find((field) => field.label === "Price")?.value;
  return {
    href: `/en/explorer/equipment/melee-weapons/${item.slug}`,
    title: translation.name,
    eyebrow: "Melee weapon",
    description: translation.note,
    meta: `Physical Attack ${bonus} · ${fields.find((field) => field.label === "Hands")?.value}`,
    badge: price,
    image: `/assets/equipment/items/${item.slug}.webp`,
    imageAlt: `Fantasy illustration of a ${translation.name}`,
  };
});

export default function EnglishMeleeWeaponsPage() {
  return <><main lang="en" ><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/en">Home</Link><span>/</span><Link href="/en/explorer">World Explorer</Link><span>/</span><strong>Equipment</strong><span>/</span><strong>Melee Weapons</strong></nav><EquipmentCategoryNav /><header className="encyclopedia-header"><div><p className="kicker">Equipment catalogue v1.0 · Category 1 of 8</p><h1>Melee Weapons</h1><p>Compare the approved weapon requirements, handedness, attack bonuses, prices, and notes. Values follow the original catalogue.</p></div><strong className="encyclopedia-header__count">{entries.length} items</strong></header><CollectionSearch items={items} placeholder="Search melee weapons…" locale="en" /></main></>;
}
