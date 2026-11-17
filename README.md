# Packing Line — Swift Bundler website prototype

A static SvelteKit prototype of a more product-led Swift Bundler website for the
3.0.0 release. The concept is **the packing line**: Swift Bundler is the last
mile between a SwiftPM package and something you can actually ship.

The palette and crate logo are unchanged. The language, layout and interactions
are built around a physical shipping metaphor: manifests, packing slips,
destination tags, barcodes and cleared-for-shipping stamps.

## Run it

Requires [Bun](https://bun.sh) and Node 22+ (Bun runs the tooling; some CLIs
still use a Node shebang).

```sh
bun install
bun run dev
# http://localhost:5174
```

The dev server is pinned to port **5174** so it can run alongside another
Swift Bundler site on 5173.

Production build (static, output in `build/`):

```sh
bun run build
bun run preview
```

## Stack

- SvelteKit 2 + Svelte 5 (pinned to stable Kit 2 because the current
  `shadcn-svelte` CLI has not caught up with SvelteKit 3's `#lib` aliases)
- Tailwind CSS 4
- shadcn-svelte: Button, Card, Badge, Tabs, Accordion, Separator, Table
- `@sveltejs/adapter-static`
- Phosphor icons

## Component notes

The site is built from shadcn-svelte primitives rather than hand-rolled copies:
Card (packing steps, packing slips, feature and app cards, install cards,
terminal blocks), Badge (version pills, step numbers, formats, platform tags),
Tabs (destination and install selectors), Accordion (FAQ), Separator (rules),
Table (manifest rows) and Button (all actions).

The primitives keep the swappable shadcn APIs, but their default look has been
customised for this palette: square corners, plum/cream active tabs, paper
cards with plum hairlines, and mono metadata. The TabList/TabTrigger base was
also relaxed from a fixed 32px height so the two-line platform tabs no longer
overflow their container, and active tabs keep a cream label on hover.

## Shared site components

Repeated UI is composed from local wrappers rather than copied markup:

- `CodeBlock` — TOML/Swift/shell syntax highlighting, optional line numbers,
  accent lines, light/dark tones and natural URL wrapping.
- `CommandBlock` — terminal shell built on `CodeBlock`'s tokeniser, with copy
  affordance and install notes.
- `SiteCard` — the paper/muted/dark/dashed card variants used everywhere.
- `PageSection` — section shell, background tone and dot-grid placement.
- `TabSelector` — the shared two-line icon tabs used by platforms and install.
- `CheckList`, `IconTile` and `DotGrid` — repeated list, icon tile and texture.
- `SectionHeading`, `CopyButton`, `Logo`, `Barcode` and `ShippingLabel` remain
  single-purpose components.

The syntax tokeniser lives in `src/lib/highlight.ts` so code listings and
command blocks share one implementation. Long URLs wrap at path boundaries and
the copy button still copies the untouched command.

Global component CSS in `layout.css` is now limited to the `label-type`
micro-label utility; the former `.dot-grid`, `.stamp`, `.cut-line`,
`.paper-grain`, `.pixelated` and `.barcode` rules were folded into components
or Tailwind utilities.

## What the prototype demonstrates

- **Hero with a real next action** — OS-aware signed installer download, Mint
  command, docs, platform support strip.
- **Shipping label** — the pixel crate presented as a parcel with destination
  tags, packing slip rows, a barcode and a stamp. Reusable as social/OG artwork.
- **The packing line** — four steps from `Package.swift` to a sealed artifact,
  with a subtle animated crate on the conveyor (disabled for reduced motion).
- **One manifest, every destination** — shadcn tabs switch between Apple,
  Linux, Windows and Android. The config snippet and packing slip both update.
- **Interactive hot reload demo** — change the label, save, and watch it swap
  while the counter keeps its state. This is the one "try it" moment.
- **3.0 release bento** — new platforms, overlays, signing, devices, builders,
  error handling, with a release-at-a-glance strip.
- **Install selector** — exact artifact URLs and commands for `.pkg`, `.deb`,
  `.rpm`, `.msi`, `.zip`, source and Mint.
- **Apps as shipping receipts**, FAQ, and a footer with community/funding links.
- Responsive down to 390 px, keyboard-accessible tabs/accordion, visible focus,
  `prefers-reduced-motion`, descriptive alt text, meta/OG tags, `.nojekyll` for
  GitHub Pages.

## Things that are mocked or need release-day wiring

- Download URLs point at `v3.0.0` assets that must actually be attached to the
  GitHub release. Signing/notarization wording assumes the release pipeline is
  configured with certificates.
- Docs links point at `/documentation/swift-bundler/...` because the DocC site
  is deployed alongside the marketing site by `update-docs.yml`. They 404 in the
  standalone prototype (the prerenderer ignores them).
- The app list, sponsor links and version date should be confirmed before
  launch.
- No analytics, cookie banner or newsletter form is included.

See `../WEBSITE-STRATEGY.md` for the audit, messaging, design system and
deployment notes.
