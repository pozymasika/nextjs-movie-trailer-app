import { useState, useEffect } from "react";
import { API_PATH, API_KEY, IMG_API_PATH } from "@/constants";
import YoutubeTrailer from "./YoutubeTrailer";
import styles from "@/styles/Movies.module.css";

export default function MovieCard({ movie }) {
  const { title, poster_path, overview, vote_average } = movie;
  const [trailerLinkId, setTrailerLinkId] = useState("");

  useEffect(() => {
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
  }, [movie.id]);

  return (
    <div className="card mb-4">
      <div className={styles.poster}>
        <img
          src={IMG_API_PATH + poster_path}
          alt={title}
          className={"card-img-top " + styles.posterImage}
        />
        {trailerLinkId && (
          <YoutubeTrailer
            trailerLinkId={trailerLinkId}
            className="card-img-top"
          />
        )}
      </div>
      <div className={"card-body pb-2 " + styles.cardBody}>
        <h5 className="card-title">{title}</h5>
        <p className={styles.desc}>{overview}</p>
        <span
          className={` badge tag ${
            vote_average >= 8 ? "text-bg-success" : "text-bg-warning"
          }`}>
          {vote_average}
        </span>
      </div>
    </div>
  );
}
