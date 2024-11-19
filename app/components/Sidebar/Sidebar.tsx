'use client'
import React from 'react';
import Main from './categories/Main';
import Action from './categories/ActionGame';
import Drama from './categories/Drama';
import Reviews from './categories/Reviews';

interface Category {
  name: string;
  component: JSX.Element;
}

const SideBar: React.FC = () => {
  const categories: Category[] = [
    { name: 'Главная', component: <Main />},
    { name: 'Экшен', component: <Action /> },
    { name: 'Драма', component: <Drama /> },
    { name: 'Отзывы', component: <Reviews /> },
  ];    

  const [activeCategory, setActiveCategory] = React.useState<Category>(categories[0]);

  const handleCategoryClick = (category: Category) => {
    setActiveCategory(category);
  };

  return (
    <div className="flex">
      <div className="w-64 p-4 border-r border-gray-300">
        {categories.map((category, index) => (
          <button
            key={index}
            className="w-full text-left py-2 px-4 mb-2 rounded-lg hover:bg-gray-200 focus:outline-none"
            onClick={() => handleCategoryClick(category)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="flex-grow p-6">
        {activeCategory.component}
      </div>
    </div>
  );
};

export default SideBar;
