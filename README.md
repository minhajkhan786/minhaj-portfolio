# Minhaj Khan Portfolio

Premium personal portfolio built with Next.js, React, TypeScript, Tailwind CSS, Framer Motion, GSAP, Lucide and EmailJS.

## Run locally

Install Node.js 20 or newer, then run:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Contact form

Copy `.env.example` to `.env.local` and provide EmailJS values. Without those values, the form uses the visitor's email client as a working fallback.

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=public_xxx
```

The EmailJS template should accept `from_name`, `reply_to`, `to_email`, `project_type`, and `message`. Configure its recipient as `{{to_email}}` so enquiries are delivered to the portfolio email address.

## Temporary content

Update contact links and the temporary public email in `data/portfolio.ts`. Project store URLs and screenshots can be added to the same project entries. The supplied resume is available at `public/Minhaj_Resume.pdf`.
