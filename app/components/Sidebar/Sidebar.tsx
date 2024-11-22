'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const Sidebar: React.FC = () => {
  const router = useRouter();

  const categories = [
    { name: 'Главная', path: '/' },
    { name: 'Экшен', path: '/action' },
    { name: 'Драма', path: '/drama' },
    { name: 'Отзывы', path: '/reviews' },
    { name: 'Админка', path: '/admin' },
  ];

  const handleCategoryClick = (path: string) => {
    router.push(path); 
  };

  return (
    <div className="w-64 p-4 border-r border-gray-300">
      {categories.map((category, index) => (
        <button
          key={index}
          className="w-full text-left py-2 px-4 mb-2 rounded-lg hover:bg-gray-200 focus:outline-none"
          onClick={() => handleCategoryClick(category.path)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
