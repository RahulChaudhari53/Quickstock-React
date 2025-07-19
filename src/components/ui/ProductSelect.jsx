import { useState, useMemo } from "react";
import Select from "react-select";
import { useAllProducts, useProductById } from "../../hooks/useProduct";

const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "#1F2937",
    borderColor: "#4B5563",
    color: "white",
    minHeight: "42px",
  }),
  menu: (provided) => ({ ...provided, backgroundColor: "#1F2937", zIndex: 50 }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#4B5563"
      : state.isFocused
      ? "#374151"
      : "#1F2937",
    color: "white",
  }),
  singleValue: (provided) => ({ ...provided, color: "white" }),
  input: (provided) => ({ ...provided, color: "white" }),
};

const FormatOptionLabel = ({ product }) => (
  <div className="flex flex-col">
    <span className="whitespace-normal break-words font-medium">
      {product.name}
    </span>
    <span className="text-xs text-gray-400 mt-1">{product.sku}</span>
  </div>
);

export default function ProductSelect({ value, onChange }) {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: searchData, isLoading: isSearching } = useAllProducts({
    isActive: true,
    search: searchTerm,
    limit: 20,
  });

  const { data: selectedProductData, isLoading: isLoadingSelected } =
    useProductById(value);

  const productOptions = useMemo(() => {
    const searchResults = searchData?.data?.products || [];
    const selectedProduct = selectedProductData?.data;

    const productMap = new Map();

    if (selectedProduct) {
      productMap.set(selectedProduct._id, selectedProduct);
    }

    searchResults.forEach((product) => {
      productMap.set(product._id, product);
    });

    return Array.from(productMap.values()).map((product) => ({
      value: product._id,
      label: product.name,
      product: product,
    }));
  }, [searchData, selectedProductData]);

  const handleInputChange = (inputValue) => {
    setSearchTerm(inputValue);
  };

  const selectedOption =
    productOptions.find((opt) => opt.value === value) || null;

  return (
    <Select
      value={selectedOption}
      options={productOptions}
      onChange={onChange}
      onInputChange={handleInputChange}
      isLoading={isSearching || (value && isLoadingSelected)}
      isClearable
      placeholder="Type to search for a product..."
      styles={customStyles}
      classNamePrefix="react-select"
      formatOptionLabel={FormatOptionLabel}
    />
  );
}
