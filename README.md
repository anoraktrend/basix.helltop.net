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

Pushes to `main` deploy automatically via GitHub Actions
(`.github/workflows/deploy.yml`), which builds the site and runs `wrangler deploy`.
The workflow requires the `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` secrets
on the repository.