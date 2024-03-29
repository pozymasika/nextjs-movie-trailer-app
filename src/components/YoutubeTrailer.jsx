import { useEffect, useRef, useState } from "react";
import styles from "@/styles/Movies.module.css";

export default function YoutubeTrailer({ trailerLinkId, className = "" }) {
  const [player, setPlayer] = useState(null);
  const playerId = "player-" + trailerLinkId;
  const playerRef = useRef(null);

  function initPlayer() {
    if (!window.YT) {
      return;
    }

    window.YT.ready(() => {
      const player = new window.YT.Player(playerId, {
        videoId: trailerLinkId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          iv_load_policy: 3,
          fs: 0,
          cc_load_policy: 0,
          autohide: 1,
          disablekb: 1,
          playsinline: 1,
        },
        events: {
          onReady: () => {
            console.log(`player for ${trailerLinkId} loaded`);
            setPlayer(player);
          },
          onError: (e) => {
            console.log("error", e);
          },
        },
      });
    });
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          initPlayer();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(playerRef.current);
    return () => {
      observer.disconnect();
    };
  }, [trailerLinkId]);

  return (
    <div
      className={`${className} ${styles.trailer}`}
      onMouseOver={() => player?.playVideo()}
      onMouseOut={() => player?.pauseVideo()}>
      <div
        className="w-100 h-100"
        id={"player-" + trailerLinkId}
        ref={playerRef}
      />
    </div>
  );
}
