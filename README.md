# Premium Full Stack Developer Portfolio

A modern, high-converting personal portfolio website built with **Next.js**, **React**, **Tailwind CSS**, and **Framer Motion**. Features a project showcase, case study pages, contact form, and a protected admin dashboard for managing projects.

## Features

- **Premium dark theme** with gradients, glassmorphism, and smooth animations
- **Fully responsive** — mobile, tablet, and desktop
- **SEO optimized** with meta tags and Open Graph support
- **Project portfolio** with category filters and case study pages
- **Admin dashboard** — add, edit, delete projects with image upload
- **Flexible storage** — JSON file (default) or MongoDB
- **Contact form** with WhatsApp, email, LinkedIn, and GitHub links
- **Loading animation** and custom **404 page**

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS 4 |
| Animations | Framer Motion |
| Icons | Lucide React |
| Auth | JWT (jose) + HTTP-only cookies |
| Database | JSON file or MongoDB (optional) |

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Clone or navigate to the project
cd potfoliyo

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Edit `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
ADMIN_EMAIL=admin@portfolio.com
ADMIN_PASSWORD=your-secure-password
ADMIN_JWT_SECRET=generate-a-random-secret-string

# Optional — use MongoDB instead of JSON file
# MONGODB_URI=mongodb+srv://...
```

## Customization

### Personal Info

Update `src/lib/constants.ts`:

- Name, role, headline, bio
- Email, phone, WhatsApp, LinkedIn, GitHub
- Skills, services, testimonials
- Work process steps

### Projects

**Option 1 — Admin Dashboard**

1. Go to `/admin/login`
2. Sign in with your admin credentials
3. Add, edit, or delete projects via the dashboard

**Option 2 — Edit JSON directly**

Edit `data/projects.json` with your project data.

### Profile Image

Replace the Unsplash URL in `src/components/sections/About.tsx` with your own image (local path in `/public` or external URL).

## Project Structure

```
potfoliyo/
├── data/
│   ├── projects.json      # Project data (default storage)
│   └── contacts.json        # Contact form submissions
├── public/
│   ├── uploads/             # Admin-uploaded images
│   └── grid.svg
├── src/
│   ├── app/
│   │   ├── admin/           # Admin login & dashboard
│   │   ├── api/             # REST API routes
│   │   ├── projects/[slug]/ # Project detail pages
│   │   ├── layout.tsx
│   │   ├── page.tsx         # Homepage
│   │   ├── loading.tsx
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── admin/           # Admin form & list
│   │   ├── layout/          # Navbar, Footer
│   │   ├── projects/        # Project cards & filters
│   │   ├── sections/        # Homepage sections
│   │   └── ui/              # Reusable UI components
│   ├── lib/
│   │   ├── auth.ts          # JWT authentication
│   │   ├── constants.ts     # Site content
│   │   ├── db.ts            # MongoDB connection
│   │   ├── projects.ts      # Project CRUD
│   │   └── utils.ts
│   └── types/
│       └── project.ts       # Project schema
└── .env.example
```

## Project Schema

```typescript
interface Project {
  id: string;
  slug: string;
  name: string;
  category: ProjectCategory;
  shortDescription: string;
  description: string;
  image: string;
  gallery: string[];
  techStack: string[];
  liveUrl: string;
  featured: boolean;
  clientNiche: string;
  role: string;
  features: string[];
  challenges: string;
  solutions: string;
  createdAt: string;
  updatedAt: string;
}
```

## Admin Dashboard

| Route | Description |
|-------|-------------|
| `/admin/login` | Admin sign-in |
| `/admin/dashboard` | Manage projects |

Default credentials (change in `.env.local`):

- **Email:** `admin@portfolio.com`
- **Password:** `changeme123`

## API Routes

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/projects` | Public | List all projects |
| POST | `/api/projects` | Admin | Create project |
| GET | `/api/projects/[id]` | Public | Get project by ID |
| PUT | `/api/projects/[id]` | Admin | Update project |
| DELETE | `/api/projects/[id]` | Admin | Delete project |
| POST | `/api/auth/login` | Public | Admin login |
| POST | `/api/auth/logout` | Public | Admin logout |
| GET | `/api/auth/me` | Public | Check auth status |
| POST | `/api/contact` | Public | Submit contact form |
| POST | `/api/upload` | Admin | Upload project image |

## MongoDB (Optional)

To use MongoDB instead of the JSON file:

1. Set `MONGODB_URI` in `.env.local`
2. Restart the dev server
3. Projects will be stored in the `projects` collection

On first run with MongoDB, import existing data from `data/projects.json` via the admin dashboard or a migration script.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repo on [vercel.com](https://vercel.com)
3. Add environment variables in Project Settings
4. Deploy

**Note:** On Vercel, the JSON file storage is read-only in production. For persistent project edits, use MongoDB or redeploy after changes.

### Other Platforms

```bash
npm run build
npm start
```

Works on Netlify, Railway, Render, and any Node.js host.

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## License

MIT — use freely for your personal portfolio.
