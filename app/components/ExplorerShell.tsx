import Link from "next/link";
import { gameData } from "../data";

function NavLink({ href, currentPath, children }: { href: string; currentPath: string; children: React.ReactNode }) {
  const normalizedHref = href.replace(/\/$/, "");
  const normalizedPath = currentPath.replace(/\/$/, "");
  const active = normalizedPath === normalizedHref ||
    (!new Set(["/explorer", "/en/explorer"]).has(normalizedHref) && normalizedPath.startsWith(`${normalizedHref}/`));
  return (
    <Link href={href} className={active ? "explorer-nav__link is-active" : "explorer-nav__link"} aria-current={active ? "page" : undefined}>
      {children}
    </Link>
  );
}

function ExplorerNav({ currentPath, locale }: { currentPath: string; locale: "cs" | "en" }) {
  if (locale === "en") return <EnglishExplorerNav currentPath={currentPath} />;
  const heroesOpen = currentPath.includes("/hrdinove");
  const bestiaryOpen = currentPath.includes("/bestiar");
  const equipmentOpen = currentPath.includes("/vybaveni");
  const magicOpen = currentPath.includes("/magie");

  return (
    <nav className="explorer-nav" aria-label="Explorer světa">
      <div className="explorer-nav__heading">
        <span>Svět v1.0</span>
        <strong>AI Fantasy Adventure</strong>
      </div>
      <NavLink href="/explorer" currentPath={currentPath}>Přehled světa</NavLink>

      <details open={heroesOpen}>
        <summary>Hrdinové <span>{gameData.heroes.length}</span></summary>
        <div className="explorer-nav__branch">
          <details open={currentPath.includes("/hrdinove/rasy")}>
            <summary>Rasy <span>{gameData.races.length}</span></summary>
            <div className="explorer-nav__branch">
              <NavLink href="/explorer/hrdinove/rasy" currentPath={currentPath}>Všechny rasy</NavLink>
              {gameData.races.map((race) => (
                <NavLink href={`/explorer/hrdinove/rasy/${race.slug}`} currentPath={currentPath} key={race.slug}>{race.name}</NavLink>
              ))}
            </div>
          </details>
          <details open={currentPath.includes("/hrdinove/povolani")}>
            <summary>Povolání <span>{gameData.classes.length}</span></summary>
            <div className="explorer-nav__branch">
              <NavLink href="/explorer/hrdinove/povolani" currentPath={currentPath}>Všechna povolání</NavLink>
              {gameData.classes.map((item) => (
                <NavLink href={`/explorer/hrdinove/povolani/${item.slug}`} currentPath={currentPath} key={item.slug}>{item.name}</NavLink>
              ))}
            </div>
          </details>
          <NavLink href="/explorer/hrdinove" currentPath={currentPath}>{gameData.heroes.length} kombinací</NavLink>
        </div>
      </details>

      <details open={bestiaryOpen}>
        <summary>Bestiář <span>{gameData.bestiary.length}</span></summary>
        <div className="explorer-nav__branch">
          <NavLink href="/explorer/bestiar" currentPath={currentPath}>Všichni tvorové</NavLink>
          {gameData.bestiaryCategories.map((category) => (
            <NavLink href={`/explorer/bestiar/kategorie/${category.slug}`} currentPath={currentPath} key={category.slug}>
              {category.name} <small>{category.count}</small>
            </NavLink>
          ))}
        </div>
      </details>

      <details open={equipmentOpen}>
        <summary>Vybavení <span>{gameData.equipment.length}</span></summary>
        <div className="explorer-nav__branch">
          <NavLink href="/explorer/vybaveni" currentPath={currentPath}>Celý katalog</NavLink>
          {gameData.equipmentCategories.map((category) => (
            <NavLink href={`/explorer/vybaveni/kategorie/${category.slug}`} currentPath={currentPath} key={category.slug}>
              {category.name} <small>{category.count}</small>
            </NavLink>
          ))}
        </div>
      </details>

      <details open={magicOpen}>
        <summary>Magie <span>{gameData.spells.length}</span></summary>
        <div className="explorer-nav__branch">
          <NavLink href="/explorer/magie" currentPath={currentPath}>Všechny školy</NavLink>
          {gameData.magicSchools.map((school) => (
            <NavLink href={`/explorer/magie/${school.slug}`} currentPath={currentPath} key={school.slug}>
              <span aria-hidden="true">{school.symbol}</span> {school.name}
            </NavLink>
          ))}
        </div>
      </details>

      <NavLink href="/explorer/pravidla" currentPath={currentPath}>Pravidla</NavLink>
      <NavLink href="/explorer/vaelor" currentPath={currentPath}>Vaelor</NavLink>
    </nav>
  );
}

function EnglishExplorerNav({ currentPath }: { currentPath: string }) {
  const bestiaryOpen = currentPath.includes("/bestiary");
  const equipmentOpen = currentPath.includes("/equipment");
  const heroesOpen = currentPath.includes("/heroes");
  const bestiary = [
    ["animals", "Animals", 12],
    ["people", "People and NPCs", 16],
    ["fantasy-humanoids", "Fantasy humanoids", 12],
    ["undead", "Undead", 9],
    ["monsters", "Monsters", 13],
  ] as const;
  const equipment = [
    ["melee-weapons", "Melee weapons", 13],
    ["ranged-weapons", "Ranged weapons", 6],
    ["armor", "Armor", 6],
    ["shields", "Shields", 3],
    ["adventure-gear", "Adventuring gear", 28],
    ["instruments", "Musical instruments", 6],
    ["potions", "Potions", 9],
    ["magic-items", "Magic items", 21],
  ] as const;
  return (
    <nav className="explorer-nav" aria-label="World Explorer">
      <div className="explorer-nav__heading"><span>World v1.0</span><strong>AI Fantasy Adventure</strong></div>
      <NavLink href="/en/explorer" currentPath={currentPath}>World overview</NavLink>
      <details open={heroesOpen}>
        <summary>Heroes <span>36</span></summary>
        <div className="explorer-nav__branch">
          <NavLink href="/en/explorer/heroes" currentPath={currentPath}>All 36 heroes</NavLink>
          <NavLink href="/en/explorer/heroes/races" currentPath={currentPath}>Playable races <small>6</small></NavLink>
          <NavLink href="/en/explorer/heroes/classes" currentPath={currentPath}>Character classes <small>6</small></NavLink>
        </div>
      </details>
      <details open={bestiaryOpen}>
        <summary>Bestiary <span>62</span></summary>
        <div className="explorer-nav__branch">
          <NavLink href="/en/explorer/bestiary" currentPath={currentPath}>All creatures and NPCs</NavLink>
          {bestiary.map(([slug, name, count]) => <NavLink href={`/en/explorer/bestiary/${slug}`} currentPath={currentPath} key={slug}>{name}<small>{count}</small></NavLink>)}
        </div>
      </details>
      <details open={equipmentOpen}>
        <summary>Equipment <span>92</span></summary>
        <div className="explorer-nav__branch">
          <NavLink href="/en/explorer/equipment" currentPath={currentPath}>Full catalogue</NavLink>
          {equipment.map(([slug, name, count]) => <NavLink href={`/en/explorer/equipment/${slug}`} currentPath={currentPath} key={slug}>{name}<small>{count}</small></NavLink>)}
        </div>
      </details>
      <NavLink href="/en/explorer#magic" currentPath={currentPath}>Magic</NavLink>
      <NavLink href="/en/explorer#rules" currentPath={currentPath}>Rules</NavLink>
      <NavLink href="/en/explorer#vaelor" currentPath={currentPath}>Vaelor</NavLink>
    </nav>
  );
}

export function ExplorerShell({ currentPath, children, locale = "cs" }: { currentPath: string; children: React.ReactNode; locale?: "cs" | "en" }) {
  return (
    <div className="explorer-layout">
      <input type="checkbox" id="explorer-sidebar-toggle" className="sidebar-toggle" />
      <aside className="explorer-sidebar">
        <label htmlFor="explorer-sidebar-toggle" className="sidebar-close" aria-label={locale === "en" ? "Close navigation" : "Zavřít navigaci"}>×</label>
        <ExplorerNav currentPath={currentPath} locale={locale} />
      </aside>
      <label htmlFor="explorer-sidebar-toggle" className="sidebar-scrim" aria-hidden="true" />
      <div className="explorer-main">
        <label htmlFor="explorer-sidebar-toggle" className="sidebar-open button button--ghost button--small">
          <span aria-hidden="true">☰</span> {locale === "en" ? "Contents" : "Obsah světa"}
        </label>
        {children}
      </div>
    </div>
  );
}
