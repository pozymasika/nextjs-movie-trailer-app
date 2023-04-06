import { useState, useEffect } from "react";
import styles from "@/styles/Movies.module.css";
import { useScript } from "@/hooks/useScript";
import FullMovieCard from "@/components/FullMovieCard";
import { API_PATH, API_KEY } from "@/constants";
import MovieCard from "@/components/MovieCard";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const status = useScript("https://www.youtube.com/iframe_api");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `${API_PATH}/movie/popular?api_key=${API_KEY}&language=en-US`
        );

        const data = await response.json();
        setMovies((prev) => prev.concat(data.results));
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovies();
  }, []);

  const mainMovie = movies[0];
  const otherMovies = movies.slice(1);

  return (
    <div className={"w-100 " + styles.movie}>
      <nav className={"navbar navbar-dark " + styles.navbar}>
        <span className="navbar-brand mb-0 p-2">
          <img
            src="/logo.png"
            width="30"
            className="d-inline-block align-top "
            alt="logo"
          />
          <span className="mx-2">Movie Trailers</span>
        </span>
      </nav>
      <FullMovieCard movie={mainMovie} />
      <div className="container mt-4">
        <div className="row justify-content-center">
          {otherMovies.map((movie, idx) => (
            <div className="col-12 col-sm-3" key={movie.id + idx}>
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoviesPage;
