export const getMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=bc495153c361987b9b8f50d7ec96ed8e&language=en-US
      &include_adult=false&page=1`
  )
    .then((res) => res.json())
    .then((json) => json.results);
};

export const getMovie = (id) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=bc495153c361987b9b8f50d7ec96ed8e`
  ).then((res) => res.json());
};

export const getGenres = () => {
  return fetch(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=bc495153c361987b9b8f50d7ec96ed8e&language=en-US"
  )
    .then((res) => res.json())
    .then((json) => json.genres);
};
export const getMovieReviews = (id) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=bc495153c361987b9b8f50d7ec96ed8e`
  )
    .then((res) => res.json())
    .then((json) => json.results);
};

export const getUpcomingMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=bc495153c361987b9b8f50d7ec96ed8e&language=en-US
      &include_adult=false&page=1&region=US`
  )
    .then((res) => res.json())
    .then((json) => json.results);
};

export const getSortedMoviesBy = ({ orderBy, releaseDate }) => {
  const decadeRange = releaseDate.split("_");
  const url =
    orderBy === "0"
      ? `https://api.themoviedb.org/3/discover/movie?api_key=bc495153c361987b9b8f50d7ec96ed8e&language=en-US
     &include_adult=false&page=1&primary_release_date.gte=${decadeRange[1]}&release_date.lte=${decadeRange[0]}`
      : `https://api.themoviedb.org/3/discover/movie?api_key=bc495153c361987b9b8f50d7ec96ed8e&language=en-US
     &include_adult=false&page=1&sort_by=${orderBy}.desc&release_date.gte=${decadeRange[1]}&primary_release_date.lte=${decadeRange[0]}`;
  return fetch(url)
    .then((res) => res.json())
    .then((json) => json.results);
};
