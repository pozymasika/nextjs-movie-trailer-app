import { useState, useEffect } from "react";
import { API_PATH, API_KEY, IMG_API_PATH } from "@/constants";
import YoutubeTrailer from "./YoutubeTrailer";
import styles from "@/styles/Movies.module.css";
import Image from "next/image";

export default function FullMovieCard({ movie }) {
  return (
    <div className={styles.poster}>
      {movie && (
        <Image
          src={`${IMG_API_PATH}${movie?.poster_path}`}
          alt={movie?.title}
          width={1440}
          height={810}
          sizes="(max-width: 640px) 100vw, 1440px"
          priority
          style={{
            objectFit: "cover",
            objectPosition: "top",
          }}
        />
      )}
      <h1 className={styles.posterTitle}>{movie?.title}</h1>
      {movie.trailerLinkId && (
        <YoutubeTrailer trailerLinkId={movie.trailerLinkId} />
      )}
    </div>
  );
}
