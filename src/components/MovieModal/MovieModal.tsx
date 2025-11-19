import { createPortal } from "react-dom";
import css from "./MovieModal.module.css";
import type { Movie } from "../../types/movie";
import { useEffect } from "react";
import Clapperboard from "../../../public/clapperboard.png";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}
const MovieModal = ({ movie, onClose }: MovieModalProps) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        onClose();
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return createPortal(
    <div>
      <div
        onClick={handleBackdrop}
        className={css.backdrop}
        role="dialog"
        aria-modal="true"
      >
        <div className={css.modal}>
          <button
            onClick={onClose}
            className={css.closeButton}
            aria-label="Close modal"
          >
            &times;
          </button>
          {movie.backdrop_path ? (
            <img
              src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              alt={movie.title}
              className={css.image}
            />
          ) : movie.poster_path ? (
            <img
              className={css.image}
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
            />
          ) : (
            <img src={Clapperboard} alt="img" className={css.image} />
          )}

          <div className={css.content}>
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
            <p>
              <strong>Release Date:</strong> {movie.release_date}
            </p>
            <p>
              <strong>Rating:</strong> {movie.vote_average.toFixed(1)}/10
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root") as HTMLDivElement
  );
};

export default MovieModal;
