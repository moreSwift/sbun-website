#!/usr/bin/env bash
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
svg="$root/static/og.svg"
png="$root/static/og.png"
width=1200
height=630

if ! command -v rsvg-convert >/dev/null 2>&1; then
	echo "rsvg-convert is required to render the OG image." >&2
	echo "Install it with: brew install librsvg" >&2
	exit 1
fi

rsvg-convert --width "$width" --height "$height" --output "$png" "$svg"
echo "Rendered $png (${width}x${height})"
