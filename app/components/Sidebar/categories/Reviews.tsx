import React, { useState } from 'react';

const Reviews: React.FC = () => {
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (review) {
      setReviews([...reviews, review]);
      setReview('');
    }
  };

  const handleDelete = (index: number) => {
    const updatedReviews = reviews.filter((_, i) => i !== index);
    setReviews(updatedReviews);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold">Оставьте свой отзыв</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <textarea
          className="w-full p-2 border rounded-lg"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Напишите свой отзыв..."
          rows={4}
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Отправить
        </button>
      </form>

      <div className="mt-6">
        <h3 className="text-xl font-semibold">Отзывы</h3>
        <ul className="list-disc pl-6 mt-4">
          {reviews.map((review, index) => (
            <li key={index} className="mb-2 flex justify-between items-center">
              <span>{review}</span>
              <button
                onClick={() => handleDelete(index)}
                className="ml-4 text-red-500 hover:text-red-700"
              >
                Удалить
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Reviews;
