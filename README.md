# Clearline Home Inspections — website

Static multi-page site for GitHub Pages. No build step needed to host: every file in this folder is served as-is.

## Change the company name, phone, email or booking link
Edit the `BRAND` object at the top of `site.js`. Every page reads from it.
(Page `<title>` tags and the visible fallback text also contain the name; a find-and-replace of the old name across the folder finishes the job.)

## Add certification badges
Put the badge image in `badges/` and add a `.cred` block in `about.html` (there is a commented example).

## Booking calendar
Create a free Calendly event, paste its link into `BRAND.booking` in `site.js`, and the calendar appears on `book.html`.

## Forms
Forms open the visitor's email app addressed to `BRAND.email`. To receive form posts without email, swap the form `action` for a Formspree endpoint.

## Custom domain
Repo Settings → Pages → Custom domain, then add the DNS records GitHub shows at your registrar.
