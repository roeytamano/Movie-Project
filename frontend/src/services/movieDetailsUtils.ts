const API_URL = import.meta.env.VITE_API_URL;

export const fetchMovieDetails = async (imdbID: string) => {
    try {
      const response = await fetch(`${API_URL}/api/movies/${imdbID}`);
      const data = await response.json();
  
      if (response.ok) {
        return data.data;
      } else {
        throw new Error(data.message || "Failed to fetch movie details.");
      }
    } catch (err) {
      console.error("Error fetching movie details:", err);
      throw new Error("An error occurred while fetching movie details.");
    }
  };
  
export const fetchUserLists = async (userId: string, imdbID: string) => {
    try {
        const response = await fetch(`${API_URL}/api/users/${userId}`);
        const data = await response.json();

        if (response.ok) {
        const { favoriteMovies, plannedMovies } = data.data;
        return {
            isInFavorites: favoriteMovies.includes(imdbID),
            isInPlanned: plannedMovies.includes(imdbID),
        };
        } else {
        throw new Error(data.message || "Failed to fetch user lists.");
        }
    } catch (err) {
        console.error("Error fetching user lists:", err);
        throw new Error("An error occurred while fetching user lists.");
    }
};

export const handleAddToList = async (
    userId: string,
    imdbID: string,
    listType: "favorite" | "planned"
    ) => {
    try {
        const response = await fetch(`${API_URL}/api/movies/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ movieId: imdbID, listType }),
        });

        if (response.ok) {
        return `Added to ${listType === "favorite" ? "Favorites" : "Planned List"}!`;
        } else {
        const data = await response.json();
        throw new Error(data.message || `Failed to add to ${listType}.`);
        }
    } catch (err) {
        console.error(`Error adding to ${listType} list:`, err);
        throw new Error(`An error occurred while adding to ${listType}.`);
    }
};

export const handleAddComment = async (
    e: React.FormEvent, 
    userId: string | null,
    userName: string,
    imdbID: string,
    newComment: string,
    newRating: number,
    setComments: React.Dispatch<React.SetStateAction<any[]>>,
    setNewComment: React.Dispatch<React.SetStateAction<string>>,
    setNewRating: React.Dispatch<React.SetStateAction<number>>
) => {
    e.preventDefault();

    if (!userId) {
        alert("You must be logged in to add a comment.");
        return;
    }

    if (!newComment.trim() || newRating <= 0 || newRating > 10) {
        alert("Please provide a valid comment and rating (1-10).");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/api/ratings`, { // Correct endpoint
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId,
                userName,
                movieId: imdbID, // Send movieId in the body
                rating: newRating,
                comment: newComment,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            setComments((prev) => [...prev, data.data]); // Add the new comment to the list
            setNewComment("");
            setNewRating(0);
            alert("Comment added successfully!");
        } else {
            const data = await response.json();
            alert(data.message || "Failed to add comment.");
        }
    } catch (err) {
        console.error("Error adding comment:", err);
        alert("An error occurred while adding the comment.");
    }
};