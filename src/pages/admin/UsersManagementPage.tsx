import React, { useState } from 'react';
import { Search, Filter, Eye, Edit2, Shield, User, Mail, Phone, MapPin } from 'lucide-react';
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

  return (
    <div className="p-4 md:p-6 w-full">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 md:gap-0 mb-4 md:mb-6 w-full">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 md:mb-0">Users Management</h1>
        <div className="flex sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
          <button
            type="button"
            className="flex items-center justify-center px-3 sm:px-4 py-2 text-sm sm:text-base bg-purple-600 text-white rounded-md sm:rounded-lg hover:bg-purple-700 transition-colors w-full sm:w-auto"
            disabled
          >
            <User className="w-5 h-5 mr-2" />
            <span className="hidden xs:inline">Add User</span>
            <span className="inline xs:hidden">Add</span>
          </button>
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
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <select
              value={activeRole}
              onChange={(e) => setActiveRole(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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

      {/* Users Table */}
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
                <tr key={user.id} className="hover:bg-purple-50 transition-colors">
                  <td className="px-6 py-4 text-center text-sm align-middle">{idx + 1}</td>
                  <td className="px-6 py-4 text-center text-sm align-middle">
                    <div className="flex items-center justify-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-purple-600" />
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
                      className="text-purple-600 hover:text-purple-900"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setIsEditModalOpen(true);
                      }}
                      className="text-purple-600 hover:text-purple-900"
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

      {/* User Details Modal */}
      <Modal isOpen={isDetailsModalOpen} onClose={() => {
        setIsDetailsModalOpen(false);
        setSelectedUser(null);
      }}>
        {selectedUser && (
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">User Details</h2>
                <p className="text-sm text-gray-500">User ID: {selectedUser.id}</p>
              </div>
              <div className="flex gap-2">
                <Badge variant={getRoleColor(selectedUser.role)}>
                  {selectedUser.role.charAt(0).toUpperCase() + selectedUser.role.slice(1)}
                </Badge>
                <Badge variant={getStatusColor(selectedUser.status)}>
                  {selectedUser.status.charAt(0).toUpperCase() + selectedUser.status.slice(1)}
                </Badge>
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

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Update Role</h3>
                <div className="flex gap-2">
                  {roles.filter(r => r.id !== 'all').map((role) => (
                    <button
                      key={role.id}
                      onClick={() => handleUpdateRole(selectedUser.id, role.id as User['role'])}
                      disabled={selectedUser.role === role.id}
                      className={`px-3 py-1 rounded-md text-sm font-medium ${
                        selectedUser.role === role.id
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                      }`}
                    >
                      {role.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Update Status</h3>
                <div className="flex gap-2">
                  {statuses.filter(s => s.id !== 'all').map((status) => (
                    <button
                      key={status.id}
                      onClick={() => handleUpdateStatus(selectedUser.id, status.id as User['status'])}
                      disabled={selectedUser.status === status.id}
                      className={`px-3 py-1 rounded-md text-sm font-medium ${
                        selectedUser.status === status.id
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                      }`}
                    >
                      {status.label}
                    </button>
                  ))}
                </div>
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
    </div>
  );
};

export default UsersManagementPage; 