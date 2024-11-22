'use client'
import React, { useState, useEffect } from 'react';
import EditMovie from './EditMovie';
import AddMovie from './AddMovie';

interface Movie {
  title: string;
  description: string;
  director: string;
  release_year: number;
  image: string;
  tags: string[];
}

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [editingMovieId, setEditingMovieId] = useState<number | null>(null);
  const [deletedMovies, setDeletedMovies] = useState<Movie[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/action', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error('Ошибка загрузки фильмов:', error));
  }, []);

  const handleEdit = (movieId: number) => {
    setEditingMovieId(movieId);
  };

  const handleSave = (updatedMovie: Movie) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie, index) =>
        index === editingMovieId ? updatedMovie : movie
      )
    );
    setEditingMovieId(null);
  };

  const handleCancel = () => {
    setEditingMovieId(null);
    setIsAdding(false); 
  };

  const handleDelete = (index: number) => {
    const movieToDelete = movies[index];

    fetch(`http://localhost:5000/action/${index}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((response) => {
        if (response.ok) {
          setMovies((prevMovies) => prevMovies.filter((_, i) => i !== index));
          setDeletedMovies((prev) => [movieToDelete, ...prev]);
        } else {
          alert('Ошибка удаления фильма');
        }
      })
      .catch((error) => console.error('Ошибка удаления фильма:', error));
  };

  const handleRestore = () => {
    if (deletedMovies.length > 0) {
      const [lastDeleted, ...remainingDeleted] = deletedMovies;
  
      fetch('http://localhost:5000/action/restore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(lastDeleted),
        credentials: 'include',
      })
        .then((response) => {
          if (response.ok) {
            setMovies((prevMovies) => [lastDeleted, ...prevMovies]); 
            setDeletedMovies(remainingDeleted); 
          } else {
            alert('Ошибка восстановления фильма');
          }
        })
        .catch((error) => console.error('Ошибка восстановления фильма:', error));
    }
  };
  

  const handleAdd = (newMovie: Movie) => {
    setMovies((prevMovies) => [newMovie, ...prevMovies]);
    setIsAdding(false);
  };

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-5">
        {deletedMovies.length > 0 && (
          <button
            onClick={handleRestore}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700"
          >
            Вернуть последний удалённый фильм
          </button>
        )}
        <button
          onClick={() => setIsAdding(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
        >
          Добавить фильм
        </button>
      </div>
      {isAdding ? (
        <AddMovie onAdd={handleAdd} onCancel={handleCancel} />
      ) : editingMovieId !== null ? (
        <EditMovie
          movieId={editingMovieId}
          onCancel={handleCancel}
          onSave={handleSave}
        />
      ) : (
        <div className="flex flex-wrap gap-5">
          {movies.map((movie, index) => (
            <div
              key={index}
              className="w-[300px] border border-gray-300 p-4 text-center rounded-lg"
            >
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-[200px] object-cover rounded-lg"
              />
              <h3 className="mt-3 font-bold text-xl">{movie.title}</h3>
              <p className="mt-2 text-gray-600">{movie.description}</p>
              <div className="flex justify-between mt-3">
                <button
                  onClick={() => handleEdit(index)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                >
                  Редактировать
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
                >
                  Удалить
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieList;
