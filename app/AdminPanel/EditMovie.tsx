import React, { useState, useEffect } from 'react';

interface Movie {
  title: string;
  description: string;
  director: string;
  release_year: number;
  image: string;
  tags: string[];
}

interface EditMovieProps {
  movieId: number;
  onCancel: () => void;
  onSave: (updatedMovie: Movie) => void;
}

const EditMovie: React.FC<EditMovieProps> = ({ movieId, onCancel, onSave }) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [initialMovie, setInitialMovie] = useState<Movie | null>(null); 

  useEffect(() => {
    fetch(`http://localhost:5000/action/${movieId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setMovie(data.movie);
        setInitialMovie(data.movie); 
      })
      .catch((error) => console.error('Ошибка загрузки фильма:', error));
  }, [movieId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMovie((prevMovie) => (prevMovie ? { ...prevMovie, [name]: value } : null));
  };

  const handleReset = () => {
    setMovie(initialMovie);  
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (movie) {
      fetch(`http://localhost:5000/action/${movieId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(movie), 
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          onSave(data.movie); 
          onCancel(); 
        })
        .catch((error) => console.error('Ошибка при обновлении фильма:', error));
    }
  };

  if (!movie) return <div>Загрузка...</div>;

  return (
    <div className="max-w-md mx-auto p-5 border border-gray-300 rounded-lg bg-gray-100">
      <h2 className="text-xl font-bold mb-5">Редактировать фильм</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-3">Название:</label>
        <input
          type="text"
          name="title"
          value={movie.title}
          onChange={handleChange}
          className="w-full p-2 mb-3 border border-gray-400 rounded-md"
          required
        />

        <label className="block mb-3">Описание:</label>
        <textarea
          name="description"
          value={movie.description}
          onChange={handleChange}
          className="w-full p-2 mb-3 border border-gray-400 rounded-md"
          required
        />

        <label className="block mb-3">Режиссёр:</label>
        <input
          type="text"
          name="director"
          value={movie.director}
          onChange={handleChange}
          className="w-full p-2 mb-3 border border-gray-400 rounded-md"
          required
        />

        <label className="block mb-3">Год выпуска:</label>
        <input
          type="number"
          name="release_year"
          value={movie.release_year}
          onChange={handleChange}
          className="w-full p-2 mb-3 border border-gray-400 rounded-md"
          required
        />

        <label className="block mb-3">Ссылка на изображение:</label>
        <input
          type="text"
          name="image"
          value={movie.image}
          onChange={handleChange}
          className="w-full p-2 mb-3 border border-gray-400 rounded-md"
          required
        />

        <label className="block mb-3">Теги (через запятую):</label>
        <input
          type="text"
          name="tags"
          value={movie.tags.join(', ')}
          onChange={(e) => {
            const tags = e.target.value.split(',').map((tag) => tag.trim());
            setMovie((prevMovie) => (prevMovie ? { ...prevMovie, tags } : null));
          }}
          className="w-full p-2 mb-3 border border-gray-400 rounded-md"
          required
        />

        <div className="flex justify-between">
          <button
            type="submit"
            className="mt-3 px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Сохранить изменения
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="mt-3 ml-2 px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
          >
            Сбросить изменения
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="mt-3 ml-2 px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Отменить
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMovie;
