import { useState } from "react";
import MovieCard from "../components/movie-card";
import Navbar from "../components/Navbar";
const API_URL = import.meta.env.VITE_API_URL;

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setResults([]);

    try {
      const response = await fetch(
        `${API_URL}/api/movies?search=${encodeURIComponent(query)}`
      );
      const data = await response.json();

      if (response.ok) {
        setResults(data.data || []);
      } else {
        setError(data.message || "Failed to fetch results.");
      }
    } catch (err) {
      console.error("Error fetching search results:", err);
      setError("An error occurred while fetching results.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
        <Navbar />
        <div className="pt-24 min-h-screen bg-gray-100 flex flex-col items-center py-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Search Movies</h1>
        <form onSubmit={handleSearch} className="w-full max-w-md flex mb-6">
            <input
            type="text"
            placeholder="Search for movies or series..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
            Search
            </button>
        </form>

        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {results.map((movie) => {
                return (
                    <MovieCard movie={movie} />
                );
            })}
        </div>
        </div>
    </>
  );
};

export default SearchPage;