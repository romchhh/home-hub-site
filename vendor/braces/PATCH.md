# Patched braces 3.0.4 (local)

Based on `braces@3.0.3` with nesting depth guards for
[GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm).

Upstream has not published a fixed release yet. This package is pulled in via
`overrides.braces` → `file:./vendor/braces` so `npm audit` stays clean.

Changes:
- `lib/parse.js` — reject nesting deeper than 1000
- `lib/compile.js` / `lib/expand.js` — same depth limit on AST walkers
- removed debug `console.log` from `compile.js`
