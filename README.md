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

## Release downloads

The manual installation card gets its links from GitHub's `releases/latest`
endpoint in two places:

- **At build time** (`src/lib/server/latest-release.ts`) so the prerendered HTML
  has working links without JavaScript.
- **In the browser on mount** (`src/lib/latest-release.ts`), so newly published
  releases show up without rebuilding or redeploying. GitHub's API allows
  cross-origin reads, so no proxy is involved.

Asset links are matched by file extension (`.pkg`, `.deb`, `.rpm`, `.tar.gz`,
`.msi`, `.zip`). The release must publish the full set of installers; otherwise
the card keeps the links it already has rather than mixing releases. Browser
results are cached in `localStorage` for 10 minutes to stay well under GitHub's
unauthenticated rate limit (60 requests/hour/IP). If the API fails or is rate
limited, the card keeps the build-time links.

At build time, if the latest release doesn't have installers or the API is
unreachable, the build logs a warning and falls back to the version pinned in
`src/lib/content.ts`.

```sh
# Raises GitHub's rate limit when building in CI
GITHUB_TOKEN=... bun run build

# Point at a different endpoint (e.g. a local fixture)
SBUN_RELEASE_API_URL=http://127.0.0.1:8899/release bun run build
```

`GITHUB_TOKEN` is only used for the build-time request; it is never shipped to
the browser. In dev, build-time responses (including fallbacks) are cached for
10 minutes.

## Install scripts

`static/install.sh` and `static/install.ps1` are copies of the installers from
[swift-bundler](https://github.com/moreSwift/swift-bundler)'s `Distribution/`
directory, served at `/install.sh` and `/install.ps1`. They're vendored so this
site builds on its own, without a swift-bundler checkout.

When the installers change upstream, refresh the copies:

```sh
cp ../swift-bundler/Distribution/install.sh static/install.sh
cp ../swift-bundler/Distribution/install.ps1 static/install.ps1
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
