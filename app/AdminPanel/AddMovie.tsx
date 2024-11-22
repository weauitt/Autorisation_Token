import React, { useState } from 'react';

interface Movie {
  title: string;
  description: string;
  director: string;
  release_year: number;
  image: string;
  tags: string[];
}

interface AddMovieProps {
  onAdd: (newMovie: Movie) => void;
  onCancel: () => void;
}

const AddMovie: React.FC<AddMovieProps> = ({ onAdd, onCancel }) => {
  const [newMovie, setNewMovie] = useState<Movie>({
    title: '',
    description: '',
    director: '',
    release_year: new Date().getFullYear(),
    image: '',
    tags: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewMovie((prev) => ({ ...prev, [name]: name === 'tags' ? value.split(',').map((tag) => tag.trim()) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Отправляем новый фильм на сервер
    fetch('http://localhost:5000/action', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMovie),
    })
      .then((response) => response.json())
      .then((data) => {
        onAdd(newMovie); 
      })
      .catch((error) => {
        console.error('Ошибка добавления фильма:', error);
      });
  };

  return (
    <div className="max-w-md mx-auto p-5 border border-gray-300 rounded-lg bg-gray-100">
      <h2 className="text-xl font-bold mb-5">Добавить фильм</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-3">Название:</label>
        <input
          type="text"
          name="title"
          value={newMovie.title}
          onChange={handleChange}
          className="w-full p-2 mb-3 border border-gray-400 rounded-md"
          required
        />

        <label className="block mb-3">Описание:</label>
        <textarea
          name="description"
          value={newMovie.description}
          onChange={handleChange}
          className="w-full p-2 mb-3 border border-gray-400 rounded-md"
          required
        />

        <label className="block mb-3">Режиссёр:</label>
        <input
          type="text"
          name="director"
          value={newMovie.director}
          onChange={handleChange}
          className="w-full p-2 mb-3 border border-gray-400 rounded-md"
          required
        />

        <label className="block mb-3">Год выпуска:</label>
        <input
          type="number"
          name="release_year"
          value={newMovie.release_year}
          onChange={handleChange}
          className="w-full p-2 mb-3 border border-gray-400 rounded-md"
          required
        />

        <label className="block mb-3">Ссылка на изображение:</label>
        <input
          type="text"
          name="image"
          value={newMovie.image}
          onChange={handleChange}
          className="w-full p-2 mb-3 border border-gray-400 rounded-md"
          required
        />

        <label className="block mb-3">Теги (через запятую):</label>
        <input
          type="text"
          name="tags"
          value={newMovie.tags.join(', ')}
          onChange={handleChange}
          className="w-full p-2 mb-3 border border-gray-400 rounded-md"
        />

        <div className="flex justify-between">
          <button
            type="submit"
            className="mt-3 px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Добавить
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="mt-3 px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Отменить
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMovie;
