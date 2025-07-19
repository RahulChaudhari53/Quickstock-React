// src/components/category/categoryForm.jsx
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";

export default function CategoryForm({
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
      .max(50, "Name cannot exceed 50 characters")
      .required("Category name is required"),
    description: Yup.string()
      .trim()
      .max(200, "Description cannot exceed 200 characters"),
  });

  const formik = useFormik({
    initialValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
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
          Category Name
        </label>
        <input
          id="name"
          type="text"
          {...formik.getFieldProps("name")}
          className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 sm:text-base transition"
          placeholder="e.g., Electronics"
        />
        {formik.touched.name && formik.errors.name && (
          <p className="mt-2 text-red-400 text-sm">{formik.errors.name}</p>
        )}
      </div>

      {/* Description Field */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Description (Optional)
        </label>
        <textarea
          id="description"
          rows={3}
          {...formik.getFieldProps("description")}
          className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 sm:text-base transition"
          placeholder="A short description of the category"
        />
        {formik.touched.description && formik.errors.description && (
          <p className="mt-2 text-red-400 text-sm">
            {formik.errors.description}
          </p>
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
            : "Create Category"}
        </Button>
      </div>
    </form>
  );
}
