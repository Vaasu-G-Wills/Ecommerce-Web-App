import { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import { OrderProvider } from './context/OrderContext';
import { CartProvider } from './context/CartContext';

import { Navbar } from './components/layout/Navbar';
import { MegaMenu } from './components/layout/MegaMenu';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/cart/CartDrawer';

import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrdersPage } from './pages/OrdersPage';
import { WishlistPage } from './pages/WishlistPage';
import { AccountPage } from './pages/AccountPage';

function AppRouter() {
  const [currentPath, setCurrentPath] = useState<string>(() => window.location.pathname || '/');
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState<boolean>(false);
  const [queryParams, setQueryParams] = useState<Record<string, string>>(() => {
    const params = new URLSearchParams(window.location.search);
    const result: Record<string, string> = {};
    params.forEach((val, key) => { result[key] = val; });
    return result;
  });

  const handleNavigate = (path: string, newParams?: Record<string, string>) => {
    const url = new URL(window.location.origin + path);
    if (newParams) {
      Object.entries(newParams).forEach(([k, v]) => url.searchParams.set(k, v));
    }
    window.history.pushState({}, '', url.toString());
    setCurrentPath(url.pathname);
    setIsMegaMenuOpen(false);
    
    const paramsResult: Record<string, string> = {};
    url.searchParams.forEach((val, key) => { paramsResult[key] = val; });
    setQueryParams(paramsResult);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
      const params = new URLSearchParams(window.location.search);
      const result: Record<string, string> = {};
      params.forEach((val, key) => { result[key] = val; });
      setQueryParams(result);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const renderPage = () => {
    if (currentPath.startsWith('/product/')) {
      const productId = currentPath.split('/product/')[1] || 'p1';
      return <ProductDetailPage productId={productId} onNavigate={handleNavigate} />;
    }
    if (currentPath.startsWith('/search')) {
      return <SearchPage queryParams={queryParams} onNavigate={handleNavigate} />;
    }
    if (currentPath.startsWith('/cart')) {
      return <CartPage onNavigate={handleNavigate} />;
    }
    if (currentPath.startsWith('/checkout')) {
      return <CheckoutPage onNavigate={handleNavigate} />;
    }
    if (currentPath.startsWith('/orders')) {
      return <OrdersPage onNavigate={handleNavigate} />;
    }
    if (currentPath.startsWith('/wishlist')) {
      return <WishlistPage onNavigate={handleNavigate} />;
    }
    if (currentPath.startsWith('/account')) {
      return <AccountPage onNavigate={handleNavigate} />;
    }
    return <HomePage onNavigate={handleNavigate} />;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--bg-main)', color: 'var(--text-main)' }}>
      <Navbar onOpenMegaMenu={() => setIsMegaMenuOpen(true)} onNavigate={handleNavigate} currentPath={currentPath} />
      <MegaMenu isOpen={isMegaMenuOpen} onClose={() => setIsMegaMenuOpen(false)} onNavigate={handleNavigate} />
      <CartDrawer onNavigate={handleNavigate} />
      
      <main style={{ flex: 1 }}>
        {renderPage()}
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <OrderProvider>
            <AppRouter />
          </OrderProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
