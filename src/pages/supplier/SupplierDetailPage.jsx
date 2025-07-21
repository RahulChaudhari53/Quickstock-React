import { useParams, Link } from "react-router-dom";
import { useSupplierById } from "../../hooks/useSupplier";
import { Button } from "@/components/ui/button";
import { Mail, Phone, User, Tag, FileText, Calendar } from "lucide-react";

export default function SupplierDetailPage() {
  const { id: supplierId } = useParams();
  const {
    data: supplierData,
    isLoading,
    isError,
    error,
  } = useSupplierById(supplierId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] text-indigo-300 text-xl">
        Loading supplier details...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] text-red-400 text-xl">
        Error: {error?.message || "Failed to load supplier details."}
      </div>
    );
  }

  const supplier = supplierData?.data;

  if (!supplier) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-white text-xl">
        <p>Supplier not found.</p>
        <Link
          to="/user/suppliers"
          className="mt-4 text-emerald-400 hover:text-emerald-300 transition"
        >
          ← Back to Supplier List
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl p-6 bg-gray-900 rounded-xl shadow-lg text-white font-inter">
      <div className="flex justify-between items-start mb-8">
        <h1 className="text-4xl font-bold text-indigo-400 tracking-wide">
          Supplier Details
        </h1>
        {supplier.isActive ? (
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-green-900 text-green-300">
            <Tag size={16} />
            Active
          </span>
        ) : (
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-red-900 text-red-300">
            <Tag size={16} />
            Inactive
          </span>
        )}
      </div>

      <div className="space-y-5">
        {/* Name */}
        <div className="flex items-start gap-4 p-4 bg-gray-800 rounded-md shadow-sm">
          <User className="h-6 w-6 text-emerald-400 mt-1" />
          <div>
            <p className="text-sm text-gray-400">Name</p>
            <p className="text-lg font-semibold">{supplier.name}</p>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start gap-4 p-4 bg-gray-800 rounded-md shadow-sm">
          <Mail className="h-6 w-6 text-emerald-400 mt-1" />
          <div>
            <p className="text-sm text-gray-400">Email</p>
            <p className="text-lg">{supplier.email}</p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start gap-4 p-4 bg-gray-800 rounded-md shadow-sm">
          <Phone className="h-6 w-6 text-emerald-400 mt-1" />
          <div>
            <p className="text-sm text-gray-400">Phone</p>
            <p className="text-lg">{supplier.phone}</p>
          </div>
        </div>

        {/* Notes */}
        {supplier.notes && (
          <div className="flex items-start gap-4 p-4 bg-gray-800 rounded-md shadow-sm">
            <FileText className="h-6 w-6 text-emerald-400 mt-1 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-400">Notes</p>
              <p className="text-lg whitespace-pre-wrap">{supplier.notes}</p>
            </div>
          </div>
        )}

        {/* Join Date */}
        <div className="flex items-start gap-4 p-4 bg-gray-800 rounded-md text-sm text-gray-400 shadow-sm">
          <Calendar className="h-6 w-6 text-emerald-400 mt-1" />
          <div>
            <p className="text-sm text-gray-400">Supplier Since</p>
            <p className="text-lg text-white">
              {new Date(supplier.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="mt-10 text-center">
        <Link to="/user/suppliers">
          <Button
            variant="outline"
            className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600 px-6 py-2"
          >
            ← Back to Supplier List
          </Button>
        </Link>
      </div>
    </div>
  );
}
