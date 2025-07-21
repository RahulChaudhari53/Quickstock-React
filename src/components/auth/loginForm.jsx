// src/components/auth
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLoginUser } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { AtSign, Eye, EyeOff, Lock, Phone } from "lucide-react";
import AppIcon from "../../assets/quickstock-logo.svg";

export default function LoginForm() {
  const { mutate, isPending } = useLoginUser();
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object({
    phoneNumber: Yup.string().required("Phone number is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: { phoneNumber: "", password: "" },
    validationSchema: validationSchema,
    onSubmit: (values) => mutate(values),
  });

  return (
    <div className="w-full max-w-md space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div>
          <img src={AppIcon} alt="App icon" className="mx-auto h-20 w-20" />
        </div>

        <h2 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
          Welcome Back to QuickStock
        </h2>
        <p className="text-gray-700 text-lg text-center max-w-lg mx-auto">
          Log in to manage your inventory
        </p>
      </div>
      {/* Form Card */}
      <div>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Phone Number Input */}
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <div className="relative mt-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="phoneNumber"
                type="text"
                name="phoneNumber"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phoneNumber}
                className="h-12 block w-full rounded-md border border-gray-500 bg-white text-base text-gray-700 pl-10 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Your phone number"
              />
            </div>
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <p className="mt-2 text-sm text-red-600">
                {formik.errors.phoneNumber}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative mt-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="h-12 block w-full rounded-md border border-gray-500 bg-white text-base text-gray-700 pl-10 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter your password"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-500 hover:text-gray-500 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="mt-2 text-sm text-red-600">
                {formik.errors.password}
              </p>
            )}
          </div>

          <div className="text-right text-sm text-gray-600">
            <Link
              to="/forgot-password"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className="flex w-full h-12 justify-center rounded-md border border-transparent bg-gray-800 py-2 px-4 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isPending ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>

      {/* Footer Link */}
      <p className="text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-semibold text-indigo-600 hover:text-indigo-500"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
