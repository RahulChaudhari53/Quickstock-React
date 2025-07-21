import { useFormik } from "formik";
import * as Yup from "yup";
import { useAllCategories } from "../../hooks/useCategory";
import { useAllSuppliers } from "../../hooks/useSupplier";
import { Button } from "@/components/ui/button";

const FormField = ({ id, label, error, touched, ...props }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      id={id}
      {...props}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
    />
    {touched && error && <p className="mt-2 text-sm text-red-600">{error}</p>}
  </div>
);

const SelectField = ({ id, label, error, touched, children, ...props }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <select
      id={id}
      {...props}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
    >
      {children}
    </select>
    {touched && error && <p className="mt-2 text-sm text-red-600">{error}</p>}
  </div>
);

const TextareaField = ({ id, label, error, touched, ...props }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <textarea
      id={id}
      {...props}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
    />
    {touched && error && <p className="mt-2 text-sm text-red-600">{error}</p>}
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
    <form
      onSubmit={formik.handleSubmit}
      className="space-y-8 divide-y divide-gray-200"
    >
      <div className="space-y-6 pt-2">
        <div>
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Product Information
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Enter the core details of the product.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <FormField
              id="name"
              label="Product Name"
              {...formik.getFieldProps("name")}
              error={formik.errors.name}
              touched={formik.touched.name}
            />
          </div>
          <div className="sm:col-span-3">
            <FormField
              id="sku"
              label="SKU (Stock Keeping Unit)"
              {...formik.getFieldProps("sku")}
              error={formik.errors.sku}
              touched={formik.touched.sku}
            />
          </div>
          <div className="sm:col-span-3">
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
          </div>
          <div className="sm:col-span-3">
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
          <div className="sm:col-span-6">
            <TextareaField
              id="description"
              label="Description (Optional)"
              rows={3}
              {...formik.getFieldProps("description")}
              error={formik.errors.description}
              touched={formik.touched.description}
            />
          </div>
        </div>
      </div>

      <div className="space-y-6 pt-8">
        <div>
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Pricing & Inventory
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Set the pricing and stock management rules.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <FormField
              id="purchasePrice"
              label="Purchase Price"
              type="number"
              step="0.01"
              {...formik.getFieldProps("purchasePrice")}
              error={formik.errors.purchasePrice}
              touched={formik.touched.purchasePrice}
            />
          </div>
          <div className="sm:col-span-3">
            <FormField
              id="sellingPrice"
              label="Selling Price"
              type="number"
              step="0.01"
              {...formik.getFieldProps("sellingPrice")}
              error={formik.errors.sellingPrice}
              touched={formik.touched.sellingPrice}
            />
          </div>
          <div className="sm:col-span-2">
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
          </div>
          <div className="sm:col-span-2">
            <FormField
              id="minStockLevel"
              label="Min Stock Level"
              type="number"
              {...formik.getFieldProps("minStockLevel")}
              error={formik.errors.minStockLevel}
              touched={formik.touched.minStockLevel}
            />
          </div>
          {!isEditMode && (
            <div className="sm:col-span-2">
              <FormField
                id="initialStock"
                label="Initial Stock"
                type="number"
                {...formik.getFieldProps("initialStock")}
                error={formik.errors.initialStock}
                touched={formik.touched.initialStock}
              />
            </div>
          )}
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end gap-3">
          <Button type="button" onClick={onCancel} variant="outline">
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isPending}
            className="bg-gray-800 hover:bg-gray-700 text-white"
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
      </div>
    </form>
  );
}
