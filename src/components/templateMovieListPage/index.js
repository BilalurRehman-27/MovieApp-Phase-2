import React, { useState } from "react";
import Header from "../headerMovieList";
import MovieList from "../movieList";
import FilterControls from "../filterControls";

const MovieListPageTemplate = ({ movies, title, action }) => {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [orderBy, setOrderByFilter] = useState("releaseDate");
  const [releaseDate, setReleaseDate] = useState("0");
  const [ratings, setRatings] = useState("0");
  const [language, setMovieLanguage] = useState("0");

  const filterMoviesByDecade = (movie) => {
    const decadeRange = releaseDate.split("-");
    return (
      movie.release_date.split("-")[0] <= decadeRange[1] &&
      movie.release_date.split("-")[0] >= decadeRange[0]
    );
  };

  const filterMoviesByRatings = (movie) => {
    return movie.vote_average >= Number(ratings);
  };

  const filterMoviesByLanguage = (movie) => {
    return movie.original_language === language;
  };

  const genre = Number(genreFilter);
  let displayedMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genre > 0 ? m.genre_ids.includes(Number(genreFilter)) : true;
    })
    .filter((m) => {
      return releaseDate !== "0" ? filterMoviesByDecade(m) : true;
    })
    .filter((m) => {
      return ratings !== "0" ? filterMoviesByRatings(m) : true;
    })
    .filter((m) => {
      return language !== "0" ? filterMoviesByLanguage(m) : true;
    });

  //soting
  displayedMovies.sort((a, b) => {
    switch (orderBy) {
      case "releaseDate":
        const dateA = new Date(a.release_date),
          dateB = new Date(b.release_date);
        return dateB - dateA;
      case "popularity":
        return b.vote_average - a.vote_average;
      case "name":
        const titleA = a.title.toLowerCase(),
          titleB = b.title.toLowerCase();
        if (titleA < titleB) return -1;
        if (titleA > titleB) return 1;
        return 0;
      default:
        return 0;
    }
  });
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
