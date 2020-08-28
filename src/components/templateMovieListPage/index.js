import React, { useState, useEffect } from "react";
import Header from "../headerMovieList";
import MovieList from "../movieList";
import FilterControls from "../filterControls";
import { getSortedMoviesBy } from "../../api/tmdb-api";

const MovieListPageTemplate = ({ movies, title, action }) => {
  const [sortedMovies, setSortedMovies] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [orderBy, setOrderByFilter] = useState("0");
  const [releaseDate, setReleaseDate] = useState("2020-01-01_2010-01-01");
  const [ratings, setRatings] = useState("0");
  const [language, setMovieLanguage] = useState("0");

  const filterMoviesByRatings = (movie) => {
    return movie.vote_average >= Number(ratings);
  };

  const filterMoviesByLanguage = (movie) => {
    return movie.original_language === language;
  };

  const genre = Number(genreFilter);
  let displayedMovies = [];

  //soting

  useEffect(() => {
    getSortedMoviesBy({ orderBy, releaseDate }).then((sortedMovies) => {
      setSortedMovies(sortedMovies);
    });
  }, [orderBy, releaseDate]);
  displayedMovies = sortedMovies;
  displayedMovies = displayedMovies
    .filter((m) => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genre > 0 ? m.genre_ids.includes(Number(genreFilter)) : true;
    })
    .filter((m) => {
      return ratings !== "0" ? filterMoviesByRatings(m) : true;
    })
    .filter((m) => {
      return language !== "0" ? filterMoviesByLanguage(m) : true;
    });
  // debugger;
  // displayedMovies.sort((a, b) => {
  //   switch (orderBy) {
  //     case "releaseDate":
  //       const dateA = new Date(a.release_date),
  //         dateB = new Date(b.release_date);
  //       return dateB - dateA;
  //     case "popularity":
  //       return b.vote_average - a.vote_average;
  //     case "name":
  //       const titleA = a.title.toLowerCase(),
  //         titleB = b.title.toLowerCase();
  //       if (titleA < titleB) return -1;
  //       if (titleA > titleB) return 1;
  //       return 0;
  //     default:
  //       return 0;
  //   }
  // });
  const handleChange = (type, value) => {
    switch (type) {
      case "name":
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
  };

  return (
    <>
      <Header title={title} numMovies={displayedMovies.length} />
      <FilterControls
        onUserInput={handleChange}
        numMovies={displayedMovies.length}
      />
      <MovieList action={action} movies={displayedMovies} />
    </>
  );
};

export default MovieListPageTemplate;
