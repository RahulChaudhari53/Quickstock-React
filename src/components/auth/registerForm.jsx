import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRegisterUser } from "../../hooks/useRegisterUser";
import { Link } from "react-router-dom";
import { User, AtSign, Phone, Lock, Eye, EyeOff } from "lucide-react";

export default function RegisterForm() {
  const { mutateAsync, isPending } = useRegisterUser();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .trim()
      .min(2, "Must be at least 2 characters")
      .max(30)
      .required("First name is required"),
    lastName: Yup.string()
      .trim()
      .min(2, "Must be at least 2 characters")
      .max(30)
      .required("Last name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    primaryPhone: Yup.string()
      .matches(/^\d{10}$/, "Must be a valid 10-digit phone number")
      .required("Phone number is required"),
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
      primaryPhone: "",
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

  return (
    <div className="w-full max-w-md space-y-8 my-12">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          Create an Account
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Start managing your inventory with QuickStock
        </p>
      </div>

      <div className="relative-mt-1">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name Input */}
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  {...formik.getFieldProps("firstName")}
                  className="h-12 block w-full rounded-md border border-gray-500 bg-white text-base text-gray-700 pl-10 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              {formik.touched.firstName && formik.errors.firstName && (
                <p className="mt-2 text-sm text-red-600">
                  {formik.errors.firstName}
                </p>
              )}
            </div>

            {/* Last Name Input */}
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  {...formik.getFieldProps("lastName")}
                  className="h-12 block w-full rounded-md border border-gray-500 bg-white text-base text-gray-700 pl-10 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              {formik.touched.lastName && formik.errors.lastName && (
                <p className="mt-2 text-sm text-red-600">
                  {formik.errors.lastName}
                </p>
              )}
            </div>
          </div>

          {/* Phone Number Input */}
          <div>
            <label
              htmlFor="primaryPhone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <div className="relative mt-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="primaryPhone"
                name="primaryPhone"
                type="tel"
                {...formik.getFieldProps("primaryPhone")}
                className="h-12 block w-full rounded-md border border-gray-500 bg-white text-base text-gray-700 pl-10 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            {formik.touched.primaryPhone && formik.errors.primaryPhone && (
              <p className="mt-2 text-sm text-red-600">
                {formik.errors.primaryPhone}
              </p>
            )}
          </div>

          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <div className="relative mt-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <AtSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                {...formik.getFieldProps("email")}
                className="h-12 block w-full rounded-md border border-gray-500 bg-white text-base text-gray-700 pl-10 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <p className="mt-2 text-sm text-red-600">{formik.errors.email}</p>
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
                name="password"
                type={showPassword ? "text" : "password"}
                {...formik.getFieldProps("password")}
                className="h-12 block w-full rounded-md border border-gray-500 bg-white text-base text-gray-700 pl-10 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-500"
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

          {/* Confirm Password Input */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <div className="relative mt-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                {...formik.getFieldProps("confirmPassword")}
                className="h-12 block w-full rounded-md border border-gray-500 bg-white text-base text-gray-700 pl-10 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-600">
                  {formik.errors.confirmPassword}
                </p>
              )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="flex w-full h-12 justify-center rounded-md border border-transparent bg-gray-800 py-2 px-4 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isPending ? "Creating account..." : "Sign Up"}
          </button>
        </form>
      </div>

      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-indigo-600 hover:text-indigo-500"
        >
          Log in
        </Link>
      </p>
    </div>
  );
}
