import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import { Users, ShoppingBag, DollarSign, TrendingUp, ArrowUp, ArrowDown } from 'lucide-react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import CountUp from 'react-countup';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const DashboardPage: React.FC = () => {
  // Sample data for charts
  const revenueData = [
    { name: 'Jan', revenue: 4500 },
    { name: 'Feb', revenue: 5200 },
    { name: 'Mar', revenue: 4800 },
    { name: 'Apr', revenue: 6000 },
    { name: 'May', revenue: 5500 },
    { name: 'Jun', revenue: 6500 },
  ];

  const ordersByCategory = [
    { name: 'Lunch Box', value: 35 },
    { name: 'Cloud Kitchen', value: 45 },
    { name: 'Party Orders', value: 20 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  const stats = {
    totalOrders: {
      value: 1247,
      change: 12.5,
      isPositive: true
    },
    totalRevenue: {
      value: 84920,
      change: 8.2,
      isPositive: true
    },
    totalUsers: {
      value: 892,
      change: 5.1,
      isPositive: true
    },
    averageOrderValue: {
      value: 68.1,
      change: -2.3,
      isPositive: false
    }
  };

  const recentOrders = [
    {
      id: 'ORD001',
      customer: 'John Doe',
      items: '2x Butter Chicken, 1x Naan',
      total: 35.97,
      status: 'Pending',
      date: new Date().toISOString()
    },
    {
      id: 'ORD002',
      customer: 'Jane Smith',
      items: '1x Party Platter',
      total: 89.99,
      status: 'Confirmed',
      date: new Date().toISOString()
    },
    {
      id: 'ORD003',
      customer: 'Mike Johnson',
      items: '3x Veg Thali',
      total: 45.00,
      status: 'Delivered',
      date: new Date().toISOString()
    }
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  const StatCard = ({ title, value, change, icon: Icon }: any) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 rounded-lg bg-blue-50">
          <Icon className="w-6 h-6 text-blue-500" />
        </div>
        <div className={`flex items-center ${change.isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {change.isPositive ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
          <span className="ml-1">{Math.abs(change.value)}%</span>
        </div>
      </div>
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <div className="mt-2 flex items-baseline">
        <div className="text-2xl font-semibold text-gray-900">
          {typeof value === 'number' && value > 100 
            ? <CountUp end={value} duration={2} separator="," />
            : value}
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Orders"
          value={stats.totalOrders.value}
          change={{ value: stats.totalOrders.change, isPositive: stats.totalOrders.isPositive }}
          icon={ShoppingBag}
        />
        <StatCard
          title="Total Revenue"
          value={formatCurrency(stats.totalRevenue.value)}
          change={{ value: stats.totalRevenue.change, isPositive: stats.totalRevenue.isPositive }}
          icon={DollarSign}
        />
        <StatCard
          title="Total Users"
          value={stats.totalUsers.value}
          change={{ value: stats.totalUsers.change, isPositive: stats.totalUsers.isPositive }}
          icon={Users}
        />
        <StatCard
          title="Average Order Value"
          value={formatCurrency(stats.averageOrderValue.value)}
          change={{ value: stats.averageOrderValue.change, isPositive: stats.averageOrderValue.isPositive }}
          icon={TrendingUp}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue Overview</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3B82F6"
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Orders by Category */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Orders by Category</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ordersByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {ordersByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.items}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(order.total)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                          order.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' : 
                          'bg-green-100 text-green-800'}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;