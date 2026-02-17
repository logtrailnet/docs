# Logtrail Documentation Hub 🚀

> The high-performance, AI-friendly logging platform for modern engineering teams.

This repository houses the official documentation for [Logtrail](https://app.logtrail.net), including guides, core concepts, and the interactive API Reference.

**Live Documentation**: [docs.logtrail.net](https://docs.logtrail.net)

---

## 🛠 Tech Stack

- **[Starlight](https://starlight.astro.build/)**: Professional documentation framework built on Astro.
- **[Scalar](https://scalar.com/)**: Modern, interactive API reference rendering.
- **[Ion Theme](https://github.com/louisescher/starlight-ion-theme)**: A sleek, modern theme for Starlight with built-in icon support.
- **[Cloudflare Pages](https://pages.cloudflare.com/)**: Blazing fast global hosting and edge delivery.

## 🤖 AI & Agent Readiness

Logtrail is built for the AI era. This documentation hub provides structured metadata to ensure vibe coding tools and AI agents can integrate Logtrail into any project seamlessly:

- **`llms.txt`**: A technical roadmap for LLMs.
- **`AGENTS.md`**: Specialized technical instructions for agentic ingestion and querying.
- **`claude.md`**: XML-optimized context for Anthropic's Claude.

## 🚀 Development

### Prerequisites

- **Node.js**: `v24.13.1` or later.
- **npm**: `v10` or later.

### Commands

| Command | Action |
| :--- | :--- |
| `npm install` | Install dependencies. |
| `npm run dev` | Start local development server at `localhost:4321`. |
| `npm run build` | Build the static site to `./dist/`. |
| `npm run preview` | Preview the production build locally. |

## 📁 Project Structure

```text
.
├── public/             # Static assets (Favicons, openapi.yaml, llms.txt)
├── src/
│   ├── assets/         # Images and branded assets
│   ├── content/        # Markdown/MDX guides and concepts
│   └── pages/          # Custom Astro pages (API Reference)
├── astro.config.mjs    # Starlight & Sidebar configuration
└── wrangler.jsonc      # Cloudflare Pages deployment settings
```

## 🤝 Contributing

We welcome improvements to our documentation! 

1. **Bug Fixes**: If you find a typo or a technical error, feel free to open a Pull Request.
2. **New Content**: For significant additions, please open an Issue first to discuss the scope.
3. **API Updates**: The API reference is generated from `public/openapi.yaml`. Ensure any changes here reflect the latest [backend](https://github.com/logtrailnet/backend) implementation.

---

<center>
  © 2026 Logtrail. Built with ❤️ for developers and machines.
</center>
