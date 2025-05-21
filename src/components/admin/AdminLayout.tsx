import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  ShoppingBag, 
  ClipboardList, 
  Users as UsersIcon,
  Settings,
  LogOut,
  Eye
} from 'lucide-react';

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const menuItems = [
    { 
      icon: <LayoutDashboard className="w-5 h-5" />, 
      label: 'Dashboard', 
      path: '/admin' 
    },
    { 
      icon: <UtensilsCrossed className="w-5 h-5" />, 
      label: 'Menu Management', 
      path: '/admin/menu' 
    },
    { 
      icon: <ShoppingBag className="w-5 h-5" />, 
      label: 'Grocery Management', 
      path: '/admin/groceries' 
    },
    { 
      icon: <ClipboardList className="w-5 h-5" />, 
      label: 'Orders', 
      path: '/admin/orders' 
    },
    { 
      icon: <UsersIcon className="w-5 h-5" />, 
      label: 'Users', 
      path: '/admin/users' 
    },
    { 
      icon: <Settings className="w-5 h-5" />, 
      label: 'Settings', 
      path: '/admin/settings' 
    },
  ];

  const handleViewAsUser = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className={`fixed md:static z-30 top-0 left-0 h-full md:h-screen w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:relative md:flex md:flex-col md:min-h-screen`}>
        <div className="h-16 flex items-center px-6 border-b border-gray-200 justify-between">
          <h1 className="text-xl font-bold text-orange-500">FeastBox Admin</h1>
          <button
            className="md:hidden text-gray-500 hover:text-orange-500 focus:outline-none"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <nav className="flex-1 flex flex-col justify-between p-4 pb-8">
          <div>
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                    className={
                      `flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors ${location.pathname === item.path ? 'bg-orange-50 text-orange-600' : 'text-gray-700 hover:bg-gray-50'}`
                    }
                    onClick={() => setSidebarOpen(false)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          </div>
          <div className="pt-4 mt-4 border-t border-gray-200 space-y-2">
            <button 
              onClick={handleViewAsUser}
              className="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 w-full"
            >
              <Eye className="w-5 h-5" />
              <span>View as User</span>
            </button>
            <button className="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 w-full">
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </aside>
      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-20 md:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}
      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen">
        <div className="h-16 bg-white border-b border-gray-200 flex items-center px-6 justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            {menuItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
          </h2>
          <button
            className="md:hidden text-gray-500 hover:text-orange-500 focus:outline-none"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>
        <div className="p-2 sm:p-4 md:p-6 w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;