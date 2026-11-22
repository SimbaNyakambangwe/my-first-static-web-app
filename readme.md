# Simba & Rujeko wedding website

A standalone, responsive HTML/CSS/JavaScript wedding website. All photographs are
served from `src/images/`; there are no external fonts, trackers, widgets or
photo-CDN dependencies. The directions link opens Google Maps only when selected.
No guest data is collected, and RSVP is intentionally omitted.

## Local preview

With Python 3 installed:

```sh
python3 -m http.server 8000 --bind 127.0.0.1 --directory src
```

Open http://127.0.0.1:8000. `npm start` runs the same command if Node/npm are
available. No dependency installation or build step is required.

## Editing wedding details

Edit the semantic sections in `src/index.html` and the colour/typography variables
in `src/styles.css`. The confirmed invitation is **15 August 2027 at 11:00am,
The Raintree Venue, Harare, Zimbabwe**, with directions to **1 Langhorn Lane,
Umwinsidale**. Times are local to Harare (UTC+02:00).

The personal story, full schedule, accommodation/transport recommendations,
wedding party introductions, honeymoon fund, dress code and guest arrangements
are visibly marked as awaiting confirmation. Replace those messages only with
approved information. There is no payment integration or fund collection link.

Gallery links open the original local photographs without JavaScript; JavaScript
adds a native modal viewer with previous/next controls, arrow keys and Escape to
close. FAQs use native keyboard-accessible disclosure elements.

## Hosting

The existing Azure Static Web Apps workflow serves `./src` directly, with no API
or build output directory. This implementation preserves those settings.
Deployment still requires the repository's existing Azure deployment secret.
The workflow deploys on pushes to `main` and pull requests targeting `main`;
local preview alone does not deploy anything.