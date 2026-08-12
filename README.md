# basix.helltop.net

Documentation site for [basix linux](https://github.com/kkrruumm/basix-packages), its
`bpm` package manager, and the FrankenBasix / FrankenUTB extension repositories.

Built with [Astro](https://astro.build) + [Starlight](https://starlight.astro.build)
and deployed to Cloudflare Workers at https://basix.helltop.net.

## Development

- `npm run dev` — local dev server
- `npm run build` — production build
- `npm run astro ...` — other Astro CLI commands

Content lives in `src/content/docs/` (Markdown/MDX).

## Deploy

The site runs on Cloudflare Workers (`wrangler.jsonc`) at
[basix.helltop.net](https://basix.helltop.net).