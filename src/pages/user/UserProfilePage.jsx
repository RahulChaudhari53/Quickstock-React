import { useState, useRef, useContext, useEffect } from "react";
import { usePage } from "../../auth/PageContext";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../../auth/AuthProvider";

import {
  useUserProfile,
  useUpdateUserInfo,
  useUpdateEmail,
  useUpdatePassword,
  useUpdateProfileImage,
  useAddPhoneNumber,
  useDeletePhoneNumber,
  useDeactivateUser,
} from "../../hooks/useUser";

import {
  Mail,
  Phone,
  User,
  KeyRound,
  Edit2,
  X,
  PlusCircle,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Reusable Card component for structure
const Card = ({ title, children }) => (
  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
    <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-4 border-b border-gray-200">
      {title}
    </h3>
    <div className="space-y-4">{children}</div>
  </div>
);

// Reusable row for displaying details
const DetailRow = ({ label, value, onEditClick, editKey }) => (
  <div className="flex justify-between items-center">
    <div>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-base text-gray-800">{value}</p>
    </div>
    <Button onClick={() => onEditClick(editKey)} size="sm" variant="ghost">
      <Edit2 className="h-5 w-5 text-gray-500" />
    </Button>
  </div>
);

export default function UserProfilePage() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { setPageTitle } = usePage();

  useEffect(() => {
    setPageTitle("My Profile");
  }, [setPageTitle]);

  const [editMode, setEditMode] = useState(null);
  const fileInputRef = useRef(null);

  const { data: userData, isLoading, isError, error } = useUserProfile();
  const { mutate: updateUserInfo, isPending: isUpdatingInfo } =
    useUpdateUserInfo();
  const { mutate: updateEmail, isPending: isUpdatingEmail } = useUpdateEmail();
  const { mutate: updatePassword, isPending: isUpdatingPassword } =
    useUpdatePassword();
  const { mutate: updateProfileImage, isPending: isUpdatingImage } =
    useUpdateProfileImage();
  const { mutate: addPhoneNumber, isPending: isAddingPhone } =
    useAddPhoneNumber();
  const { mutate: deletePhoneNumber, isPending: isDeletingPhone } =
    useDeletePhoneNumber();
  const { mutate: deactivateUser } = useDeactivateUser();

  const infoFormik = useFormik({
    initialValues: {
      firstName: userData?.data?.firstName || "",
      lastName: userData?.data?.lastName || "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
    }),
    onSubmit: (values) => {
      updateUserInfo(
        { userId: userData.data._id, data: values },
        { onSuccess: () => setEditMode(null) }
      );
    },
    enableReinitialize: true,
  });

  const emailFormik = useFormik({
    initialValues: { email: userData?.data?.email || "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
    }),
    onSubmit: (values) => {
      updateEmail(
        { userId: userData.data._id, data: values },
        { onSuccess: () => setEditMode(null) }
      );
    },
    enableReinitialize: true,
  });

  const passwordFormik = useFormik({
    initialValues: { oldPassword: "", newPassword: "", confirmNewPassword: "" },
    validationSchema: Yup.object({}),
    onSubmit: (values, { resetForm }) => {
      const data = {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      };
      updatePassword(
        { userId: userData.data._id, data },
        {
          onSuccess: () => {
            setEditMode(null);
            resetForm();
          },
        }
      );
    },
  });

  const phoneFormik = useFormik({
    initialValues: { phoneNumber: "" },
    validationSchema: Yup.object({
      phoneNumber: Yup.string()
        .matches(/^\d{10}$/, "Must be 10 digits")
        .required("Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      addPhoneNumber(
        { userId: userData.data._id, data: values },
        {
          onSuccess: () => {
            setEditMode(null);
            resetForm();
          },
        }
      );
    },
  });

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profileImage", file);
      updateProfileImage({ userId: userData.data._id, data: formData });
    }
  };

  const handleDeletePhone = (phoneNumber) => {
    deletePhoneNumber({ userId: userData.data._id, data: { phoneNumber } });
  };

  const handleDeactivate = () => {
    deactivateUser(userData.data._id, {
      onSuccess: () => {
        logout();
        navigate("/login");
      },
    });
  };

  if (isLoading)
    return (
      <div className="text-center p-10 text-gray-500">Loading Profile...</div>
    );
  if (isError)
    return (
      <div className="text-red-500 text-center p-10">
        Error: {error.message}
      </div>
    );

  const user = userData.data;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* --- Main Profile Card --- */}
      <div className="bg-white p-6 sm:p-8 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="relative flex-shrink-0">
            <img
              src={
                user.profileImage
                  ? `http://localhost:5050/${user.profileImage.replace(
                      /\\/g,
                      "/"
                    )}`
                  : `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=374151&color=fff&size=128`
              }
              alt="Profile"
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-[30%] object-cover border-4 border-white shadow-md"
            />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            <Button
              onClick={() => fileInputRef.current.click()}
              size="icon"
              className="absolute bottom-1 right-1 bg-gray-400 hover:bg-gray-700 text-white rounded-full h-8 w-8 sm:h-10 sm:w-10"
            >
              {isUpdatingImage ? "..." : <Edit2 size={18} />}
            </Button>
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-gray-500 mt-1">{user.email}</p>
          </div>
        </div>
      </div>

      {/* --- Personal Information Card --- */}
      <Card title="Personal Information">
        {editMode === "name" ? (
          <form onSubmit={infoFormik.handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                name="firstName"
                {...infoFormik.getFieldProps("firstName")}
                className="w-full px-4 py-2 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200"
                placeholder="First Name"
              />
              <input
                name="lastName"
                {...infoFormik.getFieldProps("lastName")}
                className="w-full px-4 py-2 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200"
                placeholder="Last Name"
              />
            </div>
            <div className="flex gap-2">
              <Button
                type="submit"
                disabled={isUpdatingInfo}
                className="bg-gray-400"
              >
                {isUpdatingInfo ? "Saving..." : "Save"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setEditMode(null)}
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <DetailRow
            label="Full Name"
            value={`${user.firstName} ${user.lastName}`}
            onEditClick={setEditMode}
            editKey="name"
          />
        )}
      </Card>

      {/* --- Contact Details Card --- */}
      <Card title="Contact Details">
        {editMode === "email" ? (
          <form onSubmit={emailFormik.handleSubmit} className="space-y-4">
            <input
              name="email"
              {...emailFormik.getFieldProps("email")}
              className="w-full px-4 py-2 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200"
              lastName="example@email.com"
            />
            <div className="flex gap-2">
              <Button
                type="submit"
                disabled={isUpdatingEmail}
                className="bg-gray-400"
              >
                {isUpdatingEmail ? "Saving..." : "Save"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setEditMode(null)}
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <DetailRow
            label="Email Address"
            value={user.email}
            onEditClick={setEditMode}
            editKey="email"
          />
        )}
        <hr className="border-gray-200" />
        {/* Phone numbers section */}
        <div>
          <p className="text-sm font-medium text-gray-500">Phone Numbers</p>
          <div className="mt-2 space-y-2">
            <div className="flex justify-between items-center">
              <p>
                {user.primaryPhone}{" "}
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                  Primary
                </span>
              </p>
            </div>
            {user.secondaryPhone && (
              <div className="flex justify-between items-center">
                <p>{user.secondaryPhone}</p>
                <Button
                  onClick={() => handleDeletePhone(user.secondaryPhone)}
                  size="icon"
                  variant="ghost"
                  className="text-red-500"
                  disabled={isDeletingPhone}
                >
                  <Trash2 size={18} />
                </Button>
              </div>
            )}
          </div>
          {!user.secondaryPhone && editMode !== "phone" && (
            <Button
              onClick={() => setEditMode("phone")}
              variant="link"
              className="p-0 h-auto mt-2"
            >
              <PlusCircle className="mr-2" /> Add secondary phone
            </Button>
          )}
          {editMode === "phone" && (
            <form
              onSubmit={phoneFormik.handleSubmit}
              className="flex gap-2 items-start mt-4"
            >
              <div className="flex-grow">
                <input
                  name="phoneNumber"
                  {...phoneFormik.getFieldProps("phoneNumber")}
                  className="w-full px-4 py-2 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200"
                  placeholder="Must br 10 digit."
                />
              </div>
              <Button
                type="submit"
                disabled={isAddingPhone}
                className="bg-gray-400"
              >
                {isAddingPhone ? "..." : "Add"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setEditMode(null)}
              >
                Cancel
              </Button>
            </form>
          )}
        </div>
      </Card>

      {/* --- Security Card --- */}
      <Card title="Security">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-gray-500">Password</p>
            <p className="text-base text-gray-800">••••••••</p>
          </div>
          <Button
            onClick={() =>
              setEditMode(editMode === "password" ? null : "password")
            }
            size="sm"
            variant="ghost"
          >
            {editMode === "password" ? "Cancel" : "Change"}
          </Button>
        </div>
        {editMode === "password" && (
          <form
            onSubmit={passwordFormik.handleSubmit}
            className="mt-4 space-y-3 border-t border-gray-200 pt-4"
          >
            <input
              name="oldPassword"
              type="password"
              placeholder="Current Password"
              {...passwordFormik.getFieldProps("oldPassword")}
              className="w-full px-4 py-2 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200"
            />
            <input
              name="newPassword"
              type="password"
              placeholder="New Password. 8"
              {...passwordFormik.getFieldProps("newPassword")}
              className="w-full px-4 py-2 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200"
            />
            <Button
              type="submit"
              disabled={isUpdatingPassword}
              className="bg-gray-400"
            >
              Update Password
            </Button>
          </form>
        )}
      </Card>

      {/* --- Danger Zone --- */}
      <div className="bg-red-50 p-6 rounded-lg border border-red-200 shadow-md">
        <h3 className="text-xl font-bold text-red-700 flex items-center gap-2">
          Danger Zone
        </h3>
        <p className="text-base text-red-600 mt-3 mb-5 leading-relaxed">
          Deactivating your account is a permanent action and cannot be undone.
        </p>
        <Button
          onClick={handleDeactivate}
          variant="destructive"
          className="w-full sm:w-auto px-6 text-base border border-gray-700
          hover:bg-red-500"
        >
          Deactivate Account
        </Button>
      </div>
    </div>
  );
}
