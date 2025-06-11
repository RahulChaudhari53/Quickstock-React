import { useContext } from "react";
import RegisterForm from "../components/auth/RegisterForm";
import { AuthContext } from "../auth/authProvider";
import { Link } from "react-router-dom";

/**
 * Register page component.
 * It renders the RegisterForm. If a user is already logged in, it displays a message
 * prompting them to log out first.
 */
export default function Register() {
  const { user } = useContext(AuthContext);

  if (user) {
    return (
      <div className="p-6 text-white text-xl font-semibold bg-gray-800 rounded-lg shadow-md">
        You are already logged in. Please{" "}
        <Link
          to="/"
          className="text-indigo-400 hover:underline"
          onClick={() => user.logout()}
        >
          logout
        </Link>{" "}
        to register a new account.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-extrabold text-indigo-400 mb-8">
        Create a New Account
      </h1>
      <RegisterForm />
      <div className="mt-8 text-gray-300">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
        >
          Login here
        </Link>
      </div>
    </div>
  );
}
