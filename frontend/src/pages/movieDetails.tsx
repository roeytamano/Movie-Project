import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../authContext";
import Navbar from "../components/Navbar";
import {
  fetchMovieDetails,
  fetchUserLists,
  handleAddToList,
  handleAddComment as addCommentUtil,
} from "../services/movieDetailsUtils";

const MovieDetails = () => {
  const { imdbID } = useParams<{ imdbID: string }>();
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { userId } = useAuth();
  const [isInFavorites, setIsInFavorites] = useState(false);
  const [isInPlanned, setIsInPlanned] = useState(false);
  const [comments, setComments] = useState<any[]>([]); // Store comments and ratings
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState<number>(0);

  useEffect(() => {
    const loadMovieDetails = async () => {
      setLoading(true);
      setError("");

      try {
        const movieData = await fetchMovieDetails(imdbID!);
        setMovie(movieData);
        setComments(movieData.comments || []); // Load existing comments
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadMovieDetails();
  }, [imdbID]);

  useEffect(() => {
    const loadUserLists = async () => {
      if (!userId) return;

      try {
        const { isInFavorites, isInPlanned } = await fetchUserLists(userId, imdbID!);
        setIsInFavorites(isInFavorites);
        setIsInPlanned(isInPlanned);
      } catch (err) {
        console.error(err);
      }
    };

    loadUserLists();
  }, [userId, imdbID]);

  const handleAdd = async (listType: "favorite" | "planned") => {
    if (!userId) {
      alert("You must be logged in to add movies to your list.");
      return;
    }

    try {
      const message = await handleAddToList(userId, imdbID!, listType);
      alert(message);
      if (listType === "favorite") setIsInFavorites(true);
      if (listType === "planned") setIsInPlanned(true);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addCommentUtil(
        e,
        userId,
        localStorage.getItem("username") || "Anonymous",
        imdbID!,
        newComment,
        newRating,
        setComments,
        setNewComment,
        setNewRating
      );
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      <Navbar />
      <div className="pt-30 min-h-screen bg-gray-100 flex flex-col items-center py-8">
        {movie && (
          <div className="max-w-4xl bg-white shadow-md rounded-lg overflow-hidden">
            <img
              src={movie.poster !== "N/A" ? movie.poster : "/placeholder.png"}
              alt={movie.title}
              className="w-full h-96 object-cover"
            />
            <div className="p-6">
              <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
              <p className="text-gray-700 mb-4">{movie.plot}</p>
              <p className="text-gray-500 mb-4">
                <strong>Genre:</strong> {movie.genre}
              </p>
              <p className="text-gray-500 mb-4">
                <strong>Released:</strong> {movie.released}
              </p>
              <p className="text-gray-500 mb-4">
                <strong>IMDb Rating:</strong> {movie.rating}
              </p>
              <div className="flex space-x-4">
                {!isInFavorites && (
                  <button
                    onClick={() => handleAdd("favorite")}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Add to Favorites
                  </button>
                )}
                {!isInPlanned && (
                  <button
                    onClick={() => handleAdd("planned")}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                  >
                    Add to Planned
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Comment Section */}
        <div className="max-w-7xl w-full bg-white shadow-md rounded-lg overflow-hidden mt-8 p-6">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        <div className="flex flex-col md:flex-row md:space-x-8">
            {/* Add Comment Form */}
            <form onSubmit={handleAddComment} className="flex-1 mb-6 md:mb-0">
            <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write your comment here..."
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                rows={4}
                required
            ></textarea>
            <h2 className="text-lg font-bold mb-2">Rate</h2>
            <input
                id="rating"
                name="rating"
                type="number"
                value={newRating}
                onChange={(e) => setNewRating(Number(e.target.value))}
                placeholder="Rating (1-10)"
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                min={1}
                max={10}
                required
            />
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
                Add Comment
            </button>
            </form>

            {/* Comments List */}
            <div className="flex-1">
            {comments.length === 0 ? (
                <p className="text-gray-500">No comments yet. Be the first to comment!</p>
            ) : (
                <ul className="space-y-4">
                {comments.map((comment) => (
                    <li key={comment._id} className="border-b border-gray-300 pb-4">
                    <p className="text-gray-700">
                        <strong>Rating:</strong> {comment.rating}/10
                    </p>
                    <p className="text-gray-700">{comment.comment}</p>
                    <p className="text-sm text-gray-500">
                        <strong>User:</strong> {comment.userName || "Anonymous"}
                    </p>
                    </li>
                ))}
                </ul>
            )}
            </div>
        </div>
        </div>
        </div>
    </>
  );
};

export default MovieDetails;