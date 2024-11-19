import React, { useEffect, useState } from "react";

interface Game {
  title: string;
  description: string;
  image: string;
  director: string;
  release_year: number;
  source_url: string;
}

const ActionGame: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/action", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setGames(data))
      .catch((error) =>
        console.error("Error fetching ActionGame data:", error)
      );
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {games.map((game, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-lg overflow-hidden" 
        >
          <img src={game.image} alt={game.title} className="w-full h-64 object-cover"/>
          <div className="p-4">
            <h3 className="text-xl font-semibold text-gray-800">
              {game.title}
            </h3>
            <p className="text-gray-600 mt-2">{game.description}</p>
            <p className="text-gray-500 mt-2">Режиссер: {game.director}</p>
            <p className="text-gray-500">Год выпуска: {game.release_year}</p>
            <a
              href={game.source_url}
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline mt-4 inline-block"
            >
              Смотреть на IMDb
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActionGame;
