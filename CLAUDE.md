# Accessibility rules
- Run `npm run test:a11y` after any UI change; a red result blocks the change.
- Pull violation detail from the Stark MCP (asset: TeamSync Site) before editing; fall back to `stark-results.json`.
- Fix colors in globals.css or design tokens, never inline styles.
- Decorative images get alt=""; informative images get a concise alt without "image of".
- One h1 per page; headings descend without skipping levels.
- Never change test budgets or assertions to make a run pass.
