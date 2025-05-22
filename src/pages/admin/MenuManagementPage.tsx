import React, { useState } from 'react';
import { Plus, Search, Filter, Edit2, Trash2, Grid, List } from 'lucide-react';
import Modal from '../../components/ui/Modal';
import Badge from '../../components/ui/Badge';
import MenuItemForm from '../../components/admin/MenuItemForm';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'lunch-box' | 'cloud-kitchen' | 'party-orders';
  type: 'vegetarian' | 'chicken' | 'egg';
  image: string;
  isAvailable: boolean;
}

const MenuManagementPage: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeType, setActiveType] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: '1',
      name: 'Butter Chicken',
      description: 'Tender chicken in a rich, creamy tomato-based curry',
      price: 12.99,
      category: 'cloud-kitchen',
      type: 'chicken',
      image: 'https://example.com/butter-chicken.jpg',
      isAvailable: true
    }
  ]);

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'lunch-box', label: 'Lunch Box' },
    { id: 'cloud-kitchen', label: 'Cloud Kitchen' },
    { id: 'party-orders', label: 'Party Orders' }
  ];

  const types = [
    { id: 'all', label: 'All Types' },
    { id: 'vegetarian', label: 'Vegetarian' },
    { id: 'chicken', label: 'Non-Veg' },
    { id: 'egg', label: 'Egg' }
  ];

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesType = activeType === 'all' || item.type === activeType;
    return matchesSearch && matchesCategory && matchesType;
  });

  const handleAddItem = (item: Omit<MenuItem, 'id'>) => {
    // Generate a unique ID (in a real app, this would come from the backend)
    const newId = (Math.max(...menuItems.map(i => parseInt(i.id))) + 1).toString();
    const newItem = { ...item, id: newId };
    
    // Update the menu items state
    setMenuItems(prev => [...prev, newItem]);
    
    // Close the modal
    setIsAddModalOpen(false);
    
    // Log the action (replace with actual API call)
    console.log('Adding item:', newItem);
  };

  const handleEditItem = (item: Omit<MenuItem, 'id'>) => {
    if (!selectedItem) return;
    
    // Create the updated item with the original ID
    const updatedItem = {
      ...item,
      id: selectedItem.id
    };
    
    // Update the menu items state
    setMenuItems(prev => prev.map(i => i.id === selectedItem.id ? updatedItem : i));
    
    // Close the modal and clear selection
    setIsEditModalOpen(false);
    setSelectedItem(null);
    
    // Log the action (replace with actual API call)
    console.log('Updating item:', updatedItem);
  };

  const handleDeleteItem = (id: string) => {
    // Update the menu items state
    setMenuItems(prev => prev.filter(item => item.id !== id));
    
    // Log the action (replace with actual API call)
    console.log('Deleting item:', id);
  };

  return (
    <div className="p-2 sm:p-4 md:p-6 w-full max-w-full overflow-x-hidden">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 md:gap-0 mb-4 md:mb-6 w-full">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 md:mb-0">Menu Management</h1>
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
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center justify-center px-3 sm:px-4 py-2 text-sm sm:text-base bg-orange-600 text-white rounded-md sm:rounded-lg hover:bg-orange-700 transition-colors w-full sm:w-auto"
            >
              <Plus className="w-5 h-5 mr-2" />
              <span className="hidden xs:inline">Add New Item</span>
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
                placeholder="Search menu items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <select
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
            
            <select
              value={activeType}
              onChange={(e) => setActiveType(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              {types.map(type => (
                <option key={type.id} value={type.id}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Menu Items Display */}
      {viewMode === 'card' ? (
        // Card View
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
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
                    {item.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </Badge>
                  <Badge variant={item.type === 'vegetarian' ? 'success' : 'warning'}>
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </Badge>
                  <Badge variant={item.isAvailable ? 'success' : 'error'}>
                    {item.isAvailable ? 'Available' : 'Unavailable'}
                  </Badge>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                  <span className="text-lg font-medium text-gray-900">
                    ${item.price.toFixed(2)}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setSelectedItem(item);
                        setIsEditModalOpen(true);
                      }}
                      className="p-2 text-orange-600 hover:text-orange-900 hover:bg-orange-50 rounded-md transition-colors"
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
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">Item</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredItems.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-orange-50 transition-colors">
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
                        {item.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-center text-sm align-middle">
                      <Badge variant={item.type === 'vegetarian' ? 'success' : 'warning'}>
                        {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-center text-sm align-middle text-gray-900">
                      ${item.price.toFixed(2)}
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
                        className="text-orange-600 hover:text-orange-900"
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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Item Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Menu Item</h2>
        <MenuItemForm
          onSubmit={handleAddItem}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      {/* Edit Item Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => {
        setIsEditModalOpen(false);
        setSelectedItem(null);
      }}>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Menu Item</h2>
        {selectedItem && (
          <MenuItemForm
            initialData={selectedItem}
            onSubmit={handleEditItem}
            onCancel={() => {
              setIsEditModalOpen(false);
              setSelectedItem(null);
            }}
            availableItems={menuItems}
          />
        )}
      </Modal>
    </div>
  );
};

export default MenuManagementPage; 