import { Route, Routes } from "react-router-dom";
import "./index.css";
import SignIn from "./pages/signIn";
import SignOut from "./pages/signUp";
import HomePage from "./pages/homePage";
import SearchPage from "./pages/search";
import MovieDetails from "./pages/movieDetails";
import Favorite from "./pages/favorite";
import Planned from "./pages/planned";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignOut />} />
        <Route path="/movies" element={<SearchPage />} />
        <Route path="/movie/:imdbID" element={<MovieDetails />} />
        <Route path="/favorites" element={<Favorite />} />
        <Route path="/planned" element={<Planned />} />
      </Routes>
    </>
  );
}

export default App;