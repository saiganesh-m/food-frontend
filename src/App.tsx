import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import LunchBoxPage from './pages/LunchBoxPage';
import CloudKitchenPage from './pages/CloudKitchenPage';
import PartyOrdersPage from './pages/PartyOrdersPage';
import GroceriesPage from './pages/GroceriesPage';
import CartPage from './pages/CartPage';
import AdminLayout from './components/admin/AdminLayout';
import DashboardPage from './pages/admin/DashboardPage';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<DashboardPage />} />
                {/* Add other admin routes here */}
              </Route>

              {/* Customer Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/lunch-box" element={<LunchBoxPage />} />
              <Route path="/cloud-kitchen" element={<CloudKitchenPage />} />
              <Route path="/party-orders" element={<PartyOrdersPage />} />
              <Route path="/groceries" element={<GroceriesPage />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;