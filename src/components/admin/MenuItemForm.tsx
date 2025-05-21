import React, { useState, useEffect, useRef } from 'react';

interface NutritionalInfo {
  calories: number;
  weight: number; // in ounces
}

interface MenuItemComponent {
  id?: string;
  name: string;
  type: 'vegetarian' | 'chicken' | 'egg';
  quantity: number;
  nutritionalInfo: {
    calories: number;
    weight: number; // in ounces
  };
  isSpicy?: boolean;
  image?: string;
}

interface MenuItem {
  id?: string;
  name: string;
  description: string;
  price: number;
  category: 'lunch-box' | 'cloud-kitchen' | 'party-orders';
  type: 'vegetarian' | 'chicken' | 'egg';
  image: string;
  isAvailable: boolean;
  nutritionalInfo?: NutritionalInfo;
  components?: MenuItemComponent[];
  serves?: number;
  preparationTime?: number;
  isSpicy?: boolean;
  allergens?: string[];
  featured?: boolean;
}

interface MenuItemFormProps {
  initialData?: MenuItem;
  onSubmit: (data: Omit<MenuItem, 'id'>) => void;
  onCancel: () => void;
  availableItems?: MenuItem[];
}

const MenuItemForm: React.FC<MenuItemFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  availableItems = []
}) => {
  const [formData, setFormData] = useState<Omit<MenuItem, 'id'>>({
    name: '',
    description: '',
    price: 0,
    category: 'cloud-kitchen',
    type: 'vegetarian',
    image: '',
    isAvailable: true,
    nutritionalInfo: {
      calories: 0,
      weight: 0
    },
    components: [],
    serves: 1,
    preparationTime: 30,
    isSpicy: false,
    allergens: [],
    featured: false
  });

  const [errors, setErrors] = useState<Partial<Record<keyof MenuItem, string>>>({});
  const [imagePreview, setImagePreview] = useState<string>('');
  const [showNutritionalInfo, setShowNutritionalInfo] = useState(false);
  const [showComponents, setShowComponents] = useState(false);
  const [showCustomizations, setShowCustomizations] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const allergens = [
    'Dairy', 'Eggs', 'Fish', 'Shellfish', 'Tree Nuts', 'Peanuts', 'Wheat', 'Soy'
  ];

  useEffect(() => {
    if (initialData) {
      const { id, ...rest } = initialData;
      setFormData(rest);
      setImagePreview(rest.image);
      setShowNutritionalInfo(!!rest.nutritionalInfo);
      setShowComponents(formData.category === 'lunch-box' || formData.category === 'party-orders');
      setShowCustomizations(!!rest.customizations?.length);
    }
  }, [initialData, formData.category]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof MenuItem, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (formData.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }

    if (!formData.image.trim() && !imagePreview) {
      newErrors.image = 'Image is required';
    }

    if (formData.category === 'lunch-box' && (!formData.components || formData.components.length === 0)) {
      newErrors.components = 'Lunch box must have at least one component';
    }

    if (formData.category === 'party-orders') {
      if (!formData.components || formData.components.length === 0) {
        newErrors.components = 'Party order must have at least one component';
      }
      if (!formData.serves || formData.serves < 1) {
        newErrors.serves = 'Number of servings is required for party orders';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const submitData = {
        ...formData,
        image: imagePreview || formData.image,
        nutritionalInfo: formData.category === 'cloud-kitchen' ? formData.nutritionalInfo : undefined,
        components: showComponents ? formData.components : undefined
      };
      onSubmit(submitData);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (name.startsWith('nutritionalInfo.')) {
      const field = name.split('.')[1] as keyof NutritionalInfo;
      setFormData(prev => ({
        ...prev,
        nutritionalInfo: {
          ...prev.nutritionalInfo!,
          [field]: type === 'number' ? parseFloat(value) || 0 : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'number' ? parseFloat(value) || 0 : value
      }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if (name === 'allergens') {
      const allergen = e.target.value;
      setFormData(prev => ({
        ...prev,
        allergens: checked
          ? [...(prev.allergens || []), allergen]
          : (prev.allergens || []).filter(a => a !== allergen)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
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

  const handleAddComponent = () => {
    setFormData(prev => ({
      ...prev,
      components: [...(prev.components || []), { 
        id: '', 
        name: '', 
        quantity: 1, 
        type: 'vegetarian', 
        nutritionalInfo: { 
          calories: 0, 
          weight: 0 
        } 
      }]
    }));
  };

  const handleRemoveComponent = (index: number) => {
    setFormData(prev => ({
      ...prev,
      components: prev.components?.filter((_, i) => i !== index)
    }));
  };

  const handleComponentChange = (index: number, field: keyof MenuItemComponent, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      components: prev.components?.map((comp, i) => 
        i === index ? { ...comp, [field]: value } : comp
      )
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 flex-1">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Basic Information</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-xs font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter item name"
                className={`block w-full px-3 py-2 rounded-md border ${errors.name ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm`}
              />
              {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="category" className="block text-xs font-medium text-gray-700 mb-1">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
              >
                <option value="lunch-box">Lunch Box</option>
                <option value="cloud-kitchen">Cloud Kitchen</option>
                <option value="party-orders">Party Orders</option>
              </select>
            </div>
            <div>
              <label htmlFor="type" className="block text-xs font-medium text-gray-700 mb-1">Type</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
              >
                <option value="vegetarian">Vegetarian</option>
                <option value="chicken">Non-Veg</option>
                <option value="egg">Egg</option>
              </select>
            </div>
            <div>
              <label htmlFor="description" className="block text-xs font-medium text-gray-700 mb-1">Description</label>
              <textarea
                id="description"
                name="description"
                rows={2}
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter item description"
                className={`block w-full px-3 py-2 rounded-md border ${errors.description ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm`}
              />
              {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description}</p>}
            </div>
            <div>
              <label htmlFor="image" className="block text-xs font-medium text-gray-700 mb-1">Image URL</label>
              <input
                type="text"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleImageUrlChange}
                placeholder="Enter image URL"
                className={`block w-full px-3 py-2 rounded-md border ${errors.image ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm`}
              />
              {errors.image && <p className="text-xs text-red-600 mt-2">{errors.image}</p>}
            </div>
          </div>
        </div>
        {/* Pricing & Availability */}
        <div className="space-y-6 flex-1 flex flex-col">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Pricing & Availability</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="price" className="block text-xs font-medium text-gray-700 mb-1">Price</label>
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
                    className={`block w-full pl-7 pr-3 py-2 rounded-md border ${errors.price ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm`}
                  />
                </div>
                {errors.price && <p className="mt-1 text-xs text-red-600">{errors.price}</p>}
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="isAvailable"
                  name="isAvailable"
                  checked={formData.isAvailable}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                />
                <label htmlFor="isAvailable" className="text-sm font-medium text-gray-700">
                  Available for Order
                </label>
              </div>
              {formData.category === 'cloud-kitchen' && (
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                    Featured
                  </label>
                </div>
              )}
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="isSpicy"
                  name="isSpicy"
                  checked={formData.isSpicy}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                />
                <label htmlFor="isSpicy" className="text-sm font-medium text-gray-700">
                  Spicy
                </label>
              </div>
            </div>
          </div>
          {/* Allergens Card */}
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Allergens</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {allergens.map(allergen => (
                <div key={allergen} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`allergen-${allergen}`}
                    name="allergens"
                    value={allergen}
                    checked={formData.allergens?.includes(allergen)}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded transition-colors"
                  />
                  <label htmlFor={`allergen-${allergen}`} className="text-xs text-gray-700">
                    {allergen}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Advanced/Optional Sections (nutritional info, components, etc.) remain as is, below the grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nutritional Information - Only show for cloud kitchen items */}
        {formData.category === 'cloud-kitchen' && (
          <div className="col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Nutritional Information</h3>
              <button
                type="button"
                onClick={() => setShowNutritionalInfo(!showNutritionalInfo)}
                className="text-sm text-orange-600 hover:text-orange-700"
              >
                {showNutritionalInfo ? 'Hide' : 'Add'} Nutritional Info
              </button>
            </div>
            {showNutritionalInfo && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <label htmlFor="nutritionalInfo.calories" className="block text-sm font-medium text-gray-700">
                    Calories (kcal)
                  </label>
                  <input
                    type="number"
                    id="nutritionalInfo.calories"
                    name="nutritionalInfo.calories"
                    min="0"
                    value={formData.nutritionalInfo?.calories}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 sm:text-sm transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="nutritionalInfo.weight" className="block text-sm font-medium text-gray-700">
                    Weight (oz)
                  </label>
                  <input
                    type="number"
                    id="nutritionalInfo.weight"
                    name="nutritionalInfo.weight"
                    min="0"
                    step="0.1"
                    value={formData.nutritionalInfo?.weight}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 sm:text-sm transition-colors"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Components (for Lunch Box and Party Orders) */}
        {(formData.category === 'lunch-box' || formData.category === 'party-orders') && (
          <div className="col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Components</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {formData.category === 'lunch-box' 
                    ? 'Add items that will be included in the lunch box'
                    : 'Add items that will be included in the party order'}
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddComponent}
                className="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Add Component
              </button>
            </div>

            {formData.components?.map((component, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg mb-4 border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-md font-medium text-gray-900">Component {index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => handleRemoveComponent(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Component Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        type="text"
                        value={component.name}
                        onChange={(e) => handleComponentChange(index, 'name', e.target.value)}
                        placeholder="e.g., Rice, Curry, Roti"
                        className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Type
                      </label>
                      <select
                        value={component.type}
                        onChange={(e) => handleComponentChange(index, 'type', e.target.value as 'vegetarian' | 'chicken' | 'egg')}
                        className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                      >
                        <option value="vegetarian">Vegetarian</option>
                        <option value="chicken">Non-Veg</option>
                        <option value="egg">Egg</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Quantity
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={component.quantity}
                        onChange={(e) => handleComponentChange(index, 'quantity', parseInt(e.target.value))}
                        className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  {/* Component Nutritional Info */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Calories (kcal)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={component.nutritionalInfo.calories}
                        onChange={(e) => handleComponentChange(index, 'nutritionalInfo', {
                          ...component.nutritionalInfo,
                          calories: parseFloat(e.target.value) || 0
                        })}
                        className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Weight (oz)
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="0.1"
                        value={component.nutritionalInfo.weight}
                        onChange={(e) => handleComponentChange(index, 'nutritionalInfo', {
                          ...component.nutritionalInfo,
                          weight: parseFloat(e.target.value) || 0
                        })}
                        className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                      />
                    </div>
                    <div className="flex items-end">
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          id={`component-spicy-${index}`}
                          checked={component.isSpicy}
                          onChange={(e) => handleComponentChange(index, 'isSpicy', e.target.checked)}
                          className="h-5 w-5 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`component-spicy-${index}`} className="text-sm font-medium text-gray-700">
                          Spicy Component
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Total Nutritional Info for Lunch Box */}
            {formData.category === 'lunch-box' && formData.components && formData.components.length > 0 && (
              <div className="mt-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
                <h4 className="text-md font-medium text-gray-900 mb-2">Total Nutritional Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-600">Calories:</span>
                    <span className="ml-2 text-sm font-medium">
                      {formData.components.reduce((sum, comp) => sum + (comp.nutritionalInfo.calories * comp.quantity), 0)} kcal
                    </span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Total Weight:</span>
                    <span className="ml-2 text-sm font-medium">
                      {formData.components.reduce((sum, comp) => sum + (comp.nutritionalInfo.weight * comp.quantity), 0).toFixed(1)} oz
                    </span>
                  </div>
                </div>
              </div>
            )}

            {errors.components && (
              <p className="mt-1 text-sm text-red-600">{errors.components}</p>
            )}
          </div>
        )}
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
        >
          {initialData ? 'Update Item' : 'Add Item'}
        </button>
      </div>
    </form>
  );
};

export default MenuItemForm; 