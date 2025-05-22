import React, { useState } from 'react';
import { Search, Filter, Eye, CheckCircle, XCircle, Clock, Grid, List, ShoppingBag, Edit2 } from 'lucide-react';
import Modal from '../../components/ui/Modal';
import Badge from '../../components/ui/Badge';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  orderType: 'delivery' | 'pickup';
  address?: string;
  createdAt: string;
  updatedAt: string;
  category?: string;
}

const OrdersManagementPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStatus, setActiveStatus] = useState<string>('all');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
  const [orderDate, setOrderDate] = useState('');

  // Sample data - replace with actual API calls
  const orders: Order[] = [
    {
      id: 'ORD001',
      customerName: 'John Doe',
      customerEmail: 'john@example.com',
      customerPhone: '+1234567890',
      items: [
        { id: '1', name: 'Butter Chicken', quantity: 2, price: 12.99 },
        { id: '2', name: 'Naan', quantity: 4, price: 2.99 }
      ],
      totalAmount: 33.94,
      status: 'pending',
      orderType: 'delivery',
      address: '123 Main St, City, Country',
      createdAt: '2024-03-15T10:30:00Z',
      updatedAt: '2024-03-15T10:30:00Z',
      category: 'lunch-box'
    }
  ];

  // Only allow these three statuses
  const statuses = [
    { id: 'pending', label: 'Pending' },
    { id: 'completed', label: 'Completed' },
    { id: 'cancelled', label: 'Cancelled' },
  ];

  // Add category filter state and options
  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'lunch-box', label: 'Lunch Box' },
    { id: 'cloud-kitchen', label: 'Cloud Kitchen' },
    { id: 'party-orders', label: 'Party Orders' },
    { id: 'groceries', label: 'Groceries' },
  ];

  // Local state for orders (so we can update status instantly)
  const [ordersState, setOrdersState] = useState<Order[]>(orders);

  const getStatusColor = (status: Order['status']) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'warning';
      case 'completed': return 'success';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'preparing': return <Clock className="w-4 h-4" />;
      case 'ready': return <CheckCircle className="w-4 h-4" />;
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  const filteredOrders = ordersState.filter(order => {
    const matchesSearch = 
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = activeStatus === 'all' || order.status === activeStatus;
    const orderCategory = order.category || 'lunch-box';
    const matchesCategory = activeCategory === 'all' || orderCategory === activeCategory;
    // Single date filter
    const matchesDate = orderDate ? (new Date(order.createdAt).toISOString().slice(0, 10) === orderDate) : true;
    return matchesSearch && matchesStatus && matchesCategory && matchesDate;
  });

  const handleUpdateStatus = (orderId: string, newStatus: Order['status']) => {
    setOrdersState(prev => prev.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    setSelectedOrder(prev => prev ? { ...prev, status: newStatus } : prev);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="p-4 md:p-6 w-full">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 md:gap-0 mb-4 md:mb-6 w-full">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 md:mb-0">Orders Management</h1>
        <div className="w-full md:w-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 px-4 py-3 flex flex-row items-center gap-4 w-full">
            <div className="flex items-center gap-2 flex-1">
              <input
                type="date"
                value={orderDate}
                onChange={e => setOrderDate(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm w-full min-w-[160px]"
                placeholder="Order Date"
              />
            </div>
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
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-1">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              <input
                type="text"
                placeholder="Search orders by customer name, email, or order ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-4 flex-1">
            <select
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
            <select
              value={activeStatus}
              onChange={(e) => setActiveStatus(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              {statuses.map(status => (
                <option key={status.id} value={status.id}>
                  {status.label.charAt(0).toUpperCase() + status.label.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Orders Display */}
      {viewMode === 'card' ? (
        // Card View
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Order #{order.id}</h3>
                    <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
                    <p className="text-xs text-gray-500 mt-1">Email: {order.customerEmail || 'N/A'}</p>
                    <p className="text-xs text-gray-500">Phone: {order.customerPhone || 'N/A'}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex gap-2">
                      <Badge variant="default">
                        {(order.category || 'Lunch Box').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                      </Badge>
                      <Badge variant={getStatusColor(order.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(order.status)}
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </div>
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Customer:</span>
                    <span className="font-medium text-gray-900">{order.customerName}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Order Type:</span>
                    <Badge variant="default">
                      {order.orderType.charAt(0).toUpperCase() + order.orderType.slice(1)}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Total Amount:</span>
                    <span className="font-medium text-gray-900">${order.totalAmount.toFixed(2)}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      {order.items.length} items
                    </div>
                    <button
                      onClick={() => {
                        setSelectedOrder(order);
                        setIsDetailsModalOpen(true);
                      }}
                      className="flex items-center text-sm text-orange-600 hover:text-orange-900 hover:bg-orange-50 px-3 py-1.5 rounded-md transition-colors"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Table View
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">S.No</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">Order</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">Items</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredOrders.map((order, idx) => (
                  <tr key={order.id} className="hover:bg-orange-50 transition-colors">
                    <td className="px-6 py-4 text-center text-sm align-middle">{idx + 1}</td>
                    <td className="px-6 py-4 text-center text-sm align-middle">
                      <div className="flex items-center justify-center">
                        <div className="h-10 w-10 flex-shrink-0 bg-orange-100 rounded-full flex items-center justify-center">
                          <ShoppingBag className="h-6 w-6 text-orange-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">#{order.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center text-sm align-middle text-gray-900">{order.customerName}</td>
                    <td className="px-6 py-4 text-center text-sm align-middle text-gray-500">{order.items.length} items</td>
                    <td className="px-6 py-4 text-center text-sm align-middle text-gray-900">${order.totalAmount.toFixed(2)}</td>
                    <td className="px-6 py-4 text-center text-sm align-middle">
                      <Badge variant={getStatusColor(order.status)}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-center text-sm align-middle text-gray-500">{formatDate(order.createdAt)}</td>
                    <td className="px-6 py-4 text-right text-sm align-middle space-x-2">
                      <button
                        onClick={() => { setSelectedOrder(order); setIsDetailsModalOpen(true); }}
                        className="text-orange-600 hover:text-orange-900"
                      >
                        <Eye className="w 5 h 5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      <Modal isOpen={isDetailsModalOpen} onClose={() => {
        setIsDetailsModalOpen(false);
        setSelectedOrder(null);
      }}>
        {selectedOrder && (
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
                <p className="text-sm text-gray-500">Order ID: {selectedOrder.id}</p>
              </div>
              <Badge variant={getStatusColor(selectedOrder.status)}>
                <div className="flex items-center gap-1">
                  {getStatusIcon(selectedOrder.status)}
                  {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                </div>
              </Badge>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Customer Information</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <p className="text-sm"><span className="font-medium">Name:</span> {selectedOrder.customerName}</p>
                  <p className="text-sm"><span className="font-medium">Email:</span> {selectedOrder.customerEmail}</p>
                  <p className="text-sm"><span className="font-medium">Phone:</span> {selectedOrder.customerPhone}</p>
                  {selectedOrder.address && (
                    <p className="text-sm"><span className="font-medium">Address:</span> {selectedOrder.address}</p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Order Information</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <p className="text-sm"><span className="font-medium">Order Type:</span> {selectedOrder.orderType}</p>
                  <p className="text-sm"><span className="font-medium">Created:</span> {formatDate(selectedOrder.createdAt)}</p>
                  <p className="text-sm"><span className="font-medium">Last Updated:</span> {formatDate(selectedOrder.updatedAt)}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Order Items</h3>
              <div className="bg-gray-50 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Quantity</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Price</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {selectedOrder.items.map((item) => (
                      <tr key={item.id}>
                        <td className="px-4 py-2 text-sm text-gray-900">{item.name}</td>
                        <td className="px-4 py-2 text-sm text-gray-900 text-right">{item.quantity}</td>
                        <td className="px-4 py-2 text-sm text-gray-900 text-right">${item.price.toFixed(2)}</td>
                        <td className="px-4 py-2 text-sm text-gray-900 text-right">
                          ${(item.quantity * item.price).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-100">
                    <tr>
                      <td colSpan={3} className="px-4 py-2 text-sm font-medium text-gray-900 text-right">
                        Total Amount:
                      </td>
                      <td className="px-4 py-2 text-sm font-medium text-gray-900 text-right">
                        ${selectedOrder.totalAmount.toFixed(2)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Update Status</h3>
              <div className="flex gap-2">
                {statuses.map((status) => (
                  <button
                    key={status.id}
                    onClick={() => handleUpdateStatus(selectedOrder.id, status.id as Order['status'])}
                    disabled={selectedOrder.status === status.id}
                    className={`px-3 py-1 rounded-md text-sm font-medium ${
                      selectedOrder.status === status.id
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-orange-50 text-orange-700 hover:bg-orange-100'
                    }`}
                  >
                    {status.label.charAt(0).toUpperCase() + status.label.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default OrdersManagementPage; 