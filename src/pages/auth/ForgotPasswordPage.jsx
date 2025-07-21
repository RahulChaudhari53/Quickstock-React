import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { AtSign } from "lucide-react";
import { useForgotPassword } from "../../hooks/useAuth";

export default function ForgotPasswordPage() {
  const { mutate, isPending } = useForgotPassword();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: validationSchema,
    onSubmit: (values) => mutate(values),
  });

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          Forgot Your Password?
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          No problem. Enter your email address and we'll send you an OTP to
          reset it.
        </p>
      </div>

      <div className="bg-white p-8 shadow-sm rounded-lg">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
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
                type="email"
                name="email"
                {...formik.getFieldProps("email")}
                className="block h-12 w-full rounded-md border-gray-300 pl-10 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="you@example.com"
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <p className="mt-2 text-sm text-red-600">{formik.errors.email}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="flex w-full justify-center rounded-md border border-transparent bg-gray-800 py-2 px-4 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isPending ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>
      </div>

      <p className="text-center text-sm text-gray-600">
        Remember your password?{" "}
        <Link
          to="/login"
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Log in
        </Link>
      </p>
    </div>
  );
}
