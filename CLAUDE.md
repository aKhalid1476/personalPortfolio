# CLAUDE.md

## Project Overview

This is a minimalist, typography-first personal portfolio.

The design philosophy:
- Elegant serif hero typography
- Dark gradient background
- Soft hover animations
- High signal-to-noise ratio
- Personal + intellectual presence
- Calm, intentional, premium aesthetic

This site is not a SaaS dashboard.  
It is a digital presence.

Claude should prioritize:
- Clean structure
- Excellent spacing
- Performance
- Accessibility
- Subtle animation (never distracting)
- Typography over UI chrome

---

# Tech Stack

- Next.js (App Router)
- TypeScript
- TailwindCSS
- MDX (for writing section)
- Framer Motion (micro animations only)
- Vercel deployment

---

# Global Design System

## 1. Layout Principles

- Max width: `max-w-4xl`
- Generous vertical spacing (`py-24`, `space-y-12`)
- No harsh borders
- Soft separators (`border-white/10`)
- Rounded images (`rounded-2xl`)
- Subtle hover transitions (`transition-all duration-300 ease-out`)

---

## 2. Typography Rules

### Hero Name
- Serif font (e.g., Playfair, Cormorant, or custom)
- `text-6xl md:text-7xl`
- `tracking-tight`
- Slight letter breathing
- High contrast

### Body
- Sans-serif
- `text-base md:text-lg`
- `leading-relaxed`
- `text-white/70`

### Section Headers
- Lowercase styling preferred
- `text-xl`
- `text-white/90`

Claude must:
- Never overuse bold
- Use weight hierarchy instead of size jumps
- Maintain a premium editorial feel

---

## 3. Color System

### Background
- Radial or gradient dark blend  
- Example: `bg-gradient-to-br from-zinc-900 via-neutral-900 to-black`

### Text
- Primary: `text-white`
- Secondary: `text-white/70`
- Muted: `text-white/50`

### Hover
- Slight brightness increase
- Slight upward translate (`hover:-translate-y-1`)
- No flashy color shifts

---

# Page Structure

## 1. Hero Section

Contains:
- Avatar (rounded square or circle)
- Large name
- Small descriptor line
- Soft hover hint ("hover here ←")

Claude should:
- Keep hero compact but dominant
- Avoid stacking too vertically
- Align avatar + name horizontally on desktop
- Stack cleanly on mobile

---

## 2. Bio Section (Bullet Narrative)

This section uses:
- Arrow bullets (↳ or similar)
- Tight but readable spacing
- Selective bold for emphasis

Claude should:
- Keep bullets readable
- Highlight achievements subtly
- Avoid resume formatting
- Keep it narrative, not corporate

---

## 3. Writing Section

Structure:
- Section header
- Simple list of essays
- Each entry:
  - Title
  - Hover animation
  - Understated design

Claude must:
- Not over-card this
- Keep it text-dominant
- Use subtle underline or opacity hover

---

## 4. Scenes From My Life

Grid of images:
- 4 columns desktop
- 2 columns tablet
- 1 column mobile
- Rounded corners
- Slight hover zoom
- Optional grayscale → color hover

Claude must:
- Optimize images
- Use `next/image`
- Lazy load
- Avoid layout shift

---

# Animation Guidelines

Allowed:
- Fade in on load
- Slight translateY
- Soft scale on hover
- Opacity transitions

Not allowed:
- Bounce
- Large transforms
- Over-animated UI
- Anything distracting from typography

Framer Motion should:
- Animate sections sequentially
- Use subtle easing
- Keep durations under 0.5s

---

# Performance Requirements

Claude must:
- Use `next/image`
- Avoid large client components
- Minimize JavaScript
- Prefer server components where possible
- Keep Lighthouse score > 95

Avoid:
- Heavy animation libraries
- Unnecessary state
- Over-rendering

---

# Accessibility

- All images must have alt text
- Maintain strong contrast
- Keyboard navigable
- Proper heading hierarchy (`h1 → h2 → h3`)
- No div-only clickable elements

---

# Folder Structure
/app
layout.tsx
page.tsx
writing/
[slug]/page.tsx
/components
Hero.tsx
Bio.tsx
WritingList.tsx
LifeGrid.tsx
/content
writing/ (MDX files)
/lib
mdx.ts
/public
images/


---

# Writing Section Rules

MDX files should:
- Contain title
- Contain description
- Export metadata
- Use clean prose formatting

Claude should never:
- Inject heavy UI components inside essays
- Add unnecessary visual styling to writing pages

Writing pages must feel:
- Like a calm blog
- Wide margins
- Comfortable reading width
- Serif headings
- Sans-serif body

---

# Code Style Rules

- Strict TypeScript
- Functional components only
- No default exports for utilities
- Use named exports
- Use className merging utility if needed
- Keep components under 200 lines
- Extract repeated UI patterns

---

# Future Enhancements (Optional)

- Dark/light theme toggle (subtle)
- Soft background animation (very subtle gradient drift)
- View transitions between pages
- Minimal analytics

Only if:
It does not compromise minimalism.

---

# Light / Dark Mode Styling

This site supports both dark and light themes via a `dark` class on `<html>`. Tailwind's `dark:` variant controls dark mode styles.

## Core Rule

**Never use bare `white/*` opacity utilities without a light mode counterpart.** Always pair them with explicit light mode classes.

## Token Pairs

Use these paired patterns consistently across all components:

### Backgrounds
| Purpose | Light | Dark |
|---|---|---|
| Primary bg | `from-zinc-50 via-neutral-100 to-white` | `dark:from-zinc-900 dark:via-neutral-900 dark:to-black` |
| Card / surface | `bg-white/70` | `dark:bg-zinc-800/40` |
| Subtle fill | `bg-zinc-100` | `dark:bg-white/[0.08]` |
| Input / tag bg | `bg-zinc-100` | `dark:bg-white/5` |
| Icon button hover | `hover:bg-zinc-100` | `dark:hover:bg-white/10` |

### Borders
| Purpose | Light | Dark |
|---|---|---|
| Default border | `border-zinc-200/70` | `dark:border-white/[0.08]` |
| Subtle border | `border-zinc-300` | `dark:border-white/15` |
| Separator | `bg-zinc-300` | `dark:bg-white/15` |

### Text
| Purpose | Light | Dark |
|---|---|---|
| Primary | `text-zinc-900` | `dark:text-white` |
| Secondary | `text-zinc-600` | `dark:text-white/75` |
| Muted | `text-zinc-500` | `dark:text-white/55` |
| Very muted | `text-zinc-400` | `dark:text-white/40` |
| Icon / decorative | `text-zinc-500` | `dark:text-white/60` |

### Interactive elements (buttons, links, icon buttons)
```
// Pill / ghost button
text-zinc-700 bg-zinc-100 border border-zinc-300 hover:bg-zinc-200 hover:text-zinc-900
dark:text-white/90 dark:bg-white/8 dark:border-white/20 dark:hover:bg-white/[0.14] dark:hover:text-white

// Icon button (circular)
border border-zinc-300 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900
dark:border-white/20 dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white

// Primary CTA (filled)
bg-zinc-900 text-white hover:bg-zinc-700
dark:bg-white dark:text-zinc-900 dark:hover:bg-white/90
```

## Rules

1. **Never write `text-white` or `bg-white/*` without a light mode class** — they are invisible on a light background.
2. **Never write `border-white/*` without a light mode class** — borders disappear.
3. Always write light styles first, then override with `dark:` — this matches Tailwind convention.
4. The particle network canvas is already theme-aware (uses `rgb(20,20,30)` in light mode).
5. Navbar, ProjectsShowcase, Bio, and Hero all follow the paired token system above.

---

# What This Site Is NOT

- Not a resume clone
- Not a startup landing page
- Not a dashboard
- Not animation-heavy
- Not colorful

It is:
Personal.  
Intentional.  
Quietly impressive.

---

# Claude Behavior Guidelines

When modifying this project, Claude should:

1. Preserve aesthetic consistency.
2. Avoid overengineering.
3. Keep spacing generous.
4. Optimize for clarity.
5. Default to simplicity.
6. Improve typography before adding UI.
7. Prefer removing over adding.

If unsure:
Choose the more minimal solution.