import React from "react";
import ReactDOM from "react-dom";
// eslint-disable-next-line
import { BrowserRouter, Route, Redirect, Switch, Link } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoritesMoviesPage";
import SiteHeader from "./components/siteHeader";
import MoviesContextProvider from "./contexts/moviesContext";
import GenresContextProvider from "./contexts/genresContext";
import AddMovieReviewPage from "./pages/addMovieReviewPage";
import UpcomingMovieListPage from "./pages/upcomingMovieList";
import searchMoviesPage from "./pages/searchMovies";

const App = () => {
  return (
    <BrowserRouter>
      <div className="jumbotron">        
        <SiteHeader />
        <div className="container-fluid">
          <Route exact path="/reviews/form" component={AddMovieReviewPage} />
          <MoviesContextProvider>
            <GenresContextProvider>
              <Switch>
                <Route
                  exact
                  path="/movies/favorites"
                  component={FavoriteMoviesPage}
                />
                <Route
                  exact
                  path="/movies/upcomingMovies"
                  component={UpcomingMovieListPage}
                />
                <Route
                  path="/searchMovies"
                  component={searchMoviesPage}
                />

                <Route path="/movies/:id" component={MoviePage} />
                <Route path="/" component={HomePage} />
                {/* <Redirect from="*" to="/" /> */}
              </Switch>
            </GenresContextProvider>
          </MoviesContextProvider>
        </div>
      </div>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
