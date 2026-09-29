import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputRoot = resolve(
  process.argv[2] ?? join(projectRoot, "github-pages-export"),
);
const basePath = "/ai-fantasy-adventure";
const siteUrl = "https://vinmat.eu/ai-fantasy-adventure";
const sourceSiteUrl = "https://ai-fantasy-adventure.jirik66.chatgpt.site";

const data = JSON.parse(
  await readFile(join(projectRoot, "app/data/game-data.json"), "utf8"),
);
const workerModule = await import(
  `${pathToFileURL(join(projectRoot, "dist/server/index.js")).href}?export=${Date.now()}`
);
const worker = workerModule.default;
const env = {
  ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
};
const context = { waitUntil() {}, passThroughOnException() {} };
const equipmentRouteBySlug = {
  "weapons-melee": "melee-weapons",
  "weapons-ranged": "ranged-weapons",
  armor: "armor",
  shields: "shields",
  "adventure-gear": "adventure-gear",
  instruments: "instruments",
  potions: "potions",
  "magic-items": "magic-items",
};

const routes = [
  "",
  "/start",
  "/en",
  "/en/explorer",
  "/en/explorer/heroes",
  "/en/explorer/heroes/races",
  "/en/explorer/heroes/classes",
  "/en/explorer/bestiary",
  "/en/explorer/bestiary/animals",
  "/en/explorer/bestiary/people",
  "/en/explorer/bestiary/fantasy-humanoids",
  "/en/explorer/bestiary/undead",
  "/en/explorer/bestiary/monsters",
  "/en/explorer/equipment",
  ...data.equipmentCategories.map((item) => `/en/explorer/equipment/${equipmentRouteBySlug[item.slug]}`),
  "/en/explorer/magic",
  ...data.magicSchools.map((item) => `/en/explorer/magic/${item.slug}`),
  "/en/explorer/rules",
  "/en/explorer/vaelor",
  "/explorer",
  "/explorer/hrdinove",
  "/explorer/hrdinove/rasy",
  "/explorer/hrdinove/povolani",
  "/explorer/bestiar",
  "/explorer/vybaveni",
  "/explorer/magie",
  "/explorer/pravidla",
  "/explorer/vaelor",
  ...data.races.map((item) => `/explorer/hrdinove/rasy/${item.slug}`),
  ...data.classes.map((item) => `/explorer/hrdinove/povolani/${item.slug}`),
  ...data.heroes.map((item) => `/explorer/hrdinove/${item.slug}`),
  ...data.heroes.map((item) => `/en/explorer/heroes/${item.slug}`),
  ...data.races.map((item) => `/en/explorer/heroes/races/${item.slug}`),
  ...data.classes.map((item) => `/en/explorer/heroes/classes/${item.slug}`),
  ...data.bestiary.filter((item) => item.categorySlug === "zvirata").map((item) => `/en/explorer/bestiary/animals/${item.slug}`),
  ...data.bestiary.filter((item) => item.categorySlug === "lide-npc").map((item) => `/en/explorer/bestiary/people/${item.slug}`),
  ...data.bestiary.filter((item) => item.categorySlug === "fantasy-humanoidi").map((item) => `/en/explorer/bestiary/fantasy-humanoids/${item.slug}`),
  ...data.bestiary.filter((item) => item.categorySlug === "nemrtvi").map((item) => `/en/explorer/bestiary/undead/${item.slug}`),
  ...data.bestiary.filter((item) => item.categorySlug === "nestvury").map((item) => `/en/explorer/bestiary/monsters/${item.slug}`),
  ...data.equipment.map((item) => `/en/explorer/equipment/${equipmentRouteBySlug[item.categorySlug]}/${item.slug}`),
  ...data.spells.map((item) => `/en/explorer/magic/${item.schoolSlug}/${item.slug}`),
  ...data.bestiaryCategories.map(
    (item) => `/explorer/bestiar/kategorie/${item.slug}`,
  ),
  ...data.bestiary.map((item) => `/explorer/bestiar/${item.slug}`),
  ...data.equipmentCategories.map(
    (item) => `/explorer/vybaveni/kategorie/${item.slug}`,
  ),
  ...data.equipment.map((item) => `/explorer/vybaveni/${item.slug}`),
  ...data.magicSchools.map((item) => `/explorer/magie/${item.slug}`),
  ...data.spells.map(
    (item) => `/explorer/magie/${item.schoolSlug}/${item.slug}`,
  ),
];

function makeStatic(html, route) {
  let output = html
    .replaceAll(sourceSiteUrl, siteUrl)
    .replace(/<link\s+rel="modulepreload"[^>]*>/g, "")
    .replace(/<script(?![^>]*type="application\/ld\+json")[^>]*>[\s\S]*?<\/script>/g, "")
    .replace(/<meta\s+name="codex-preview"[^>]*>/g, "")
    .replace(/(href|src)="\/(?!\/)/g, `$1="${basePath}/`)
    .replace(
      "</body>",
      `<script src="${basePath}/static.js" defer></script></body>`,
    );

  if (route === "/en" || route.startsWith("/en/")) {
    output = output
      .replace('<html lang="cs">', '<html lang="en">')
      .replace(
        '"description":"Kooperativní fantasy RPG pro děti a rodiče s AI Pánem jeskyně."',
        '"description":"A cooperative fantasy RPG for children and parents, guided by an AI Game Master."',
      );
  }

  // GitHub Pages serves directory indexes at their slash-terminated URL.
  // Point links and metadata there directly to avoid a redirect on every visit.
  for (const route of routes.filter(Boolean).sort((a, b) => b.length - a.length)) {
    for (const suffix of ['"', "#", "?"]) {
      output = output
        .replaceAll(
          `${siteUrl}${route}${suffix}`,
          `${siteUrl}${route}/${suffix}`,
        )
        .replaceAll(
          `${basePath}${route}${suffix}`,
          `${basePath}${route}/${suffix}`,
        );
    }
  }

  return output;
}

await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });

for (const route of routes) {
  const response = await worker.fetch(
    new Request(`http://localhost${route || "/"}`, {
      headers: { accept: "text/html" },
    }),
    env,
    context,
  );
  if (response.status !== 200) {
    throw new Error(`Route ${route || "/"} returned ${response.status}`);
  }
  const outputFile = join(outputRoot, route.slice(1), "index.html");
  await mkdir(dirname(outputFile), { recursive: true });
  await writeFile(outputFile, makeStatic(await response.text(), route));
}

const cssFiles = (await readdir(join(projectRoot, "dist/client/assets")))
  .filter((file) => file.endsWith(".css"))
  .map((file) => `assets/${file}`);
for (const cssFile of cssFiles) {
  const target = join(outputRoot, cssFile);
  await mkdir(dirname(target), { recursive: true });
  await cp(join(projectRoot, "dist/client", cssFile), target);
}
await cp(
  join(projectRoot, "dist/client/assets/illustrations"),
  join(outputRoot, "assets/illustrations"),
  { recursive: true },
);
await cp(
  join(projectRoot, "dist/client/assets/heroes"),
  join(outputRoot, "assets/heroes"),
  { recursive: true },
);
await cp(
  join(projectRoot, "dist/client/assets/bestiary"),
  join(outputRoot, "assets/bestiary"),
  { recursive: true },
);
await cp(
  join(projectRoot, "dist/client/assets/equipment"),
  join(outputRoot, "assets/equipment"),
  { recursive: true },
);
await cp(
  join(projectRoot, "dist/client/assets/magic"),
  join(outputRoot, "assets/magic"),
  { recursive: true },
);
await cp(
  join(projectRoot, "dist/client/downloads"),
  join(outputRoot, "downloads"),
  { recursive: true },
);
await cp(join(projectRoot, "dist/client/favicon.svg"), join(outputRoot, "favicon.svg"));
await cp(join(projectRoot, "dist/client/og-image.jpg"), join(outputRoot, "og-image.jpg"));

const staticScript = `(() => {
  const basePath = '/ai-fantasy-adventure';
  const bestiaryEnglishToCzech = { animals: 'zvirata', people: 'lide-npc', 'fantasy-humanoids': 'fantasy-humanoidi', undead: 'nemrtvi', monsters: 'nestvury' };
  const bestiaryCzechToEnglish = Object.fromEntries(Object.entries(bestiaryEnglishToCzech).map(([en, cs]) => [cs, en]));
  const equipmentEnglishToCzech = { 'melee-weapons': 'weapons-melee', 'ranged-weapons': 'weapons-ranged', armor: 'armor', shields: 'shields', 'adventure-gear': 'adventure-gear', instruments: 'instruments', potions: 'potions', 'magic-items': 'magic-items' };
  const equipmentCzechToEnglish = Object.fromEntries(Object.entries(equipmentEnglishToCzech).map(([en, cs]) => [cs, en]));
  const bestiaryCategoryBySlug = ${JSON.stringify(Object.fromEntries(data.bestiary.map((entry) => [entry.slug, entry.categorySlug])))};
  const equipmentCategoryBySlug = ${JSON.stringify(Object.fromEntries(data.equipment.map((entry) => [entry.slug, entry.categorySlug])))};
  const cleanPath = (value) => value.replace(/\\/$/, '') || '/';
  const toCzech = (path, hash) => {
    path = cleanPath(path.replace(/^\\/ai-fantasy-adventure(?=\\/|$)/, ''));
    if (path === '/en') return '/';
    if (path === '/en/explorer') {
      const section = (hash || '').replace(/^#/, '');
      return ({ heroes: '/explorer/hrdinove', bestiary: '/explorer/bestiar', equipment: '/explorer/vybaveni', magic: '/explorer/magie', rules: '/explorer/pravidla', vaelor: '/explorer/vaelor' })[section] || '/explorer';
    }
    const heroes = '/en/explorer/heroes';
    if (path === heroes) return '/explorer/hrdinove';
    if (path.startsWith(heroes + '/')) {
      const rest = path.slice(heroes.length + 1).split('/');
      if (rest[0] === 'races') return '/explorer/hrdinove/rasy' + (rest[1] ? '/' + rest[1] : '');
      if (rest[0] === 'classes') return '/explorer/hrdinove/povolani' + (rest[1] ? '/' + rest[1] : '');
      return '/explorer/hrdinove/' + rest.join('/');
    }
    const bestiary = '/en/explorer/bestiary';
    if (path === bestiary) {
      const category = bestiaryEnglishToCzech[(hash || '').replace(/^#/, '')];
      return category ? '/explorer/bestiar/kategorie/' + category : '/explorer/bestiar';
    }
    if (path.startsWith(bestiary + '/')) {
      const rest = path.slice(bestiary.length + 1).split('/');
      if (rest.length > 1) return '/explorer/bestiar/' + rest[1];
      const category = bestiaryEnglishToCzech[rest[0]];
      return category ? '/explorer/bestiar/kategorie/' + category : '/explorer/bestiar';
    }
    const equipment = '/en/explorer/equipment';
    if (path === equipment) return '/explorer/vybaveni';
    if (path.startsWith(equipment + '/')) {
      const rest = path.slice(equipment.length + 1).split('/');
      if (rest.length > 1) return '/explorer/vybaveni/' + rest[1];
      const category = equipmentEnglishToCzech[rest[0]];
      return category ? '/explorer/vybaveni/kategorie/' + category : '/explorer/vybaveni';
    }
    const magic = '/en/explorer/magic';
    if (path === magic) return '/explorer/magie';
    if (path.startsWith(magic + '/')) return '/explorer/magie/' + path.slice(magic.length + 1);
    if (path === '/en/explorer/rules') return '/explorer/pravidla';
    if (path === '/en/explorer/vaelor') return '/explorer/vaelor';
    return '/explorer';
  };
  const toEnglish = (path, hash) => {
    path = cleanPath(path.replace(/^\\/ai-fantasy-adventure(?=\\/|$)/, ''));
    if (path === '/') return '/en';
    if (path === '/start') return '/en#play';
    if (path === '/explorer') return '/en/explorer';
    if (path === '/explorer/vybaveni') return '/en/explorer/equipment';
    const heroes = '/explorer/hrdinove';
    if (path === heroes) return '/en/explorer/heroes';
    if (path.startsWith(heroes + '/')) {
      const rest = path.slice(heroes.length + 1).split('/');
      if (rest[0] === 'rasy') return '/en/explorer/heroes/races' + (rest[1] ? '/' + rest[1] : '');
      if (rest[0] === 'povolani') return '/en/explorer/heroes/classes' + (rest[1] ? '/' + rest[1] : '');
      return '/en/explorer/heroes/' + rest.join('/');
    }
    const bestiary = '/explorer/bestiar';
    if (path === bestiary) return '/en/explorer/bestiary';
    if (path.startsWith(bestiary + '/kategorie/')) {
      const category = path.slice((bestiary + '/kategorie/').length);
      return '/en/explorer/bestiary/' + (bestiaryCzechToEnglish[category] || '');
    }
    if (path.startsWith(bestiary + '/')) {
      const slug = path.slice(bestiary.length + 1);
      const category = bestiaryCzechToEnglish[bestiaryCategoryBySlug[slug]];
      return category ? '/en/explorer/bestiary/' + category + '/' + slug : '/en/explorer/bestiary';
    }
    const equipment = '/explorer/vybaveni';
    if (path.startsWith(equipment + '/kategorie/')) {
      const category = path.slice((equipment + '/kategorie/').length);
      return '/en/explorer/equipment/' + (equipmentCzechToEnglish[category] || 'melee-weapons');
    }
    if (path.startsWith(equipment + '/')) {
      const slug = path.slice(equipment.length + 1);
      const category = equipmentCzechToEnglish[equipmentCategoryBySlug[slug]];
      return category ? '/en/explorer/equipment/' + category + '/' + slug : '/en/explorer/equipment/melee-weapons';
    }
    const magic = '/explorer/magie';
    if (path === magic) return '/en/explorer/magic';
    if (path.startsWith(magic + '/')) return '/en/explorer/magic/' + path.slice(magic.length + 1);
    if (path === '/explorer/pravidla') return '/en/explorer/rules';
    if (path === '/explorer/vaelor') return '/en/explorer/vaelor';
    return '/en';
  };
  const isEnglish = document.documentElement.lang === 'en';
  const languageLink = [...document.querySelectorAll('.language-switch a')].find((link) => (link.textContent || '').trim() === (isEnglish ? 'CZ' : 'EN'));
  if (languageLink) {
    const destination = isEnglish ? toCzech(location.pathname, location.hash) : toEnglish(location.pathname, location.hash);
    languageLink.href = basePath + destination;
  }

  const fold = (value) => value.toLocaleLowerCase('cs');
  document.querySelectorAll('.collection-search').forEach((root) => {
    const input = root.querySelector('input');
    const count = root.querySelector('.search-count');
    const cards = [...root.querySelectorAll('.collection-card')];
    if (!input || !count) return;
    input.addEventListener('input', () => {
      const query = fold(input.value.trim());
      let visible = 0;
      cards.forEach((card) => {
        const show = !query || fold(card.textContent || '').includes(query);
        card.hidden = !show;
        if (show) visible += 1;
      });
      count.textContent = String(visible);
    });
  });

  document.querySelectorAll('.copy-prompt').forEach((root) => {
    const button = root.querySelector('button');
    const quote = root.querySelector('blockquote');
    if (!button || !quote) return;
    const original = button.textContent;
    button.addEventListener('click', async () => {
      const text = (quote.textContent || '').trim().replace(/^„|“$/g, '');
      await navigator.clipboard.writeText(text);
      button.textContent = document.querySelector('main[lang="en"]') ? 'Copied' : 'Zkopírováno';
      window.setTimeout(() => { button.textContent = original; }, 1800);
    });
  });
})();
`;
await writeFile(join(outputRoot, "static.js"), staticScript);

const manifest = {
  name: "AI Fantasy Adventure",
  short_name: "AI Fantasy",
  description:
    "Kooperativní fantasy RPG pro děti a rodiče s AI Pánem jeskyně.",
  start_url: `${basePath}/`,
  scope: `${basePath}/`,
  display: "standalone",
  background_color: "#080d12",
  theme_color: "#080d12",
  lang: "cs",
  icons: [
    { src: `${basePath}/favicon.svg`, sizes: "any", type: "image/svg+xml" },
  ],
};
await writeFile(
  join(outputRoot, "manifest.webmanifest"),
  JSON.stringify(manifest, null, 2),
);

const sitemapEntries = routes
  .map((route) => {
    const location = `${siteUrl}${route ? `${route}/` : "/"}`;
    return `  <url><loc>${location}</loc><lastmod>2026-08-19</lastmod></url>`;
  })
  .join("\n");
await writeFile(
  join(outputRoot, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</urlset>\n`,
);
await writeFile(
  join(outputRoot, "robots.txt"),
  `User-agent: *\nAllow: /ai-fantasy-adventure/\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
);

console.log(
  JSON.stringify(
    {
      outputRoot,
      routeCount: routes.length,
      cssFiles: cssFiles.map((file) => basename(file)),
    },
    null,
    2,
  ),
);
