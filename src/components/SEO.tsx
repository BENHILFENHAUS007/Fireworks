import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import productsData from '../data/products.json';
import configData from '../data/config.json';

const SITE_URL = 'https://tkfireworks.com';
const BRAND = 'TK Fireworks';
const DEFAULT_DESCRIPTION = 'TK Fireworks offers premium fireworks for joyful celebrations, including featured fireworks, trending products, safety guidance and event solutions.';

const pageSEO: Record<string, { title: string; description: string; keywords: string }> = {
  '/': {
    title: 'TK Fireworks | Premium Fireworks for Celebrations',
    description: 'Discover premium fireworks from TK Fireworks for Diwali, festivals, weddings and celebrations. Explore featured and trending fireworks, safety guidance and our gallery.',
    keywords: 'TK Fireworks, fireworks, premium fireworks, fireworks India, Diwali fireworks, fireworks Vellore, fireworks Tamil Nadu',
  },
  '/about-us': {
    title: 'About TK Fireworks | Trusted Fireworks Brand',
    description: 'Learn about TK Fireworks, our story, values, product quality and commitment to safe, memorable celebrations.',
    keywords: 'about TK Fireworks, fireworks company, fireworks brand Tamil Nadu, fireworks manufacturer',
  },
  '/catalog': {
    title: 'Fireworks Products | Featured & Trending | TK Fireworks',
    description: 'Browse TK Fireworks featured and trending fireworks. Explore product details, effects and availability for your next celebration.',
    keywords: 'fireworks products, featured fireworks, trending fireworks, Diwali fireworks, fireworks catalog India',
  },
  '/gallery': {
    title: 'Fireworks Gallery | Photos, Videos & Instagram Reels | TK Fireworks',
    description: 'See TK Fireworks products and celebrations through photos, product trailers and Instagram reels.',
    keywords: 'fireworks gallery, fireworks videos, TK Fireworks Instagram, fireworks reels, Diwali fireworks photos',
  },
  '/faq': {
    title: 'Fireworks FAQ | TK Fireworks',
    description: 'Find answers about TK Fireworks products, ordering, delivery, bulk orders, safety and product videos.',
    keywords: 'fireworks FAQ, TK Fireworks FAQ, fireworks ordering, fireworks safety questions',
  },
  '/safety': {
    title: 'Fireworks Safety Guide | TK Fireworks',
    description: 'Read essential fireworks safety guidance for responsible celebrations, storage, lighting and safe distances.',
    keywords: 'fireworks safety, fireworks safety guide, safe fireworks use, Diwali safety',
  },
  '/about': {
    title: 'TK Fireworks | Our Story & Celebrations',
    description: 'Explore the TK Fireworks story and our passion for colourful, joyful and responsible celebrations.',
    keywords: 'TK Fireworks story, fireworks celebrations, fireworks brand India',
  },
  '/contact': {
    title: 'Contact TK Fireworks | Email & Factory Location',
    description: 'Contact TK Fireworks by email for product enquiries, bulk orders and support. Find our factory location in Gudiyatham, Vellore, Tamil Nadu.',
    keywords: 'contact TK Fireworks, fireworks enquiry, fireworks bulk order, fireworks Gudiyatham, fireworks Vellore',
  },
  '/bulk': {
    title: 'Bulk & Wholesale Fireworks Orders | TK Fireworks',
    description: 'Explore bulk and wholesale fireworks enquiries from TK Fireworks for events, businesses and large celebrations.',
    keywords: 'bulk fireworks, wholesale fireworks, fireworks bulk order India, event fireworks',
  },
  '/events': {
    title: 'Fireworks for Events & Celebrations | TK Fireworks',
    description: 'Explore fireworks solutions for festivals, weddings, events and celebrations with TK Fireworks.',
    keywords: 'event fireworks, wedding fireworks, celebration fireworks, festival fireworks',
  },
  '/diwali': {
    title: 'Diwali Fireworks | Featured Celebrations | TK Fireworks',
    description: 'Discover TK Fireworks Diwali offerings, featured products and celebration inspiration.',
    keywords: 'Diwali fireworks, Diwali crackers, Diwali celebration fireworks, TK Fireworks Diwali',
  },
  '/shortlist': {
    title: 'Saved Fireworks | TK Fireworks',
    description: 'View your saved TK Fireworks products.',
    keywords: 'TK Fireworks saved products',
  },
};

function setMeta(name: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) { el = document.createElement('meta'); el.setAttribute('name', name); document.head.appendChild(el); }
  el.setAttribute('content', content);
}

function setProperty(property: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!el) { el = document.createElement('meta'); el.setAttribute('property', property); document.head.appendChild(el); }
  el.setAttribute('content', content);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) { el = document.createElement('link'); el.setAttribute('rel', rel); document.head.appendChild(el); }
  el.setAttribute('href', href);
}

export const SEO: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.replace(/\/+$/, '') || '/';
    const productMatch = path.match(/^\/product\/([^/]+)$/);
    const product = productMatch
      ? productsData.products.find((item) => item.id === decodeURIComponent(productMatch[1]))
      : undefined;

    const base = product
      ? {
          title: `${product.name} | Fireworks Product | TK Fireworks`,
          description: product.descriptionLong || product.descriptionShort || DEFAULT_DESCRIPTION,
          keywords: `${product.name}, fireworks, TK Fireworks, ${product.effectType || 'fireworks'} fireworks, Diwali fireworks`,
        }
      : (pageSEO[path] || {
          title: `${BRAND} | Premium Fireworks`,
          description: DEFAULT_DESCRIPTION,
          keywords: 'TK Fireworks, fireworks, premium fireworks, Diwali fireworks',
        });

    const canonical = `${SITE_URL}${path === '/' ? '/' : path}`;
    const image = product?.image ? `${SITE_URL}${product.image}` : `${SITE_URL}/images/logo.png`;

    document.title = base.title;
    setMeta('description', base.description);
    setMeta('keywords', base.keywords);
    setMeta('robots', path === '/shortlist' ? 'noindex,nofollow' : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1');
    setMeta('author', BRAND);
    setMeta('theme-color', '#000000');
    setProperty('og:type', product ? 'product' : 'website');
    setProperty('og:title', base.title);
    setProperty('og:description', base.description);
    setProperty('og:url', canonical);
    setProperty('og:site_name', BRAND);
    setProperty('og:image', image);
    setProperty('twitter:card', 'summary_large_image');
    setProperty('twitter:title', base.title);
    setProperty('twitter:description', base.description);
    setProperty('twitter:image', image);
    setLink('canonical', canonical);

    const oldSchema = document.getElementById('tk-fireworks-schema');
    if (oldSchema) oldSchema.remove();

    const graph: any[] = [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: BRAND,
        description: DEFAULT_DESCRIPTION,
        inLanguage: 'en-IN',
      },
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: BRAND,
        url: SITE_URL,
        logo: `${SITE_URL}/images/logo.png`,
        email: `mailto:${configData.contact.email}`,
        alternateName: ['TK Fireworks', 'TK Fireworks India', 'TK Fireworks Vellore'],
        sameAs: [
          configData.social.instagram,
          configData.social.youtube,
        ],
      },
      {
        '@type': 'SiteNavigationElement',
        name: 'TK Fireworks Main Navigation',
        url: [
          `${SITE_URL}/`,
          `${SITE_URL}/catalog`,
          `${SITE_URL}/gallery`,
          `${SITE_URL}/about-us`,
          `${SITE_URL}/safety`,
          `${SITE_URL}/faq`,
          `${SITE_URL}/contact`,
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          ...(product ? [{ '@type': 'ListItem', position: 2, name: 'Products', item: `${SITE_URL}/catalog` }, { '@type': 'ListItem', position: 3, name: product.name, item: canonical }] : path !== '/' ? [{ '@type': 'ListItem', position: 2, name: base.title.split(' | ')[0], item: canonical }] : []),
        ],
      },
    ];

    if (product) {
      graph.push({
        '@type': 'Product',
        name: product.name,
        description: base.description,
        image: [image],
        url: canonical,
        brand: { '@type': 'Brand', name: BRAND },
        category: 'Fireworks',
        keywords: base.keywords,
      });
    }

    const script = document.createElement('script');
    script.id = 'tk-fireworks-schema';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
    document.head.appendChild(script);
  }, [location.pathname]);

  return null;
};
