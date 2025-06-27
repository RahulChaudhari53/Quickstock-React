// component/auth/registerForm.jsx
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRegisterUser } from "../../hooks/useRegisterUser";

export default function RegisterForm() {
  const { mutateAsync, data, error, isPending } = useRegisterUser();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .trim()
      .min(2, "First Name must be at least 2 characters")
      .max(30, "First Name cannot exceed 30 characters")
      .required("First Name is required"),
    lastName: Yup.string()
      .trim()
      .min(2, "Last Name must be at least 2 characters")
      .max(30, "Last Name cannot exceed 30 characters")
      .required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phoneNumbers: Yup.string().required("Phone number is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumbers: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const { confirmPassword, ...formData } = values;
      try {
        await mutateAsync(formData);
        resetForm();
      } catch (err) {
        console.error("Registration submission error:", err);
      }
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-gray-900 rounded-lg shadow-xl text-white font-inter mt-8">
      <h2 className="text-3xl font-extrabold mb-8 text-center text-emerald-400">
        Create a New Account
      </h2>
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            name="firstName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
            className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-base transition duration-200 ease-in-out"
            placeholder="Enter your first name"
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <p className="mt-2 text-red-400 text-sm">
              {formik.errors.firstName}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            name="lastName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
            className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-base transition duration-200 ease-in-out"
            placeholder="Enter your last name"
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <p className="mt-2 text-red-400 text-sm">
              {formik.errors.lastName}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-base transition duration-200 ease-in-out"
            placeholder="Enter your email"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="mt-2 text-red-400 text-sm">{formik.errors.email}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="phoneNumbers"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Phone Number
          </label>
          <input
            id="phoneNumbers"
            type="text"
            name="phoneNumbers"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phoneNumbers}
            className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-base transition duration-200 ease-in-out"
            placeholder="Enter your phone number"
          />
          {formik.touched.phoneNumbers && formik.errors.phoneNumbers && (
            <p className="mt-2 text-red-400 text-sm">
              {formik.errors.phoneNumbers}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Password
          </label>
          <div className="relative">
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

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Confirm Password
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              className="mt-1 block w-full px-4 py-2 pr-10 bg-gray-800 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-base transition duration-200 ease-in-out"
              placeholder="Confirm your password"
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-400 focus:outline-none"
              aria-label={
                showConfirmPassword
                  ? "Hide confirm password"
                  : "Show confirm password"
              }
            >
              {showConfirmPassword ? "🙈" : "👁️"}
            </button>
          </div>
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p className="mt-2 text-red-400 text-sm">
              {formik.errors.confirmPassword}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-semibold text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-200 ease-in-out transform hover:scale-105"
        >
          {isPending ? "Registering..." : "Register"}
        </button>

        {error && (
          <p className="mt-4 text-red-400 text-center text-sm">
            {error.message}
          </p>
        )}
        {data && (
          <p className="mt-4 text-green-400 text-center text-sm">
            {data.message}
          </p>
        )}
      </form>
    </div>
  );
}
