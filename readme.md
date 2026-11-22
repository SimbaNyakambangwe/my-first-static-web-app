# Simbarashe & Rujeko wedding website

A standalone, responsive HTML/CSS/JavaScript wedding website. All photographs are
served from `src/images/`; the source does not include external fonts, trackers,
widgets or photo-CDN dependencies. Netlify adds its own hosting HUD to the live
Free-plan pages. The Get directions button opens the locally hosted
directions picture from the original reference; a separate link opens Google Maps.
No guest data is collected, and RSVP is intentionally omitted.

## Local preview

With Python 3 installed:

```sh
python3 -m http.server 8000 --bind 127.0.0.1 --directory src
```

Open http://127.0.0.1:8000. `npm start` runs the same command if Node/npm are
available. No dependency installation or build step is required.

## Editing wedding details

Edit the wedding sections in `src/index.html`, the separate photo gallery in
`src/gallery.html`, and the colour/typography variables in `src/styles.css`.
The confirmed invitation is **15 August 2027 at 11:00am,
The Raintree Venue, Harare, Zimbabwe**, with directions to **1 Langhorn Lane,
Umwinsidale**. Times are local to Harare (UTC+02:00).

The personal story, full schedule, accommodation/transport recommendations,
bridal party headshots, honeymoon fund, dress code and guest arrangements
are visibly marked as awaiting confirmation. Replace those messages only with
approved information. There is no payment integration or fund collection link.

The supplied SR monogram is edited into `src/images/monogram.png`, with a
transparent background and muted green lettering to match the site. The bridal
party follows the love story and includes 12 named cards, including the final
member marked TBC. To add a headshot, save it in `src/images/` and replace that
member's `headshot-placeholder` div with an image using `class="headshot"` and
descriptive alt text; keep the adjacent name heading.

The home page's "A little glimpse of us" and "Photos" links open `gallery.html`;
the photo grid is not displayed on the home page. The gallery's navigation and
back links return to the wedding page and its sections.

Gallery links open the original local photographs without JavaScript; JavaScript
adds a native modal viewer with previous/next controls, arrow keys and Escape to
close. FAQs use native keyboard-accessible disclosure elements.

## Hosting

### Live Netlify website

The public website is https://simbaandrujeko.netlify.app/ on Netlify's Free plan.
It was deployed by uploading the contents of `src/`, with `index.html` at the
upload root. No build step is required.

This is a **manual upload**, not a Git-connected deployment. Pushing commits to
GitHub does not update this Netlify website. Publish an updated upload through
the existing `simbaandrujeko` project's Netlify dashboard to update the live site;
do not create another project. Netlify serves the gallery at `/gallery` and
rewrites the `.html` navigation links accordingly.

### Existing Azure workflow

The existing Azure Static Web Apps workflow serves `./src` directly, with no API
or build output directory. This implementation preserves those settings.
Azure deployment requires the repository's existing Azure deployment secret.
The workflow deploys on pushes to `main` and pull requests targeting `main`;
local preview alone does not deploy anything.