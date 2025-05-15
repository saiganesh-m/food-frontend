import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, ShoppingBag, DollarSign, TrendingUp } from 'lucide-react';

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

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card, index) => (
          <div 
            key={index}
            className={`${card.bgColor} rounded-xl p-6 shadow-sm border border-gray-100`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${card.bgColor} p-3 rounded-lg`}>
                {card.icon}
              </div>
              <span className={`${card.textColor} text-sm font-medium`}>
                Last 30 days
              </span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-2">{card.title}</h3>
            <p className="text-2xl font-bold text-gray-900">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Orders Overview</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.recentOrders}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="orders" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;