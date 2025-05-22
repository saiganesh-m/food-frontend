import React, { useState } from 'react';
import { Search, Filter, Eye, Edit2, Shield, User, Mail, Phone, MapPin, Grid, List } from 'lucide-react';
import Modal from '../../components/ui/Modal';
import Badge from '../../components/ui/Badge';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'staff' | 'customer';
  status: 'active' | 'inactive' | 'suspended';
  address?: string;
  createdAt: string;
  lastLogin?: string;
  totalOrders: number;
}

const UsersManagementPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeRole, setActiveRole] = useState<string>('all');
  const [activeStatus, setActiveStatus] = useState<string>('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
  const [showPastOrdersModal, setShowPastOrdersModal] = useState(false);

  // Sample data - replace with actual API calls
  const users: User[] = [
    {
      id: 'USR001',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      role: 'customer',
      status: 'active',
      address: '123 Main St, City, Country',
      createdAt: '2024-01-15T10:30:00Z',
      lastLogin: '2024-03-15T08:45:00Z',
      totalOrders: 5
    }
  ];

  const roles = [
    { id: 'all', label: 'All Roles' },
    { id: 'admin', label: 'Admin' },
    { id: 'staff', label: 'Staff' },
    { id: 'customer', label: 'Customer' }
  ];

  const statuses = [
    { id: 'all', label: 'All Status' },
    { id: 'active', label: 'Active' },
    { id: 'inactive', label: 'Inactive' },
    { id: 'suspended', label: 'Suspended' }
  ];

  const getRoleColor = (role: User['role']) => {
    switch (role) {
      case 'admin': return 'error';
      case 'staff': return 'warning';
      case 'customer': return 'success';
      default: return 'default';
    }
  };

  const getStatusColor = (status: User['status']) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'warning';
      case 'suspended': return 'error';
      default: return 'default';
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = activeRole === 'all' || user.role === activeRole;
    const matchesStatus = activeStatus === 'all' || user.status === activeStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleUpdateRole = (userId: string, newRole: User['role']) => {
    // Implement API call to update user role
    console.log('Updating user role:', userId, newRole);
  };

  const handleUpdateStatus = (userId: string, newStatus: User['status']) => {
    // Implement API call to update user status
    console.log('Updating user status:', userId, newStatus);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  // Mock past orders for selected user
  const mockPastOrders = [
    {
      id: 'ORD-101',
      date: '2024-03-10T14:30:00Z',
      items: '2x Butter Chicken, 1x Naan',
      total: 35.97,
      status: 'Completed',
    },
    {
      id: 'ORD-099',
      date: '2024-02-28T18:10:00Z',
      items: '1x Veg Thali',
      total: 15.00,
      status: 'Completed',
    },
    {
      id: 'ORD-095',
      date: '2024-02-15T12:00:00Z',
      items: '1x Party Platter',
      total: 89.99,
      status: 'Cancelled',
    },
  ];

  return (
    <div className="p-4 md:p-6 w-full">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 md:gap-0 mb-4 md:mb-6 w-full">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 md:mb-0">Users Management</h1>
        <div className="w-full md:w-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 px-4 py-3 flex flex-row items-center gap-4 w-full">
            <div className="flex items-center bg-white rounded-md sm:rounded-lg border border-gray-200 p-1 justify-center">
              <button
                onClick={() => setViewMode('card')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'card' 
                    ? 'bg-orange-50 text-orange-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                aria-label="Card View"
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'table' 
                    ? 'bg-orange-50 text-orange-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                aria-label="Table View"
              >
                <List className="w-5 h-5" />
              </button>
            </div>
            <button
              type="button"
              className="flex items-center justify-center px-3 sm:px-4 py-2 text-sm sm:text-base bg-orange-600 text-white rounded-md sm:rounded-lg hover:bg-orange-700 transition-colors w-full sm:w-auto"
              disabled
            >
              <User className="w-5 h-5 mr-2" />
              <span className="hidden xs:inline">Add User</span>
              <span className="inline xs:hidden">Add</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search users by name, email, or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <select
              value={activeRole}
              onChange={(e) => setActiveRole(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              {roles.map(role => (
                <option key={role.id} value={role.id}>
                  {role.label}
                </option>
              ))}
            </select>

            <select
              value={activeStatus}
              onChange={(e) => setActiveStatus(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              {statuses.map(status => (
                <option key={status.id} value={status.id}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Users Card or Table View */}
      {viewMode === 'card' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUsers.map((user) => (
            <div key={user.id} className="bg-white rounded-xl shadow border border-gray-100 p-4 flex items-center gap-4 hover:shadow-md transition-all">
              <div className="flex-shrink-0 h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-orange-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-gray-900 truncate">{user.name}</div>
                <div className="text-xs text-gray-500 truncate">{user.email}</div>
                <div className="flex flex-wrap gap-1 mt-1">
                  <Badge variant={getRoleColor(user.role)}>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</Badge>
                  <Badge variant={getStatusColor(user.status)}>{user.status.charAt(0).toUpperCase() + user.status.slice(1)}</Badge>
                  <span className="text-xs text-gray-400 ml-2">Orders: <span className="font-medium text-gray-700">{user.totalOrders}</span></span>
                </div>
              </div>
              <div className="flex flex-col gap-2 ml-2">
                <button
                  onClick={() => { setSelectedUser(user); setIsDetailsModalOpen(true); }}
                  className="text-orange-600 hover:text-orange-900 p-2 rounded-full hover:bg-orange-50 transition-colors"
                  title="View"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => { setSelectedUser(user); setIsEditModalOpen(true); }}
                  className="text-orange-600 hover:text-orange-900 p-2 rounded-full hover:bg-orange-50 transition-colors"
                  title="Edit"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">S.No</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">User</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">Orders</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">Last Login</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUsers.map((user, idx) => (
                  <tr key={user.id} className="hover:bg-orange-50 transition-colors">
                    <td className="px-6 py-4 text-center text-sm align-middle">{idx + 1}</td>
                    <td className="px-6 py-4 text-center text-sm align-middle">
                      <div className="flex items-center justify-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-orange-100 rounded-full flex items-center justify-center">
                          <User className="h-6 w-6 text-orange-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-xs text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center text-sm align-middle">
                      <Badge variant={getRoleColor(user.role)}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-center text-sm align-middle">
                      <Badge variant={getStatusColor(user.status)}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-center text-sm align-middle text-gray-900">{user.totalOrders}</td>
                    <td className="px-6 py-4 text-center text-sm align-middle text-gray-500">{user.lastLogin ? formatDate(user.lastLogin) : 'Never'}</td>
                    <td className="px-6 py-4 text-right text-sm align-middle font-medium space-x-2">
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setIsDetailsModalOpen(true);
                        }}
                        className="text-orange-600 hover:text-orange-900"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setIsEditModalOpen(true);
                        }}
                        className="text-orange-600 hover:text-orange-900"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* User Details Modal */}
      <Modal isOpen={isDetailsModalOpen} onClose={() => {
        setIsDetailsModalOpen(false);
        setSelectedUser(null);
      }}>
        {selectedUser && (
          <div className="relative">
            <div className="space-y-6 pt-2">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 bg-orange-100 rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-orange-600" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-gray-900">{selectedUser.name}</div>
                    <div className="text-xs text-gray-500">{selectedUser.email}</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                  <Badge variant={getRoleColor(selectedUser.role)}>{selectedUser.role.charAt(0).toUpperCase() + selectedUser.role.slice(1)}</Badge>
                  <Badge variant={getStatusColor(selectedUser.status)}>{selectedUser.status.charAt(0).toUpperCase() + selectedUser.status.slice(1)}</Badge>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">User Information</h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                    <div className="flex items-center gap-2">
                      <User className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-900">{selectedUser.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-900">{selectedUser.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-900">{selectedUser.phone}</span>
                    </div>
                    {selectedUser.address && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-gray-400" />
                        <span className="text-sm text-gray-900">{selectedUser.address}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Account Information</h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Member Since</p>
                      <p className="text-sm font-medium text-gray-900">{formatDate(selectedUser.createdAt)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Last Login</p>
                      <p className="text-sm font-medium text-gray-900">
                        {selectedUser.lastLogin ? formatDate(selectedUser.lastLogin) : 'Never'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total Orders</p>
                      <p className="text-sm font-medium text-gray-900">{selectedUser.totalOrders}</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* View Past Orders Button */}
              <div className="flex justify-end">
                <button
                  className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium"
                  onClick={() => {
                    setIsDetailsModalOpen(false);
                    setTimeout(() => setShowPastOrdersModal(true), 200);
                  }}
                >
                  View Past Orders
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Edit User Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => {
        setIsEditModalOpen(false);
        setSelectedUser(null);
      }}>
        {selectedUser && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Edit User</h2>
            {/* Add edit form here */}
            <p className="text-gray-500">Edit form implementation pending...</p>
          </div>
        )}
      </Modal>

      {/* Past Orders Modal */}
      <Modal isOpen={showPastOrdersModal} onClose={() => setShowPastOrdersModal(false)}>
        <div className="relative">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Past Orders</h2>
          <div className="max-h-[400px] overflow-y-auto space-y-4">
            {mockPastOrders.map(order => (
              <div key={order.id} className="bg-gray-50 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border border-gray-100">
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">{order.id}</div>
                  <div className="text-xs text-gray-500">{new Date(order.date).toLocaleString()}</div>
                  <div className="text-sm text-gray-700 mt-1">{order.items}</div>
                </div>
                <div className="flex flex-col items-end gap-1 min-w-[120px]">
                  <div className="text-base font-bold text-gray-900">${order.total.toFixed(2)}</div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${order.status === 'Completed' ? 'bg-green-100 text-green-700' : order.status === 'Pending' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'}`}>{order.status}</span>
                </div>
              </div>
            ))}
            {mockPastOrders.length === 0 && (
              <div className="text-center text-gray-500 py-8">No past orders found.</div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UsersManagementPage; 