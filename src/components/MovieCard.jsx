import { useState, useEffect } from "react";
import { API_PATH, API_KEY, IMG_API_PATH } from "@/constants";
import styles from "@/styles/Movies.module.css";
import Image from "next/image";
import dynamic from "next/dynamic";
const YoutubeTrailer = dynamic(() => import("./YoutubeTrailer"), {
  ssr: false,
});

export default function MovieCard({ movie, priority }) {
  const { title, poster_path, overview, vote_average, trailerLinkId } = movie;

  return (
    <div className="card mb-4">
      <div className={styles.poster}>
        <Image
          src={IMG_API_PATH + poster_path}
          alt={title}
          className={"card-img-top " + styles.posterImage}
          width={304}
          height={171}
          style={{
            objectFit: "cover",
            objectPosition: "top",
          }}
          priority={priority}
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
