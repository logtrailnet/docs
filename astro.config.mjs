// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';
import { ion } from 'starlight-ion-theme';

// https://astro.build/config
export default defineConfig({
	site: 'https://docs.logtrail.net',
	prefetch: {
		prefetchAll: true,
		defaultStrategy: 'hover',
	},
	integrations: [
		starlight({
			title: 'Logtrail Docs',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/logtrailnet' }],
			plugins: [
				ion({
					icons: {
						collections: ['lucide'],
					},
					footer: {
						text: '© 2026 Logtrail. Built for speed and AI.',
					},
				}),
			],
			head: [
				// Open Graph / Social Meta Tags
				{
					tag: 'meta',
					attrs: { property: 'og:image', content: 'https://docs.logtrail.net/og-image.png' },
				},
				{
					tag: 'meta',
					attrs: { name: 'twitter:card', content: 'summary_large_image' },
				},
				// Favicons and App Icons
				{
					tag: 'link',
					attrs: { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
				},
			],
			sidebar: [
				{
					label: '[lucide:rocket] Getting Started',
					items: [
						{ label: 'Introduction', link: '/getting-started/introduction' },
						{ label: 'Quickstart', link: '/getting-started/quickstart' },
					],
				},
				{
					label: '[lucide:brain] Core Concepts',
					items: [
						{ label: 'Architecture', link: '/concepts/architecture' },
						{ label: 'Security & Privacy', link: '/concepts/security' },
					],
				},
				{
					label: '[lucide:book-open] Guides',
					items: [
						{ label: 'Query Language (LCQL)', link: '/guides/lcql' },
						{ label: 'Discovery & Validation', link: '/guides/discovery-and-validation' },
					],
				},
				{
					label: '[lucide:file-code] Reference',
					items: [
						{ label: 'AI & Agent Hub', link: '/reference/ai-hub' },
						{ label: 'SDKs & Libraries', link: '/reference/sdks' },
						{ label: 'System Limits', link: '/reference/limits' },
						{ label: 'API Reference', link: '/api-reference' },
					],
				},
				{
					label: '[lucide:shield-check] Legal',
					items: [
						{ label: 'Terms and Conditions', link: '/legal/terms' },
						{ label: 'Privacy Policy', link: '/legal/privacy' },
					],
				},
			],
		}),
		sitemap(),
	],
});
