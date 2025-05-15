import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  className = '',
}) => {
  const baseStyles = 'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium shadow-sm';
  
  const variantStyles = {
    default: 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800',
    success: 'bg-gradient-to-r from-green-100 to-green-200 text-green-800',
    warning: 'bg-gradient-to-r from-amber-100 to-amber-200 text-amber-800',
    error: 'bg-gradient-to-r from-red-100 to-red-200 text-red-800',
  };

  return (
    <span
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
};

export default Badge;