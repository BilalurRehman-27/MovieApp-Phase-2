import React, { useEffect, useCallback, createContext, useReducer, useState } from "react";
import { getMovies } from "../api/tmdb-api";
import { getSortedMoviesBy } from "../api/tmdb-api";


export const MoviesContext = createContext(null);

const reducer = (state, action) => {
  switch (action.type) {
    case "add-favorite":
      return {
        movies: state.movies.filter((m) => m.id !== action.payload.movie.id),
        favorites: [...state.favorites, action.payload.movie],
      };
    case "load-movies":
      return { movies: [...action.payload.movies], favorites: [] };
    case "add-review":
      return {
        movies: [...state.movies],
        favorites: [
          ...state.favorites.filter((m) => m.id !== action.payload.movie.id),
          { ...action.payload.movie, review: action.payload.review },
        ],
      };
    case 'filter-movies':
      return {
        ...state,
        movie: state.movies
      }
    default:
      return state;
  }
};

const MoviesContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, { movies: [], favorites: [] });
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [orderBy, setOrderByFilter] = useState("");
  const [releaseDate, setReleaseDate] = useState("2020-01-01_2010-01-01");
  const [ratings, setRatings] = useState("");
  const [language, setMovieLanguage] = useState("");


  const addToFavorites = (movieId) => {
    const index = state.movies.map((m) => m.id).indexOf(movieId);
    dispatch({ type: "add-favorite", payload: { movie: state.movies[index] } });
  };

  const addReview = (movie, review) => {
    dispatch({ type: "add-review", payload: { movie, review } });
  };

  // useEffect(() => {
  //   getMovies().then((movies) => {
  //     dispatch({ type: "load-movies", payload: { movies } });
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);


  useEffect(() => {
    getSortedMoviesBy({ orderBy, releaseDate, nameFilter, genreFilter, ratings, language }).then((sortedMovies) => {
      dispatch({ type: "load-movies", payload: { movies: sortedMovies } });
    });
  }, [orderBy, releaseDate, nameFilter, genreFilter, ratings, language]);

  const setFilters = useCallback((type, value) => {
    switch (type) {
      case "name":
        debugger
        setNameFilter(value);
        break;
      case "orderBy":
        setOrderByFilter(value);
        break;
      case "releaseDate":
        setReleaseDate(value);
        break;
      case "ratings":
        setRatings(value);
        break;
      case "language":
        setMovieLanguage(value);
        break;
      default:
        setGenreFilter(value);
        break;
    }
  }, [])
  return (
    <MoviesContext.Provider
      value={{
        movies: state.movies,
        favorites: state.favorites,
        addToFavorites: addToFavorites,
        addReview: addReview,
        setFilters: setFilters
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
