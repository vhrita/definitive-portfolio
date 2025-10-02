# 🎯 Vitor Rita Portfolio

> Modern, responsive portfolio built with React + Vite, featuring smooth animations and multilingual SEO optimization for social media sharing.

## ✨ Features

- **🌍 Multilingual**: English (default), Portuguese, Japanese with automatic detection
- **📱 Fully Responsive**: Mobile-first design with fluid animations
- **🎭 Rich Animations**: GSAP and Framer Motion integrations
- **🔍 SEO Optimized**: Static HTML generation for crawlers + dynamic meta tags for browsers
- **📱 Social Media Ready**: Open Graph, Twitter Cards with proper multilingual support
- **⚡ Performance Focused**: Code splitting, lazy loading, optimized chunks (~300KB total)
- **♿ Accessible**: WCAG 2.1 AA compliant with keyboard navigation

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

### English (Default)
- `/` - Home
- `/about` - About
- `/portfolio` - Projects
- `/contact` - Contact

### Portuguese
- `/pt/` - Início
- `/pt/about` - Sobre
- `/pt/portfolio` - Projetos
- `/pt/contact` - Contato

### Japanese
- `/ja/` - ホーム
- `/ja/about` - について
- `/ja/portfolio` - ポートフォリオ
- `/ja/contact` - お問い合わせ

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite 5
- **Styling**: SCSS with responsive mixins
- **Animations**: GSAP, Framer Motion
- **Routing**: React Router DOM v7
- **i18n**: react-i18next with auto-detection
- **SEO**: React Helmet Async + Static HTML generation
- **Forms**: Formspree integration
- **Deployment**: CapRover with nginx

## 📁 Project Structure

```
src/
├── components/          # Reusable components
├── pages/              # Page components
├── config/             # Configuration files
├── data/               # Project data
├── styles/             # Global SCSS
└── utils/              # Utility functions

public/
├── og-image.png        # Social sharing image
├── vitor-rita.png      # Profile image for schema
├── favicon.ico         # Favicons
└── site.webmanifest    # PWA manifest
```

## 📊 SEO Features

- ✅ **Hybrid SEO**: Static HTML for crawlers + Dynamic meta tags for browsers
- ✅ **Social Media Optimized**: WhatsApp, Facebook, Twitter show correct multilingual meta tags
- ✅ **Crawler Detection**: Automatic bot detection with static HTML fallback
- ✅ **International SEO**: hreflang tags for en/pt-BR/ja locales
- ✅ **Structured Data**: JSON-LD with Person schema
- ✅ **Automatic Sitemap**: Generated with build process
- ✅ **Performance Optimized**: Zero impact on SPA experience

## 🎨 Design System

- **Colors**: `#242424` (dark), `#2bcab6` (accent), `#ffffff` (light)
- **Fonts**: System fonts with fallbacks
- **Breakpoints**: Mobile-first responsive design
- **Animations**: Performance-optimized with `will-change`

## 📈 Performance

- **Bundle Size**: ~300KB gzipped
- **Lighthouse Score**: 90+ across all metrics
- **Lazy Loading**: Images and sections
- **Code Splitting**: Route-based chunks

## 🔧 Development Commands

```bash
# Development
npm run dev              # Start dev server with HMR

# Building
npm run build           # Build + generate sitemap + static SEO pages
npm run build:simple    # Build only (for dev)
npm run generate:sitemap # Generate sitemap only
npm run preview         # Preview production build
```

## 🚀 Deployment

**Current Setup**: CapRover with nginx configuration for proper SEO routing.

**Also optimized for**:
- Netlify (with `_redirects` support)
- Vercel
- Any static host with nginx/Apache

**Key Files**:
- `nginx.conf` - Production nginx configuration
- `Dockerfile` - Container setup for CapRover
- `dist/` - Build output with static SEO pages

## 📄 License

MIT License - feel free to use this project as inspiration for your own portfolio.

---

**Built with ❤️ by Vitor Rita**