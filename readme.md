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

Check page navigation and cross-page links with
`python3 -m unittest discover -s tests`.

## Editing wedding details

The welcome page is `src/index.html`. The menu opens separate static pages,
not sections further down the home page: `wedding.html`, `story.html`,
`party.html`, `gallery.html`, `schedule.html`, `travel.html`,
`international.html`, `travel-plans.html`, `gifts.html` and `questions.html`. Edit the relevant page
and the colour/typography variables in `src/styles.css`. Each content page
includes the same navigation with its current page marked; keep those menus
consistent when changing a destination. No router or build step is required.
The confirmed invitation is **15 August 2027 at 11:30am,
The Raintree Venue, Harare, Zimbabwe**, with directions to **1 Langhorn Lane,
Umwinsidale**. Times are local to Harare (UTC+02:00).

The personal story, full schedule, group accommodation/transport arrangements,
bridal party headshots, honeymoon fund, dress code and guest arrangements
are visibly marked as awaiting confirmation. Replace those messages only with
approved information. There is no payment integration or fund collection link.

The supplied SR monogram is edited into `src/images/monogram.png`, with a
transparent background and muted green lettering to match the site. The bridal
party is linked from the story page and includes 12 named cards, including the final
member marked TBC. To add a headshot, save it in `src/images/` and replace that
member's `headshot-placeholder` div with an image using `class="headshot"` and
descriptive alt text; keep the adjacent name heading.

The story page's "A little glimpse of us" and the menu's "Photos" links open
`gallery.html`; the photo grid is not displayed on the home page. The gallery's
back link returns to `story.html`. The home page redirects previously shared
section links such as `/#party` and `/#travel-plans` to their new pages when
JavaScript is available. All new menu links work without JavaScript.

Gallery links open the original local photographs without JavaScript; JavaScript
adds a native modal viewer with previous/next controls, arrow keys and Escape to
close. FAQs use native keyboard-accessible disclosure elements.

## International guest guide

`src/international.html` has Flights, Accommodation, Activities, Restaurants & bars
and Shopping categories. `src/guests.js` enhances the ordinary section links into accessible
tabs, supporting arrow keys, Home/End, direct fragment links and browser history.
Without JavaScript all categories remain visible and linked.

Descriptions are original summaries of the linked venues, checked in November
2026. Confirm routes and venue offerings again before the August 2027 wedding.
Air Zimbabwe's official London announcement confirms its direct Gatwick service;
do not treat published routes as a guarantee of future schedules or prices.
The Johannesburg route includes British Airways and Virgin Atlantic, with an
Airlink onward-flight link. A Skyscanner link lets guests compare flight options.
Wild Is Life advertises wildlife visits and high tea/sundowners, while Bushman
Rock advertises wine-tasting lunches. These are independently booked suggestions,
not organised wedding events or accommodation bookings.
The Accommodation tab currently recommends Manna Resorts in Glen Lorne and
links to its website and the existing accommodation-interest form. More
recommendations are awaiting confirmation; no rooms, rates or group bookings
are promised.

Small local photographic previews are credited to their providers in the guide.
Their sources are Lion Park's game-drive page, Wild Is Life's sanctuary page,
Bushman Rock's day-trip page, Victoria 22's Wine Bar preview on its home page,
and Manna Resorts' home page.
Google and Facebook links are retained for the supplied places whose photos are
viewed on those services; Facebook may require sign-in. There are no embedded
third-party widgets or image requests during normal page loading.

## Travel-plans form

The form in `src/travel-plans.html` uses native HTML validation and Netlify Forms,
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
do not create another project. Upload **all** of `src/`, including every HTML
page. Netlify serves clean page URLs such as `/gallery`, `/party` and
`/travel-plans`, and rewrites the `.html` navigation links accordingly.

### Existing Azure workflow

The existing Azure Static Web Apps workflow serves `./src` directly, with no API
or build output directory. This implementation preserves those settings.
Azure deployment requires the repository's existing Azure deployment secret.
The workflow deploys on pushes to `main` and pull requests targeting `main`;
local preview alone does not deploy anything.