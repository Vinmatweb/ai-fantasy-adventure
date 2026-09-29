import Link from "next/link";
import { gameData } from "../../data";
import { equipmentCategoryName } from "../translations/equipment-catalog";

const routeFor = (slug: string) => slug === "weapons-ranged" ? "ranged-weapons" : slug === "weapons-melee" ? "melee-weapons" : slug;

export function EquipmentCategoryNav() {
  return <nav className="link-chips" aria-label="Equipment categories">
    <Link href="/en/explorer/equipment">Full catalogue <small>{gameData.equipment.length}</small></Link>
    {gameData.equipmentCategories.map((category) => <Link href={`/en/explorer/equipment/${routeFor(category.slug)}`} key={category.slug}>{equipmentCategoryName(category.slug)} <small>{category.count}</small></Link>)}
  </nav>;
}
