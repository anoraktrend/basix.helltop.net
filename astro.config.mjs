// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  integrations: [
      starlight({
          title: 'Basix · bpm · FrankenBasix',
          sidebar: [
              { label: 'Overview', link: '/' },
              {
                  label: 'Guides',
                  items: [
                      { label: 'Getting Started', slug: 'guides/getting-started' },
                  ],
              },
              {
                  label: 'Reference',
                  items: [
                      { label: 'basix', slug: 'reference/basix' },
                      { label: 'bpm Commands', slug: 'reference/bpm-commands' },
                      { label: 'bpm Configuration', slug: 'reference/bpm-configuration' },
                      { label: 'Templates', slug: 'reference/templates' },
                      { label: 'Use Flags', slug: 'reference/use-flags' },
                      { label: 'Package State', slug: 'reference/package-state' },
                      { label: 'FrankenBasix', slug: 'reference/frankenbasix' },
                  ],
              },
          ],
      }),
	],

  adapter: cloudflare(),
});