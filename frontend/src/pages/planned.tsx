import { useState, useEffect } from "react";
import { useAuth } from "../authContext";
import Navbar from "../components/Navbar";
import MovieCard from "../components/movie-card";
const API_URL = import.meta.env.VITE_API_URL;

const Planned = () => {
  const [plannedMovies, setPlannedMovies] = useState<any[]>([]);
  const [movieDetails, setMovieDetails] = useState<any[]>([]);
  const { userId } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) {
      setError("User ID is missing. Please log in again.");
      return;
    }

    const fetchPlannedMovies = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(`${API_URL}/api/users/${userId}`);
        const data = await response.json();

        if (response.ok) {
          setPlannedMovies(data.data.plannedMovies || []);
        } else {
          setError(data.message || "Failed to fetch planned movies.");
        }
      } catch (err) {
        console.error("Error fetching planned movies:", err);
        setError("An error occurred while fetching planned movies.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlannedMovies();
  }, [userId]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const details = await Promise.all(
        plannedMovies.map(async (movieId) => {
          try {
            const response = await fetch(`http://www.omdbapi.com/?i=${movieId}&apikey=2cc58735`);
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

    if (plannedMovies.length > 0) {
      fetchMovieDetails();
    }
  }, [plannedMovies]);

  const handleDelete = (movieID: string) => {
    setPlannedMovies((prev) => prev.filter((id) => id !== movieID));
    setMovieDetails((prev) => prev.filter((movie) => movie.imdbID !== movieID));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      <Navbar />
      <div className="pt-16 min-h-screen bg-gray-100 flex flex-col items-center py-8">
        <h1 className="text-4xl font-bold mb-6">Planned Movies</h1>
        {movieDetails.length === 0 ? (
          <p className="text-gray-500">You have no planned movies yet.</p>
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
                  listType: "planned",
                  deleteButton: true,
                  onDelete: handleDelete,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Planned;