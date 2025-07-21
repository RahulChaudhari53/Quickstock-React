import RegisterForm from "../../components/auth/registerForm";
import AppIcon from "../../assets/quickstock-logo.svg";
import Illustration from "../../assets/Sign up-bro.svg";

export default function Register() {
  return (
    <div className="min-h-screen flex">
      <div className="relative hidden md:flex w-3/5 items-center justify-center bg-gray-50 p-10">
        {" "}
        <div className="text-center">
          <img
            src={AppIcon}
            alt="QuickStock logo"
            className="h-20 w-20 mx-auto mb-6"
          />{" "}
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
            Welcome to QuickStock
          </h1>
          <p className="text-gray-700 text-lg text-center max-w-lg mx-auto">
            Manage your inventory smarter, faster, and easier with our intuitive
            platform.
          </p>
          <img
            src={Illustration}
            alt="Inventory illustration"
            className="mt-12 w-[450px] max-w-full mx-auto"
          />
        </div>
      </div>
      {/* Right Panel - Form Column */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-1">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 md:p-10">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
