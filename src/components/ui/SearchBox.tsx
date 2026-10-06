import { Search, X } from 'lucide-react';
import { useState, useMemo } from 'react';
import { Product } from '../../types';

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  allProducts: Product[];
  theme: any;
}

export const SearchBox: React.FC<SearchBoxProps> = ({
  value,
  onChange,
  allProducts,
  theme,
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestions = useMemo(() => {
    if (!value || value.length < 2) return [];
    const term = value.toLowerCase();
    return allProducts
      .filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.id.toLowerCase().includes(term)
      )
      .slice(0, 5);
  }, [value, allProducts]);

  return (
    <div className="relative">
      <div
        className="flex items-center gap-2 px-4 py-3 rounded-lg border-2 glass-effect"
        style={{ borderColor: theme.primaryColor }}
      >
        <Search size={20} style={{ color: theme.primaryColor }} />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Search products, tags..."
          className="flex-1 bg-transparent outline-none text-white placeholder-gray-500"
        />
        {value && (
          <button
            onClick={() => onChange('')}
            className="p-1 hover:bg-dark-bg rounded transition-colors"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          className="absolute top-full mt-2 w-full bg-dark-surface rounded-lg border border-gray-700 z-10 glass-effect shadow-xl"
        >
          {suggestions.map((product) => (
            <button
              key={product.id}
              onClick={() => {
                onChange(product.name);
                setShowSuggestions(false);
              }}
              className="w-full px-4 py-2 text-left hover:bg-dark-bg transition-colors border-b border-gray-800 last:border-b-0 text-sm"
            >
              <p className="font-semibold">{product.name}</p>
              <p className="text-xs opacity-60">{product.id}</p>
            </button>
          ))}
        </div>
      )}

      {showSuggestions && suggestions.length === 0 && value && (
        <div
          className="absolute top-full mt-2 w-full bg-dark-surface rounded-lg p-4 text-center text-gray-500"
          onMouseLeave={() => setShowSuggestions(false)}
        >
          No products found
        </div>
      )}
    </div>
  );
};
