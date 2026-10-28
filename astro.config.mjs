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
              { label: 'Downloads', slug: 'download' },
              { label: 'Social', slug: 'social' },
              { label: 'Philosophy', slug: 'philosophy' },
              { label: 'Wiki',
                  items: [
                      { label: 'Wiki Home', slug: 'wiki' },
                      { label: 'Installation', slug: 'wiki/installation' },
                      { label: 'BPM', slug: 'wiki/bpm' },
                      { label: 'BPM Usage', slug: 'wiki/bpm/usage'}
                      { label: 'Service Configuration', slug: 'wiki/services' },
                      { label: 'Security', slug: 'wiki/security' },
                      { label: 'Time', slug: 'wiki/time' },
                      { label: 'Kernel Modules', slug: 'wiki/kmodules' },
                      { label: 'Virtualization', slug: 'wiki/virtualization' },
                  ],
              },
          ],
      }),
	],

  adapter: cloudflare(),
});
