import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { ProductCard } from '../components/ui/ProductCard';
import { useFavorites } from '../hooks/useFavorites';
import productsData from '../data/products.json';

interface CatalogProps { theme: any; }

const PRODUCT_FILTERS = [
  { id: 'featured', label: 'Featured' },
  { id: 'trending', label: 'Trending' },
];

export const Catalog: React.FC<CatalogProps> = ({ theme }) => {
  const { favorites, toggleFavorite } = useFavorites();
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [selectedFilter, setSelectedFilter] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setProducts(productsData.products);
  }, []);

  useEffect(() => {
    let filtered = products.filter((p) =>
      selectedFilter === 'trending'
        ? p.tags?.some((tag: string) => tag.toUpperCase() === 'TRENDING') || p.tag?.toUpperCase() === 'TRENDING'
        : p.isFeatured === true || p.featured === true
    );

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) => p.name.toLowerCase().includes(query) || p.descriptionShort.toLowerCase().includes(query)
      );
    }

    setFilteredProducts(filtered);
  }, [selectedFilter, searchQuery, products]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0d0050] to-black pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-5xl md:text-6xl font-black mb-2 text-white">Our Fireworks Products</h1>
          <p className="text-gray-400 text-lg">Browse our featured and trending fireworks collection.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <motion.aside initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-1 space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-500" size={20} />
              <input
                type="text"
                placeholder="Search fireworks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search fireworks products"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-orange-400"
              />
            </div>

            <div>
              <h2 className="text-white font-bold mb-4 flex items-center gap-2"><Filter size={18} /> Product Collection</h2>
              <div className="space-y-2">
                {PRODUCT_FILTERS.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedFilter(filter.id)}
                    className={`block w-full text-left px-4 py-2 rounded-lg transition-all duration-300 ${selectedFilter === filter.id ? 'bg-orange-500 text-white' : 'bg-white/10 text-gray-400 hover:text-white'}`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.aside>

          <main className="lg:col-span-3">
            <div className="mb-5 text-gray-400">Showing {filteredProducts.length} {selectedFilter} product{filteredProducts.length === 1 ? '' : 's'}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, idx) => (
                <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}>
                  <ProductCard product={product} isFavorite={favorites.includes(product.id)} onFavoriteToggle={() => toggleFavorite(product.id)} theme={theme} />
                </motion.div>
              ))}
            </div>
            {filteredProducts.length === 0 && <div className="text-center py-12"><p className="text-gray-400 text-lg">No products found. Try another search.</p></div>}
          </main>
        </div>
      </div>
    </div>
  );
};
