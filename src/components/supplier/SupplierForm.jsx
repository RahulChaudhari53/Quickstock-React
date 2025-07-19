import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";

export default function SupplierForm({
  onSubmit,
  isPending,
  onCancel,
  initialData = null,
}) {
  const isEditMode = !!initialData;

  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name cannot exceed 100 characters")
      .required("Supplier name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
      .required("Phone number is required"),
    notes: Yup.string().trim().max(500, "Notes cannot exceed 500 characters"),
  });

  const formik = useFormik({
    initialValues: {
      name: initialData?.name || "",
      email: initialData?.email || "",
      phone: initialData?.phone || "",
      notes: initialData?.notes || "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // If in edit mode, pass the ID along with the data
      if (isEditMode) {
        onSubmit({ supplierId: initialData._id, data: values });
      } else {
        onSubmit(values);
      }
    },
    enableReinitialize: true,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      {/* Name Field */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Supplier Name
        </label>
        <input
          id="name"
          type="text"
          {...formik.getFieldProps("name")}
          className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        {formik.touched.name && formik.errors.name && (
          <p className="mt-2 text-red-400 text-sm">{formik.errors.name}</p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Email Address
        </label>
        <input
          id="email"
          type="email"
          {...formik.getFieldProps("email")}
          className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        {formik.touched.email && formik.errors.email && (
          <p className="mt-2 text-red-400 text-sm">{formik.errors.email}</p>
        )}
      </div>

      {/* Phone Field */}
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Phone Number
        </label>
        <input
          id="phone"
          type="text"
          {...formik.getFieldProps("phone")}
          className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        {formik.touched.phone && formik.errors.phone && (
          <p className="mt-2 text-red-400 text-sm">{formik.errors.phone}</p>
        )}
      </div>

      {/* Notes Field */}
      <div>
        <label
          htmlFor="notes"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Notes (Optional)
        </label>
        <textarea
          id="notes"
          rows={3}
          {...formik.getFieldProps("notes")}
          className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        {formik.touched.notes && formik.errors.notes && (
          <p className="mt-2 text-red-400 text-sm">{formik.errors.notes}</p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 pt-4">
        <Button
          type="button"
          onClick={onCancel}
          variant="outline"
          className="bg-gray-700 text-white hover:bg-gray-600 border-gray-600"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isPending}
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          {isPending
            ? isEditMode
              ? "Saving..."
              : "Creating..."
            : isEditMode
            ? "Save Changes"
            : "Create Supplier"}
        </Button>
      </div>
    </form>
  );
}
