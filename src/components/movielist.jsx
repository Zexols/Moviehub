import React from "react";
import { Card } from "./Card";
import { TopRatedCarousel } from "./Carousel";

export function MovieList({ movies, topMovies }) {
  if (!movies || movies.length === 0) {
    return <p className="text-center text-white">Загрузка фильмов...</p>;
  }

  const pageSize = 20;
  const displayedMovies = movies.slice(0, pageSize);
  const fillerCount = pageSize - displayedMovies.length;

  return (
    <div className="movie-list min-h-screen px-4 py-8 bg-neutral-950">
      {!topMovies?.length ? null : (
        <>
          <h1 className="flex justify-center text-2xl mb-6 font-bold">
            Лучшие фильмы по оценкам
          </h1>
          <TopRatedCarousel movies={topMovies} />
        </>
      )}

      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {displayedMovies.map((movie) => (
          <div key={movie.id} className="h-[400px]">
            <Card movie={movie} />
          </div>
        ))}
        {Array.from({ length: fillerCount }).map((_, i) => (
          <div key={`empty-${i}`} className="invisible h-[400px]"></div>
        ))}
      </div>
    </div>
  );
}
