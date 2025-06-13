import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLoginUser } from "../../hooks/useLoginUser";
import { Link } from "react-router-dom";

export default function LoginForm() {
  const { mutate, error, isPending } = useLoginUser();
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object({
    phoneNumber: Yup.string().required("Phone number is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      phoneNumber: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-gray-900 rounded-lg shadow-xl text-white font-inter mt-8">
      <h2 className="text-3xl font-extrabold mb-8 text-center text-emerald-400">
        Login to Your Account
      </h2>
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* Phone Number Input Group */}
        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Phone Number
          </label>
          <input
            id="phoneNumber"
            type="text"
            name="phoneNumber"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phoneNumber}
            className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-base transition duration-200 ease-in-out"
            placeholder="Enter your phone number"
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber && (
            <p className="mt-2 text-red-400 text-sm">
              {formik.errors.phoneNumber}
            </p>
          )}
        </div>
        {/* Password Input Group with Toggle */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Password
          </label>
          <div className="relative">
            {" "}
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="mt-1 block w-full px-4 py-2 pr-10 bg-gray-800 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-base transition duration-200 ease-in-out"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-400 focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          {formik.touched.password && formik.errors.password && (
            <p className="mt-2 text-red-400 text-sm">
              {formik.errors.password}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-semibold text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-200 ease-in-out transform hover:scale-105"
        >
          {isPending ? "Logging in..." : "Login"}
        </button>

        {error && (
          <p className="mt-4 text-red-400 text-center text-sm">
            {error.message}
          </p>
        )}
      </form>
    </div>
  );
}
