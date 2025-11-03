import React from "react";
import { useNavigate } from "react-router-dom";

export function Card({ movie }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/movie/${movie.id}`)}
      className="cursor-pointer hover:scale-105 transition-transform duration-300"
    >
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "/no-image.png"
        }
        alt={movie.title}
        className="rounded-lg shadow-md w-full h-[350px] object-cover"
      />
      <h3 className="mt-2 text-center font-semibold text-white text-sm">
        {movie.title}
      </h3>
      <p className="text-center text-yellow-400">⭐ {movie.vote_average.toFixed(1)}</p>
    </div>
  );
}
