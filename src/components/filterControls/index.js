import React, { useContext } from "react";
import "./filterControls.css";
import { GenresContext } from "../../contexts/genresContext";

const FilterControls = (props) => {
  const context = useContext(GenresContext);
  const handleChange = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value);
  };
  const handleTextChange = (e) => {
    handleChange(e, "name", e.target.value);
  };
  const handleGenreChange = (e) => {
    handleChange(e, "genre", e.target.value);
  };
  const handleOrderByChange = (e) => {
    handleChange(e, "orderBy", e.target.value);
  };
  const handleReleaseDateFilter = (e) => {
    handleChange(e, "releaseDate", e.target.value);
  };
  const handleRatingFilter = (e) => {
    handleChange(e, "ratings", e.target.value);
  };
  const handleMovieLanguageFilter = (e) => {
    handleChange(e, "language", e.target.value);
  };

  if (window.location.pathname !== "/") {
    return null
  }
  return (
    <div className="row bg-warning">
      <div className="col-md-12">
        <h4>
          <span>List Filtering:</span>
          <input
            type="text"
            placeholder="Title Search"
            onChange={handleTextChange}
          />
          <span>Genre:</span>
          <select id="genre" onChange={handleGenreChange}>
            {context.genres.map((genre) => {
              return (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              );
            })}
          </select>
          <br></br> <br></br>
          <span>Release Date:</span>
          <select name="year" onChange={handleReleaseDateFilter}>
            <option value="2020-01-01_2010-01-01">2010-2020</option>
            <option value="2009-01-01_2000-01-01">2000-2009</option>
            <option value="1999-01-01_1990-01-01">1990-1999</option>
            <option value="1989-01-01_1980-01-01">1980-1989</option>
            <option value="1979-01-01_1970-01-01">1970-1979</option>
            <option value="1909-01-01_1960-01-01">1900-1969</option>
          </select>
          <span>Ratings</span>
          <select name="rating" onChange={handleRatingFilter}>
            <option value="0">All</option>
            <option value="9">9+</option>
            <option value="8">8+</option>
            <option value="7">7+</option>
            <option value="6">6+</option>
            <option value="5">5+</option>
            <option value="4">4+</option>
            <option value="3">3+</option>
            <option value="2">2+</option>
            <option value="1">1+</option>
          </select>
          <span>Sort By:</span>
          <select id="orderBy" onChange={handleOrderByChange}>
            <option key="0" value="0">
              None
            </option>
            <option key="releaseDate" value="release_date.desc">
              Release Date
            </option>
            <option key="vote_average" value="vote_average.desc">
              Movie Ratings
            </option>
          </select>
          <span>Language:</span>
          <select id="length" onChange={handleMovieLanguageFilter}>
            <option key="0" value="0">
              All
            </option>
            <option key="english" value="en">
              English
            </option>
            <option key="french" value="ru">
              Russian
            </option>
            <option key="japanese" value="ja">
              Japanese
            </option>
            <option key="korean" value="ko">
              Korean
            </option>
          </select>
        </h4>
      </div>
    </div>
  );
};

export default FilterControls;
