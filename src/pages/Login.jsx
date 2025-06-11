import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginForm from "../components/auth/loginForm";
import { AuthContext } from "../auth/authProvider";

/**
 * Login page component.
 * It renders the LoginForm and provides links/buttons to navigate to the registration page.
 * If a user is already logged in, it displays a message instead of the form.
 */
export default function Login() {
  const { user } = useContext(AuthContext);
  let navigate = useNavigate();

  const eventChangePage = (event) => {
    event.preventDefault();
    navigate("/register");
  };

  if (user) {
    return (
      <div className="p-6 text-white text-xl font-semibold bg-gray-800 rounded-lg shadow-md">
        You are already logged in.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-extrabold text-indigo-400 mb-8">
        Login to Your Account
      </h1>

      <LoginForm />

      <div className="mt-8 text-gray-300">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
        >
          Register here
        </Link>
      </div>
    </div>
  );
}
