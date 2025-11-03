const ApiKey = "0613259b392e1a61870712f7a0ec04b7";

export async function getPopularMovies(page = 1) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${ApiKey}&language=ru-RU&page=${page}`
  );
  const data = await response.json();
  return { results: data.results, totalResults: data.total_results };
}

export async function searchMovies(query, page = 1) {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${ApiKey}&language=ru-RU&query=${encodeURIComponent(query)}&page=${page}`
  );
  const data = await response.json();
  return { results: data.results, totalResults: data.total_results };
}
