import imageExample from '../assets/background.jpg'
import baixarMangasImg from '../assets/portfolio/baixar-mangas.png'
import musaBotImg from '../assets/portfolio/musa-bot.png'
import stellaBotImg from '../assets/portfolio/stella-bot.png'
import imagineAiImg from '../assets/portfolio/imagine-ai.png'
import paladinsOverlayImg from '../assets/portfolio/paladins-dynamic-overlay.gif'
import definitivePortfolioImg from '../assets/portfolio/definitive-portfolio.png'
import familiaCataVentoImg from '../assets/portfolio/familia-cata-vento.png'
import kindleNewsletterImg from '../assets/portfolio/kindle_newsletter.png'
import investidorScraperImg from '../assets/portfolio/investidor10-scraper.png'

const PROJECTS_BASE = {
  'manga-downloader': {
    images: [baixarMangasImg],
    imagePositions: ['center center'],
    techs: ['NextJS', 'Puppeteer', 'Tailwind CSS', 'NextUI', 'WebSockets'],
    link: 'https://mangas.vhrita.dev',
    repository: ''
  },
  'musa-bot': {
    images: [musaBotImg],
    imagePositions: ['center 25%'],
    techs: ['TypeScript', 'Discord.js v14', 'Docker', 'Spotify API', 'YouTube API'],
    link: '',
    repository: 'https://www.github.com/vhrita/musa-bot'
  },
  'stella-bot': {
    images: [stellaBotImg],
    imagePositions: ['center 25%'],
    techs: ['TypeScript', 'Discord.js', 'AI Image Generation', 'N8N', 'WebSockets'],
    link: '',
    repository: 'https://www.github.com/vhrita/stella-bot'
  },
  'imagine-ai': {
    images: [imagineAiImg],
    imagePositions: ['center 25%'],
    techs: ['Python', 'FastAPI', 'WebSockets', 'Diffusers', 'Docker'],
    link: '',
    repository: 'https://www.github.com/vhrita/image-ai'
  },
  'paladins-dynamic-overlay': {
    images: [paladinsOverlayImg],
    imagePositions: ['center 25%'],
    techs: ['NextJS', 'WebSockets', 'Tailwind CSS', 'REST API', 'TypeScript'],
    link: '',
    repository: 'https://www.github.com/vhrita/paladins-dynamic-overlay'
  },
  'definitive-portfolio': {
    images: [definitivePortfolioImg],
    imagePositions: ['center top'],
    techs: ['React.js', 'Framer Motion', 'SCSS', 'ViteJS', 'i18n'],
    link: 'https://vhrita.dev',
    repository: 'https://www.github.com/vhrita/definitive-portfolio'
  },
  'familia-cata-vento': {
    images: [familiaCataVentoImg],
    imagePositions: ['center top'],
    techs: ['TypeScript', 'React', 'CSS3', 'Responsive Design'],
    link: 'https://github.com/vhrita/familia-cata-vento',
    repository: 'https://www.github.com/vhrita/familia-cata-vento'
  },
  'kindle-newsletter': {
    images: [kindleNewsletterImg],
    imagePositions: ['center top'],
    techs: ['Node.js', 'PM2', 'Email Automation', 'EPUB Conversion', 'Cron'],
    link: '',
    repository: 'https://www.github.com/vhrita/kindle-newsletter'
  },
  'investidor10-scraper': {
    images: [investidorScraperImg],
    imagePositions: ['center top'],
    techs: ['Node.js', 'Puppeteer', 'Redis', 'Express', 'Google Sheets API'],
    link: '',
    repository: 'https://github.com/vhrita/investidor10-scrap'
  }
}

const FALLBACK_IMAGE = imageExample

export function buildProjects(translatedProjects = []) {
  return translatedProjects.map(project => {
    const base = project?.id ? PROJECTS_BASE[project.id] : undefined

    if (!base) {
      return {
        id: project.id ?? project.title,
        title: project.title,
        description: project.description,
        images: [FALLBACK_IMAGE],
        imagePositions: ['center top'],
        techs: [],
        link: project.link,
        repository: project.repository ?? ''
      }
    }

    return {
      id: project.id,
      title: project.title,
      description: project.description,
      images: base.images ?? [FALLBACK_IMAGE],
      imagePositions: base.imagePositions ?? ['center top'],
      techs: base.techs ?? [],
      link: base.link,
      repository: base.repository ?? ''
    }
  })
}

export default PROJECTS_BASE
