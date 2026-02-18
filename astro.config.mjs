// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';
import robots from 'astro-robots-txt';
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
			title: 'Logtrail',
			description: 'The high-performance, AI-friendly logging platform for modern engineering teams.',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/logtrailnet' }],
			customCss: ['./src/styles/custom.css'],
			components: {
				SiteTitle: './src/components/SiteTitle.astro',
				Head: './src/components/CustomHead.astro',
			},
			plugins: [
				ion({
					icons: {
						include: {
							lucide: ['*'],
						},
					},
					footer: {
						text: '© 2026 Logtrail. Built for speed and AI. Support: support@logtrail.net',
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
				{
					tag: 'meta',
					attrs: { name: 'twitter:image', content: 'https://docs.logtrail.net/og-image.png' },
				},
				// SEO and Discovery
				{
					tag: 'meta',
					attrs: { name: 'keywords', content: 'logging, activity feed, ai logging, logtrail, developer tools, internal tools' },
				},
				{
					tag: 'meta',
					attrs: { name: 'author', content: 'Logtrail Team' },
				},
				{
					tag: 'link',
					attrs: { rel: 'alternate', type: 'text/plain', href: '/llms.txt', title: 'LLM Context' },
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
						{ label: 'Use Cases', link: '/concepts/use-cases' },
						{ label: 'Security & Privacy', link: '/concepts/security' },
					],
				},
				{
					label: '[lucide:book-open] Guides',
					items: [
						{ label: 'Query Language (LCQL)', link: '/guides/lcql' },
						{ label: 'Discovery & Validation', link: '/guides/discovery-and-validation' },
						{ label: 'Security Best Practices', link: '/guides/security-best-practices' },
						{ label: 'Migrating to Production', link: '/guides/migrating-to-production' },
					],
				},
				{
					label: '[lucide:file-code] Reference',
					items: [
						{ label: 'Authentication', link: '/reference/authentication' },
						{ label: 'AI & Agent Hub', link: '/reference/ai-hub' },
						{ label: 'SDKs & Libraries', link: '/reference/sdks' },
						{ label: 'API Error Codes', link: '/reference/error-codes' },
						{ label: 'System Limits', link: '/reference/limits' },
						{ label: 'Glossary', link: '/reference/glossary' },
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
		sitemap({
			customPages: [
				'https://docs.logtrail.net/openapi',
				'https://docs.logtrail.net/llm',
				'https://docs.logtrail.net/agent',
				'https://docs.logtrail.net/claude',
			],
			filter: (page) => {
				// Exclude raw files with extensions
				const isRawFile =
					page.endsWith('.md') ||
					page.endsWith('.yaml') ||
					page.endsWith('.txt') ||
					page.endsWith('.json') ||
					page.endsWith('.xml');

				return !isRawFile;
			},
		}),
		robots({
			sitemap: 'https://docs.logtrail.net/sitemap-index.xml',
		}),
	],
});
