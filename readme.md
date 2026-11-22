# Simbarashe & Rujeko wedding website

A standalone, responsive HTML/CSS/JavaScript wedding website. All photographs are
served from `src/images/`; the source does not include external fonts, trackers,
widgets or photo-CDN dependencies. Netlify adds its own hosting HUD to the live
Free-plan pages. The Get directions button opens the locally hosted
directions picture from the original reference; a separate link opens Google Maps.
The travel-plans form collects names, optional plus-one names and arrival dates,
and accommodation interest through Netlify Forms. Wedding RSVP is intentionally
omitted; submitting travel plans does not make an accommodation booking.

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
The confirmed invitation is **15 August 2027 at 11:30am,
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

## Travel-plans form

The form in `src/index.html` uses native HTML validation and Netlify Forms,
with a hidden honeypot for spam filtering. No JavaScript, browser-only storage,
payment collection or external form account is required. Arrival dates can be
left blank when not yet confirmed. Plus-one names are optional, one per line.
Only the full name and accommodation-interest choice are required.

In the existing Netlify project's **Forms** settings, enable form detection
before deploying the form. After deployment, check that `travel-plans` appears
in Forms. Responses are available there to the project's authorized members;
use **Download CSV** to review all fields, including arrival dates and
accommodation interest. The standard `name` field also identifies the guest in
Netlify's submissions list. Responses are not published in the repository or
on the website. Monitor the Free
plan's usage and limits in Netlify rather than upgrading automatically.

Netlify handles the POST and redirects accepted submissions to
`travel-thanks.html`. Local Python preview and the existing Azure static hosting
do not process these submissions: use the live Netlify website to submit, and
do not treat a local preview as a working backend. Verify new deployments with
a clearly labelled synthetic test response, not real guest information.

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