import type { Metadata } from "next";
import Link from "next/link";
import { CollectionSearch, type SearchItem } from "../../../../components/CollectionSearch";
import { gameData } from "../../../../data";
import { rangedWeaponTranslations, translateRangedWeaponFields } from "../../../translations/equipment-ranged";

export const metadata: Metadata = {
  title: "Ranged Weapons",
  description: "Browse the six translated ranged weapons in the AI Fantasy Adventure equipment catalogue.",
  alternates: { canonical: "/en/explorer/equipment/ranged-weapons", languages: { en: "/en/explorer/equipment/ranged-weapons" } },
  openGraph: { locale: "en_US" },
};

const entries = gameData.equipment.filter((item) => item.categorySlug === "weapons-ranged");
const items: SearchItem[] = entries.map((item) => {
  const translation = rangedWeaponTranslations[item.slug]!;
  const fields = translateRangedWeaponFields(item.fields, translation.note);
  const bonus = fields.find((field) => field.label === "Physical Attack bonus")?.value;
  const price = fields.find((field) => field.label === "Price")?.value;
  return {
    href: `/en/explorer/equipment/ranged-weapons/${item.slug}`,
    title: translation.name,
    eyebrow: "Ranged weapon",
    description: translation.note,
    meta: `Physical Attack ${bonus} · ${fields.find((field) => field.label === "Hands")?.value}`,
    badge: price,
    image: `/assets/equipment/items/${item.slug}.webp`,
    imageAlt: `Fantasy illustration of a ${translation.name}`,
  };
});

export default function EnglishRangedWeaponsPage() {
  return <><main lang="en" ><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/en">Home</Link><span>/</span><Link href="/en/explorer">World Explorer</Link><span>/</span><Link href="/en/explorer/equipment/melee-weapons">Equipment</Link><span>/</span><strong>Ranged Weapons</strong></nav><header className="encyclopedia-header"><div><p className="kicker">Equipment catalogue v1.0 · Category 2 of 8</p><h1>Ranged Weapons</h1><p>Compare the approved weapon requirements, handedness, attack bonuses, prices, and notes. Values follow the original catalogue.</p></div><strong className="encyclopedia-header__count">{entries.length} items</strong></header><CollectionSearch items={items} placeholder="Search ranged weapons…" locale="en" /></main></>;
}
