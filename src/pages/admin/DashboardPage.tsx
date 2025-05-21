import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, ShoppingBag, DollarSign, TrendingUp } from 'lucide-react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import CountUp from 'react-countup';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const DashboardPage: React.FC = () => {
  // Sample data - replace with actual data from your backend
  const stats = {
    totalOrders: 156,
    totalRevenue: 4325.50,
    totalUsers: 89,
    recentOrders: [
      { date: '2024-03-01', orders: 12 },
      { date: '2024-03-02', orders: 19 },
      { date: '2024-03-03', orders: 15 },
      { date: '2024-03-04', orders: 22 },
      { date: '2024-03-05', orders: 18 },
      { date: '2024-03-06', orders: 25 },
      { date: '2024-03-07', orders: 20 },
    ]
  };

  const cards = [
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: <ShoppingBag className="w-6 h-6 text-blue-600" />,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toFixed(2)}`,
      icon: <DollarSign className="w-6 h-6 text-green-600" />,
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: <Users className="w-6 h-6 text-purple-600" />,
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      title: 'Growth',
      value: '+12.5%',
      icon: <TrendingUp className="w-6 h-6 text-orange-600" />,
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    }
  ];

  const totalOrdersBreakdown = { pending: 20, completed: 120, cancelled: 16 };
  const todayOrdersBreakdown = { pending: 5, completed: 12, cancelled: 3 };
  const todayRecentOrders = [
    { id: "ORD001", customer: "John Doe", total: 33.94, status: "pending", date: "2024-03-15T10:30:00Z" },
    { id: "ORD002", customer: "Jane Smith", total: 45.50, status: "completed", date: "2024-03-15T09:45:00Z" },
    { id: "ORD003", customer: "Alice Johnson", total: 22.00, status: "cancelled", date: "2024-03-15T08:00:00Z" }
  ];

  const sum = (obj: Record<string, number>) => Object.values(obj).reduce((a, b) => a + b, 0);

  const formatDate = (dateString: string) => new Date(dateString).toLocaleString();

  const TotalOrdersCircular = () => {
    const total = sum(totalOrdersBreakdown);
    const percentage = total > 0 ? (totalOrdersBreakdown.completed / total) * 100 : 0;
    return (
      <div className="flex flex-col items-center">
        <div style={{ width: 120, height: 120 }}>
          <CircularProgressbar
            value={percentage}
            text={`${total}`}
            styles={buildStyles({ textSize: "16px", pathColor: "#3B82F6", textColor: "#1F2937" })}
          />
        </div>
        <div className="mt-2 text-sm text-gray-600">
          Pending: {totalOrdersBreakdown.pending} | Completed: {totalOrdersBreakdown.completed} | Cancelled: {totalOrdersBreakdown.cancelled}
        </div>
      </div>
    );
  };

  const TodayOrdersCircular = () => {
    const total = sum(todayOrdersBreakdown);
    const percentage = total > 0 ? (todayOrdersBreakdown.completed / total) * 100 : 0;
    return (
      <div className="flex flex-col items-center">
        <div style={{ width: 120, height: 120 }}>
          <CircularProgressbar
            value={percentage}
            text={`${total}`}
            styles={buildStyles({ textSize: "16px", pathColor: "#10B981", textColor: "#1F2937" })}
          />
        </div>
        <div className="mt-2 text-sm text-gray-600">
          Pending: {todayOrdersBreakdown.pending} | Completed: {todayOrdersBreakdown.completed} | Cancelled: {todayOrdersBreakdown.cancelled}
        </div>
      </div>
    );
  };

  const TodayRecentOrdersTable = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Today's Most Recent Orders</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">Total</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {todayRecentOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-center text-sm align-middle">{order.id}</td>
                <td className="px-6 py-4 text-center text-sm align-middle">{order.customer}</td>
                <td className="px-6 py-4 text-center text-sm align-middle">${order.total.toFixed(2)}</td>
                <td className="px-6 py-4 text-center text-sm align-middle">{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</td>
                <td className="px-6 py-4 text-center text-sm align-middle">{formatDate(order.date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Mock data for summary cards
  const summary = {
    orders: { total: 1247, weekly: 120, change: '+12.5%' },
    todayOrders: { total: 28, completed: 21, pending: 7 },
    revenue: { total: 8492, daily: 8492, weekly: 8492 }
  };

  // Mock data for food management
  const foodItems = [
    {
      id: '1',
      name: 'Butter Chicken',
      date: '25-Feb-2025',
      price: 12.99,
      image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg',
      description: 'Beef patty with fresh vegetables and special sauce',
      available: true
    },
    {
      id: '2',
      name: 'Fish Pulusu',
      date: '25-Feb-2025',
      price: 9.99,
      image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg',
      description: 'Fresh vegetables with feta cheese and olives',
      available: true
    },
    {
      id: '3',
      name: 'Chicken Biryani',
      date: '25-Feb-2025',
      price: 14.99,
      image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg',
      description: 'Traditional italian pizza with fresh basil',
      available: false
    }
  ];

  // Mock data for recent orders
  const recentOrders = [
    {
      id: '#ORD-001',
      customer: 'Sarah Johnson',
      items: '2x Classic Burger, 1x Greek Salad',
      total: 35.97,
      status: 'Pending'
    },
    {
      id: '#ORD-002',
      customer: 'Mike Thompson',
      items: '1x Margherita Pizza',
      total: 14.99,
      status: 'Processing'
    },
    {
      id: '#ORD-003',
      customer: 'Emily Davis',
      items: '2x Greek Salad',
      total: 19.98,
      status: 'Completed'
    }
  ];

  return (
    <div className="p-6 space-y-8 min-h-screen bg-gray-50">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Orders Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col gap-2 transition-transform hover:scale-[1.02] hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-500">Orders</div>
              <div className="text-2xl font-bold">
                <CountUp end={summary.orders.total} duration={1.2} /> <span className="text-base font-normal text-gray-500">(Total Orders)</span>
              </div>
              <div className="text-sm text-gray-500">
                <CountUp end={summary.orders.weekly} duration={1.2} /> (Weekly Orders)
              </div>
              <div className="text-green-600 text-xs font-semibold">{summary.orders.change} compared to yesterday</div>
            </div>
            <ShoppingBag className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        {/* Today's Orders Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col gap-2 transition-transform hover:scale-[1.02] hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-500">Today's Orders</div>
              <div className="text-2xl font-bold">
                <CountUp end={summary.todayOrders.total} duration={1.2} /> <span className="text-base font-normal text-gray-500">(Total Orders)</span>
              </div>
              <div className="flex gap-4 text-sm mt-1">
                <span className="text-green-600">
                  <CountUp end={summary.todayOrders.completed} duration={1.2} /> (Completed)
                </span>
                <span className="text-orange-500">
                  <CountUp end={summary.todayOrders.pending} duration={1.2} /> (Pending)
                </span>
              </div>
            </div>
            <div style={{ width: 80, height: 80 }} data-tooltip-id="today-orders-tooltip">
              <CircularProgressbar
                value={summary.todayOrders.completed / summary.todayOrders.total * 100}
                text={`${Math.round(summary.todayOrders.completed / summary.todayOrders.total * 100)}%`}
                styles={buildStyles({ textSize: "18px", pathColor: "#10B981", textColor: "#1F2937" })}
              />
              <ReactTooltip id="today-orders-tooltip" place="top" effect="solid">
                <div>
                  <div>Completed: {summary.todayOrders.completed}</div>
                  <div>Pending: {summary.todayOrders.pending}</div>
                  <div>Total: {summary.todayOrders.total}</div>
                </div>
              </ReactTooltip>
            </div>
          </div>
        </div>
        {/* Revenue Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col gap-2 transition-transform hover:scale-[1.02] hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-500">Revenue</div>
              <div className="text-2xl font-bold">
                $<CountUp end={summary.revenue.total} duration={1.2} separator="," /> <span className="text-base font-normal text-gray-500">(Total Revenue)</span>
              </div>
              <div className="text-sm text-gray-500">
                $<CountUp end={summary.revenue.daily} duration={1.2} separator="," /> (Daily Revenue)
              </div>
              <div className="text-sm text-gray-500">
                $<CountUp end={summary.revenue.weekly} duration={1.2} separator="," /> (Weekly Revenue)
              </div>
            </div>
            <DollarSign className="w-8 h-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Weekly Analytics Section (Bar Graph) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Weekly Analytics</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.recentOrders}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip cursor={{ fill: '#f3f4f6' }} />
              <Legend />
              <Bar dataKey="orders" fill="#3B82F6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
          <div className="flex gap-2">
            <select className="border border-gray-200 rounded-lg px-3 py-1 text-sm">
              <option>All Status</option>
              <option>Pending</option>
              <option>Processing</option>
              <option>Completed</option>
            </select>
            <select className="border border-gray-200 rounded-lg px-3 py-1 text-sm">
              <option>Today</option>
              <option>This Week</option>
              <option>This Month</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Items</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Total</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentOrders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors cursor-pointer">
                  <td className="px-6 py-4 text-sm align-middle">{order.id}</td>
                  <td className="px-6 py-4 text-sm align-middle">{order.customer}</td>
                  <td className="px-6 py-4 text-sm align-middle">{order.items}</td>
                  <td className="px-6 py-4 text-sm align-middle">${order.total.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm align-middle">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${order.status === 'Completed' ? 'bg-green-100 text-green-700' : order.status === 'Pending' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>{order.status}</span>
                  </td>
                  <td className="px-6 py-4 text-sm align-middle flex gap-2">
                    <button className="text-gray-400 hover:text-gray-700" data-tooltip-id={`view-${order.id}`}><i className="fas fa-eye"></i></button>
                    <ReactTooltip id={`view-${order.id}`} place="top" content="View Order" />
                    <button className="text-gray-400 hover:text-gray-700" data-tooltip-id={`delete-${order.id}`}><i className="fas fa-trash"></i></button>
                    <ReactTooltip id={`delete-${order.id}`} place="top" content="Delete Order" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;