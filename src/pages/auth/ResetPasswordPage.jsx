import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { Lock, CheckCircle, XCircle } from "lucide-react";
import { useResetPassword } from "../../hooks/useAuth";

// A component to show password validation rules in real-time.
const PasswordStrength = ({ password = "" }) => {
  const has8Chars = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);

  const Rule = ({ text, isMet }) => (
    <div
      className={`flex items-center text-sm transition-colors ${
        isMet ? "text-green-600" : "text-gray-500"
      }`}
    >
      {isMet ? (
        <CheckCircle size={16} className="mr-2 flex-shrink-0" />
      ) : (
        <XCircle size={16} className="mr-2 flex-shrink-0" />
      )}
      {text}
    </div>
  );

  return (
    <div className="space-y-2 mt-4 p-4 bg-gray-50 rounded-md border border-gray-200">
      <Rule text="At least 8 characters" isMet={has8Chars} />
      <Rule text="At least one uppercase letter" isMet={hasUpperCase} />
      <Rule text="At least one lowercase letter" isMet={hasLowerCase} />
      <Rule text="At least one number" isMet={hasNumber} />
    </div>
  );
};

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { mutate, isPending } = useResetPassword();

  const email = location.state?.email;
  const reset_token = location.state?.reset_token;

  useEffect(() => {
    if (!reset_token) {
      console.warn("Missing reset token. Redirecting.");
      navigate("/forgot-password");
    }
  }, [reset_token, navigate]);

  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain an uppercase letter")
      .matches(/[a-z]/, "Password must contain a lowercase letter")
      .matches(/[0-9]/, "Password must contain a number")
      .required("New password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Please confirm your password"),
  });

  const formik = useFormik({
    initialValues: { newPassword: "", confirmPassword: "" },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      mutate({ newPassword: values.newPassword, token: reset_token });
    },
  });

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          Reset Your Password
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Enter a new password for your account:{" "}
          <span className="font-semibold">{email}</span>
        </p>
      </div>

      <div className="bg-white p-8 shadow-sm rounded-lg">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <div className="relative mt-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="newPassword"
                type="password"
                name="newPassword"
                {...formik.getFieldProps("newPassword")}
                className="block h-12 w-full rounded-md border-gray-300 pl-10 shadow-sm sm:text-sm"
              />
            </div>
            <PasswordStrength password={formik.values.newPassword} />
            {formik.touched.newPassword && formik.errors.newPassword && (
              <p className="mt-2 text-sm text-red-600">
                {formik.errors.newPassword}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm New Password
            </label>
            <div className="relative mt-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                {...formik.getFieldProps("confirmPassword")}
                className="block h-12 w-full rounded-md border-gray-300 pl-10 shadow-sm sm:text-sm"
              />
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
            className="flex w-full justify-center rounded-md border border-transparent bg-gray-800 py-2 px-4 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 disabled:opacity-50"
          >
            {isPending ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
