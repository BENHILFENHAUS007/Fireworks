import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Catalog } from '../pages/Catalog';
import { ProductDetail } from '../pages/ProductDetail';
import { Gallery } from '../pages/Gallery';
import { FAQ } from '../pages/FAQ';
import { Safety } from '../pages/Safety';
import { About } from '../pages/About';
import { Contact } from '../pages/Contact';
import { Shortlist } from '../pages/Shortlist';
import { BulkOrders } from '../pages/BulkOrders';
import { DiwaliOffers } from '../pages/DiwaliOffers';
import { Events } from '../pages/Events';

interface AppRouterProps {
  theme: any;
  favoritesCount: number;
}

export const AppRouter: React.FC<AppRouterProps> = ({ theme, favoritesCount }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home theme={theme} />} />
        <Route path="/catalog" element={<Catalog theme={theme} />} />
        <Route path="/product/:id" element={<ProductDetail theme={theme} />} />
        <Route path="/gallery" element={<Gallery theme={theme} />} />
        <Route path="/faq" element={<FAQ theme={theme} />} />
        <Route path="/safety" element={<Safety theme={theme} />} />
        <Route path="/about" element={<About theme={theme} />} />
        <Route path="/contact" element={<Contact theme={theme} />} />
        <Route path="/shortlist" element={<Shortlist theme={theme} />} />
        <Route path="/bulk" element={<BulkOrders theme={theme} />} />
        <Route path="/diwali" element={<DiwaliOffers theme={theme} />} />
        <Route path="/events" element={<Events theme={theme} />} />
      </Routes>
    </BrowserRouter>
  );
};
