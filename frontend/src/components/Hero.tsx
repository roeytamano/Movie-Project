import { Link } from "react-router-dom";
import { useAuth } from "../authContext";

const Hero = () => {
    const { isLoggedIn } = useAuth();
    return (
        <section className="bg-gray-100 flex-grow flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-blue-600 mb-6">
            Welcome to MovieApp
            </h1>
            <p className="text-lg text-gray-700 mb-8">
            Discover, rate, and manage your favorite movies and series. Join us to
            explore a world of entertainment!
            </p>
            {isLoggedIn ? (
            <Link
                to="/movies"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
                Explore Movies
            </Link>
            ) : (
            <Link
                to="/sign-up"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
                Join Now
            </Link>
            )}
        </div>
        </section>
    );
};

export default Hero;