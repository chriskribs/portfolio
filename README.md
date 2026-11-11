# chriskribs.com

Portfolio site for Chris E. Kribs. Plain HTML/CSS/JS in `public/`, served as static assets by the `portfolio` Cloudflare Worker. Every push to `main` deploys.

- Content (projects, captions, order) lives at the top of `public/app.js`.
- Images in `public/media/i`, web-encoded video in `public/media/v` (keep each file under 25 MB).
- `robots.txt` and the `noindex` meta tag keep it out of search until launch; remove both when the domain goes live.
