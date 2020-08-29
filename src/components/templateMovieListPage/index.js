import React from "react";
import Header from "../headerMovieList";
import MovieList from "../movieList";
import FilterControls from "../filterControls";

const MovieListPageTemplate = ({ movies, setFilters, title, action }) => {

  return (
    <>
      <Header title={title} numMovies={movies.length} />
      <FilterControls
        onUserInput={setFilters}
        numMovies={movies.length}
      />
      <MovieList action={action} movies={movies} />
    </>
  );
};

export default MovieListPageTemplate;
