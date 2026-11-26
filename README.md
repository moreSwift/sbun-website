# Swift Bundler website

This repo holds the source code for [Swift Bundler](https://github.com/moreSwift/swift-bundler)'s website.

## Run it

Requires [Bun](https://bun.sh) and Node 22+.

```sh
bun install
bun run dev
# http://localhost:5174
```

The dev server is pinned to port **5174** so that it can easily be run alongside [the SwiftCrossUI website](https://github.com/moreSwift/scui-website) when making changes to both.

Production build (static, output in `build/`):

```sh
bun run build
bun run preview
```

## Stack

- SvelteKit 2 + Svelte 5
- Tailwind CSS 4
- shadcn-svelte: Button, Card, Badge, Tabs, Accordion, Separator, Table
- Phosphor icons
- `@sveltejs/adapter-static`

## Open Graph image

`static/og.svg` is the source of truth and `static/og.png` is the 1200×630 image
served by `og:image`. After editing the SVG, regenerate the PNG with:

```sh
bun run og
```

This requires `rsvg-convert` (`brew install librsvg`).
