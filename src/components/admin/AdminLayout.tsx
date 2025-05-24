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
  Eye,
  Menu,
  X
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
    <div className="min-h-screen h-screen flex flex-row bg-gray-50 overflow-hidden">
      {/* Mobile Topbar with Hamburger */}
      <div className="md:hidden flex items-center justify-between bg-white border-b border-gray-200 h-16 px-4 z-40 w-full fixed top-0 left-0">
        <h1 className="text-xl font-bold text-orange-500">FeastBox Admin</h1>
        <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none">
          <Menu className="w-6 h-6" />
        </button>
      </div>
      {/* Sidebar */}
      <aside className={`z-30 top-0 left-0 w-64 bg-white border-r border-gray-200 h-screen flex flex-col justify-between
        ${sidebarOpen ? 'fixed' : 'hidden'}
        md:static md:flex`} style={{ top: sidebarOpen ? 0 : undefined }}>
        <div>
          <div className="h-16 flex items-center px-6 border-b border-gray-200 relative">
          <h1 className="text-xl font-bold text-orange-500">FeastBox Admin</h1>
            {/* Close button for mobile sidebar */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none md:hidden"
              style={{ display: sidebarOpen ? 'block' : 'none' }}
            >
              <X className="w-6 h-6" />
            </button>
        </div>
          <nav className="flex-1 flex flex-col p-4 pb-8">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                    className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors ${location.pathname === item.path ? 'bg-orange-50 text-orange-600' : 'text-gray-700 hover:bg-gray-50'}`}
                    onClick={() => setSidebarOpen(false)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          </nav>
        </div>
        <div className="pt-4 mt-4 border-t border-gray-200 space-y-2 p-4">
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
      </aside>
      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-20 md:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}
      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto mt-16 md:mt-0">
        <div className="p-2 sm:p-4 md:p-6 w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;