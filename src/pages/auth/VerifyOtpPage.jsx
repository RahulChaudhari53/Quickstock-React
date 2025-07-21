import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { KeyRound } from "lucide-react";
import { useVerifyOtp } from "../../hooks/useAuth";

export default function VerifyOtpPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { mutate, isPending } = useVerifyOtp();

  const email = location.state?.email;
  const temp_opt_token = location.state?.temp_opt_token;

  useEffect(() => {
    if (!email || !temp_opt_token) {
      console.warn("Missing state for OTP verification. Redirecting.");
      navigate("/forgot-password");
    }
  }, [email, temp_opt_token, navigate]);

  const validationSchema = Yup.object({
    otp: Yup.string()
      .matches(/^[0-9]{6}$/, "Must be exactly 6 digits")
      .required("OTP is required"),
  });

  const formik = useFormik({
    initialValues: { otp: "" },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Pass the necessary variables to the mutation
      mutate({ otp: values.otp, token: temp_opt_token, email: email });
    },
  });

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          Check Your Email
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          We've sent a 6-digit OTP to{" "}
          <span className="font-semibold text-gray-800">
            {email || "your email"}
          </span>
          .
        </p>
      </div>

      <div className="bg-white p-8 shadow-sm rounded-lg">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-gray-700"
            >
              Verification Code (OTP)
            </label>
            <div className="relative mt-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <KeyRound className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="otp"
                type="text"
                name="otp"
                maxLength="6"
                {...formik.getFieldProps("otp")}
                className="block h-12 w-full rounded-md border-gray-300 pl-10 shadow-sm sm:text-sm tracking-[.5em] text-center"
                placeholder="- - - - - -"
              />
            </div>
            {formik.touched.otp && formik.errors.otp && (
              <p className="mt-2 text-sm text-red-600">{formik.errors.otp}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="flex w-full justify-center rounded-md border border-transparent bg-gray-800 py-2 px-4 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 disabled:opacity-50"
          >
            {isPending ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>

      <p className="text-center text-sm text-gray-600">
        Didn't receive the code?{" "}
        <Link
          to="/forgot-password"
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Request a new one
        </Link>
      </p>
    </div>
  );
}
