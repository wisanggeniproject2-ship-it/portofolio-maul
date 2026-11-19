# Wisanggeni Portfolio (Red and Black)

A second take on the portfolio: same content, new layout, red and black. Built with React, Vite, Tailwind CSS v4,
Motion and Lucide icons. Single page, no backend.

## Run it

You need Node.js 20 or newer.

```bash
npm install
npm run dev        # development server, usually http://localhost:5173
npm run build      # production build in /dist
npm run preview    # preview the production build
```

## What you must replace

| What | Where | Notes |
| --- | --- | --- |
| Hero portrait | `public/images/profile.svg` (placeholder) | Add `public/images/profile.webp` (800x1000) and set `photo` in `src/data/profile.js`. |
| About photo | `public/images/about-photo.svg` (placeholder) | Set `aboutPhoto` in `src/data/profile.js`. It is shown in grayscale with a red tint and turns to full color on hover. |
| CV | `public/cv/cv-maulana-arya-wisanggeni.pdf` | Overwrite with your real CV, same file name. |
| Certificates | `public/certificates/*.pdf` + `certificates` in `src/data/profile.js` | Placeholders. Replace the PDFs and edit title, issuer, date and `file`. |
| Skill levels | `src/data/skills.js` | `level` (0 to 100) is a self-assessment shown in the skills wheel. |
| Project screenshots and links | `public/images/projects/*`, `src/data/projects.js` | 16:10 images. `github` and `demo` buttons appear only when set. |
| Status badge | `status` in `src/data/profile.js` | For example `'Open to work'`. Leave `null` to hide it. |
| Education, internship period, LinkedIn | `src/data/profile.js` | Hidden until you fill them in. |

## Where things live

```
src/
  components/   Dock (bottom navigation), Hero, Band, About, Skills (wheel), Projects (index list + browser preview),
                GithubRepos, Experience (+ certificates), Contact, LetsWork, Footer
                + shared pieces (Button, Badge, Reveal, Tilt, CountUp, Marquee...)
  data/         profile.js, projects.js, skills.js  
  hooks/        useTypewriter, useActiveSection
  utils/        asset.js, spotlight.js
  index.css     Tailwind import, color tokens (@theme) and animation helpers
```

## Colors and fonts

All colors are tokens at the top of `src/index.css` (`--color-primary` is the red). The token names were kept from
the blue version, so changing a value re-themes the whole site. Fonts: Syne (headings) and DM Sans (text), loaded from Google Fonts in `index.html`.

## Notes

- "More on GitHub" loads public repositories live from the GitHub API using the username in `contact.github`.
  If the request fails (offline, rate limit), the section shows a link to your GitHub instead.
- The hero name resizes itself to fit the screen (`useFitName` in `Hero.jsx`).
- The contact section has no form: email (with a copy button), WhatsApp, GitHub and Instagram cards.
- Animation respects "reduce motion" settings (`MotionConfig` in `App.jsx`, plus CSS).
- Deploy: Vercel or Netlify (build `npm run build`, output `dist`), or publish `dist` to GitHub Pages
  (`base: './'` in `vite.config.js` keeps paths working in a sub-folder).
