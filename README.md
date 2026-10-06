TK FIREWORKS WEBSITE - CHANGE PACKAGE

This package contains the exact files changed for:
1. Removing displayed mobile numbers and using tkfirework@gmail.com instead.
2. Replacing WhatsApp/mobile contact CTAs with email CTAs.
3. Products page showing only Featured and Trending filters.
4. Removing category labels from product cards/product details.
5. Adding an Instagram Reels link placeholder.
6. Adding clean SEO-friendly routes, dynamic title/meta/canonical tags, Open Graph, Twitter cards and JSON-LD.
7. Adding robots.txt and sitemap.xml.
8. Updating Netlify SPA routing for clean URLs.

HOW TO INSTALL

Copy each file in this package over the same path in your project root.

IMPORTANT:
- The project is changed from HashRouter to BrowserRouter, so URLs become /catalog, /gallery, /product/<id>, etc.
- Deploying on Netlify is supported by the included netlify.toml fallback.
- Replace the Instagram placeholder URL in src/data/config.json if you have a specific reel URL.
- The email used throughout is tkfirework@gmail.com.
- Customer enquiry forms can still ask the visitor for their own phone number; this package removes the company's displayed phone numbers.

SEO FILES
- src/components/SEO.tsx: dynamic SEO for every route + product schema.
- index.html: baseline metadata.
- public/robots.txt: crawler rules.
- public/sitemap.xml: search-engine sitemap.
- netlify.toml: clean-route fallback.

PATCH OPTION
The parent folder also contains tk-fireworks-changes.patch, which is a unified diff against the uploaded original project.

BUILD NOTE
The code was statically checked after editing. A full npm build could not be completed in this environment because the uploaded project had an incomplete node_modules directory (TypeScript/@types/Vite packages were present as empty/incomplete directories). Run `npm ci` or `npm install` locally, then `npm run build`.
