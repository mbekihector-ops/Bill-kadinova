BILL KADINOVA — NEW WEBSITE STARTER

FILES
1. index.html  — website structure
2. style.css   — visual design and responsive layout
3. script.js   — 50 card designs per event category, personalization, image generation, download and sharing

HOW TO OPEN
- Keep all three files together in one folder.
- Open index.html in a modern browser to preview.
- For public invitation links and reliable sharing, publish the folder on a web host (for example GitHub Pages).
- When uploading to GitHub, upload index.html, style.css and script.js to the same repository root. The homepage file must be named exactly index.html.

CURRENT CONTENT
- 8 event categories: Wedding, Graduation, Birthday, Baby Shower, Send-off, Engagement, Anniversary and Kitchen Party.
- 50 generated design variations per category (400 total catalog entries). Variations are built from palettes, borders, symbols and layout patterns; they are template variations, not 400 individually hand-drawn image files.
- Personalization: names, date, time, venue, message and card language.
- Price display tiers: Free, TSh 5,000, TSh 10,000, TSh 20,000.
- Download card as PNG; share image and invitation link when browser supports sharing files.
- QR-like visual mark is decorative only; it is not a scannable QR code.

IMPORTANT LIMITATIONS
- This is a fresh front-end prototype. Firebase Authentication, database storage, paid checkout/mobile money integrations, guest RSVP storage, reminders, and real QR-code generation have NOT been connected yet.
- The invitation data is encoded in the link itself, not stored in Firebase. Long links may be less convenient; a production system should save invitations in a database and use a short unique URL.
- Prices are labels for the prototype. Selecting a paid tier does not charge the user.
- The site uses Google Fonts from the internet; local fallback fonts will be used if offline.
