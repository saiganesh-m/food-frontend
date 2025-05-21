import React, { useState } from 'react';
import { Clock, MapPin, Phone, Mail, Globe, CreditCard, Bell, Lock } from 'lucide-react';
import Modal from '../../components/ui/Modal';
import Badge from '../../components/ui/Badge';

interface BusinessHours {
  day: string;
  open: string;
  close: string;
  isOpen: boolean;
}

interface DeliverySettings {
  minOrderAmount: number;
  deliveryFee: number;
  freeDeliveryThreshold: number;
  deliveryRadius: number;
  estimatedDeliveryTime: number;
}

interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  orderUpdates: boolean;
  promotions: boolean;
  marketing: boolean;
}

interface Settings {
  businessName: string;
  businessEmail: string;
  businessPhone: string;
  businessAddress: string;
  website: string;
  currency: string;
  businessHours: BusinessHours[];
  deliverySettings: DeliverySettings;
  notificationSettings: NotificationSettings;
}

const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({
    businessName: 'Food Delivery',
    businessEmail: 'contact@fooddelivery.com',
    businessPhone: '+1234567890',
    businessAddress: '123 Main St, City, Country',
    website: 'www.fooddelivery.com',
    currency: 'USD',
    businessHours: [
      { day: 'Monday', open: '09:00', close: '22:00', isOpen: true },
      { day: 'Tuesday', open: '09:00', close: '22:00', isOpen: true },
      { day: 'Wednesday', open: '09:00', close: '22:00', isOpen: true },
      { day: 'Thursday', open: '09:00', close: '22:00', isOpen: true },
      { day: 'Friday', open: '09:00', close: '23:00', isOpen: true },
      { day: 'Saturday', open: '10:00', close: '23:00', isOpen: true },
      { day: 'Sunday', open: '10:00', close: '22:00', isOpen: true }
    ],
    deliverySettings: {
      minOrderAmount: 10,
      deliveryFee: 2.99,
      freeDeliveryThreshold: 30,
      deliveryRadius: 5,
      estimatedDeliveryTime: 45
    },
    notificationSettings: {
      emailNotifications: true,
      smsNotifications: true,
      orderUpdates: true,
      promotions: true,
      marketing: false
    }
  });

  const [activeTab, setActiveTab] = useState<'general' | 'hours' | 'delivery' | 'notifications'>('general');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Implement API call to save settings
      console.log('Saving settings:', settings);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleBusinessHoursChange = (day: string, field: keyof BusinessHours, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      businessHours: prev.businessHours.map(hour => 
        hour.day === day ? { ...hour, [field]: value } : hour
      )
    }));
  };

  const handleDeliverySettingsChange = (field: keyof DeliverySettings, value: number) => {
    setSettings(prev => ({
      ...prev,
      deliverySettings: { ...prev.deliverySettings, [field]: value }
    }));
  };

  const handleNotificationSettingsChange = (field: keyof NotificationSettings, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notificationSettings: { ...prev.notificationSettings, [field]: value }
    }));
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">
            Business Name
          </label>
          <input
            type="text"
            id="businessName"
            value={settings.businessName}
            onChange={(e) => setSettings(prev => ({ ...prev, businessName: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="businessEmail" className="block text-sm font-medium text-gray-700">
            Business Email
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              id="businessEmail"
              value={settings.businessEmail}
              onChange={(e) => setSettings(prev => ({ ...prev, businessEmail: e.target.value }))}
              className="block w-full pl-10 rounded-md border-gray-300 focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label htmlFor="businessPhone" className="block text-sm font-medium text-gray-700">
            Business Phone
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="tel"
              id="businessPhone"
              value={settings.businessPhone}
              onChange={(e) => setSettings(prev => ({ ...prev, businessPhone: e.target.value }))}
              className="block w-full pl-10 rounded-md border-gray-300 focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label htmlFor="businessAddress" className="block text-sm font-medium text-gray-700">
            Business Address
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="businessAddress"
              value={settings.businessAddress}
              onChange={(e) => setSettings(prev => ({ ...prev, businessAddress: e.target.value }))}
              className="block w-full pl-10 rounded-md border-gray-300 focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label htmlFor="website" className="block text-sm font-medium text-gray-700">
            Website
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Globe className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="url"
              id="website"
              value={settings.website}
              onChange={(e) => setSettings(prev => ({ ...prev, website: e.target.value }))}
              className="block w-full pl-10 rounded-md border-gray-300 focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label htmlFor="currency" className="block text-sm font-medium text-gray-700">
            Currency
          </label>
          <select
            id="currency"
            value={settings.currency}
            onChange={(e) => setSettings(prev => ({ ...prev, currency: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="INR">INR (₹)</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderBusinessHours = () => (
    <div className="space-y-4">
      {settings.businessHours.map((hour) => (
        <div key={hour.day} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="w-32">
            <span className="text-sm font-medium text-gray-900">{hour.day}</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="time"
              value={hour.open}
              onChange={(e) => handleBusinessHoursChange(hour.day, 'open', e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
            />
            <span className="text-gray-500">to</span>
            <input
              type="time"
              value={hour.close}
              onChange={(e) => handleBusinessHoursChange(hour.day, 'close', e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={hour.isOpen}
              onChange={(e) => handleBusinessHoursChange(hour.day, 'isOpen', e.target.checked)}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <label className="ml-2 text-sm text-gray-700">Open</label>
          </div>
        </div>
      ))}
    </div>
  );

  const renderDeliverySettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="minOrderAmount" className="block text-sm font-medium text-gray-700">
            Minimum Order Amount
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              id="minOrderAmount"
              value={settings.deliverySettings.minOrderAmount}
              onChange={(e) => handleDeliverySettingsChange('minOrderAmount', parseFloat(e.target.value))}
              className="block w-full pl-7 rounded-md border-gray-300 focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label htmlFor="deliveryFee" className="block text-sm font-medium text-gray-700">
            Delivery Fee
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              id="deliveryFee"
              value={settings.deliverySettings.deliveryFee}
              onChange={(e) => handleDeliverySettingsChange('deliveryFee', parseFloat(e.target.value))}
              className="block w-full pl-7 rounded-md border-gray-300 focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label htmlFor="freeDeliveryThreshold" className="block text-sm font-medium text-gray-700">
            Free Delivery Threshold
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              id="freeDeliveryThreshold"
              value={settings.deliverySettings.freeDeliveryThreshold}
              onChange={(e) => handleDeliverySettingsChange('freeDeliveryThreshold', parseFloat(e.target.value))}
              className="block w-full pl-7 rounded-md border-gray-300 focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label htmlFor="deliveryRadius" className="block text-sm font-medium text-gray-700">
            Delivery Radius (miles)
          </label>
          <input
            type="number"
            id="deliveryRadius"
            value={settings.deliverySettings.deliveryRadius}
            onChange={(e) => handleDeliverySettingsChange('deliveryRadius', parseFloat(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="estimatedDeliveryTime" className="block text-sm font-medium text-gray-700">
            Estimated Delivery Time (minutes)
          </label>
          <input
            type="number"
            id="estimatedDeliveryTime"
            value={settings.deliverySettings.estimatedDeliveryTime}
            onChange={(e) => handleDeliverySettingsChange('estimatedDeliveryTime', parseFloat(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
          />
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center">
          <Mail className="h-5 w-5 text-gray-400 mr-3" />
          <div>
            <label htmlFor="emailNotifications" className="text-sm font-medium text-gray-900">
              Email Notifications
            </label>
            <p className="text-sm text-gray-500">Receive notifications via email</p>
          </div>
        </div>
        <input
          type="checkbox"
          id="emailNotifications"
          checked={settings.notificationSettings.emailNotifications}
          onChange={(e) => handleNotificationSettingsChange('emailNotifications', e.target.checked)}
          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
        />
      </div>

      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center">
          <Phone className="h-5 w-5 text-gray-400 mr-3" />
          <div>
            <label htmlFor="smsNotifications" className="text-sm font-medium text-gray-900">
              SMS Notifications
            </label>
            <p className="text-sm text-gray-500">Receive notifications via SMS</p>
          </div>
        </div>
        <input
          type="checkbox"
          id="smsNotifications"
          checked={settings.notificationSettings.smsNotifications}
          onChange={(e) => handleNotificationSettingsChange('smsNotifications', e.target.checked)}
          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
        />
      </div>

      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center">
          <Bell className="h-5 w-5 text-gray-400 mr-3" />
          <div>
            <label htmlFor="orderUpdates" className="text-sm font-medium text-gray-900">
              Order Updates
            </label>
            <p className="text-sm text-gray-500">Receive notifications for order status changes</p>
          </div>
        </div>
        <input
          type="checkbox"
          id="orderUpdates"
          checked={settings.notificationSettings.orderUpdates}
          onChange={(e) => handleNotificationSettingsChange('orderUpdates', e.target.checked)}
          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
        />
      </div>

      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center">
          <CreditCard className="h-5 w-5 text-gray-400 mr-3" />
          <div>
            <label htmlFor="promotions" className="text-sm font-medium text-gray-900">
              Promotions
            </label>
            <p className="text-sm text-gray-500">Receive notifications about special offers and promotions</p>
          </div>
        </div>
        <input
          type="checkbox"
          id="promotions"
          checked={settings.notificationSettings.promotions}
          onChange={(e) => handleNotificationSettingsChange('promotions', e.target.checked)}
          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
        />
      </div>

      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center">
          <Globe className="h-5 w-5 text-gray-400 mr-3" />
          <div>
            <label htmlFor="marketing" className="text-sm font-medium text-gray-900">
              Marketing Communications
            </label>
            <p className="text-sm text-gray-500">Receive marketing and newsletter updates</p>
          </div>
        </div>
        <input
          type="checkbox"
          id="marketing"
          checked={settings.notificationSettings.marketing}
          onChange={(e) => handleNotificationSettingsChange('marketing', e.target.checked)}
          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
        />
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('general')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'general'
                  ? 'border-b-2 border-purple-500 text-purple-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              General
            </button>
            <button
              onClick={() => setActiveTab('hours')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'hours'
                  ? 'border-b-2 border-purple-500 text-purple-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Business Hours
            </button>
            <button
              onClick={() => setActiveTab('delivery')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'delivery'
                  ? 'border-b-2 border-purple-500 text-purple-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Delivery
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'notifications'
                  ? 'border-b-2 border-purple-500 text-purple-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Notifications
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'general' && renderGeneralSettings()}
          {activeTab === 'hours' && renderBusinessHours()}
          {activeTab === 'delivery' && renderDeliverySettings()}
          {activeTab === 'notifications' && renderNotificationSettings()}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage; 