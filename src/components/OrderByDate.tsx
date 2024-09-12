'use client'; 

import React, { useEffect, useState } from 'react';

interface OrderByDateToggleProps {
  isChecked: boolean;
}

export const OrderByDate: React.FC<OrderByDateToggleProps> = ({ isChecked }) => {
  const [checked, setChecked] = useState(isChecked);

  useEffect(() => {
    setChecked(isChecked);
  }, [isChecked]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = new URL(window.location.href);
    url.searchParams.set('orderByDate', e.target.checked ? 'true' : 'false');
    window.location.href = url.toString();
  };

  return (
    <label className="flex items-center justify-center space-x-2">
    <input 
      className="form-checkbox h-5 w-5 text-blue-500" 
      type="checkbox" 
      checked={checked} 
      onChange={handleChange} 
    />
    <span className="text-lg font-medium text-blue-700">Ordenar por fecha de proximidad</span>
  </label>
  
  );
};
