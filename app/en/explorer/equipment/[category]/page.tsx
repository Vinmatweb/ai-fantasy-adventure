import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CollectionSearch, type SearchItem } from "../../../../components/CollectionSearch";
import { gameData } from "../../../../data";
import { EquipmentCategoryNav } from "../../../components/EquipmentCategoryNav";
import { equipmentCategoryName, equipmentNames, translateEquipmentFields } from "../../../translations/equipment-catalog";

type PageProps = { params: Promise<{ category: string }> };
const routedCategories = ["shields", "adventure-gear", "instruments", "potions", "magic-items"];
const routeFor = (slug: string) => slug === "weapons-ranged" ? "ranged-weapons" : slug === "weapons-melee" ? "melee-weapons" : slug;

export function generateStaticParams() {
  return routedCategories.map((category) => ({ category }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = gameData.equipmentCategories.find((item) => item.slug === slug);
  return category ? { title: equipmentCategoryName(slug), description: `Browse all ${category.count} ${equipmentCategoryName(slug).toLowerCase()} in the approved AI Fantasy Adventure equipment catalogue.` } : {};
}

export default async function EnglishEquipmentCategoryPage({ params }: PageProps) {
  const { category: slug } = await params;
  const category = gameData.equipmentCategories.find((item) => item.slug === slug && routedCategories.includes(item.slug));
  if (!category) notFound();
  const title = equipmentCategoryName(slug);
  const entries = gameData.equipment.filter((item) => item.categorySlug === slug);
  const items: SearchItem[] = entries.map((item) => {
    const fields = translateEquipmentFields(item);
    const price = fields.find((field) => field.label === "Price" || field.label === "Value")?.value;
    const effect = fields.find((field) => field.label === "Game effect" || field.label === "Special ability / calculation")?.value ?? title;
    return {
      href: `/en/explorer/equipment/${routeFor(slug)}/${item.slug}`,
      title: equipmentNames[item.slug] ?? item.name,
      eyebrow: title,
      description: effect,
      meta: fields.filter((field) => ["Type", "Category", "Slot", "Bonus"].includes(field.label)).map((field) => `${field.label}: ${field.value}`).join(" · "),
      badge: price,
      image: `/assets/equipment/items/${item.slug}.webp`,
      imageAlt: `Fantasy illustration of ${equipmentNames[item.slug] ?? item.name}`,
    };
  });
  return <main lang="en">
    <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/en">Home</Link><span>/</span><Link href="/en/explorer">World Explorer</Link><span>/</span><Link href="/en/explorer/equipment/melee-weapons">Equipment</Link><span>/</span><strong>{title}</strong></nav>
    <EquipmentCategoryNav />
    <header className="encyclopedia-header"><div><p className="kicker">Equipment catalogue v1.0 · {gameData.equipmentCategories.findIndex((item) => item.slug === slug) + 1} of 8</p><h1>{title}</h1><p>Browse the approved items, their effects, requirements, and prices. Values follow the original catalogue.</p></div><strong className="encyclopedia-header__count">{entries.length} items</strong></header>
    <CollectionSearch items={items} placeholder={`Search ${title.toLowerCase()}…`} locale="en" />
  </main>;
}
