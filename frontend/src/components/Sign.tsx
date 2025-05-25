import { useNavigate } from "react-router-dom";
import { useAuth } from "../authContext";
const API_URL = import.meta.env.VITE_API_URL;

interface SignProps {
  title: string;
  signIn: boolean;
}

const Sign = (props: SignProps) => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Use AuthContext for login state
  console.log(import.meta.env.VITE_API_URL);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const userName = formData.get("userName") as string;
    const password = formData.get("password") as string;
  
    try {
      const response = await fetch(`${API_URL}/api/users/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, password }),
      });
      const data = await response.json();
  
      if (response.ok) {
        login(data.data.userName, data.data._id);
        alert("Login successful!");
        navigate("/"); // Redirect to home page
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">{props.title}</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your username"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
              minLength={4}
              maxLength={8}
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {props.signIn ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </form>
        <p className="mt-6 text-sm text-center text-gray-500">
          {props.signIn ? (
            <>
              Don't have an account?{" "}
              <a href="/sign-up" className="text-blue-600 hover:underline">
                Sign Up
              </a>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <a href="/sign-in" className="text-blue-600 hover:underline">
                Sign In
              </a>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Sign;