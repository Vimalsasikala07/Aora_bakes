# Aora Bakes — React Website

A modern responsive cake-shop website built with React + Vite.

## Features
- Home, Our Cakes, About, and Contact pages
- Responsive mobile navigation
- Cake cards with image zoom + hover overlay
- WhatsApp ordering buttons
- WhatsApp number configured as: +91 93455 06095
- Responsive design for mobile, tablet, and desktop

## Run the project

1. Install Node.js (LTS).
2. Open a terminal in this project folder.
3. Run:

```bash
npm install
npm run dev
```

4. Open the local URL shown by Vite, usually:
http://localhost:5173

## Build for production

```bash
npm run build
```

## Important
The demo cake photos are loaded from Unsplash URLs, so an internet connection is needed to display them.

You can replace the image URLs in `src/App.jsx` with your own cake photos.

## Change shop details
- WhatsApp number: `WHATSAPP_NUMBER` in `src/App.jsx`
- Shop address: Contact page in `src/App.jsx`
- Instagram link: Footer in `src/App.jsx`
- Cake names/prices/images: `cakes` array in `src/App.jsx`
