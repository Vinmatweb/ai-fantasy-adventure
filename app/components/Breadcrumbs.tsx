import Link from "next/link";

export function Breadcrumbs({ items, locale = "cs" }: { items: Array<{ label: string; href?: string }>; locale?: "cs" | "en" }) {
  const english = locale === "en";
  return (
    <nav className="breadcrumbs" aria-label={english ? "Breadcrumb" : "Drobečková navigace"}>
      <Link href={english ? "/en" : "/"}>{english ? "Home" : "Domů"}</Link>
      <span>/</span>
      <Link href={english ? "/en/explorer" : "/explorer"}>{english ? "World Explorer" : "Explorer"}</Link>
      {items.map((item, index) => (
        <span className="breadcrumbs__item" key={`${item.label}-${index}`}>
          <span>/</span>
          {item.href ? <Link href={item.href}>{item.label}</Link> : <strong>{item.label}</strong>}
        </span>
      ))}
    </nav>
  );
}
