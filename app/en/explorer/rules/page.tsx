import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import { ruleChapters } from "../../translations/rules";

export const metadata: Metadata = {
  title: "Rules at a glance",
  description: "A quick guide to AI Fantasy Adventure character creation, virtual rolls, combat, magic, and progression.",
  alternates: { canonical: "/en/explorer/rules", languages: { "cs-CZ": "/explorer/pravidla", en: "/en/explorer/rules" } },
  openGraph: { locale: "en_US" },
};

export default function EnglishRulesPage() {
  return <main lang="en">
    <Breadcrumbs locale="en" items={[{ label: "Rules" }]} />
    <header className="encyclopedia-header"><div><p className="kicker">Quick guide · v1.0</p><h1>Rules at a glance</h1><p>A short introduction to playing. The complete Manual v1.0 remains the authority for detailed procedures and exceptions.</p></div><strong className="encyclopedia-header__count">8 chapters</strong></header>
    <div className="rule-chapters">{ruleChapters.map((chapter, index) => <article key={chapter.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h2>{chapter.title}</h2>{chapter.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{"formula" in chapter && <p><code>{chapter.formula}</code></p>}{"steps" in chapter && <div className="scene-flow">{chapter.steps.map((step, stepIndex) => <span key={step}><small>{stepIndex + 1}</small>{step}</span>)}</div>}</div></article>)}</div>
    <div className="manual-cta"><div><p className="kicker">Complete rules</p><h2>Manual v1.0</h2><p>The full manual contains character creation, combat procedures, XP tables, campaign handoff, and binding instructions for Vaelor. The current downloadable source documents are in Czech.</p></div><Link href="/en#play" className="button button--gold">View the game documents</Link></div>
    <p className="section-heading"><Link href="/en/explorer/vaelor" className="button button--outline">Meet Vaelor</Link></p>
  </main>;
}
