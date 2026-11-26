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
# http://localhost:5173
```

Production build (static, output in `build/`):

```sh
bun run build
bun run preview
```

## Stack

- SvelteKit 2 + Svelte 5 (pinned to stable Kit 2 because the current
  `shadcn-svelte` CLI has not caught up with SvelteKit 3's `#lib` aliases)
- Tailwind CSS 4
- shadcn-svelte: Button, Tabs, Accordion (plus the generated primitives)
- `@sveltejs/adapter-static`
- Phosphor icons

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
