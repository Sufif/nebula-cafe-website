# NEBULA Café

A responsive café website concept built with React, TypeScript, Vite, Tailwind CSS, GSAP, Three.js and Lenis.

## Run locally

```bash
npm install
npm run dev
```

To preview on a phone connected to the same Wi-Fi as your computer:

```bash
npm run dev -- --host 0.0.0.0
```

Open the `Network` URL printed by Vite on your phone.

## Production build

```bash
npm run build
npm run preview
```

Vite outputs the production site to `dist/`.

## Deploy to Vercel

1. Push this project folder to a GitHub repository.
2. In Vercel, choose **Add New → Project** and import that repository.
3. Keep the detected Vite settings, or use:
   - Framework preset: Vite
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install`
4. Click **Deploy**.

The included `vercel.json` configures the Vite output and SPA fallback routes.

## Demo notice

NEBULA Café is a fictional portfolio concept. Contact details, opening hours, reservations, ordering and checkout are demonstration content unless separately connected to real business services.
