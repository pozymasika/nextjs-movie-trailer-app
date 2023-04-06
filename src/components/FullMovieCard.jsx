import { useState, useEffect } from "react";
import { API_PATH, API_KEY, IMG_API_PATH } from "@/constants";
import YoutubeTrailer from "./YoutubeTrailer";
import styles from "@/styles/Movies.module.css";

export default function FullMovieCard({ movie }) {
  const [trailerLinkId, setTrailerLinkId] = useState("");

  useEffect(() => {
    if (!movie) {
      return;
    }

    const fetchTrailer = async () => {
      try {
        const response = await fetch(
          `${API_PATH}/movie/${movie.id}/videos?api_key=${API_KEY}&language=en-US`
        );
        const data = await response.json();
        const trailer = data.results.find((video) => video.type === "Trailer");
        if (trailer) {
          setTrailerLinkId(trailer.key);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchTrailer();
  }, [movie?.id]);

  return (
    <div className={styles.poster}>
      <img
        src={`${IMG_API_PATH}${movie?.poster_path}`}
        alt={movie?.title}
        className="w-100"
      />
      <h1 className={styles.posterTitle}>{movie?.title}</h1>
      {trailerLinkId && <YoutubeTrailer trailerLinkId={trailerLinkId} />}
    </div>
  );
}
