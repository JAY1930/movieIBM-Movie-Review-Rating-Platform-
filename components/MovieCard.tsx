import React from 'react';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  onSelectMovie: (movie: Movie) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onSelectMovie }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = `https://via.placeholder.com/400x600.png?text=${encodeURIComponent(movie.title)}`;
    e.currentTarget.onerror = null; // Prevent infinite loops
  };
  
  return (
    <div
      className="bg-white dark:bg-brand-secondary rounded-lg overflow-hidden shadow-lg cursor-pointer transform hover:scale-105 transition-transform duration-300 ease-in-out group"
      onClick={() => onSelectMovie(movie)}
    >
      <div className="relative">
        <img
          src={movie.posterUrl}
          alt={`Poster for ${movie.title}`}
          className="w-full h-auto aspect-[2/3] object-cover"
          onError={handleImageError}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-70 transition-opacity duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
           <p className="text-white text-lg font-bold">Details</p>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-md font-bold text-gray-900 dark:text-brand-light truncate" title={movie.title}>
          {movie.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-brand-muted">{movie.year}</p>
      </div>
    </div>
  );
};