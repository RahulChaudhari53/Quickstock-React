import { useFormik } from "formik";
import * as Yup from "yup";
import { useAllCategories } from "../../hooks/useCategory";
import { useAllSuppliers } from "../../hooks/useSupplier";
import { Button } from "@/components/ui/button";

const FormField = ({ id, label, error, touched, ...props }) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-300 mb-1"
    >
      {label}
    </label>
    <input
      id={id}
      {...props}
      className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
    />
    {touched && error && <p className="mt-2 text-red-400 text-sm">{error}</p>}
  </div>
);

const SelectField = ({ id, label, error, touched, children, ...props }) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-300 mb-1"
    >
      {label}
    </label>
    <select
      id={id}
      {...props}
      className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
    >
      {children}
    </select>
    {touched && error && <p className="mt-2 text-red-400 text-sm">{error}</p>}
  </div>
);

export default function ProductForm({
  onSubmit,
  isPending,
  onCancel,
  initialData = null,
}) {
  const isEditMode = !!initialData;

  const { data: categoriesData } = useAllCategories({
    isActive: true,
    limit: 100,
  });
  const { data: suppliersData } = useAllSuppliers({
    isActive: true,
    limit: 100,
  });

  const categories = categoriesData?.data?.categories || [];
  const suppliers = suppliersData?.data?.data || [];

  const unitOptions = [
    "piece",
    "kg",
    "gram",
    "liter",
    "ml",
    "meter",
    "cm",
    "box",
    "pack",
    "dozen",
    "pair",
    "set",
  ];

  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .min(2)
      .max(100)
      .required("Product name is required"),
    sku: Yup.string().trim().min(3).max(20).required("SKU is required"),
    category: Yup.string().required("Category is required"),
    supplier: Yup.string().required("Supplier is required"),
    unit: Yup.string().required("Unit is required"),
    purchasePrice: Yup.number().min(0).required("Purchase price is required"),
    sellingPrice: Yup.number().min(0).required("Selling price is required"),
    minStockLevel: Yup.number()
      .min(0)
      .required("Minimum stock level is required"),
    initialStock: isEditMode
      ? Yup.number()
      : Yup.number().min(0).required("Initial stock is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: initialData?.name || "",
      sku: initialData?.sku || "",
      description: initialData?.description || "",
      category: initialData?.category?._id || "",
      supplier: initialData?.supplier?._id || "",
      unit: initialData?.unit || "piece",
      purchasePrice: initialData?.purchasePrice || 0,
      sellingPrice: initialData?.sellingPrice || 0,
      minStockLevel: initialData?.minStockLevel || 10,
      initialStock: initialData?.currentStock || 0, // In edit mode, this field is informational
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // eslint-disable-next-line no-unused-vars
      const { initialStock, ...submissionData } = values; // exclude initialStock in edit mode
      if (isEditMode) {
        onSubmit({ productId: initialData._id, data: submissionData });
      } else {
        onSubmit(values); // send all fields in create mode
      }
    },
    enableReinitialize: true,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          id="name"
          label="Product Name"
          {...formik.getFieldProps("name")}
          error={formik.errors.name}
          touched={formik.touched.name}
        />
        <FormField
          id="sku"
          label="SKU (Stock Keeping Unit)"
          {...formik.getFieldProps("sku")}
          error={formik.errors.sku}
          touched={formik.touched.sku}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectField
          id="category"
          label="Category"
          {...formik.getFieldProps("category")}
          error={formik.errors.category}
          touched={formik.touched.category}
        >
          <option value="">Select a Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </SelectField>
        <SelectField
          id="supplier"
          label="Supplier"
          {...formik.getFieldProps("supplier")}
          error={formik.errors.supplier}
          touched={formik.touched.supplier}
        >
          <option value="">Select a Supplier</option>
          {suppliers.map((sup) => (
            <option key={sup._id} value={sup._id}>
              {sup.name}
            </option>
          ))}
        </SelectField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectField
          id="unit"
          label="Unit of Measure"
          {...formik.getFieldProps("unit")}
          error={formik.errors.unit}
          touched={formik.touched.unit}
        >
          {unitOptions.map((unit) => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </SelectField>
        <FormField
          id="minStockLevel"
          label="Minimum Stock Level"
          type="number"
          {...formik.getFieldProps("minStockLevel")}
          error={formik.errors.minStockLevel}
          touched={formik.touched.minStockLevel}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          id="purchasePrice"
          label="Purchase Price"
          type="number"
          {...formik.getFieldProps("purchasePrice")}
          error={formik.errors.purchasePrice}
          touched={formik.touched.purchasePrice}
        />
        <FormField
          id="sellingPrice"
          label="Selling Price"
          type="number"
          {...formik.getFieldProps("sellingPrice")}
          error={formik.errors.sellingPrice}
          touched={formik.touched.sellingPrice}
        />
      </div>

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
          className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md"
        />
      </div>

      {!isEditMode && (
        <FormField
          id="initialStock"
          label="Initial Stock Quantity"
          type="number"
          {...formik.getFieldProps("initialStock")}
          error={formik.errors.initialStock}
          touched={formik.touched.initialStock}
        />
      )}

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
            : "Create Product"}
        </Button>
      </div>
    </form>
  );
}
