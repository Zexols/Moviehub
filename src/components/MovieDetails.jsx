import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState(true);

  const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      try {
        const movieRes = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&language=ru-RU`
        );
        setMovie(movieRes.data);
        const trailerRes = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${TMDB_API_KEY}&language=ru-RU`
        );
        const youtubeTrailer = trailerRes.data.results.find(
          (v) => v.site === "YouTube" && v.type === "Trailer"
        );
        setTrailer(youtubeTrailer ? youtubeTrailer.key : null);
      } catch (err) {
        console.error("Ошибка при загрузке фильма:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white text-xl">
        Загрузка данных...
      </div>
    );

  if (!movie)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white text-xl">
        Фильм не найден.
      </div>
    );

  return (
    <div className="min-h-screen w-full bg-black text-white px-6 py-5">
      <Link
        to="/"
        className="text-red-500 hover:text-red-400 mb-4 inline-block"
      >
        ← Назад
      </Link>

      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto p-6 text-white">
        {/* Постер */}
        <div className="flex-shrink-0 w-full md:w-1/3">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="rounded-lg shadow-lg w-full"
          />
        </div>
        <div className="flex flex-col gap-6 md:w-2/3">
          <div>
            <h1 className="text-4xl font-bold">{movie.title}</h1>
            <p className="text-gray-400 mt-1">{movie.release_date}</p>
          </div>

          <p className="text-gray-200 text-lg leading-relaxed">{movie.overview}</p>

          <div className="flex flex-wrap gap-2">
            {movie.genres.map((g) => (
              <span
                key={g.id}
                className="bg-red-600 text-white px-3 py-1 rounded-full text-sm"
              >
                {g.name}
              </span>
            ))}
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">Трейлер</h2>
            {trailer ? (
              <iframe
                width="100%"
                height="500"
                src={`https://www.youtube.com/embed/${trailer}`}
                title="Трейлер"
                allowFullScreen
                className="rounded-xl shadow-lg"
              ></iframe>
            ) : (
              <p className="text-gray-400 text-lg">
                Трейлер не доступен для этого фильма.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
