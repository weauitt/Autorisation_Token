import React, { useEffect, useState } from "react";

interface Drama {
  title: string;
  description: string;
  image: string;
  director: string;
  release_year: number;
  source_url: string;
}

const Drama: React.FC = () => {
  const [dramas, setDramas] = useState<Drama[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/drama", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data: Drama[]) => setDramas(data))
      .catch((error) => console.error("Error fetching Drama data:", error));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {dramas.map((drama, index) => (
        <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
          <img src={drama.image} alt={drama.title} className="w-full h-64 object-cover"/>
          <div className="p-4">
            <h3 className="text-xl font-semibold text-gray-800">
              {drama.title}
            </h3>
            <p className="text-gray-600 mt-2">{drama.description}</p>
            <p className="text-gray-500 mt-2">Режиссер: {drama.director}</p>
            <p className="text-gray-500">Год выпуска: {drama.release_year}</p>
            <a
              href={drama.source_url}
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline mt-4 inline-block"
            >
              Смотреть
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Drama;
