import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { MovieList } from "./components/movielist";
import MovieDetails from "./components/MovieDetails";
import CustomPagination from "./components/pagination";
import { getPopularMovies, searchMovies } from "./components/data";

function Home() {
  const [movies, setMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    async function loadMovies() {
      const { results, totalResults } = isSearching
        ? await searchMovies(searchQuery, currentPage)
        : await getPopularMovies(currentPage);

      setMovies(results);
      setTotalResults(totalResults);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    loadMovies();
  }, [currentPage, searchQuery, isSearching]);

  useEffect(() => {
    async function loadTopMovies() {
      let all = [];
      for (let page = 1; page <= 10; page++) {
        const { results } = await getPopularMovies(page);
        all = [...all, ...results];
      }
      const sorted = all.sort((a, b) => b.vote_average - a.vote_average);
      setTopMovies(sorted.slice(0, 5));
    }
    loadTopMovies();
  }, []);

  const handlePageChange = (page) => setCurrentPage(page);
const handleSearchChange = (e) => {
  const value = e.target.value;
  setSearchQuery(value);
  setIsSearching(value.trim() !== "");
  setCurrentPage(1);
};

  const clearSearch = () => {
    setSearchQuery("");
    setIsSearching(false);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen w-full bg-black text-white px-6 py-5">
      <header className="mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <Logo />
        <div className="flex items-center justify-center gap-2">
          <input
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Поиск фильмов..."
            className="bg-neutral-800 text-white px-3 py-2 rounded-md outline-none w-64"
          />
          {isSearching ? (
            <button
              onClick={clearSearch}
              className="bg-gray-600 px-3 py-2 rounded-md hover:bg-gray-700 transition"
            >
              Сбросить
            </button>
          ) : (
            <button
              onClick={() => {
                if (searchQuery.trim()) {
                  setIsSearching(true);
                  setCurrentPage(1);
                }
              }}
              className="bg-red-600 px-3 py-2 rounded-md hover:bg-red-700 transition"
            >
              Искать
            </button>
          )}
        </div>
      </header>

      <main>
        <MovieList movies={movies} topMovies={!isSearching ? topMovies : []} />
      </main>

      <footer className="flex justify-center py-7">
        <CustomPagination
          current={currentPage}
          total={Math.min(totalResults, 5000)}
          pageSize={20}
          showSizeChanger={false}
          onChange={handlePageChange}
          
        />
      </footer>
      <div class="bg-black text-gray-400 text-center py-4">
     © 2025 Zexols. Все права защищены. | 
   <a href="https://github.com/Zexols" className="text-red-500 hover:text-red-400"> GitHub</a>
   </div>

    </div>
  );
}

function Logo() {
  const navigate = useNavigate();
  return (
    <img
      src="/netflix.png"
      alt="Logo"
      className="h-8 w-auto cursor-pointer hover:scale-105 transition-transform"
      onClick={() => navigate("/")}
    />
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
}
