/* eslint-disable @next/next/no-img-element -- the curated Vaelor WebP is pre-sized and manually optimized. */
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import { vaelorPage } from "../../translations/rules";

export const metadata: Metadata = {
  title: "Vaelor, the AI Game Master",
  description: "Meet Vaelor, also known as Oryn: the AI Game Master who runs the world and its rules while leaving every hero’s choices to the players.",
  alternates: { canonical: "/en/explorer/vaelor", languages: { "cs-CZ": "/explorer/vaelor", en: "/en/explorer/vaelor" } },
  openGraph: { locale: "en_US" },
};

export default function EnglishVaelorPage() {
  return <main lang="en">
    <Breadcrumbs locale="en" items={[{ label: "Vaelor" }]} />
    <div className="vaelor-page-hero"><img src="/assets/illustrations/vaelor.webp" width="1536" height="1152" alt="Vaelor, the AI Game Master, with a storybook and a glowing magical die" /><div><p className="kicker">AI Game Master</p><h1>{vaelorPage.title}</h1><p className="vaelor-title">{vaelorPage.epithet}</p><p>{vaelorPage.introduction}</p></div></div>
    <section className="detail-grid-two vaelor-functions"><article className="info-panel"><span className="panel-kicker">During the game</span><h2>What Vaelor does</h2><ul>{vaelorPage.does.map((item) => <li key={item}>{item}</li>)}</ul></article><article className="info-panel"><span className="panel-kicker">Clear boundaries</span><h2>What Vaelor does not do</h2><ul>{vaelorPage.doesNot.map((item) => <li key={item}>{item}</li>)}</ul></article></section>
    <section className="detail-section"><div className="detail-section__heading"><span>01</span><div><h2>Starting a game</h2><p>{vaelorPage.activation}</p></div></div><div className="rule-chapters">{vaelorPage.preparation.map((item, index) => <article key={item}><span>{String(index + 1).padStart(2, "0")}</span><div><p>{item}</p></div></article>)}</div></section>
    <div className="quote-panel"><span aria-hidden="true">“</span><blockquote>{vaelorPage.quote}</blockquote><small>Vaelor’s guiding principle</small></div>
    <div className="link-chips"><Link href="/en/explorer/rules">Read the quick rules</Link><Link href="/en#play">Start an adventure</Link></div>
  </main>;
}
