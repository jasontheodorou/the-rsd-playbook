import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// Replace %SITE_URL% in index.html with the absolute origin of this deploy.
// Link-preview crawlers (Slack et al.) will not resolve a relative og:image,
// so the tags need a real origin baked in at build time.
//
// Vercel sets VERCEL_PROJECT_PRODUCTION_URL on every build; preview deploys
// still point their card at the production origin, which is what you want —
// the image is identical and production never 404s.
function ogUrl(): Plugin {
  const site =
    process.env.SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL &&
      `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
    'http://localhost:3014'

  return {
    name: 'og-url',
    transformIndexHtml: (html) => html.replaceAll('%SITE_URL%', site.replace(/\/$/, '')),
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), ogUrl()],
  server: { port: 3014 },
})
