import { Link } from 'react-router-dom';

export const SEOInternalLinks: React.FC = () => (
  <section className="py-10 px-4" aria-labelledby="tk-fireworks-explore">
    <div className="max-w-6xl mx-auto">
      <h2 id="tk-fireworks-explore" className="text-2xl md:text-3xl font-bold text-white mb-5">
        Explore TK Fireworks
      </h2>
      <nav aria-label="TK Fireworks information links" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <Link to="/catalog" className="text-gray-300 hover:text-orange-400 transition-colors">Fireworks Products</Link>
        <Link to="/gallery" className="text-gray-300 hover:text-orange-400 transition-colors">Fireworks Gallery</Link>
        <Link to="/about-us" className="text-gray-300 hover:text-orange-400 transition-colors">About TK Fireworks</Link>
        <Link to="/safety" className="text-gray-300 hover:text-orange-400 transition-colors">Fireworks Safety</Link>
        <Link to="/faq" className="text-gray-300 hover:text-orange-400 transition-colors">Fireworks FAQ</Link>
        <Link to="/contact" className="text-gray-300 hover:text-orange-400 transition-colors">Contact TK Fireworks</Link>
      </nav>
      <div className="mt-5 flex flex-wrap gap-4 text-sm">
        <a href="https://www.instagram.com/tkfireworks/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-400">Instagram</a>
        <a href="https://www.youtube.com/@TKFIREWORKS89" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-400">YouTube</a>
        <a href="mailto:tkfirework@gmail.com" className="text-gray-400 hover:text-orange-400">tkfirework@gmail.com</a>
      </div>
      <p className="mt-3 text-sm text-gray-500">TK Fireworks Rangasamudram</p>
    </div>
  </section>
);
