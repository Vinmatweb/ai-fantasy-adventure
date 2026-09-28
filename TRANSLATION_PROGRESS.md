# English translation progress

This file is the durable handoff point for the chapter-by-chapter English edition. Keep it updated as chapters are completed.

## Published checkpoints

- English homepage and navigation, including English language and metadata.
- English World Explorer overview: `/en/explorer`.
- Starting heroes: overview of all 36 race/class combinations and individual profiles with starting attributes, Health, and translated race/class abilities: `/en/explorer/heroes`.
- Bestiary overview: all 62 entries, five translated categories, challenge rating, Health, XP, and boss labels: `/en/explorer/bestiary`.
- Bestiary animals: translated list and complete profiles for all 12 animal entries: `/en/explorer/bestiary/animals`.

## Remaining translation work

1. Bestiary: translate the remaining 50 profiles, their ability text, and boss guidance, one category at a time.
2. Equipment: translate all 92 catalogue items and their fields.
3. Magic: translate the 11 schools and all 110 spells, one school at a time.
4. Rules and Vaelor pages.
5. Review the English homepage, downloads, alt text, metadata, navigation, and static links for any remaining Czech text.

## Checkpoint workflow

For each chapter, keep the Czech source data unchanged, add English presentation data or route code, run `npm run lint`, `npm test`, `npm run export:github-pages -- <output-dir>`, and `npm run validate:github-pages -- <output-dir>`. CI now saves the English export as the `english-static-output` artifact. Commit the source checkpoint to `Vinmatweb/ai-fantasy-adventure`, then publish only the affected English HTML and newly required CSS/assets to `Vinmatweb/vinmatweb.github.io` so existing Czech pages and production assets remain intact.
