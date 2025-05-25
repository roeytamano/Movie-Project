import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

interface Movie {
    imdbID: string;
    Poster: string;
    Title: string;
    Year: string;
    listType?: string;
    deleteButton?: boolean;
    onDelete?: (movieID: string) => void; // Callback to update state in parent
  }
  
  const MovieCard = ({ movie }: { movie: Movie }) => {
    const navigate = useNavigate();
  
    const handleCardClick = () => {
      navigate(`/movie/${movie.imdbID}`); // Navigate to the movie details page
    };
  
    const deleteMovie = async (movieID: string, listType: string) => {
      try {
        console.log("Deleting movie with ID:", movieID, "from list:", listType, "for user:", localStorage.userId);
  
        const response = await fetch(
          `${API_URL}/api/movies/${localStorage.userId}?movieId=${movieID}&listType=${listType}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        if (!response.ok) {
          throw new Error("Failed to delete movie");
        }
  
        const data = await response.json();
        console.log(`Movie with ID ${movieID} deleted successfully:`, data);
  
        // Call the onDelete callback to update the parent state.
        if (movie.onDelete) {
          movie.onDelete(movieID);
        }
      } catch (error) {
        console.error("Error deleting movie:", error);
        alert("Failed to remove the movie.");
      }
    };
  
    return (
      <div
        className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105"
        onClick={handleCardClick}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleCardClick();
          }
        }}
        tabIndex={0}
        role="button"
        aria-label={`View details for ${movie.Title}`}
      >
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
          alt={movie.Title}
          className="w-full h-64 object-cover"
        />
        <div className="p-4">
          <h2 className="text-lg font-bold">{movie.Title}</h2>
          <p className="text-sm text-gray-500">{movie.Year}</p>
          <a
            href={`https://www.imdb.com/title/${movie.imdbID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            View on IMDb
          </a>
          {movie.deleteButton && (
            <button
              className="ml-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
              aria-label={`Delete movie ${movie.Title}`}
              onClick={(e) => {
                e.stopPropagation();
                deleteMovie(movie.imdbID, movie.listType || "defaultListType");
              }}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    );
  };
  
  export default MovieCard;