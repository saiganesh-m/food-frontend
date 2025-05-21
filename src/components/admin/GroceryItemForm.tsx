import React, { useState, useEffect, useRef } from 'react';

interface GroceryItem {
  id?: string;
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

interface GroceryItemFormProps {
  initialData?: GroceryItem;
  onSubmit: (data: Omit<GroceryItem, 'id'>) => void;
  onCancel: () => void;
}

const GroceryItemForm: React.FC<GroceryItemFormProps> = ({
  initialData,
  onSubmit,
  onCancel
}) => {
  const [formData, setFormData] = useState<Omit<GroceryItem, 'id'>>({
    name: '',
    description: '',
    price: 0,
    category: 'grains',
    image: '',
    bulkStock: 0,
    bulkUnit: 'kg',
    packageSize: 0,
    packageUnit: 'g',
    isAvailable: true
  });

  const [errors, setErrors] = useState<Partial<Record<keyof GroceryItem, string>>>({});
  const [imagePreview, setImagePreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    { id: 'grains', label: 'Grains' },
    { id: 'spices', label: 'Spices' },
    { id: 'lentils', label: 'Lentils' },
    { id: 'flours', label: 'Flours' },
    { id: 'oils', label: 'Oils' }
  ];

  const units = [
    { id: 'kg', label: 'Kilogram (kg)' },
    { id: 'g', label: 'Gram (g)' },
    { id: 'l', label: 'Liter (L)' },
    { id: 'ml', label: 'Milliliter (ml)' },
    { id: 'pcs', label: 'Pieces (pcs)' }
  ];

  useEffect(() => {
    if (initialData) {
      const { id, ...rest } = initialData;
      setFormData(rest);
      setImagePreview(rest.image);
    }
  }, [initialData]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof GroceryItem, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (formData.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }

    if (formData.bulkStock <= 0) {
      newErrors.bulkStock = 'Bulk stock must be greater than 0';
    }

    if (formData.packageSize <= 0) {
      newErrors.packageSize = 'Package size must be greater than 0';
    }

    if (!formData.image.trim() && !imagePreview) {
      newErrors.image = 'Image is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // If we have a file preview but no URL, we would normally upload the file here
      // and get back a URL. For now, we'll just use the preview URL
      const submitData = {
        ...formData,
        image: imagePreview || formData.image
      };
      onSubmit(submitData);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real application, you would upload the file to your server/storage
      // and get back a URL. For now, we'll create a local preview
      const reader = new FileReader();
      reader.onloadend = () => {
        const preview = reader.result as string;
        setImagePreview(preview);
        setFormData(prev => ({ ...prev, image: preview }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData(prev => ({ ...prev, image: value }));
    setImagePreview(value);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {/* Left Column: Basic Info and Image */}
        <div className="space-y-6 flex flex-col h-full">
          {/* Basic Information */}
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Basic Information</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-xs font-medium text-gray-700 mb-1">
                  Item Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Basmati Rice"
                  className={`block w-full px-3 py-2 rounded-md border ${errors.name ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm`}
                />
                {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="category" className="block text-xs font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="description" className="block text-xs font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={2}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Brief description of the item"
                  className={`block w-full px-3 py-2 rounded-md border ${errors.description ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm`}
                />
                {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description}</p>}
              </div>
              <div>
                <label htmlFor="image" className="block text-xs font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleImageUrlChange}
                  placeholder="Enter image URL"
                  className={`block w-full px-3 py-2 rounded-md border ${errors.image ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm`}
                />
                {errors.image && <p className="text-xs text-red-600 mt-2">{errors.image}</p>}
              </div>
            </div>
          </div>
        </div>
        {/* Right Column: Pricing, Stock, and Availability */}
        <div className="space-y-6 flex flex-col h-full">
          {/* Pricing and Stock */}
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Pricing & Stock</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="price" className="block text-xs font-medium text-gray-700 mb-1">
                  Price per Package
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={handleChange}
                    className={`block w-full pl-7 pr-3 py-2 rounded-md border ${errors.price ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm`}
                  />
                </div>
                {errors.price && <p className="mt-1 text-xs text-red-600">{errors.price}</p>}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Package Size</label>
                <div className="flex rounded-md shadow-sm">
                  <input
                    type="number"
                    name="packageSize"
                    min="0"
                    value={formData.packageSize}
                    onChange={handleChange}
                    className={`block w-full px-3 py-2 rounded-l-md border ${errors.packageSize ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm`}
                  />
                  <select
                    name="packageUnit"
                    value={formData.packageUnit}
                    onChange={handleChange}
                    className="block w-24 px-2 py-2 rounded-r-md border-l-0 border border-gray-300 bg-gray-50 text-gray-500 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    {units.map(unit => (
                      <option key={unit.id} value={unit.id}>{unit.label}</option>
                    ))}
                  </select>
                </div>
                {errors.packageSize && <p className="mt-1 text-xs text-red-600">{errors.packageSize}</p>}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Total Quantity</label>
                <div className="flex rounded-md shadow-sm">
                  <input
                    type="number"
                    name="bulkStock"
                    min="0"
                    value={formData.bulkStock}
                    onChange={handleChange}
                    className={`block w-full px-3 py-2 rounded-l-md border ${errors.bulkStock ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm`}
                  />
                  <select
                    name="bulkUnit"
                    value={formData.bulkUnit}
                    onChange={handleChange}
                    className="block w-24 px-2 py-2 rounded-r-md border-l-0 border border-gray-300 bg-gray-50 text-gray-500 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    {units.map(unit => (
                      <option key={unit.id} value={unit.id}>{unit.label}</option>
                    ))}
                  </select>
                </div>
                {errors.bulkStock && <p className="mt-1 text-xs text-red-600">{errors.bulkStock}</p>}
              </div>
              <div className="text-xs text-gray-500 mt-2">
                Available packages: {Math.floor(formData.bulkStock * (formData.bulkUnit === 'kg' ? 1000 : 1) / (formData.packageSize * (formData.packageUnit === 'kg' ? 1000 : 1)))}
              </div>
              {/* Available for Order Toggle */}
              <div className="flex items-center space-x-3 pt-2">
                <input
                  type="checkbox"
                  id="isAvailable"
                  name="isAvailable"
                  checked={formData.isAvailable}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="isAvailable" className="text-sm font-medium text-gray-700">
                  Available for Order
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Form Actions */}
      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          {initialData ? 'Update Item' : 'Add Item'}
        </button>
      </div>
    </form>
  );
};

export default GroceryItemForm; 