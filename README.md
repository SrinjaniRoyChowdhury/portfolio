# Srinjani's Portfolio

Personal site for **Srinjani Roy Chowdhury** — AI engineer and full-stack developer. A single-page Next.js app with an intro animation, particle backgrounds, and a working contact form.

Live sections: Hero, About, Skills, Projects, Experience, Certificates, Contact.

## Stack

- [Next.js 16](https://nextjs.org/) (App Router) + React 19 + TypeScript
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) and [GSAP](https://gsap.com/) for motion
- [OGL](https://github.com/oframe/ogl) particle background
- [Resend](https://resend.com) for contact emails
- [ExcelJS](https://github.com/exceljs/exceljs) for a local contact spreadsheet

## Getting started

Requires Node.js 20+.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Script        | What it does              |
| ------------- | ------------------------- |
| `npm run dev` | Local development server  |
| `npm run build` | Production build        |
| `npm run start` | Serve the production build |
| `npm run lint`  | ESLint                  |

Copy `.env.example` to `.env.local` and fill in keys. Never commit `.env.local`.

## Customize content

Homepage copy lives in data files, not in the section components. Edit the arrays, refresh the page.

| You want to change | File |
| ------------------ | ---- |
| Projects, certificates, experience | [`lib/content-defaults.ts`](lib/content-defaults.ts) |
| Project categories / filters | [`lib/content-types.ts`](lib/content-types.ts) |
| Skills marquee | [`lib/skills.tsx`](lib/skills.tsx) |
| Inbox email (mailto fallback) | [`lib/contact.ts`](lib/contact.ts) — `CONTACT_EMAIL` |
| Site title and description | [`app/layout.tsx`](app/layout.tsx) |
| Hero photo | `public/assests/mypic.png` and `public/assests/pixelpic.png` |
| Certificate images | `public/certificates/` |

**Projects.** Copy an object in `defaultProjects`. Keep a unique kebab-case `id`. `category` must match a value in `PROJECT_CATEGORIES`. Add `liveUrl` only when the project is deployed. The first three items are featured before “See all”.

**Certificates.** Drop a png or jpg into `public/certificates/`, then add a `cert(id, filename, title)` entry. The marquee picks it up automatically.

**Experience.** Newest role first. One role renders as a card; two or more switch to a timeline.

**Skills.** Add an object to `skills`. If you need a new icon, import it from `react-icons` and register it in `skillIcons`.

## Contact form

`POST /api/contact` validates the payload (name, email, message, honeypot), rate-limits by IP (5 requests / 10 minutes), then tries these in order. The request succeeds if **any** destination works.

1. **Resend email** — if `RESEND_API_KEY` is set
2. **Local spreadsheet** — always attempted (`Portfolio Contact.xlsx`, or CSV fallback)
3. **Google Sheets** — if `GOOGLE_SHEETS_WEBAPP_URL` is set

Local files are gitignored. On Vercel the filesystem is ephemeral, so use Resend and/or Google Sheets in production.

### Environment variables

See [`.env.example`](.env.example). All of these are **server-only** — never prefix them with `NEXT_PUBLIC_`.

| Variable | Required | Purpose |
| -------- | -------- | ------- |
| `RESEND_API_KEY` | For email | API key from the [Resend dashboard](https://resend.com) |
| `RESEND_FROM_EMAIL` | No | Sender. Defaults to Resend’s test address (`onboarding@resend.dev`), which only delivers to your Resend account email. After you verify a domain: `Srinjani <hello@yourdomain.com>` |
| `CONTACT_TO_EMAIL` | No | Inbox. Defaults to `CONTACT_EMAIL` in `lib/contact.ts` |
| `GOOGLE_SHEETS_WEBAPP_URL` | No | Apps Script web app URL (`https://script.google.com/macros/s/.../exec`) |
| `GOOGLE_SHEETS_ID` | No | Spreadsheet ID sent to the webhook if the script is not bound to the sheet |

### Resend (recommended for production)

1. Create an API key at [resend.com](https://resend.com).
2. Put it in `RESEND_API_KEY`.
3. Until you verify a domain, emails only go to the email on your Resend account. Set `CONTACT_TO_EMAIL` to that address, or verify a domain and set `RESEND_FROM_EMAIL`.

### Google Sheets (optional backup)

1. Create a Google Sheet. Open **Extensions → Apps Script**.
2. Paste [`scripts/contact-sheet.gs`](scripts/contact-sheet.gs).
3. Deploy → **Web app**. Execute as yourself, access **Anyone**.
4. Put the web app URL in `GOOGLE_SHEETS_WEBAPP_URL`.

## Project layout

```
app/
  page.tsx              Home (intro + all sections)
  layout.tsx            Fonts, metadata, custom cursor
  api/contact/route.ts  Contact API
  robots.ts             robots.txt
components/             Cursor, intro, particles, project card, buttons
sections/               Navbar, Hero, About, Skills, Projects, Experience, Certificates, Contact
lib/
  content-defaults.ts   Projects, certificates, experience
  content-types.ts      Types and project filters
  skills.tsx            Skills marquee data
  contact.ts            Validation + inbox email
  contact-email.ts      Resend sender
  contact-sheet.ts      Local Excel / CSV
scripts/
  contact-sheet.gs      Google Apps Script for Sheets
  append-contact.cjs    Local Excel append helper
public/
  assests/              Photos and logo
  certificates/         Certificate images
```

## Deploy

Works on [Vercel](https://vercel.com) with the Next.js defaults. Add the env vars in the project settings, then deploy.

For email in production, set `RESEND_API_KEY` (and a verified `RESEND_FROM_EMAIL` when you have a domain). Optionally add `GOOGLE_SHEETS_WEBAPP_URL` so messages are logged even if email fails.
