import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import productsData from '../data/products.json';
import configData from '../data/config.json';

const SITE_URL = 'https://tkfireworks.com';
const BRAND = 'TK Fireworks';
const DEFAULT_DESCRIPTION = 'TK Fireworks is a fireworks brand and manufacturer based in Rangasamudram, Gudiyatham, Vellore, Tamil Nadu. Explore premium fireworks, featured products, trending fireworks, safety information and celebration videos.';

const pageSEO: Record<string, { title: string; description: string; keywords: string }> = {
  '/': { title: 'TK Fireworks | Fireworks Manufacturer & Supplier', description: 'TK Fireworks, Rangasamudram, offers premium fireworks for Diwali, festivals, weddings and celebrations. Explore featured and trending fireworks, videos and safety guidance.', keywords: 'TK Fireworks, TK Fireworks Rangasamudram, fireworks manufacturer, fireworks supplier, fireworks Vellore, fireworks Tamil Nadu, Diwali fireworks, fireworks India' },
  '/catalog': { title: 'Fireworks Products | TK Fireworks', description: 'Explore featured and trending fireworks from TK Fireworks. Discover products for Diwali, festivals, weddings and celebrations.', keywords: 'TK Fireworks products, fireworks catalog, featured fireworks, trending fireworks, Diwali fireworks, fireworks products India' },
  '/gallery': { title: 'Fireworks Gallery & Videos | TK Fireworks', description: 'Watch TK Fireworks videos, Instagram Reels and fireworks celebrations from TK Fireworks Rangasamudram.', keywords: 'TK Fireworks videos, TK Fireworks Instagram, fireworks reels, fireworks gallery, fireworks videos' },
  '/about-us': { title: 'About TK Fireworks | Rangasamudram', description: 'Learn about TK Fireworks, our fireworks business, products and commitment to memorable and responsible celebrations.', keywords: 'about TK Fireworks, TK Fireworks Rangasamudram, fireworks manufacturer Tamil Nadu' },
  '/safety': { title: 'Fireworks Safety Guide | TK Fireworks', description: 'Learn important fireworks safety guidance for responsible storage, handling and celebrations.', keywords: 'fireworks safety, fireworks safety guide, Diwali safety, TK Fireworks safety' },
  '/faq': { title: 'Fireworks FAQ | TK Fireworks', description: 'Find answers about TK Fireworks products, enquiries, bulk orders, safety and celebrations.', keywords: 'TK Fireworks FAQ, fireworks questions, fireworks ordering, fireworks safety' },
  '/contact': { title: 'Contact TK Fireworks | Rangasamudram', description: 'Contact TK Fireworks for product enquiries, bulk orders and business enquiries. TK Fireworks Rangasamudram.', keywords: 'contact TK Fireworks, TK Fireworks email, fireworks enquiry, fireworks Rangasamudram' },
  '/bulk': { title: 'Bulk & Wholesale Fireworks | TK Fireworks', description: 'Enquire about bulk and wholesale fireworks from TK Fireworks for businesses, events and celebrations.', keywords: 'bulk fireworks, wholesale fireworks, TK Fireworks wholesale, fireworks bulk order' },
  '/events': { title: 'Event Fireworks | TK Fireworks', description: 'Explore fireworks solutions from TK Fireworks for festivals, weddings, events and celebrations.', keywords: 'event fireworks, wedding fireworks, festival fireworks, TK Fireworks events' },
  '/diwali': { title: 'Diwali Fireworks | TK Fireworks', description: 'Explore TK Fireworks Diwali products and celebration inspiration.', keywords: 'Diwali fireworks, Diwali crackers, TK Fireworks Diwali' },
  '/shortlist': { title: 'Saved Fireworks | TK Fireworks', description: 'View your saved TK Fireworks products.', keywords: 'TK Fireworks saved products' },
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
    const product = productMatch ? productsData.products.find((item) => item.id === decodeURIComponent(productMatch[1])) : undefined;
    const base = product ? { title: `${product.name} | Fireworks Product | TK Fireworks`, description: product.descriptionLong || product.descriptionShort || DEFAULT_DESCRIPTION, keywords: `${product.name}, fireworks, TK Fireworks, ${product.effectType || 'fireworks'} fireworks, Diwali fireworks` } : (pageSEO[path] || { title: `${BRAND} | Premium Fireworks`, description: DEFAULT_DESCRIPTION, keywords: 'TK Fireworks, fireworks, premium fireworks, Diwali fireworks' });
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
      { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: SITE_URL, name: BRAND, alternateName: ['TK Fireworks', 'TK Fireworks Rangasamudram', 'TK Fireworks Vellore'], description: DEFAULT_DESCRIPTION, inLanguage: 'en-IN' },
      { '@type': 'Organization', '@id': `${SITE_URL}/#organization`, name: BRAND, alternateName: ['TK Fireworks Rangasamudram', 'TK Fireworks Vellore', 'TK Fireworks Tamil Nadu'], url: SITE_URL, logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/logo.png`, contentUrl: `${SITE_URL}/images/logo.png` }, description: DEFAULT_DESCRIPTION, email: 'mailto:tkfirework@gmail.com', sameAs: ['https://www.instagram.com/tkfireworks/', 'https://www.youtube.com/@TKFIREWORKS89'], address: { '@type': 'PostalAddress', addressLocality: 'Gudiyatham', addressRegion: 'Tamil Nadu', postalCode: '632602', addressCountry: 'IN' }, contactPoint: { '@type': 'ContactPoint', contactType: 'Customer Service', email: 'tkfirework@gmail.com' } },
      { '@type': 'SiteNavigationElement', name: 'Home', url: `${SITE_URL}/` },
      { '@type': 'SiteNavigationElement', name: 'Fireworks Products', url: `${SITE_URL}/catalog` },
      { '@type': 'SiteNavigationElement', name: 'Fireworks Gallery', url: `${SITE_URL}/gallery` },
      { '@type': 'SiteNavigationElement', name: 'About TK Fireworks', url: `${SITE_URL}/about-us` },
      { '@type': 'SiteNavigationElement', name: 'Fireworks Safety', url: `${SITE_URL}/safety` },
      { '@type': 'SiteNavigationElement', name: 'Fireworks FAQ', url: `${SITE_URL}/faq` },
      { '@type': 'SiteNavigationElement', name: 'Contact TK Fireworks', url: `${SITE_URL}/contact` },
      { '@type': 'BreadcrumbList', itemListElement: [ { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL }, ...(product ? [ { '@type': 'ListItem', position: 2, name: 'Products', item: `${SITE_URL}/catalog` }, { '@type': 'ListItem', position: 3, name: product.name, item: canonical } ] : path !== '/' ? [ { '@type': 'ListItem', position: 2, name: base.title.split(' | ')[0], item: canonical } ] : []) ] },
    ];

    if (product) graph.push({ '@type': 'Product', name: product.name, description: base.description, image: [image], url: canonical, brand: { '@type': 'Brand', name: BRAND }, category: 'Fireworks', keywords: base.keywords });

    const script = document.createElement('script');
    script.id = 'tk-fireworks-schema';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
    document.head.appendChild(script);
  }, [location.pathname]);

  return null;
};
