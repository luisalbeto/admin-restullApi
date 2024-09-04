'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface TitleFilterProps {
  initialTitle?: string;
}

export const TitleFilter = ({ initialTitle = '' }: TitleFilterProps) => {
  const [title, setTitle] = useState(initialTitle);
  const router = useRouter();

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value;
    setTitle(newTitle);
    
    // Actualiza la URL con el parámetro de búsqueda del título
    const searchParams = new URLSearchParams(window.location.search);
    if (newTitle) {
      searchParams.set('title', newTitle);
    } else {
      searchParams.delete('title');
    }
    router.push(`/dashboard?${searchParams.toString()}`);
  };

  return (
    <div className="mb-8">
      <label htmlFor="title-search" className="block text-lg font-medium text-blue-700 mb-2">
        Buscar por título:
      </label>
      <input
        id="title-search"
        type="text"
        value={title}
        onChange={handleTitleChange}
        className="bg-white border border-blue-300 text-blue-700 py-2 px-4 rounded-md focus:outline-none"
        placeholder="Busca un evento por título"
      />
    </div>
  );
};
