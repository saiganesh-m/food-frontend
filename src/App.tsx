import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
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
import MenuManagementPage from './pages/admin/MenuManagementPage';
import GroceryManagementPage from './pages/admin/GroceryManagementPage';
import OrdersManagementPage from './pages/admin/OrdersManagementPage';
import UsersManagementPage from './pages/admin/UsersManagementPage';
import SettingsPage from './pages/admin/SettingsPage';
import { CartProvider } from './context/CartContext';
import { AuthModalProvider } from './context/AuthModalContext';
import { Toaster } from 'react-hot-toast';

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="menu" element={<MenuManagementPage />} />
            <Route path="groceries" element={<GroceryManagementPage />} />
            <Route path="orders" element={<OrdersManagementPage />} />
            <Route path="users" element={<UsersManagementPage />} />
            <Route path="settings" element={<SettingsPage />} />
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
      {!isAdmin && <Footer />}
      <Toaster position="top-right" />
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <AuthModalProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AuthModalProvider>
    </CartProvider>
  );
}

export default App;