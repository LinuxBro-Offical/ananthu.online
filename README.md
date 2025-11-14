# Mango Glow Portfolio — Full Stack Digital Experience

Ananthu S Kumar’s cinematic portfolio combines a Vite + React front-end with a reusable Django REST backend. Every on-page element (navigation, hero, skills, projects, testimonials, contact, resumes, footer) is editable through Django admin and delivered via typed APIs consumed by the React app.

---

## 1. Project Structure

```
ananthu-online/
├── .gitignore
├── README.md                # This document
├── backend/                 # Django project (REST API + admin)
│   ├── backend/             # Settings, URL routing
│   ├── content/             # Domain models, serializers, viewsets, seed command
│   ├── env/                 # Python virtual environment (ignored in git)
│   ├── media/               # Uploaded assets (ignored in git)
│   ├── manage.py
│   └── requirements.txt
└── src/                     # Vite + React front-end
    ├── assets/              # Static imagery and textures
    ├── components/          # UI components (Hero, Projects, Skills, etc.)
    ├── hooks/               # React Query wrapper (`usePortfolioContent`)
    ├── lib/                 # API helper (`src/lib/api.ts`)
    ├── pages/               # Application routes
    └── index.css            # Global Tailwind layer
```

---

## 2. Prerequisites

| Tool            | Version / Note                             |
|-----------------|---------------------------------------------|
| Node.js         | ≥ 18.18.0 (Vite requirement)                |
| npm             | ≥ 9 (ships with Node ≥18)                   |
| Python          | ≥ 3.10                                      |
| pip / venv      | For backend dependency management           |

---

## 3. Backend Setup (Django + DRF)

```bash
cd backend
python3 -m venv env
source env/bin/activate              # Windows: env\Scripts\activate
pip install -r requirements.txt

# Optional: configure environment variables
cp .env.example .env                 # create if needed, adjust settings

# Database + seed content
./env/bin/python manage.py migrate
./env/bin/python manage.py createsuperuser   # optional for admin access
./env/bin/python manage.py seed_portfolio --reset

# Start API server
./env/bin/python manage.py runserver 0.0.0.0:8000
```

**Seed Command Highlights**
- Site/hero copy + CTA behaviour (modal, scroll, or external URL)
- Navigation structure
- About section content, highlights, imagery
- Skills categories with technology logos (supports URL or uploaded images)
- Projects with technology tags, live/code links, gallery images
- Testimonials, social links, footer copy
- Placeholder PDFs for professional & ATS resumes

`seed_portfolio` supports `--reset` to wipe existing content before reseeding. Without `--reset`, it upserts values idempotently.

---

## 4. Front-end Setup (Vite + React)

```bash
npm install

# Configure API origin for the React app
cp .env.example .env.local            # create if missing
# Example .env.local
# VITE_BACKEND_URL=http://127.0.0.1:8000

npm run dev                           # http://localhost:5173 by default
```

`src/lib/api.ts` reads `VITE_BACKEND_URL` (preferred). For backwards compatibility it also accepts `VITE_API_BASE_URL` ending in `/api`. The API helper appends `/api/portfolio/` automatically.

---

## 5. API Reference

All endpoints live under `/api/`. Responses are JSON; authentication is not required (read-only).

### `GET /api/portfolio/`
Aggregated payload used by the React front-end. Includes:
- `site`: hero + CTA configuration, WhatsApp/Calendly links, contact details.
- `navigation`: ordered array of links (`label`, `target`, `is_external`).
- `about`: heading, subtitle, description, highlights, profile image.
- `skills`: categories with nested skills (logos served as absolute URLs).
- `projects`: includes gradients, description, live link, `code_url`, technology chips, and `gallery` images (absolute URLs).
- `testimonials`, `social_links`, `footer`, `resumes`.

### Individual Endpoints

| Endpoint                  | Description                                                      |
|---------------------------|------------------------------------------------------------------|
| `GET /api/site-settings/` | Site branding, hero copy, CTA behaviours, contact links          |
| `GET /api/navigation/`    | Navigation items with order and internal/external flag           |
| `GET /api/about/`         | About section, highlights, profile imagery                       |
| `GET /api/skills/`        | Skill categories, each with ordered skills                       |
| `GET /api/projects/`      | Projects with tech stack, `code_url`, `live_url`, gallery images |
| `GET /api/testimonials/`  | Testimonials (author, role, quote)                               |
| `GET /api/social/`        | Contact/social links with Lucide icon identifiers                |
| `GET /api/resumes/`       | Downloadable resume URLs (professional / ATS)                    |
| `GET /api/footer/`        | Footer text + tagline                                            |
| `POST /api/contact-messages/` | Store contact form submissions (rate limited per IP)        |

**Notes**
- All image/file fields are returned as absolute URLs when a request context is available.
- Gallery images originate from the `ProjectImage` model; manage them via admin.
- Resume download links map to the files uploaded in Django admin.

---

## 6. Managing Content via Admin

1. Start the backend (`manage.py runserver`) and navigate to `/admin/`.
2. Update any model instance (Site Settings, Navigation Link, Skill Category, Project, etc.).
3. Upload gallery images, technology logos, and resume PDFs directly in admin.
4. Front-end auto-refreshes on reload thanks to React Query caching (stale time 5 minutes).
5. Contact form submissions are visible in **Contact messages** (read-only records with IP + timestamps).

**Adding Projects**
- Provide gradient colours, live URL, GitHub (`code_url`), and descriptive copy.
- Upload gallery images inlined via the Project’s gallery in admin.
- Tech stack entries automatically surface as tags and in the gallery modal.

---

## 7. Contact Capture & Rate Limiting

- Submitting either the “Hire Me” modal or the Contact section form issues a `POST` request to `/api/contact-messages/`.
- The payload captures `name`, `email`, `project`, and `message`; the backend automatically records the client IP and timestamps.
- Each IP can submit up to **3 messages per 24 hours**. Additional attempts receive HTTP 429 with a friendly error.
- Messages surface in Django admin under **Contact messages**, so you can reply manually or hook up automations later.

---

## 8. Scripts & Tooling

| Command                                           | Purpose                                           |
|---------------------------------------------------|---------------------------------------------------|
| `npm run dev`                                     | Start Vite development server                     |
| `npm run build`                                   | Production build                                  |
| `npm run lint`                                    | Run ESLint                                        |
| `./env/bin/python manage.py runserver`            | Start Django REST backend                         |
| `./env/bin/python manage.py seed_portfolio --reset` | Reseed portfolio content                        |
| `./env/bin/python manage.py test`                 | (Optional) Run Django tests                       |
| `deploy/scripts/cleanup_frontend.sh`              | (Prod branch) remove frontend source, keep `dist` |

---

## 9. Deployment Notes

- **Frontend**: `npm run build` outputs static assets in `dist/`. Serve via CDN or static hosting (Vercel, Netlify, CloudFront, etc.).
- **Backend**: Deploy Django behind Gunicorn/Uvicorn + Nginx (or similar). Configure environment variables (`DEBUG`, `ALLOWED_HOSTS`, `DATABASE_URL`, `MEDIA_ROOT`).
- **Media**: Move media uploads to cloud storage (S3, GCS) in production; update `MEDIA_URL` and storage backend accordingly.
- **Security**: Generate a strong `SECRET_KEY`, toggle `DEBUG=False`, configure `CORS_ALLOWED_ORIGINS`, and enforce HTTPS.

---

## 10. Extensibility

- Add new content blocks by creating a model + serializer + viewset in `backend/content`.
- Use `usePortfolioContent` or create additional React Query hooks for new endpoints.
- The 3D/animation layers (Three.js, GSAP, Framer Motion) are modular—enhance or disable per section.
- Resume modal & CTA logic already support additional variants (e.g., Calendly, WhatsApp, email).

---

## 11. License & Credits

This project is proprietary to **Ananthu S Kumar**. Please request permission before reuse.  
Design & engineering inspired by cinematic UI/UX principles, Mango Glow theme by Ananthu S Kumar.

For inquiries or collaborations:
- Portfolio: https://ananthu.online
- WhatsApp: https://wa.me/917012474027

---

Happy shipping! 🍋✨
