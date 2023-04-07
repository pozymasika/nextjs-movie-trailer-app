import { useState, useEffect } from "react";
import styles from "@/styles/Movies.module.css";
import { useScript } from "@/hooks/useScript";
import FullMovieCard from "@/components/FullMovieCard";
import { API_PATH, API_KEY } from "@/constants";
import MovieCard from "@/components/MovieCard";
import Image from "next/image";

export const getStaticProps = async () => {
  const response = await fetch(
    `${API_PATH}/movie/popular?api_key=${API_KEY}&language=en-US`
  );

  const data = await response.json();
  const movies = await Promise.all(
    data.results.map(async (movie) => {
      const response = await fetch(
        `${API_PATH}/movie/${movie.id}/videos?api_key=${API_KEY}&language=en-US`
      );
      const data = await response.json();
      const trailer = data.results.find((video) => video.type === "Trailer");
      if (trailer) {
        return {
          ...movie,
          trailerLinkId: trailer.key,
        };
      }
      return movie;
    })
  );

  return {
    props: {
      movies,
    },
  };
};

const MoviesPage = ({ movies }) => {
  const status = useScript("https://www.youtube.com/iframe_api");

  const mainMovie = movies[0];
  const otherMovies = movies.slice(1);

  return (
    <div className={"w-100 " + styles.movie}>
      <nav className={"navbar navbar-dark " + styles.navbar}>
        <span className="navbar-brand mb-0 p-2">
          <Image
            src="/logo.png"
            width={30}
            height={39}
            className="d-inline-block align-top "
            alt="logo"
            priority
          />
          <span className="mx-2">Movie Trailers</span>
        </span>
      </nav>
      <FullMovieCard movie={mainMovie} />
      <div className="container mt-4">
        <div className="row justify-content-center">
          {otherMovies.map((movie, idx) => (
            <div className="col-12 col-sm-3" key={movie.id + idx}>
              <MovieCard movie={movie} priority={idx < 2} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoviesPage;
