import React, { useState, useMemo } from 'react';
import { Movie, Review, Rating } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { StarRating } from './StarRating';

interface MovieDetailsProps {
  movie: Movie;
  onClose: () => void;
}

export const MovieDetails: React.FC<MovieDetailsProps> = ({ movie, onClose }) => {
  const [reviews, setReviews] = useLocalStorage<Review[]>(`reviews_${movie.id}`, []);
  const [ratings, setRatings] = useLocalStorage<Rating[]>(`ratings_${movie.id}`, []);
  
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewUsername, setNewReviewUsername] = useState('');

  const userRating = useMemo(() => ratings.length > 0 ? ratings[0] : null, [ratings]);
  const [userScore, setUserScore] = useState<number>(userRating?.score || 0);

  const averageRating = useMemo(() => {
    if (ratings.length === 0) return 0;
    const total = ratings.reduce((acc, rating) => acc + rating.score, 0);
    return total / ratings.length;
  }, [ratings]);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReviewComment.trim() && newReviewUsername.trim()) {
      const newReview: Review = {
        id: new Date().toISOString(),
        movieId: movie.id,
        username: newReviewUsername,
        comment: newReviewComment,
        timestamp: Date.now(),
      };
      setReviews(prevReviews => [newReview, ...prevReviews]);
      setNewReviewComment('');
      setNewReviewUsername('');
    }
  };

  const handleRatingChange = (newScore: number) => {
     setUserScore(newScore);
     const newRating: Rating = { movieId: movie.id, score: newScore };
     // For simplicity, this example assumes one rating per user.
     // In a real app, you'd manage user-specific ratings.
     // Here we just replace the ratings array with the new one.
     setRatings([newRating]);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = `https://via.placeholder.com/400x600.png?text=${encodeURIComponent(movie.title)}`;
    e.currentTarget.onerror = null; // Prevent infinite loops
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-brand-secondary rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="md:flex">
          <div className="md:w-1/3 flex-shrink-0 bg-gray-100 dark:bg-brand-bg">
             <img 
              src={movie.posterUrl} 
              alt={movie.title} 
              className="w-full aspect-[2/3] object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none" 
              onError={handleImageError}
              />
          </div>
          <div className="md:w-2/3 p-8">
            <button
              onClick={onClose}
              className="flex items-center space-x-2 text-gray-500 dark:text-brand-muted hover:text-gray-900 dark:hover:text-brand-light font-semibold mb-6 transition-colors"
              aria-label="Go back to movie list"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              <span>Back to List</span>
            </button>

            <h2 className="text-4xl font-black text-gray-900 dark:text-brand-light mb-2">{movie.title} ({movie.year})</h2>
            <div className="flex items-center mb-4 space-x-4">
              <StarRating rating={averageRating} readOnly />
              <span className="text-gray-500 dark:text-brand-muted">{averageRating.toFixed(1)}/5 ({ratings.length} ratings)</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {movie.genre.map(g => <span key={g} className="bg-gray-100 dark:bg-gray-700 text-xs font-bold px-2 py-1 rounded-full text-gray-800 dark:text-gray-200">{g}</span>)}
            </div>
            
            <p className="text-gray-700 dark:text-brand-light mb-6">{movie.plot}</p>

            <div className="space-y-2 mb-8 text-gray-800 dark:text-gray-200">
              <p><strong className="text-gray-500 dark:text-brand-muted">Director:</strong> {movie.director}</p>
              <p><strong className="text-gray-500 dark:text-brand-muted">Starring:</strong> {movie.actors.join(', ')}</p>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="text-lg font-bold text-brand-primary mb-2">Rate This Movie</h4>
              <StarRating rating={userScore} onRatingChange={handleRatingChange} />
            </div>

            <div className="mt-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-brand-light border-b-2 border-brand-primary pb-2 mb-4">Reviews</h3>
              <form onSubmit={handleReviewSubmit} className="mb-6">
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={newReviewUsername}
                    onChange={(e) => setNewReviewUsername(e.target.value)}
                    className="w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:border-brand-primary"
                    required
                  />
                </div>
                <div className="mb-4">
                   <textarea
                    placeholder="Write your review..."
                    value={newReviewComment}
                    onChange={(e) => setNewReviewComment(e.target.value)}
                    className="w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:border-brand-primary"
                    rows={3}
                    required
                  />
                </div>
                <button type="submit" className="bg-brand-primary text-brand-secondary font-bold py-2 px-4 rounded-lg hover:bg-yellow-400 transition-colors">
                  Submit Review
                </button>
              </form>
              <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                {reviews.length > 0 ? reviews.map(review => (
                  <div key={review.id} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                    <p className="text-gray-800 dark:text-brand-light">"{review.comment}"</p>
                    <p className="text-sm text-gray-500 dark:text-brand-muted mt-2">- <strong className="text-brand-primary">{review.username}</strong> on {new Date(review.timestamp).toLocaleDateString()}</p>
                  </div>
                )) : <p className="text-gray-500 dark:text-brand-muted">Be the first to write a review!</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};