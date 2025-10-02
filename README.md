# 🎯 Vitor Rita Portfolio

> Modern, multilingual portfolio built with React + Vite, featuring smooth animations and production-ready SEO optimization.

[![React](https://img.shields.io/badge/React-18.3-blue)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## ✨ Features

- 🌍 **Multilingual** - English (default), Portuguese, Japanese with automatic detection
- 📱 **Fully Responsive** - Mobile-first design with fluid animations
- 🎭 **Rich Animations** - GSAP and Framer Motion integrations
- 🔍 **SEO Optimized** - Hybrid system: static HTML for crawlers + dynamic meta tags
- 📱 **Social Media Ready** - Open Graph, Twitter Cards with multilingual support
- ⚡ **Performance Focused** - Code splitting, lazy loading (~300KB gzipped)
- ♿ **Accessible** - WCAG 2.1 AA compliant with keyboard navigation
- 🎨 **Modern Stack** - React 18, Vite 5, SCSS, React Router v7

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 URL Structure

| Language | Home | About | Portfolio | Contact |
|----------|------|-------|-----------|---------|
| **English** | `/` | `/about` | `/portfolio` | `/contact` |
| **Portuguese** | `/pt/` | `/pt/about` | `/pt/portfolio` | `/pt/contact` |
| **Japanese** | `/ja/` | `/ja/about` | `/ja/portfolio` | `/ja/contact` |

## 🛠️ Tech Stack

### Core
- **React 18** - UI library
- **Vite 5** - Build tool & dev server
- **React Router DOM v7** - Client-side routing
- **SCSS** - Styling with responsive mixins

### Animations
- **Framer Motion** - React animation library
- **GSAP** - Advanced scroll animations

### Internationalization
- **react-i18next** - Translation management
- **i18next-browser-languagedetector** - Automatic language detection

### SEO
- **React Helmet Async** - Dynamic meta tags
- **Custom static HTML generator** - Pre-rendered pages for crawlers
- **nginx** - Crawler detection & routing

### Forms
- **Formspree** - Contact form backend

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── SEO.jsx         # Dynamic meta tags
│   ├── Router.jsx      # Client-side routing
│   ├── Navbar/         # Navigation component
│   ├── Social/         # Social media links
│   └── ...
├── pages/              # Page components
│   ├── Home/
│   ├── About/
│   ├── Portfolio/
│   └── Contact/
├── config/             # Configuration files
│   ├── constants.js    # Shared constants
│   └── internationalization/
├── data/               # Static data
│   └── projects.js     # Portfolio projects
├── utils/              # Utility functions
│   ├── languageUtils.js
│   ├── mixins.scss
│   └── variables.scss
└── assets/             # Images, icons, fonts

scripts/
├── generate-static-seo.mjs  # Static HTML generation
└── generate-sitemap.mjs     # XML sitemap generation

public/
├── og-image.png        # Social sharing (EN)
├── og-image-pt.png     # Social sharing (PT)
├── og-image-ja.png     # Social sharing (JA)
├── resume.pdf          # Resume file
├── robots.txt          # Crawler directives
└── site.webmanifest    # PWA manifest
```

## 📊 SEO Implementation

### Hybrid Approach

The portfolio uses a hybrid SEO system:

1. **For crawlers** (Facebook, WhatsApp, Google): Pre-rendered static HTML pages with correct localized meta tags
2. **For users**: Full React SPA with dynamic meta tags via React Helmet

**Why?** Social media crawlers don't execute JavaScript, so dynamic meta tags don't work. The solution: nginx detects crawlers and serves them static pages.

### How It Works

```
Request to /pt/contact
        ↓
    nginx.conf (crawler detection)
        ↓
   Is crawler? ──Yes→ Serve /pt/contact/index.html (static)
        ↓
       No
        ↓
   Serve SPA → React Router → SEO.jsx (dynamic)
```


## 📈 Performance

### Bundle Size

```
Production Build (gzipped):
├── vendor.js      141KB  (React + ReactDOM)
├── animations.js  179KB  (Framer Motion + GSAP)
├── i18n.js        81KB   (Internationalization)
├── main.js        121KB  (App core)
├── components.js  40KB   (Components)
└── utils.js       31KB   (Utilities)
────────────────────────────────────────
Total:             ~300KB
```

### Optimizations Implemented

- ✅ Route-based code splitting with React.lazy()
- ✅ Vendor chunk separation
- ✅ Native image lazy loading
- ✅ Optimized Vite build configuration

## 🔧 Development Commands

```bash
# Development
npm run dev              # Start dev server (http://localhost:5173)

# Building
npm run build           # Build + generate sitemap + static SEO pages
npm run build:simple    # Build only (without post-build scripts)
npm run generate:sitemap # Generate sitemap.xml only
npm run preview         # Preview production build (http://localhost:4173)
```

## 🚀 Deployment

**Current Setup**: CapRover with nginx

**Also compatible with**:
- Netlify
- Vercel
- Any static host with nginx/Apache configuration

**Required Files**:
- `nginx.conf` - Production nginx configuration
- `Dockerfile` - Container setup (CapRover)
- `dist/` - Build output

### Environment Variables

None required! The app is fully static after build.

## 🧪 Testing

```bash
# Test production build locally
npm run build && npm run preview

# Test different languages
open http://localhost:4173/pt/contact
open http://localhost:4173/ja/about

# Test social media sharing
# Facebook: https://developers.facebook.com/tools/debug/
# Twitter: https://cards-dev.twitter.com/validator
```

## 📝 Adding New Content

### Add a New Project

1. Add project images to `src/assets/portfolio/`
2. Update `src/data/projects.js`:
   ```js
   'new-project-id': {
     images: [newProjectImg],
     imagePositions: ['center top'],
     techs: ['React', 'Node.js'],
     link: 'https://...',
     repository: 'https://github.com/...'
   }
   ```
3. Add translations in all language files:
   ```json
   {
     "projects": [
       {
         "id": "new-project-id",
         "title": "...",
         "description": "..."
       }
     ]
   }
   ```

### Update SEO Meta Tags

Edit `seo` section in translation files:

```json
{
  "seo": {
    "home": {
      "title": "...",
      "description": "...",
      "keywords": "..."
    }
  }
}
```

Run `npm run build` to regenerate static SEO pages.

## 🎨 Customization

### Colors

Edit `src/utils/variables.scss`:

```scss
$dark: #242424;
$blue: #2bcab6;
$white: #ffffff;
```

### Fonts

Currently using Google Fonts (Space Grotesk). To self-host:

```bash
npm install @fontsource/space-grotesk
```

Update `src/main.jsx`:

```jsx
import '@fontsource/space-grotesk/400.css'
import '@fontsource/space-grotesk/700.css'
```

### Responsive Breakpoints

Defined in `src/utils/mixins.scss`:

```scss
$breakpoints: (
  'mobile': 480px,
  'tablet': 768px,
  'tablet-landscape': 1024px,
  'desktop': 1024px,
  'large': 1400px
);
```

## 🤝 Contributing

This is a personal portfolio, but you're welcome to:
- Report bugs via GitHub Issues
- Suggest improvements
- Use as inspiration for your own portfolio

## 📄 License

MIT License - feel free to use this project as inspiration for your own portfolio.

## 🙏 Acknowledgments

- **Framer Motion** - Beautiful animations
- **GSAP** - Advanced scroll effects
- **React Helmet Async** - SEO meta tag management
- **Formspree** - Simple form backend

---

**Built with ❤️ by [Vitor Rita](https://vhrita.dev)**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-vhrita-blue)](https://linkedin.com/in/vhrita)
[![GitHub](https://img.shields.io/badge/GitHub-vhrita-black)](https://github.com/vhrita)
