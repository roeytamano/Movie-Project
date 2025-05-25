import { useState, useEffect } from "react";
import { useAuth } from "../authContext";
import Navbar from "../components/Navbar";
import MovieCard from "../components/movie-card";
const API_URL = import.meta.env.VITE_API_URL;

const Favorite = () => {
    const [favoriteMovies, setFavoriteMovies] = useState<any[]>([]);
    const [movieDetails, setMovieDetails] = useState<any[]>([]);
    const { userId } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
  
    useEffect(() => {
      if (!userId) {
        setError("User ID is missing. Please log in again.");
        return;
      }
  
      const fetchFavoriteMovies = async () => {
        setLoading(true);
        setError("");
  
        try {
          const response = await fetch(`${API_URL}/api/users/${userId}`);
          const data = await response.json();
  
          if (response.ok) {
            setFavoriteMovies(data.data.favoriteMovies || []);
          } else {
            setError(data.message || "Failed to fetch favorite movies.");
          }
        } catch (err) {
          console.error("Error fetching favorite movies:", err);
          setError("An error occurred while fetching favorite movies.");
        } finally {
          setLoading(false);
        }
      };
  
      fetchFavoriteMovies();
    }, [userId]);
  
    useEffect(() => {
      const fetchMovieDetails = async () => {
        const details = await Promise.all(
          favoriteMovies.map(async (movieId) => {
            try {
              const response = await fetch(`https://www.omdbapi.com/?i=${movieId}&apikey=2cc58735`);
              const data = await response.json();
              return data;
            } catch (err) {
              console.error(`Error fetching details for movie ${movieId}:`, err);
              return null;
            }
          })
        );
        setMovieDetails(details.filter((movie) => movie !== null));
      };
  
      if (favoriteMovies.length > 0) {
        fetchMovieDetails();
      }
    }, [favoriteMovies]);
  
    const handleDelete = (movieID: string) => {
      setFavoriteMovies((prev) => prev.filter((id) => id !== movieID));
      setMovieDetails((prev) => prev.filter((movie) => movie.imdbID !== movieID));
    };
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
  
    return (
      <>
        <Navbar />
        <div className="pt-16 min-h-screen bg-gray-100 flex flex-col items-center py-8">
          <h1 className="text-4xl font-bold mb-6">Favorite Movies</h1>
          {movieDetails.length === 0 ? (
            <p className="text-gray-500">You have no favorite movies yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {movieDetails.map((movie) => (
                <MovieCard
                  key={movie.imdbID}
                  movie={{
                    imdbID: movie.imdbID,
                    Poster: movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png",
                    Title: movie.Title,
                    Year: movie.Year,
                    listType: "favorite",
                    deleteButton: true,
                    onDelete: handleDelete, // Pass the callback
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </>
    );
  };
  
  export default Favorite;