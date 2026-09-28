# English translation progress

This file is the durable handoff point for the chapter-by-chapter English edition. Keep it updated as chapters are completed.

## Published checkpoints

- English homepage and navigation, including English language and metadata.
- English World Explorer overview: `/en/explorer`.
- Starting heroes: overview of all 36 race/class combinations and individual profiles with starting attributes, Health, and translated race/class abilities: `/en/explorer/heroes`.
- Bestiary overview and all 62 entries, with translated categories, names, complete profiles, abilities, combat values, and recommended party sizes: `/en/explorer/bestiary`.
- Equipment catalogue, weapons categories 1 and 2 of 8: all 13 melee weapons and 6 ranged weapons, including requirements, handedness, attack bonuses, prices, and notes: `/en/explorer/equipment/melee-weapons` and `/en/explorer/equipment/ranged-weapons`.

## Remaining translation work

1. Equipment: translate the remaining 73 items in armor, shields, adventure gear, instruments, potions, and magic items.
2. Magic: translate the 11 schools and all 110 spells, one school at a time.
3. Rules and Vaelor pages.
4. Review the English homepage, downloads, alt text, metadata, navigation, and static links for any remaining Czech text.

## Checkpoint workflow

For each chapter, keep the Czech source data unchanged, add English presentation data or route code, run `npm run lint`, `npm test`, `npm run export:github-pages -- <output-dir>`, and `npm run validate:github-pages -- <output-dir>`. CI saves the English export as the `english-static-output` artifact. Commit the source checkpoint to `Vinmatweb/ai-fantasy-adventure`, then publish only the English HTML and required CSS/assets to `Vinmatweb/vinmatweb.github.io` so existing Czech pages and production assets remain intact.
