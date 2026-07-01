# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

A personal blog built with **Next.js 16 (App Router)**, React 19, TypeScript, and Tailwind CSS v4. Content is authored in **Obsidian** (used as the CMS) as Markdown files and rendered as statically-generated pages. Deployed to **Cloudflare Pages** via OpenNext. UI text and comments are largely in Chinese.

## Commands

```bash
npm run dev          # Start dev server at http://localhost:3000
npm run build        # Production build (next build)
npm run start        # Serve the production build locally
npm run lint         # ESLint (eslint-config-next)

node scripts/compress.js    # Convert public/ JPG/PNG/GIF → WebP (resize to 800px, q80), then DELETE originals
node scripts/publish.mjs <path-to-obsidian-note.md>   # Sync a draft note into content/posts + copy images
```

There is no test suite configured.

### Cloudflare deployment
OpenNext is configured (`open-next.config.ts`, `wrangler.toml`, output dir `.open-next`). Use the `opennextjs-cloudflare` / `wrangler` binaries in `node_modules/.bin` to build and deploy. `wrangler.toml` sets `pages_build_output_dir = ".open-next"` and enables `nodejs_compat`.

## Architecture

### Content pipeline (the core of this project)
Posts live in `content/posts/*.md` with gray-matter front matter (`title`, `category`, `author`, `date`, `readtime`, `cover`, `description`). The flow from writing to rendering:

1. **Authoring** happens in a separate Obsidian "draft vault" (not in this repo). Notes use Obsidian embed syntax `![[image.png|caption]]`.
2. **`scripts/publish.mjs`** migrates a draft note into this repo: it normalizes image filenames (lowercase, spaces→hyphens), copies attachments from the draft vault into `public/PostImages/`, rewrites Obsidian embeds to standard Markdown `![alt](/PostImages/...)`, and generates front matter if missing. Publish-target paths (`content/posts`, `public/PostImages`) are derived from the script's own location, so they survive moving/renaming the project. Only `DRAFT_VAULT_PATH` (the Obsidian draft vault, currently `/Users/wnn/Documents/obsidian/Obsidian_Sync`) is machine-specific — edit that constant or override it per-run with the `DRAFT_VAULT_PATH` env var.
3. **`scripts/compress.js`** walks `public/` recursively, converts raster images to WebP, and **deletes the originals** — be aware this is destructive when run.
4. **Rendering**: `lib/markdown.ts` (`getPostBySlug`) reads a single post, parses front matter, and *also* rewrites any remaining `![[...]]` embeds to `/PostImages/...` (a second safety net beyond publish.mjs). It serializes `Date` front matter to a `zh-CN` string.

### Rendering & routing
- `app/blog/page.tsx` — post list. Reads `content/posts` directly with `fs`/gray-matter at build time and sorts by date descending. Does **not** go through `lib/markdown.ts`.
- `app/blog/[slug]/page.tsx` — post detail. Uses `getPostBySlug` and renders with `react-markdown` + `remarkGfm`. Note the custom `img` component convention: **alt text is pipe-delimited** (`alt|caption`); numeric segments are treated as sizing hints and filtered out, and the first non-numeric segment becomes the `<figcaption>`. Slugs are decoded and `.normalize('NFC')`'d to handle CJK filenames.
- `next-mdx-remote` is also a dependency; the detail page currently uses `react-markdown`. When touching rendering, confirm which path a given page actually uses.

### App structure
- `app/components/core/` — reusable, mostly presentational animation primitives (from motion-primitives: tilt, cursor, text-effect, glow, dialog, etc.). Higher-level components in `app/components/` compose these.
- `app/providers.tsx` + inline `<script>` in `app/layout.tsx` — theme handling. Dark mode is the default and is applied pre-hydration via a raw `localStorage` script (using `next-themes` alongside a manual `document.documentElement` class toggle) to avoid flash.
- `app/api/subscribe/route.ts` — newsletter signup via **Resend** (`resend.contacts.create`). Requires `RESEND_API_KEY` in the environment.

### Conventions
- Path alias `@/*` maps to the repo root (e.g. `@/lib/markdown`).
- `cn()` in `lib/utils.ts` (clsx + tailwind-merge) is the standard class-merging helper.
- `next.config.ts` sets `images.unoptimized: true` — Next.js image optimization is off (images are pre-compressed by `compress.js` instead); remote images allowed only from `n.sinaimg.cn`.
- Tailwind v4 (config in `tailwind.config.ts` + `@tailwindcss/postcss`). Custom `font-article` serif stack and `background: #18181b` are defined there; `@tailwindcss/typography` provides prose styles.
