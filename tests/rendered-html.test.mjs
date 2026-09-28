import assert from "node:assert/strict";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

test("renders development preview metadata", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  assert.match(await response.text(), developmentPreviewMeta);
});

test("renders representative public and encyclopedia routes", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("routes", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const env = {
    ASSETS: {
      fetch: async () => new Response("Not found", { status: 404 }),
    },
  };
  const context = { waitUntil() {}, passThroughOnException() {} };
  const routes = [
    "/",
    "/start",
    "/en",
    "/en/explorer/bestiary/animals",
    "/en/explorer/bestiary/animals/krysa",
    "/en/explorer/bestiary/people/obchodnik",
    "/en/explorer/bestiary/fantasy-humanoids/goblini-nacelnik",
    "/en/explorer/bestiary/undead/upir",
    "/en/explorer/bestiary/monsters/prastary-drak",
    "/explorer",
    "/explorer/hrdinove/clovek-bojovnik",
    "/explorer/hrdinove/vila-lecitel",
    "/explorer/bestiar/mlady-drak",
    "/explorer/vybaveni/obourucni-mec",
    "/explorer/magie/ohen/ohniva-koule",
    "/explorer/pravidla",
    "/explorer/vaelor",
    "/robots.txt",
    "/sitemap.xml",
  ];

  for (const route of routes) {
    const response = await worker.fetch(
      new Request(`http://localhost${route}`, {
        headers: { accept: "text/html" },
      }),
      env,
      context,
    );
    assert.equal(response.status, 200, route);
    if (route === "/en") {
      const html = await response.text();
      assert.match(html, /World overview/);
      assert.match(html, /Game setup/);
      assert.match(html, /name="twitter:description" content="A cooperative fantasy RPG/);
      assert.doesNotMatch(html, /href=["']\/explorer(?:\/|["'])/);
    }
    if (route === "/en/explorer/bestiary/animals/krysa") {
      const html = await response.text();
      assert.match(html, /<main lang="en"/);
      assert.match(html, /<h1>Rat<\/h1>/);
      assert.match(html, /Slip Away/);
      assert.doesNotMatch(html, /Krysa|Proklouznutí|OBRANA/);
    }
    if (route === "/en/explorer/bestiary/people/obchodnik") {
      const html = await response.text();
      assert.match(html, /<main lang="en"/);
      assert.match(html, /<h1>Merchant<\/h1>/);
      assert.match(html, /Haggle/);
      assert.doesNotMatch(html, /Obchodník|Smlouvání|OBRANA/);
    }
    if (route === "/en/explorer/bestiary/fantasy-humanoids/goblini-nacelnik") {
      const html = await response.text();
      assert.match(html, /<main lang="en"/);
      assert.match(html, /<h1>Goblin Chieftain<\/h1>/);
      assert.match(html, /Chieftain's Orders/);
      assert.doesNotMatch(html, /Gobliní náčelník|Rozkazy náčelníka|OBRANA/);
    }
    if (route === "/en/explorer/bestiary/undead/upir") {
      const html = await response.text();
      assert.match(html, /<main lang="en"/);
      assert.match(html, /<h1>Vampire<\/h1>/);
      assert.match(html, /Sunlight Weakness/);
      assert.doesNotMatch(html, /Upír|Sání života|OBRANA|slabina/);
    }
    if (route === "/en/explorer/bestiary/monsters/prastary-drak") {
      const html = await response.text();
      assert.match(html, /<main lang="en"/);
      assert.match(html, /<h1>Ancient Dragon<\/h1>/);
      assert.match(html, /Elder Scales and Revealed Weakness/);
      assert.doesNotMatch(html, /Prastarý drak|Dračí dech|OBRANA/);
    }
  }
});
