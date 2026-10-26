# Third Coast - website source

I keep the portable Third Coast website here so I can maintain the preview and move it to another host later. The site is plain HTML, CSS and JavaScript with local assets; it has no build step, backend, API key or package dependency.

## Preview and hosting

- Live GitHub preview: https://kieronhaynes38-king.github.io/third-coast-wingery/
- Repository: https://github.com/kieronhaynes38-king/third-coast-wingery
- I can run `python3 -m http.server 4173` in this folder and open `http://localhost:4173`.
- GitHub Pages serves `main` from the repository root. `.nojekyll` keeps the static assets intact.
- On a conventional web host, I can upload `index.html`, `styles.css`, `app.js`, `.nojekyll` and `assets/` to the site's public document root. A GoDaddy hosting plan that supports static files can serve this copy. Domain registration alone is not web hosting.
- Squarespace uses its own editor and does not directly import this complete layout. I retain this independent source as a migration backup; it is not a full export of Squarespace's editor or platform.

## Current preview

I use the owner's official menu item names and the supplied $2.50 loaded-fries and $3.50 swamp-fries basket upgrades. Base prices and the six-wing serving are proposed samples, not approved retail pricing. The page labels those clearly. Recipes and final portions remain subject to approval.

I removed the original exterior rendering, desserts and previous stock-food images from the current website. The homepage uses the new interior concept. The brand copy welcomes everybody and describes nationwide growth as an ambition rather than an existing footprint.

The email `hello@thirdcoast.example` and phone `(504) 555-0136` are demonstration details. Their buttons open an explanatory preview; they do not send email or place calls. Ordering does not accept purchases, payments or personal information. The location and opening date remain unannounced.

## Artwork and assistance

The owner supplied the AI interior, lounge, patio/stage and sign concepts (`interior.jpg`, `lounge.jpg`, `stage.jpg`, `sign.jpg`). The five food spreads and diverse group-dining scene were created using OpenAI's built-in image-generation tool on October 25, 2026 with AI assistance. They are illustrative concepts, not actual restaurant, customer or dish photographs. Sauce appearance and the swamp-roll filling are visual interpretations, not finalized recipes. The imagery background is documented here; menu images use a short illustrative-image note without AI labels.

I used AI assistance for website implementation and document preparation. Anton and DM Sans are included with their font licenses. The small vinyl icon is an SVG/CSS graphic.

## Checks

The JavaScript syntax check passed. Browser checks covered the menu category buttons, arrow-key category changes, the navigation drawer, ordering and contact preview messages, Escape dismissal and focus return. Desktop and mobile layouts were reviewed before deployment.

## Before opening

I need owner approval for base prices, portions, recipes, final imagery, actual contact details, location, opening hours and online ordering. I will replace the testing contact information and connect real ordering only when the owner is ready.

No account passwords, domain authorization codes, invoices or customer data belong in this public repository.

I added the additional wing-plate image supplied on October 25, 2026 (`wings-plate.jpg`) alongside the existing seven-flavor spread. I have not independently verified how this supplied image was made.

I use the supplied Third Coast logo sheet in the header and footer. CSS crops its display to the logo region while preserving the original image file.
