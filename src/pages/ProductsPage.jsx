import { useState } from "react";
import {
  useAllProducts,
  useCreateProduct,
  useUpdateProduct,
  useDeactivateProduct,
  useActivateProduct,
} from "../hooks/useProduct";
import { useAllCategories } from "../hooks/useCategory";
import { useAllSuppliers } from "../hooks/useSupplier";

import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/Modal";
import ProductForm from "../components/product/ProductForm";
import ProductTable from "../components/product/ProductTable";
import { PlusCircle, Search } from "lucide-react";

export default function ProductsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: "",
    category: "",
    supplier: "",
    stockStatus: "",
  });

  const [localFilters, setLocalFilters] = useState({
    search: "",
    category: "",
    supplier: "",
    stockStatus: "",
  });

  const {
    data: productData,
    isLoading,
    isError,
    error,
  } = useAllProducts(filters);
  const { data: categoriesData } = useAllCategories({
    isActive: true,
    limit: 100,
  });
  const { data: suppliersData } = useAllSuppliers({
    isActive: true,
    limit: 100,
  });
  const { mutate: createProduct, isPending: isCreating } = useCreateProduct();
  const { mutate: updateProduct, isPending: isUpdating } = useUpdateProduct();
  const { mutate: deactivateProduct, isPending: isDeactivating } =
    useDeactivateProduct();
  const { mutate: activateProduct, isPending: isActivating } =
    useActivateProduct();

  const isProcessing =
    isCreating || isUpdating || isDeactivating || isActivating;

  const handleOpenCreateModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (formData) => {
    if (editingProduct) {
      updateProduct(formData, { onSuccess: () => setIsModalOpen(false) });
    } else {
      createProduct(formData, { onSuccess: () => setIsModalOpen(false) });
    }
  };

  const handleDeactivate = (productId) => {
    deactivateProduct(productId);
  };

  const handleActivate = (productId) => {
    activateProduct(productId);
  };

  const handleApplyFilters = () => {
    const activeFilters = {};
    for (const key in localFilters) {
      if (localFilters[key] !== "") {
        activeFilters[key] = localFilters[key];
      }
    }
    setFilters({
      page: 1,
      limit: filters.limit || 10,
      ...activeFilters,
    });
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const handleLocalFilterChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({ ...prev, [name]: value }));
  };

  if (isError) {
    return (
      <div className="text-red-400 text-center p-10">
        Error: {error?.message || "Failed to load products."}
      </div>
    );
  }

  const products = productData?.data?.products || [];
  const pagination = productData?.data?.pagination || {};
  const categories = categoriesData?.data?.categories || [];
  const suppliers = suppliersData?.data?.data || [];

  return (
    <div className="container mx-auto p-6 bg-gray-900 rounded-lg shadow-xl text-white font-inter">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-indigo-400">
          Manage Products
        </h1>
        <Button
          onClick={handleOpenCreateModal}
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          <PlusCircle size={20} className="mr-2" />
          Create Product
        </Button>
      </div>

      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6 p-4 bg-gray-800 rounded-lg">
        <div className="relative col-span-1 md:col-span-2 lg:col-span-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            name="search"
            placeholder="Search by name or SKU..."
            value={localFilters.search}
            onChange={handleLocalFilterChange}
            className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-md"
          />
        </div>
        <select
          name="category"
          value={localFilters.category}
          onChange={handleLocalFilterChange}
          className="bg-gray-700 rounded-md py-2"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
        <select
          name="supplier"
          value={localFilters.supplier}
          onChange={handleLocalFilterChange}
          className="bg-gray-700 rounded-md py-2"
        >
          <option value="">All Suppliers</option>
          {suppliers.map((sup) => (
            <option key={sup._id} value={sup._id}>
              {sup.name}
            </option>
          ))}
        </select>
        <select
          name="stockStatus"
          value={localFilters.stockStatus}
          onChange={handleLocalFilterChange}
          className="bg-gray-700 rounded-md py-2"
        >
          <option value="">All Stock Statuses</option>
          <option value="normal">Normal</option>
          <option value="low_stock">Low Stock</option>
          <option value="out_of_stock">Out of Stock</option>
        </select>
        <Button
          onClick={handleApplyFilters}
          className="col-span-1 md:col-span-2 lg:col-span-5 bg-indigo-600 hover:bg-indigo-700"
        >
          Apply Filters
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center text-gray-400 py-10">
          Loading products...
        </div>
      ) : (
        <ProductTable
          products={products}
          onDeactivate={handleDeactivate}
          onActivate={handleActivate}
          onEdit={handleOpenEditModal}
          isProcessing={isProcessing}
        />
      )}

      {pagination.totalPages > 1 && (
        <div className="mt-6 flex justify-between items-center">
          <Button
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={!pagination.hasPrevPage || isLoading}
            variant="outline"
            className="bg-gray-700"
          >
            Previous
          </Button>
          <span>
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          <Button
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={!pagination.hasNextPage || isLoading}
            variant="outline"
            className="bg-gray-700"
          >
            Next
          </Button>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProduct ? "Edit Product" : "Create a New Product"}
      >
        <ProductForm
          onSubmit={handleFormSubmit}
          isPending={isCreating || isUpdating}
          onCancel={() => setIsModalOpen(false)}
          initialData={editingProduct}
        />
      </Modal>
    </div>
  );
}
