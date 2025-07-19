import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { useAllSuppliers } from "../../hooks/useSupplier";
import ProductSelect from "../ui/ProductSelect";
import { Button } from "@/components/ui/button";
import { Trash2, PlusCircle } from "lucide-react";

export default function PurchaseForm({
  onSubmit,
  isPending,
  initialData = null,
}) {
  const isEditMode = !!initialData;

  const { data: suppliersData } = useAllSuppliers({
    isActive: true,
    limit: 100,
  });

  const suppliers = suppliersData?.data?.data || [];

  const validationSchema = Yup.object({
    supplier: Yup.string().required("Supplier is required"),
    paymentMethod: Yup.string().required("Payment method is required"),
    notes: Yup.string().trim().max(500, "Notes cannot exceed 500 characters"),
    items: Yup.array()
      .of(
        Yup.object().shape({
          product: Yup.string().required("Product is required"),
          quantity: Yup.number().min(1, "Min 1").required("Required"),
          unitCost: Yup.number().min(0, "Min 0").required("Required"),
        })
      )
      .min(1, "At least one item is required"),
  });

  const initialValues = {
    supplier: initialData?.supplier?._id || "",
    paymentMethod: initialData?.paymentMethod || "cash",
    notes: initialData?.notes || "",
    items: initialData?.items?.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
      unitCost: item.unitCost,
    })) || [{ product: "", quantity: 1, unitCost: 0 }],
  };

  const handleFormSubmit = (values) => {
    const submissionData = {
      ...values,
      items: values.items.map((item) => ({
        ...item,
        totalCost: item.quantity * item.unitCost,
      })),
    };
    onSubmit(submissionData);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
      enableReinitialize
    >
      {({ values, errors, touched, setFieldValue }) => (
        <Form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="supplier"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Supplier
              </label>
              <Field
                as="select"
                id="supplier"
                name="supplier"
                className="mt-1 block w-full px-4 py-2 bg-gray-700 rounded-md"
              >
                <option value="">Select a Supplier</option>
                {suppliers.map((sup) => (
                  <option key={sup._id} value={sup._id}>
                    {sup.name}
                  </option>
                ))}
              </Field>
              {errors.supplier && touched.supplier && (
                <p className="text-red-400 text-sm mt-1">{errors.supplier}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="paymentMethod"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Payment Method
              </label>
              <Field
                as="select"
                id="paymentMethod"
                name="paymentMethod"
                className="mt-1 block w-full px-4 py-2 bg-gray-700 rounded-md"
              >
                <option value="cash">Cash</option>
                <option value="online">Online</option>
              </Field>
            </div>
          </div>

          <FieldArray name="items">
            {({ push, remove }) => (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-emerald-400 border-b border-gray-600 pb-2">
                  Purchase Items
                </h3>
                {values.items.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-12 gap-3 items-start p-3 bg-gray-800 rounded-md"
                  >
                    <div className="col-span-12 md:col-span-5">
                      <label className="text-xs text-gray-400">Product</label>
                      <ProductSelect
                        value={values.items[index].product}
                        onChange={(selectedOption) => {
                          const productId = selectedOption
                            ? selectedOption.value
                            : "";
                          const product = selectedOption
                            ? selectedOption.product
                            : null;
                          setFieldValue(`items.${index}.product`, productId);
                          setFieldValue(
                            `items.${index}.unitCost`,
                            product ? product.purchasePrice : 0
                          );
                        }}
                      />
                    </div>
                    <div className="col-span-4 md:col-span-2">
                      <label className="text-xs text-gray-400">Quantity</label>
                      <Field
                        type="number"
                        name={`items.${index}.quantity`}
                        className="mt-1 block w-full p-2 bg-gray-700 rounded-md text-sm"
                      />
                    </div>
                    <div className="col-span-4 md:col-span-2">
                      <label className="text-xs text-gray-400">Unit Cost</label>
                      <Field
                        type="number"
                        name={`items.${index}.unitCost`}
                        className="mt-1 block w-full p-2 bg-gray-700 rounded-md text-sm"
                      />
                    </div>
                    <div className="col-span-4 md:col-span-2">
                      <label className="text-xs text-gray-400">Total</label>
                      <p className="mt-1 p-2 text-sm font-semibold">
                        $
                        {(
                          (values.items[index].quantity || 0) *
                          (values.items[index].unitCost || 0)
                        ).toFixed(2)}
                      </p>
                    </div>
                    <div className="col-span-12 md:col-span-1 flex items-end">
                      <Button
                        type="button"
                        onClick={() => remove(index)}
                        variant="ghost"
                        size="icon"
                        className="text-red-400"
                      >
                        <Trash2 size={20} />
                      </Button>
                    </div>
                  </div>
                ))}
                {typeof errors.items === "string" && (
                  <p className="text-red-400 text-sm mt-1">{errors.items}</p>
                )}
                <Button
                  type="button"
                  onClick={() =>
                    push({ product: "", quantity: 1, unitCost: 0 })
                  }
                  variant="outline"
                  className="bg-gray-700 flex items-center gap-2"
                >
                  <PlusCircle size={16} /> Add Item
                </Button>
              </div>
            )}
          </FieldArray>

          <div>
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Notes (Optional)
            </label>
            <Field
              as="textarea"
              id="notes"
              name="notes"
              rows={3}
              className="mt-1 block w-full p-2 bg-gray-700 rounded-md"
            />
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Button
              type="submit"
              disabled={isPending}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              {isPending
                ? isEditMode
                  ? "Saving..."
                  : "Creating..."
                : isEditMode
                ? "Save Changes"
                : "Create Purchase"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
