import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../auth/AuthProvider";

import {
  useUserProfile,
  useUpdateUserInfo,
  useUpdateEmail,
  useUpdatePassword,
  useUpdateProfileImage,
  useAddPhoneNumber,
  useDeletePhoneNumber,
  useDeactivateUser,
} from "../hooks/useUser";

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

export default function UserProfilePage() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // State to manage which section is currently being edited
  const [editMode, setEditMode] = useState(null); // null, 'name', 'email', 'phone'

  // Ref for the hidden file input
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
    validationSchema: Yup.object({
    }),
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

  // --- Event Handlers ---
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profileImage", file);
      updateProfileImage({ userId: userData.data._id, data: formData });
    }
  };

  const handleDeletePhone = (phoneNumber) => {
    if (
      window.confirm(
        `Are you sure you want to delete the number ${phoneNumber}?`
      )
    ) {
      deletePhoneNumber({ userId: userData.data._id, data: { phoneNumber } });
    }
  };

  const handleDeactivate = () => {
    if (
      window.confirm(
        "Are you sure you want to deactivate your account? This action cannot be undone."
      )
    ) {
      deactivateUser(userData.data._id, {
        onSuccess: () => {
          logout();
          navigate("/login");
        },
      });
    }
  };

  if (isLoading)
    return <div className="text-center p-10">Loading Profile...</div>;
  if (isError)
    return (
      <div className="text-red-400 text-center p-10">
        Error: {error.message}
      </div>
    );

  const user = userData.data;

  // --- Reusable Component for Displaying Info ---
  const InfoRow = ({ icon, label, value, editKey }) => (
    <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
      <div className="flex items-center gap-4">
        {icon}
        <div>
          <p className="text-sm text-gray-400">{label}</p>
          <p className="text-lg font-medium">{value}</p>
        </div>
      </div>
      <Button onClick={() => setEditMode(editKey)} size="sm" variant="ghost">
        <Edit2 className="h-5 w-5" />
      </Button>
    </div>
  );

  return (
    <div className="container mx-auto max-w-2xl p-6 font-inter text-white">
      <h1 className="text-4xl font-bold mb-8 text-center text-emerald-400">
        My Profile
      </h1>

      {/* --- Profile Image Section --- */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative">
          <img
            src={
              user.profileImage
                ? `http://localhost:5050/${user.profileImage.replace(
                    /\\/g,
                    "/"
                  )}`
                : `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=0D9488&color=fff&size=128`
            }
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-emerald-500"
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
            className="absolute bottom-0 right-0 bg-indigo-600 hover:bg-indigo-700 rounded-full h-10 w-10"
          >
            {isUpdatingImage ? "..." : <Edit2 size={20} />}
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {/* --- Full Name Section --- */}
        {editMode === "name" ? (
          <form
            onSubmit={infoFormik.handleSubmit}
            className="p-4 bg-gray-800 rounded-lg space-y-3"
          >
            <input
              name="firstName"
              {...infoFormik.getFieldProps("firstName")}
              className="w-full bg-gray-700 p-2 rounded"
            />
            {infoFormik.touched.firstName && infoFormik.errors.firstName && (
              <p className="text-red-400 text-sm">
                {infoFormik.errors.firstName}
              </p>
            )}
            <input
              name="lastName"
              {...infoFormik.getFieldProps("lastName")}
              className="w-full bg-gray-700 p-2 rounded"
            />
            {infoFormik.touched.lastName && infoFormik.errors.lastName && (
              <p className="text-red-400 text-sm">
                {infoFormik.errors.lastName}
              </p>
            )}
            <div className="flex gap-2">
              <Button
                type="submit"
                disabled={isUpdatingInfo}
                className="bg-emerald-600"
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
          <InfoRow
            icon={<User />}
            label="Full Name"
            value={`${user.firstName} ${user.lastName}`}
            editKey="name"
          />
        )}

        {/* --- Email Section --- */}
        {editMode === "email" ? (
          <form
            onSubmit={emailFormik.handleSubmit}
            className="p-4 bg-gray-800 rounded-lg space-y-3"
          >
            <input
              name="email"
              {...emailFormik.getFieldProps("email")}
              className="w-full bg-gray-700 p-2 rounded"
            />
            {emailFormik.touched.email && emailFormik.errors.email && (
              <p className="text-red-400 text-sm">{emailFormik.errors.email}</p>
            )}
            <div className="flex gap-2">
              <Button
                type="submit"
                disabled={isUpdatingEmail}
                className="bg-emerald-600"
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
          <InfoRow
            icon={<Mail />}
            label="Email"
            value={user.email}
            editKey="email"
          />
        )}

        {/* --- Update Password Section --- */}
        <div className="p-4 bg-gray-800 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <KeyRound />
              <p className="text-lg font-medium">Password</p>
            </div>
            <Button
              onClick={() =>
                setEditMode(editMode === "password" ? null : "password")
              }
              size="sm"
              variant="ghost"
            >
              {editMode === "password" ? <X /> : <Edit2 />}
            </Button>
          </div>
          {editMode === "password" && (
            <form
              onSubmit={passwordFormik.handleSubmit}
              className="mt-4 space-y-3"
            >
              {/* Password form fields here */}
              <input
                name="oldPassword"
                type="password"
                placeholder="Current Password"
                {...passwordFormik.getFieldProps("oldPassword")}
                className="w-full bg-gray-700 p-2 rounded"
              />
              {passwordFormik.touched.oldPassword &&
                passwordFormik.errors.oldPassword && (
                  <p className="text-red-400 text-sm">
                    {passwordFormik.errors.oldPassword}
                  </p>
                )}
              <input
                name="newPassword"
                type="password"
                placeholder="New Password"
                {...passwordFormik.getFieldProps("newPassword")}
                className="w-full bg-gray-700 p-2 rounded"
              />
              {passwordFormik.touched.newPassword &&
                passwordFormik.errors.newPassword && (
                  <p className="text-red-400 text-sm">
                    {passwordFormik.errors.newPassword}
                  </p>
                )}
              <Button
                type="submit"
                disabled={isUpdatingPassword}
                className="bg-indigo-600"
              >
                {isUpdatingPassword ? "Updating..." : "Update Password"}
              </Button>
            </form>
          )}
        </div>

        {/* --- Phone Numbers Section --- */}
        <div className="p-4 bg-gray-800 rounded-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium mb-2 flex items-center gap-4">
              <Phone /> Phone Numbers
            </h3>
            {!user.secondaryPhone && editMode !== "phone" && (
              <Button
                onClick={() => setEditMode("phone")}
                size="sm"
                variant="ghost"
              >
                <PlusCircle />
              </Button>
            )}
          </div>
          <div className="space-y-2 mt-2">
            <div className="flex justify-between items-center">
              <p>{user.primaryPhone} (Primary)</p>
            </div>
            {user.secondaryPhone && (
              <div className="flex justify-between items-center">
                <p>{user.secondaryPhone}</p>
                <Button
                  onClick={() => handleDeletePhone(user.secondaryPhone)}
                  size="icon"
                  variant="ghost"
                  className="text-red-400"
                  disabled={isDeletingPhone}
                >
                  <Trash2 size={18} />
                </Button>
              </div>
            )}
            {editMode === "phone" && (
              <form
                onSubmit={phoneFormik.handleSubmit}
                className="flex gap-2 items-start"
              >
                <div className="flex-grow">
                  <input
                    name="phoneNumber"
                    placeholder="New 10-digit number"
                    {...phoneFormik.getFieldProps("phoneNumber")}
                    className="w-full bg-gray-700 p-2 rounded"
                  />
                  {phoneFormik.touched.phoneNumber &&
                    phoneFormik.errors.phoneNumber && (
                      <p className="text-red-400 text-sm">
                        {phoneFormik.errors.phoneNumber}
                      </p>
                    )}
                </div>
                <Button
                  type="submit"
                  disabled={isAddingPhone}
                  className="bg-emerald-600"
                >
                  {isAddingPhone ? "..." : "Add"}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setEditMode(null)}
                >
                  <X />
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* --- Deactivate Account Section --- */}
        <div className="mt-10 border-t border-red-500/30 pt-6">
          <h3 className="text-lg font-semibold text-red-400 mb-2">
            Danger Zone
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            Deactivating your account is a permanent action.
          </p>
          <Button
            onClick={handleDeactivate}
            variant="destructive"
            className="w-full bg-red-600 hover:bg-red-700"
          >
            Deactivate Account
          </Button>
        </div>
      </div>
    </div>
  );
}
