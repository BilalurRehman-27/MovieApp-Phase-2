import React, { useEffect, useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getUpcomingMovies } from "../api/tmdb-api";

const UpcomingMovieListPage = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  useEffect(() => {
    getUpcomingMovies().then((upcomingMovies) => {
      setUpcomingMovies(upcomingMovies);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>      
      <PageTemplate
        title="Upcoming Movies"
        movies={upcomingMovies}
        action={() => null}
      />
    </>
  );
};

export default UpcomingMovieListPage;
