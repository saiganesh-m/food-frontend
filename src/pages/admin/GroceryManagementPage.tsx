import React, { useState } from 'react';
import { Plus, Search, Filter, Edit2, Trash2, Grid, List } from 'lucide-react';
import Modal from '../../components/ui/Modal';
import Badge from '../../components/ui/Badge';
import GroceryItemForm from '../../components/admin/GroceryItemForm';

interface GroceryItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  bulkStock: number;
  bulkUnit: string;
  packageSize: number;
  packageUnit: string;
  isAvailable: boolean;
}

const GroceryManagementPage: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<GroceryItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>([
    {
      id: '1',
      name: 'Basmati Rice',
      description: 'Premium quality long-grain basmati rice',
      price: 24.99,
      category: 'grains',
      image: 'https://example.com/basmati-rice.jpg',
      bulkStock: 100,
      bulkUnit: 'kg',
      packageSize: 1,
      packageUnit: 'kg',
      isAvailable: true
    }
  ]);

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'grains', label: 'Grains' },
    { id: 'spices', label: 'Spices' },
    { id: 'lentils', label: 'Lentils' },
    { id: 'flours', label: 'Flours' },
    { id: 'oils', label: 'Oils' }
  ];

  const filteredItems = groceryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddItem = (item: Omit<GroceryItem, 'id'>) => {
    // Generate a unique ID (in a real app, this would come from the backend)
    const newId = (Math.max(...groceryItems.map(i => parseInt(i.id))) + 1).toString();
    const newItem = { ...item, id: newId };
    
    // Update the grocery items state
    setGroceryItems(prev => [...prev, newItem]);
    
    // Close the modal
    setIsAddModalOpen(false);
    
    // Log the action (replace with actual API call)
    console.log('Adding item:', newItem);
  };

  const handleEditItem = (item: GroceryItem) => {
    // Update the grocery items state
    setGroceryItems(prev => prev.map(i => i.id === item.id ? item : i));
    
    // Close the modal and clear selection
    setIsEditModalOpen(false);
    setSelectedItem(null);
    
    // Log the action (replace with actual API call)
    console.log('Editing item:', item);
  };

  const handleDeleteItem = (id: string) => {
    // Update the grocery items state
    setGroceryItems(prev => prev.filter(item => item.id !== id));
    
    // Log the action (replace with actual API call)
    console.log('Deleting item:', id);
  };

  const calculateAvailablePackages = (item: GroceryItem) => {
    const bulkInGrams = item.bulkUnit === 'kg' ? item.bulkStock * 1000 : item.bulkStock;
    const packageInGrams = item.packageUnit === 'kg' ? item.packageSize * 1000 : item.packageSize;
    return Math.floor(bulkInGrams / packageInGrams);
  };

  return (
    <div className="p-4 md:p-6 w-full">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 md:gap-0 mb-4 md:mb-6 w-full">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 md:mb-0">Grocery Management</h1>
        <div className="flex sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
          <div className="flex items-center bg-white rounded-md sm:rounded-lg border border-gray-200 p-1 w-full sm:w-auto justify-center">
            <button
              onClick={() => setViewMode('card')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'card' 
                  ? 'bg-green-50 text-green-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'table' 
                  ? 'bg-green-50 text-green-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center justify-center px-3 sm:px-4 py-2 text-sm sm:text-base bg-green-600 text-white rounded-md sm:rounded-lg hover:bg-green-700 transition-colors w-full sm:w-auto"
          >
            <Plus className="w-5 h-5 mr-2" />
            <span className="hidden xs:inline">Add New Item</span>
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
                placeholder="Search grocery items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <select
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grocery Items Display */}
      {viewMode === 'card' ? (
        // Card View
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => {
            const availablePackages = calculateAvailablePackages(item);
            return (
              <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="default">
                      {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                    </Badge>
                    <Badge variant={availablePackages > 10 ? 'success' : availablePackages > 0 ? 'warning' : 'error'}>
                      {availablePackages} packages
                    </Badge>
                    <Badge variant={item.isAvailable ? 'success' : 'error'}>
                      {item.isAvailable ? 'Available' : 'Unavailable'}
                    </Badge>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Price per package:</span>
                      <span className="font-medium text-gray-900">${item.price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Package size:</span>
                      <span className="font-medium text-gray-900">{item.packageSize} {item.packageUnit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Bulk stock:</span>
                      <span className="font-medium text-gray-900">{item.bulkStock} {item.bulkUnit}</span>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 pt-2 border-t border-gray-100">
                    <button
                      onClick={() => {
                        setSelectedItem(item);
                        setIsEditModalOpen(true);
                      }}
                      className="p-2 text-green-600 hover:text-green-900 hover:bg-green-50 rounded-md transition-colors"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-md transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        // Table View
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">S.No</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">Item</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">Package Size</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">Bulk Stock</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">Available Packages</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredItems.map((item, idx) => {
                  const availablePackages = calculateAvailablePackages(item);
                  return (
                    <tr key={item.id} className="hover:bg-green-50 transition-colors">
                      <td className="px-6 py-4 text-center text-sm align-middle">{idx + 1}</td>
                      <td className="px-6 py-4 text-center text-sm align-middle">
                        <div className="flex items-center justify-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-lg object-cover"
                              src={item.image}
                              alt={item.name}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{item.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center text-sm align-middle">
                        <Badge variant="default">
                          {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-center text-sm align-middle text-gray-900">
                        ${item.price.toFixed(2)}/package
                      </td>
                      <td className="px-6 py-4 text-center text-sm align-middle text-gray-900">
                        {item.packageSize} {item.packageUnit}
                      </td>
                      <td className="px-6 py-4 text-center text-sm align-middle text-gray-900">
                        {item.bulkStock} {item.bulkUnit}
                      </td>
                      <td className="px-6 py-4 text-center text-sm align-middle">
                        <Badge variant={availablePackages > 10 ? 'success' : availablePackages > 0 ? 'warning' : 'error'}>
                          {availablePackages} packages
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-center text-sm align-middle">
                        <Badge variant={item.isAvailable ? 'success' : 'error'}>
                          {item.isAvailable ? 'Available' : 'Unavailable'}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right text-sm align-middle space-x-2">
                        <button
                          onClick={() => {
                            setSelectedItem(item);
                            setIsEditModalOpen(true);
                          }}
                          className="text-green-600 hover:text-green-900"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Item Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Grocery Item</h2>
        <GroceryItemForm
          onSubmit={handleAddItem}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      {/* Edit Item Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => {
        setIsEditModalOpen(false);
        setSelectedItem(null);
      }}>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Grocery Item</h2>
        {selectedItem && (
          <GroceryItemForm
            initialData={selectedItem}
            onSubmit={handleEditItem}
            onCancel={() => {
              setIsEditModalOpen(false);
              setSelectedItem(null);
            }}
          />
        )}
      </Modal>
    </div>
  );
};

export default GroceryManagementPage; 