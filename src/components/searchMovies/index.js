/* https://www.freecodecamp.org/news/learn-react-in-1-hour-by-building-a-movie-search-app/
 */
import React, {  useState } from "react";
import { DebounceInput } from "react-debounce-input";
import MoviesList from "../movieList";
import AddToFavoritesButton from "../buttons/addToFavorites";
/* eslint-disable */

export default function SearchMovies() {
  const [movies, setMovies] = useState([]);
  const [movieName, setMovieName] = useState("");
  const searchMovies = (e) => {
    setMovieName(e.target.value);
    const url = e.target.value
      ? `https://api.themoviedb.org/3/search/movie?api_key=bc495153c361987b9b8f50d7ec96ed8e&language=en-US&query=${e.target.value}&include_adult=false&page=1&region=US`
      : `https://api.themoviedb.org/3/discover/movie?api_key=bc495153c361987b9b8f50d7ec96ed8e&language=en-US
    &include_adult=false&page=1`;

    const result = fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="row bg-warning">
        <div className="col-md-12">
          <h4>
            <span>Search Movies:</span>
            <DebounceInput
              minLength={2}
              debounceTimeout={300}
              onChange={(event) => searchMovies(event)}
            />
          </h4>
        </div>
      </div>

      {movies && movies.length ? (
        <MoviesList
          movies={movies}
          action={(movie) => <AddToFavoritesButton movie={movie} />}
        />
      ) : null}
      {movieName && movies.length == 0 ? (
        <p style={{ textAlign: "center" }}> No movies found by that name</p>
      ) : null}
    </>
  );
}
