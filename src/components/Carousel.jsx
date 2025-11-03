import React, { useState } from "react";
import { Card } from "./Card";

export function TopRatedCarousel({ movies }) {
  const topMovies = movies?.length
    ? [...movies].sort((a, b) => b.vote_average - a.vote_average).slice(0, 5)
    : [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(false);

  const handleNext = () => {
    if (!topMovies.length) return;
    setFade(true);
    setTimeout(() => {
      setCurrentIndex(prev => (prev < topMovies.length - 1 ? prev + 1 : 0));
      setFade(false);
    }, 400);
  };

  const handlePrev = () => {
    if (!topMovies.length) return;
    setFade(true);
    setTimeout(() => {
      setCurrentIndex(prev => (prev > 0 ? prev - 1 : topMovies.length - 1));
      setFade(false);
    }, 400);
  };

  if (!topMovies.length) return null;

  return (
    <div className="top-carousel relative w-full max-w-4xl mx-auto mt-8 p-4">
      <button
        onClick={handlePrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 text-white bg-black/50 rounded-full p-2 z-10 hover:bg-black/70 text-5xl cursor-pointer"
      >◀</button>

      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 text-white bg-black/50 rounded-full p-2 z-10 hover:bg-black/70 text-5xl cursor-pointer"
      >▶</button>

      <div className="relative w-full flex justify-center">
        <div className={`transition-opacity duration-500 ${fade ? "opacity-0" : "opacity-100"}`}>
          <Card movie={topMovies[currentIndex]} />
        </div>
      </div>
    </div>
  );
}
