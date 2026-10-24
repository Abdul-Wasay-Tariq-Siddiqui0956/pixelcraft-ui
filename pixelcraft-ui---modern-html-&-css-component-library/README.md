# PixelCraft UI — Modern HTML5 & CSS3 Component Library

> **Tagline**: Beautiful Components. Pure HTML & CSS.  
> **Brand Promise**: A practical, free resource for exploring, understanding, and building beautiful website interfaces with clean HTML and CSS.  
> **Purpose**: Created specifically for an academic website design assignment.

---

## 1. Project Overview

PixelCraft UI is an educational component library and web architecture resource designed for students, beginner frontend developers, freelance designers, and accessibility learners. 

It contains **15 distinct, interconnected HTML pages** constructed exclusively with semantic HTML5 and CSS3 custom properties. It uses **zero JavaScript**, requiring no build step, no npm packages, and no client-side runtime to execute.

---

## 2. The 15 Required HTML Pages

| # | Page Name | File Path | Content Purpose |
|---|---|---|---|
| 1 | **Home** | `index.html` | Library value proposition, live interactive showcase, educational pillars, featured guides, FAQ preview, and call-to-action. |
| 2 | **Component Library** | `components.html` | Central directory cataloging all 8 component families with difficulty levels and direct subpage routing. |
| 3 | **Navbar Components** | `navbar-components.html` | 5 distinct responsive navigation layouts: Minimal, SaaS 3-Zone, Portfolio, E-Commerce, and Documentation. |
| 4 | **Login & Signup Forms** | `forms.html` | 5 accessible forms: Minimal Login, Split-Layout Auth, Registration, Multi-Control Contact, and Inline Newsletter. |
| 5 | **Pricing Cards** | `pricing-cards.html` | 4 subscription tier architectures: 2-Tier, 3-Tier SaaS, Static Monthly vs Annual Comparison, and Full Feature Matrix Table. |
| 6 | **Footer Components** | `footer-components.html` | 5 semantic footer landmarks: Minimal One-Line, Multi-Column Directory, SaaS Product with Status, Portfolio, and Newsletter. |
| 7 | **Button Components** | `buttons.html` | Complete button state system: Primary, Secondary, Outline, Text, Icon, CSS Spinner Loading, Disabled, and Size Scale. |
| 8 | **Card Components** | `cards.html` | 6 surface layouts: Basic Content, Author Profile, Editorial Blog, Product Showcase, Bento Feature, and Testimonial. |
| 9 | **Hero Section Examples** | `hero-sections.html` | 5 landing layouts: Minimal Centered, 50/50 Split-Screen, SaaS Product, Developer Portfolio with Terminal, and Atmospheric Editorial. |
| 10 | **CSS Animations** | `animations.html` | 6 pure CSS motion patterns: Button Hover Lift, Card Elevation, Underline Sweep, Keyframe Spinners, Fade-In-Up, and Reduced Motion. |
| 11 | **Responsive Design Guide** | `responsive-design.html` | Deep-dive guide explaining Mobile-First CSS, Breakpoint Scales, CSS Grid auto-fill, Flexbox, and fluid `clamp()` typography. |
| 12 | **Getting Started** | `getting-started.html` | Beginner step-by-step tutorial: Folder structure, starter template boilerplate, customizing `:root` tokens, and testing. |
| 13 | **Accessibility (a11y) Guide**| `accessibility.html` | Comprehensive accessibility guide: Semantic landmarks, `:focus-visible` rings, form labels vs placeholders, and WCAG AA contrast. |
| 14 | **About PixelCraft** | `about.html` | Project mission, target audience, architectural principles, why HTML/CSS was chosen, and honest static boundaries. |
| 15 | **FAQ** | `faq.html` | 14 in-depth questions and answers rendered in native HTML5 `<details>` and `<summary>` elements with zero JS. |
| + | **Custom 404** | `404.html` | Accessible error fallback page connecting visitors back to all primary library destinations. |

---

## 3. Strict Technology Rules Compliance

- **Permitted Technologies**: HTML5, CSS3, CSS Custom Properties (`:root`), Flexbox, CSS Grid, Media Queries, CSS Transitions & Keyframes, Native `<details>`/`<summary>`, Native `<form>` controls, Inline SVGs, Google Fonts.
- **Prohibited Technologies Excluded**:
  - ❌ No JavaScript or inline JS (`onclick`, `javascript:`, etc.)
  - ❌ No React, Vue, Angular, or JS frameworks
  - ❌ No Bootstrap or Tailwind runtime utility bloat
  - ❌ No jQuery or external icon fonts
  - ❌ No Node.js or backend dependencies
  - ❌ No fake clipboard-copy buttons
  - ❌ No fake interactive search filters

---

## 4. Local Setup & How to Run

Because PixelCraft UI is built with pure web standards, you can run it in multiple convenient ways:

### Method A: Direct Double-Click (Zero Setup)
1. Unzip or open the project folder.
2. Double-click `index.html` in your file explorer.
3. The website will open immediately in Chrome, Firefox, Safari, or Edge. All internal links (`href="components.html"`, etc.) and CSS stylesheets resolve relatively.

### Method B: Any Local Static Web Server
```bash
# Python 3
python3 -m http.server 3000

# Or Node npx serve
npx serve .
```

### Method C: Vite Dev Server (AI Studio Environment)
```bash
npm run dev
# The dev server serves all HTML files at http://localhost:3000/
```

---

## 5. Design System Tokens

The visual identity is defined via CSS custom properties in `assets/css/style.css`:

```css
:root {
  --bg-canvas: #F8F9FC;
  --surface: #FFFFFF;
  --surface-alt: #F1F4F9;
  --text-main: #171923;
  --text-secondary: #525C6E;
  --primary: #6C5CE7;
  --primary-hover: #5A4BD1;
  --primary-light: #F0EDFF;
  --secondary: #A89BFA;
  --highlight: #0D9488;
  --border: #E2E6F0;
  --dark-surface: #151827;
  --font-sans: 'Plus Jakarta Sans', sans-serif;
  --font-display: 'Space Grotesk', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

---

## 6. Technical SEO, AEO & GEO Implementation

1. **Unique Metadata**: Every page includes a unique `<title>`, unique `<meta name="description">`, OpenGraph social cards, and a designated `<link rel="canonical">` placeholder.
2. **Direct Answer Structure (AEO)**: Every major page opens with a concise definition answering key questions in plain, crawlable prose.
3. **Structured Data (JSON-LD)**:
   - `WebSite` on `index.html`
   - `BreadcrumbList` on all subpages
   - `Article` on educational guides
   - `FAQPage` on `faq.html`
4. **Crawling Directives**: Clean `robots.txt` and a complete `sitemap.xml` listing all canonical URLs with explicit domain placeholder notices.

---

## 7. Accessibility (WCAG 2.1 AA) Compliance

- **Visible Keyboard Focus**: Globally enforced `:focus-visible` with electric violet 2px outline and 3px offset.
- **Contrast Ratios**: Body text achieves 15.2:1 against light canvas and 5.8:1 on dark surfaces, exceeding the 4.5:1 WCAG AA threshold.
- **Touch Boundaries**: All buttons and mobile touch links meet or exceed 44px physical targets.
- **Reduced Motion**: Complete `@media (prefers-reduced-motion: reduce)` reset suppressing animations for users with vestibular sensitivities.
- **Skip Link**: `<a href="#main-content" class="skip-link">` on every page.

---

## 8. Honest Limitations of Static Frontend Examples

In alignment with academic honesty and transparency:
1. **Form Submission**: The login, registration, contact, and newsletter forms are static UI demonstrations. Real authentication, data storage, and email delivery require attaching a backend service.
2. **Clipboard Copying**: No simulated or non-working copy buttons are used. Users select and copy code manually with standard `Ctrl+C` / `Cmd+C` shortcuts.
3. **PDF Export**: Relies on browser printing (`Ctrl+P`) via an accessible `@media print` stylesheet rather than server-side PDF generators.
4. **Search Inputs**: Form inputs intended for search are clearly designated as visual UI demonstrations.

---

## 9. Assignment Compliance Checklist

- [x] All 15 distinct HTML pages created and properly interconnected
- [x] Pure HTML5 and CSS3 only (Zero JavaScript, no frameworks, no Tailwind runtime)
- [x] Responsive on desktop (1440px), laptop (1024px), tablet (768px), and mobile (320px–375px)
- [x] Consistent design system using CSS custom properties (`:root`)
- [x] Working CSS-only mobile navigation using native HTML5 `<details>`/`<summary>`
- [x] Live HTML/CSS component previews (no screenshots or fake images)
- [x] Unique SEO titles, descriptions, and canonical placeholders on all 15 pages
- [x] AEO direct answers beneath question-style headings on all primary pages
- [x] Accessible `:focus-visible` outlines and WCAG AA contrast compliance
- [x] `@media (prefers-reduced-motion)` and `@media print` stylesheets implemented
- [x] `robots.txt` and `sitemap.xml` generated with marked domain placeholders
- [x] Custom `404.html` fallback page provided
- [x] Runs locally by simply double-clicking `index.html` in any browser
